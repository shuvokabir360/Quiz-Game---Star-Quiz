export class CountdownTimer {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    if (this.container) {
      // Standalone timer container is hidden since timer is now wrapped around photo
      this.container.innerHTML = `
        <div class="timer-line-widget hidden" id="timer-line-widget" style="display: none;">
          <div class="timer-line-hud">
            <div class="timer-hud-center">
              <span class="timer-hud-seconds" id="timer-number-val">10</span>
              <span class="timer-hud-unit">s</span>
            </div>
          </div>
          <div class="timer-line-track">
            <div class="timer-line-bar" id="timer-line-bar" style="width: 100%;">
              <span class="timer-line-glow-dot"></span>
            </div>
          </div>
        </div>
      `;
      this.container.style.display = 'none';
      this.widgetEl = this.container.querySelector('#timer-line-widget');
      this.barEl = this.container.querySelector('#timer-line-bar');
      this.numberEl = this.container.querySelector('#timer-number-val');
    }
  }

  setLocalization() {}

  update({ remainingSeconds = 10, progress = 1.0, isUrgent = false }) {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const seconds = Math.max(0, Math.ceil(remainingSeconds));

    // 1. Update 4-Sided Perimeter Timer Bar around the Photo
    const photoBar = document.getElementById('photo-timer-bar');
    if (photoBar) {
      // pathLength is 100. At full progress (1.0), offset is 0. At 0.0 progress, offset is 100 (depleted)
      const offset = (100 * (1 - clampedProgress)).toFixed(2);
      photoBar.style.strokeDashoffset = offset;

      if (clampedProgress > 0.45) {
        photoBar.setAttribute('class', 'photo-timer-bar timer-cyan');
      } else if (clampedProgress > 0.2) {
        photoBar.setAttribute('class', 'photo-timer-bar timer-amber');
      } else {
        photoBar.setAttribute('class', 'photo-timer-bar timer-urgent');
      }
    }

    // 2. Update Timer Countdown Badge below the Photo
    const badgeVal = document.getElementById('card-timer-val');
    if (badgeVal) {
      badgeVal.textContent = seconds;
    }
    const badgeEl = document.getElementById('card-timer-badge');
    if (badgeEl) {
      if (clampedProgress > 0.45) {
        badgeEl.className = 'timer-countdown-badge timer-cyan';
      } else if (clampedProgress > 0.2) {
        badgeEl.className = 'timer-countdown-badge timer-amber';
      } else {
        badgeEl.className = 'timer-countdown-badge timer-urgent' + (isUrgent && seconds > 0 ? ' pulse-urgent' : '');
      }

      if (seconds === 0) {
        badgeEl.classList.add('completed-state');
      } else {
        badgeEl.classList.remove('completed-state');
      }
    }

    // Fallback sync
    if (this.numberEl) this.numberEl.textContent = seconds;
    if (this.barEl) this.barEl.style.width = `${(clampedProgress * 100).toFixed(1)}%`;
  }

  reset(defaultSeconds = 10) {
    const photoBar = document.getElementById('photo-timer-bar');
    if (photoBar) {
      photoBar.style.strokeDashoffset = '0';
      photoBar.setAttribute('class', 'photo-timer-bar timer-cyan');
    }

    const badgeVal = document.getElementById('card-timer-val');
    if (badgeVal) badgeVal.textContent = defaultSeconds;

    const badgeEl = document.getElementById('card-timer-badge');
    if (badgeEl) badgeEl.className = 'timer-countdown-badge timer-cyan';

    if (this.barEl) this.barEl.style.width = '100%';
    if (this.numberEl) this.numberEl.textContent = defaultSeconds;
  }

  setVisible(visible) {
    const photoSvg = document.getElementById('photo-timer-svg');
    if (photoSvg) {
      photoSvg.style.display = visible ? 'block' : 'none';
    }

    const badgeEl = document.getElementById('card-timer-badge');
    if (badgeEl) {
      badgeEl.style.display = visible ? 'inline-flex' : 'none';
    }

    if (this.container) {
      this.container.style.display = 'none'; // Ensure standalone slot stays hidden
    }
  }
}
