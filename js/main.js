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
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'メニューを閉じる' : 'メニューを開く');
    const icon = menuButton.querySelector('i');
    icon?.classList.toggle('fa-bars', !willOpen);
    icon?.classList.toggle('fa-xmark', willOpen);
    mobileNav.hidden = !willOpen;
    document.body.classList.toggle('menu-open', willOpen);
  });

  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  });

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item?.querySelector('.faq-answer');
      if (!answer) return;
      const willOpen = button.getAttribute('aria-expanded') !== 'true';

      document.querySelectorAll('.faq-item button[aria-expanded="true"]').forEach((openButton) => {
        if (openButton === button) return;
        openButton.setAttribute('aria-expanded', 'false');
        const openAnswer = openButton.closest('.faq-item')?.querySelector('.faq-answer');
        if (openAnswer) openAnswer.hidden = true;
      });

      button.setAttribute('aria-expanded', String(willOpen));
      answer.hidden = !willOpen;
    });
  });
})();

