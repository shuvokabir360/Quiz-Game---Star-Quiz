/**
 * High-definition national flag renderer supporting full cross-platform graphics
 * (solves Windows black-and-white letters issue for flag emojis).
 */
export function getFlagHtml(code, emoji = '🌐', size = 'normal') {
  if (!code || typeof code !== 'string' || code.length !== 2) {
    return `<span class="flag-emoji">${emoji}</span>`;
  }
  const lowerCode = code.toLowerCase();
  return `<span class="flag-badge-wrapper flag-size-${size}">
    <img
      src="https://flagcdn.com/w160/${lowerCode}.png"
      srcset="https://flagcdn.com/w160/${lowerCode}.png 1x, https://flagcdn.com/w320/${lowerCode}.png 2x"
      alt="${code}"
      class="flag-raster-img"
      loading="eager"
      onerror="this.style.display='none'; const fb = this.nextElementSibling; if(fb) fb.style.display='inline-block';"
    />
    <span class="flag-fallback-emoji" style="display:none;">${emoji}</span>
  </span>`;
}
