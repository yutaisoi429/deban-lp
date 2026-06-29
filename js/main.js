(() => {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.getElementById('mobile-nav');

  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    menuButton.querySelector('i')?.classList.replace('fa-xmark', 'fa-bars');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    menuButton.querySelector('i')?.classList.toggle('fa-bars', !open);
    menuButton.querySelector('i')?.classList.toggle('fa-xmark', open);
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  });

  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 1080) closeMenu(); });

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.closest('.faq-item')?.querySelector('.faq-answer');
      if (!answer) return;
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      answer.hidden = !open;
    });
  });
})();
