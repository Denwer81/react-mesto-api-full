export function lockScroll() {
  const scrollBarSize = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarSize}px`;
}

export function unlockScroll() {
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, 300);
}