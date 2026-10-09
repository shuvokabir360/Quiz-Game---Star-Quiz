/**
 * Interactive Celebrity Photo Cropper Modal
 * Supports Circle Crop (default & recommended for 3D card avatar),
 * Square, and Portrait modes with pan, zoom, rotation, and live circular preview.
 */
export class ImageCropperModal {
  constructor() {
    this.modalEl = null;
    this.canvas = null;
    this.ctx = null;
    this.previewCanvas = null;
    this.previewCtx = null;

    // Image state
    this.img = null;
    this.rawFile = null;
    this.onComplete = null;

    // Transform state
    this.zoom = 1.0;
    this.minZoom = 0.5;
    this.maxZoom = 3.5;
    this.rotation = 0; // 0, 90, 180, 270
    this.panX = 0;
    this.panY = 0;
    this.cropShape = 'circle'; // 'circle' | 'rect'
    this.aspectRatio = 1; // 1:1 by default
    this.isDragging = false;
    this.lastPointerX = 0;
    this.lastPointerY = 0;

    // Render loop
    this.animationFrameId = null;

    this.createDom();
    this.bindEvents();
  }

  createDom() {
    const backdrop = document.createElement('div');
    backdrop.className = 'cropper-modal-backdrop hidden';
    backdrop.id = 'cropper-modal-backdrop';
    backdrop.innerHTML = `
      <div class="cropper-modal" role="dialog" aria-modal="true">
        <div class="cropper-header">
          <div>
            <div class="cropper-title">⭕ CIRCLE PHOTO CROPPER (গোলাকার ছবি ক্রপ)</div>
            <div class="cropper-subtitle">Drag to center celebrity face in the circle & adjust zoom</div>
          </div>
          <button type="button" class="cropper-btn-close" id="btn-crop-cancel-top" aria-label="Cancel">✕</button>
        </div>

        <div class="cropper-body">
          <!-- Main Canvas Area -->
          <div class="cropper-stage-wrapper" id="cropper-stage-wrapper">
            <canvas id="cropper-canvas" class="cropper-canvas" width="460" height="460"></canvas>
            <div class="cropper-drag-hint">👆 Drag to position face in circle | 🔍 Scroll to zoom</div>
          </div>

          <!-- Controls Side / Bottom -->
          <div class="cropper-controls-panel">
            <!-- Crop Shape / Aspect Selector -->
            <div class="cropper-ctrl-group">
              <label class="cropper-ctrl-label">📐 Crop Shape & Style (ক্রপ আকার)</label>
              <div class="cropper-aspect-btns">
                <button type="button" class="crop-aspect-btn active" data-shape="circle" data-ratio="1">
                  <span class="aspect-icon">⭕</span> Circle (গোলাকার)
                </button>
                <button type="button" class="crop-aspect-btn" data-shape="rect" data-ratio="1">
                  <span class="aspect-icon">⏹</span> Square (বর্গাকার)
                </button>
                <button type="button" class="crop-aspect-btn" data-shape="rect" data-ratio="0.75">
                  <span class="aspect-icon">📱</span> Card (লম্বালম্বি)
                </button>
              </div>
            </div>

            <!-- Zoom Slider -->
            <div class="cropper-ctrl-group">
              <div class="cropper-label-val">
                <label class="cropper-ctrl-label">🔍 Zoom Level (জুম ইন / আউট)</label>
                <span id="cropper-zoom-val" class="cropper-val-tag">100%</span>
              </div>
              <div class="cropper-slider-row">
                <button type="button" class="crop-btn-icon" id="btn-zoom-out" title="Zoom Out">−</button>
                <input type="range" id="cropper-zoom-slider" min="0.5" max="3.5" step="0.05" value="1.0" class="cropper-slider" />
                <button type="button" class="crop-btn-icon" id="btn-zoom-in" title="Zoom In">+</button>
              </div>
            </div>

            <!-- Rotation & Reset Toolbar -->
            <div class="cropper-ctrl-group">
              <label class="cropper-ctrl-label">🔄 Orientation & Controls</label>
              <div class="cropper-tool-btns">
                <button type="button" class="crop-action-pill" id="btn-crop-rotate">
                  <span>⟳</span> Rotate 90°
                </button>
                <button type="button" class="crop-action-pill" id="btn-crop-fit">
                  <span>🎯</span> Fit Center
                </button>
                <button type="button" class="crop-action-pill" id="btn-crop-reset">
                  <span>↩️</span> Reset All
                </button>
              </div>
            </div>

            <!-- Mini Live Preview -->
            <div class="cropper-preview-section">
              <label class="cropper-ctrl-label">👁️ Game 3D Card Preview (গেমে যেমন দেখাবে)</label>
              <div class="cropper-live-previews">
                <div class="preview-avatar-box">
                  <canvas id="cropper-mini-preview" width="96" height="96" class="preview-mini-canvas"></canvas>
                  <span class="preview-badge">Circle Avatar</span>
                </div>
                <div class="preview-card-info">
                  <span class="preview-hint-title">Authentic Circular Avatar</span>
                  <span class="preview-hint-desc">Photo will be saved as a clean circular portrait with glowing 3D rings in the game card!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="cropper-footer">
          <button type="button" class="btn-crop-cancel" id="btn-crop-cancel">✕ Cancel</button>
          <button type="button" class="btn-crop-apply" id="btn-crop-apply">
            <span class="btn-icon">⭕</span> Apply Circle Crop (সার্কেল ক্রপ করুন)
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.modalEl = backdrop;

    this.canvas = backdrop.querySelector('#cropper-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.previewCanvas = backdrop.querySelector('#cropper-mini-preview');
    this.previewCtx = this.previewCanvas.getContext('2d');

    this.zoomSlider = backdrop.querySelector('#cropper-zoom-slider');
    this.zoomValTag = backdrop.querySelector('#cropper-zoom-val');
    this.aspectBtns = backdrop.querySelectorAll('.crop-aspect-btn');
  }

  bindEvents() {
    const modal = this.modalEl;

    // Close / Cancel
    modal.querySelector('#btn-crop-cancel').addEventListener('click', () => this.close());
    modal.querySelector('#btn-crop-cancel-top').addEventListener('click', () => this.close());
    modal.addEventListener('click', e => {
      if (e.target === modal) this.close();
    });

    // Zoom slider
    this.zoomSlider.addEventListener('input', e => {
      this.setZoom(parseFloat(e.target.value));
    });

    // Zoom +/- buttons
    modal.querySelector('#btn-zoom-in').addEventListener('click', () => {
      this.setZoom(Math.min(this.maxZoom, this.zoom + 0.2));
    });
    modal.querySelector('#btn-zoom-out').addEventListener('click', () => {
      this.setZoom(Math.max(this.minZoom, this.zoom - 0.2));
    });

    // Rotate 90
    modal.querySelector('#btn-crop-rotate').addEventListener('click', () => {
      this.rotation = (this.rotation + 90) % 360;
      this.requestRender();
    });

    // Fit & Reset
    modal.querySelector('#btn-crop-fit').addEventListener('click', () => {
      this.fitToScreen();
    });
    modal.querySelector('#btn-crop-reset').addEventListener('click', () => {
      this.resetTransforms();
    });

    // Shape / Aspect ratio switch
    this.aspectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.aspectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.cropShape = btn.dataset.shape || 'circle';
        this.aspectRatio = parseFloat(btn.dataset.ratio) || 1;

        const applyBtn = modal.querySelector('#btn-crop-apply');
        if (this.cropShape === 'circle') {
          applyBtn.innerHTML = '<span class="btn-icon">⭕</span> Apply Circle Crop (সার্কেল ক্রপ করুন)';
        } else {
          applyBtn.innerHTML = '<span class="btn-icon">✂️</span> Apply Crop (ক্রপ সম্পন্ন করুন)';
        }

        this.requestRender();
      });
    });

    // Pointer events on canvas (Drag & Pan)
    this.canvas.addEventListener('pointerdown', e => {
      this.isDragging = true;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
      this.canvas.setPointerCapture(e.pointerId);
    });

    this.canvas.addEventListener('pointermove', e => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastPointerX;
      const dy = e.clientY - this.lastPointerY;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;

      this.panX += dx;
      this.panY += dy;
      this.requestRender();
    });

    const stopDrag = e => {
      if (this.isDragging) {
        this.isDragging = false;
        try {
          this.canvas.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    this.canvas.addEventListener('pointerup', stopDrag);
    this.canvas.addEventListener('pointercancel', stopDrag);

    // Mouse wheel zoom
    this.canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      this.setZoom(Math.min(this.maxZoom, Math.max(this.minZoom, this.zoom * zoomFactor)));
    }, { passive: false });

    // Apply Crop button
    modal.querySelector('#btn-crop-apply').addEventListener('click', () => {
      this.applyCrop();
    });

    // Window resize
    window.addEventListener('resize', () => {
      if (!this.modalEl.classList.contains('hidden')) {
        this.adjustCanvasSize();
        this.requestRender();
      }
    });
  }

  setZoom(val) {
    this.zoom = Math.min(this.maxZoom, Math.max(this.minZoom, val));
    this.zoomSlider.value = this.zoom;
    this.zoomValTag.textContent = `${Math.round(this.zoom * 100)}%`;
    this.requestRender();
  }

  resetTransforms() {
    this.rotation = 0;
    this.panX = 0;
    this.panY = 0;
    this.fitToScreen();
  }

  fitToScreen() {
    if (!this.img) return;
    const cropBox = this.getCropBox();
    const isRotated = this.rotation === 90 || this.rotation === 270;
    const imgW = isRotated ? this.img.height : this.img.width;
    const imgH = isRotated ? this.img.width : this.img.height;

    const scaleX = cropBox.width / imgW;
    const scaleY = cropBox.height / imgH;
    const baseScale = Math.max(scaleX, scaleY);

    this.panX = 0;
    this.panY = 0;
    this.setZoom(baseScale * 1.05);
  }

  open(fileOrUrl, onComplete) {
    this.onComplete = onComplete;
    this.rawFile = fileOrUrl instanceof File ? fileOrUrl : null;

    const loadImage = src => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.img = img;
        this.modalEl.classList.remove('hidden');
        this.adjustCanvasSize();
        this.resetTransforms();
        this.requestRender();
      };
      img.onerror = () => {
        alert('Failed to load image for cropping.');
      };
      img.src = src;
    };

    if (fileOrUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = e => loadImage(e.target.result);
      reader.readAsDataURL(fileOrUrl);
    } else if (typeof fileOrUrl === 'string') {
      loadImage(fileOrUrl);
    }
  }

  close() {
    this.modalEl.classList.add('hidden');
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  adjustCanvasSize() {
    const stage = this.modalEl.querySelector('#cropper-stage-wrapper');
    const rect = stage.getBoundingClientRect();
    const size = Math.min(rect.width || 420, rect.height || 420);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    this.ctx.scale(dpr, dpr);
    this.displaySize = size;
  }

  getCropBox() {
    const size = this.displaySize || 400;
    const padding = 28;
    const maxBoxW = size - padding * 2;
    const maxBoxH = size - padding * 2;

    let boxW = maxBoxW;
    let boxH = boxW / this.aspectRatio;

    if (boxH > maxBoxH) {
      boxH = maxBoxH;
      boxW = boxH * this.aspectRatio;
    }

    const boxX = (size - boxW) / 2;
    const boxY = (size - boxH) / 2;

    return { x: boxX, y: boxY, width: boxW, height: boxH };
  }

  requestRender() {
    if (this.animationFrameId) return;
    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      this.render();
      this.renderMiniPreview();
    });
  }

  render() {
    if (!this.img || !this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = this.displaySize || 400;

    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(dpr, dpr);

    // 1. Draw Deep Space Grid Background
    this.ctx.fillStyle = '#060d1f';
    this.ctx.fillRect(0, 0, size, size);

    // Subtle background grid
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    this.ctx.lineWidth = 1;
    for (let i = 20; i < size; i += 24) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, size);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(size, i);
      this.ctx.stroke();
    }

    // 2. Draw Transformed Image
    this.ctx.save();
    this.ctx.translate(size / 2 + this.panX, size / 2 + this.panY);
    this.ctx.rotate((this.rotation * Math.PI) / 180);
    this.ctx.scale(this.zoom, this.zoom);

    this.ctx.drawImage(
      this.img,
      -this.img.width / 2,
      -this.img.height / 2,
      this.img.width,
      this.img.height
    );
    this.ctx.restore();

    const cropBox = this.getCropBox();
    const cx = cropBox.x + cropBox.width / 2;
    const cy = cropBox.y + cropBox.height / 2;
    const r = cropBox.width / 2;

    if (this.cropShape === 'circle') {
      // 3. Circular Vignette Mask (Darken area outside the circle)
      this.ctx.save();
      this.ctx.fillStyle = 'rgba(2, 6, 18, 0.82)';
      this.ctx.beginPath();
      this.ctx.rect(0, 0, size, size);
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2, true); // counter-clockwise hole cutout
      this.ctx.fill();
      this.ctx.restore();

      // 4. Subtle Rule-of-Thirds Grid inside Circle
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.clip();

      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 4]);

      const thirdW = cropBox.width / 3;
      const thirdH = cropBox.height / 3;
      for (let c = 1; c < 3; c++) {
        this.ctx.beginPath();
        this.ctx.moveTo(cropBox.x + thirdW * c, cropBox.y);
        this.ctx.lineTo(cropBox.x + thirdW * c, cropBox.y + cropBox.height);
        this.ctx.stroke();
      }
      for (let row = 1; row < 3; row++) {
        this.ctx.beginPath();
        this.ctx.moveTo(cropBox.x, cropBox.y + thirdH * row);
        this.ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + thirdH * row);
        this.ctx.stroke();
      }
      this.ctx.restore();

      // 5. Glowing Neon Cyan Circle Border
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#00f2fe';
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowColor = '#00f2fe';
      this.ctx.shadowBlur = 12;
      this.ctx.stroke();

      // 4 Orbit tick markers at 0°, 90°, 180°, 270°
      const ticks = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      this.ctx.strokeStyle = '#facc15';
      this.ctx.lineWidth = 3.5;
      this.ctx.shadowColor = '#facc15';
      this.ctx.shadowBlur = 8;
      ticks.forEach(angle => {
        const x1 = cx + (r - 7) * Math.cos(angle);
        const y1 = cy + (r - 7) * Math.sin(angle);
        const x2 = cx + (r + 7) * Math.cos(angle);
        const y2 = cy + (r + 7) * Math.sin(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      });
      this.ctx.restore();

    } else {
      // Rectangular Vignette Mask
      this.ctx.fillStyle = 'rgba(2, 6, 18, 0.78)';
      this.ctx.fillRect(0, 0, size, cropBox.y);
      this.ctx.fillRect(0, cropBox.y + cropBox.height, size, size - (cropBox.y + cropBox.height));
      this.ctx.fillRect(0, cropBox.y, cropBox.x, cropBox.height);
      this.ctx.fillRect(cropBox.x + cropBox.width, cropBox.y, size - (cropBox.x + cropBox.width), cropBox.height);

      // Grid
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 4]);
      const thirdW = cropBox.width / 3;
      const thirdH = cropBox.height / 3;
      for (let c = 1; c < 3; c++) {
        this.ctx.beginPath();
        this.ctx.moveTo(cropBox.x + thirdW * c, cropBox.y);
        this.ctx.lineTo(cropBox.x + thirdW * c, cropBox.y + cropBox.height);
        this.ctx.stroke();
      }
      for (let row = 1; row < 3; row++) {
        this.ctx.beginPath();
        this.ctx.moveTo(cropBox.x, cropBox.y + thirdH * row);
        this.ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + thirdH * row);
        this.ctx.stroke();
      }
      this.ctx.setLineDash([]);

      // Rect Border & Corners
      this.ctx.strokeStyle = '#00f2fe';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);

      const cornerLen = 18;
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = '#facc15';
      // Corners
      this.ctx.beginPath();
      this.ctx.moveTo(cropBox.x, cropBox.y + cornerLen);
      this.ctx.lineTo(cropBox.x, cropBox.y);
      this.ctx.lineTo(cropBox.x + cornerLen, cropBox.y);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(cropBox.x + cropBox.width - cornerLen, cropBox.y);
      this.ctx.lineTo(cropBox.x + cropBox.width, cropBox.y);
      this.ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + cornerLen);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(cropBox.x, cropBox.y + cropBox.height - cornerLen);
      this.ctx.lineTo(cropBox.x + cropBox.height, cropBox.y + cropBox.height);
      this.ctx.lineTo(cropBox.x + cornerLen, cropBox.y + cropBox.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(cropBox.x + cropBox.width - cornerLen, cropBox.y + cropBox.height);
      this.ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + cropBox.height);
      this.ctx.lineTo(cropBox.x + cropBox.width, cropBox.y + cropBox.height - cornerLen);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  renderMiniPreview() {
    if (!this.img || !this.previewCtx) return;
    const cropBox = this.getCropBox();
    const pw = this.previewCanvas.width;
    const ph = this.previewCanvas.height;

    this.previewCtx.clearRect(0, 0, pw, ph);

    // Circular clip for avatar
    this.previewCtx.save();
    this.previewCtx.beginPath();
    this.previewCtx.arc(pw / 2, ph / 2, pw / 2 - 2, 0, Math.PI * 2);
    this.previewCtx.clip();

    // Dark base
    this.previewCtx.fillStyle = '#091224';
    this.previewCtx.fillRect(0, 0, pw, ph);

    // Draw the crop region mapped to preview
    const scaleFactor = pw / cropBox.width;
    const stageCenter = (this.displaySize || 400) / 2;

    this.previewCtx.translate(
      (stageCenter + this.panX - cropBox.x) * scaleFactor,
      (stageCenter + this.panY - cropBox.y) * scaleFactor
    );
    this.previewCtx.rotate((this.rotation * Math.PI) / 180);
    this.previewCtx.scale(this.zoom * scaleFactor, this.zoom * scaleFactor);

    this.previewCtx.drawImage(
      this.img,
      -this.img.width / 2,
      -this.img.height / 2,
      this.img.width,
      this.img.height
    );
    this.previewCtx.restore();

    // Cyan glowing ring border
    this.previewCtx.beginPath();
    this.previewCtx.arc(pw / 2, ph / 2, pw / 2 - 2, 0, Math.PI * 2);
    this.previewCtx.strokeStyle = '#00f2fe';
    this.previewCtx.lineWidth = 3;
    this.previewCtx.stroke();
  }

  /**
   * High-resolution crop exporter (True Circular PNG when Circle mode is chosen)
   */
  applyCrop() {
    if (!this.img) return;

    const cropBox = this.getCropBox();
    const targetW = 600;
    const targetH = this.cropShape === 'circle' ? 600 : Math.round(targetW / this.aspectRatio);

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = targetW;
    exportCanvas.height = targetH;
    const expCtx = exportCanvas.getContext('2d');

    const scaleFactor = targetW / cropBox.width;
    const stageCenter = (this.displaySize || 400) / 2;

    if (this.cropShape === 'circle') {
      // Transparent background outside circle for authentic circular avatar PNG
      expCtx.clearRect(0, 0, targetW, targetH);
      expCtx.save();
      expCtx.beginPath();
      expCtx.arc(targetW / 2, targetH / 2, targetW / 2, 0, Math.PI * 2);
      expCtx.closePath();
      expCtx.clip();

      // Inside circle base
      expCtx.fillStyle = '#091224';
      expCtx.fill();

      // Transform & draw image
      expCtx.translate(
        (stageCenter + this.panX - cropBox.x) * scaleFactor,
        (stageCenter + this.panY - cropBox.y) * scaleFactor
      );
      expCtx.rotate((this.rotation * Math.PI) / 180);
      expCtx.scale(this.zoom * scaleFactor, this.zoom * scaleFactor);

      expCtx.drawImage(
        this.img,
        -this.img.width / 2,
        -this.img.height / 2,
        this.img.width,
        this.img.height
      );
      expCtx.restore();

      // Export as PNG for clean transparency around circle
      exportCanvas.toBlob(blob => {
        if (!blob) {
          alert('Failed to generate cropped image.');
          return;
        }

        const baseName = (this.rawFile?.name || 'celebrity-circle').replace(/\.[^/.]+$/, '');
        const croppedFile = new File([blob], `${baseName}-circle.png`, {
          type: 'image/png',
          lastModified: Date.now()
        });

        const dataUrl = exportCanvas.toDataURL('image/png');

        if (typeof this.onComplete === 'function') {
          this.onComplete({
            file: croppedFile,
            blob,
            dataUrl,
            isCircle: true
          });
        }

        this.close();
      }, 'image/png');

    } else {
      // Rectangular export
      expCtx.fillStyle = '#091224';
      expCtx.fillRect(0, 0, targetW, targetH);

      expCtx.save();
      expCtx.translate(
        (stageCenter + this.panX - cropBox.x) * scaleFactor,
        (stageCenter + this.panY - cropBox.y) * scaleFactor
      );
      expCtx.rotate((this.rotation * Math.PI) / 180);
      expCtx.scale(this.zoom * scaleFactor, this.zoom * scaleFactor);

      expCtx.drawImage(
        this.img,
        -this.img.width / 2,
        -this.img.height / 2,
        this.img.width,
        this.img.height
      );
      expCtx.restore();

      exportCanvas.toBlob(blob => {
        if (!blob) {
          alert('Failed to generate cropped image.');
          return;
        }

        const baseName = (this.rawFile?.name || 'celebrity-cropped').replace(/\.[^/.]+$/, '');
        const croppedFile = new File([blob], `${baseName}.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });

        const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.92);

        if (typeof this.onComplete === 'function') {
          this.onComplete({
            file: croppedFile,
            blob,
            dataUrl,
            isCircle: false
          });
        }

        this.close();
      }, 'image/jpeg', 0.92);
    }
  }
}
