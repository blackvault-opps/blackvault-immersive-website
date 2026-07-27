document.addEventListener('DOMContentLoaded', () => {
  const ageDialog = document.getElementById('ageDialog');
  const infoDialog = document.getElementById('infoDialog');

  const enterNexus =
    document.getElementById('enterNexus') ||
    document.getElementById('enterCasino');

  const exploreBlackVault =
    document.getElementById('exploreBlackVault');

  const declineAge =
    document.getElementById('declineAge');

  const menuToggle =
    document.getElementById('menuToggle');

  const quickMenu =
    document.getElementById('quickMenu');

  const cursorAura =
    document.querySelector('.cursor-aura');

  function openAgeGate() {
    if (!ageDialog) {
      console.warn('BlackVault Nexus age dialog not found.');
      return;
    }

    if (typeof ageDialog.showModal === 'function') {
      ageDialog.showModal();
    } else {
      alert(
        'Age confirmation required: this 18+ prototype is intended for adults only.'
      );
    }
  }

  /* BLACKVAULT NEXUS ENTRY */
  if (enterNexus) {
    enterNexus.addEventListener('click', openAgeGate);
  }

  /* EXPLORE BLACKVAULT */
  if (exploreBlackVault && infoDialog) {
    exploreBlackVault.addEventListener('click', () => {
      if (typeof infoDialog.showModal === 'function') {
        infoDialog.showModal();
      }
    });
  }

  /* AGE CONFIRMATION */
  if (ageDialog) {
    ageDialog.addEventListener('close', () => {
      if (ageDialog.returnValue === 'confirm') {
        localStorage.setItem(
          'blackvaultNexusAgeConfirmed',
          'true'
        );

        document.body.classList.add('age-confirmed');

        setTimeout(() => {
          console.log(
            'Age confirmed. BlackVault Nexus™ entry unlocked.'
          );
        }, 60);
      }
    });
  }

  /* AGE DECLINE */
  if (declineAge) {
    declineAge.addEventListener('click', () => {
      localStorage.removeItem(
        'blackvaultNexusAgeConfirmed'
      );

      document.body.classList.remove(
        'age-confirmed'
      );
    });
  }

  /* QUICK MENU */
  if (menuToggle && quickMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen =
        quickMenu.classList.toggle('open');

      menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      quickMenu.setAttribute(
        'aria-hidden',
        String(!isOpen)
      );
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('.floating-menu')) {
        quickMenu.classList.remove('open');

        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        quickMenu.setAttribute(
          'aria-hidden',
          'true'
        );
      }
    });
  }

  /* PROTOTYPE CONTROLS */
  document
    .querySelectorAll('[data-prototype-action]')
    .forEach(control => {
      control.addEventListener('click', event => {
        event.preventDefault();

        const action =
          control.getAttribute(
            'data-prototype-action'
          );

        console.log(
          `${action} is not implemented yet.`
        );
      });
    });

  /* CURSOR AURA */
  if (
    cursorAura &&
    window.matchMedia('(pointer: fine)').matches
  ) {
    let mouseX = -100;
    let mouseY = -100;

    let auraX = -100;
    let auraY = -100;

    document.body.classList.add('cursor-live');

    window.addEventListener('mousemove', event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function animateCursor() {
      auraX += (mouseX - auraX) * 0.16;
      auraY += (mouseY - auraY) * 0.16;

      cursorAura.style.left = `${auraX}px`;
      cursorAura.style.top = `${auraY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document
      .querySelectorAll('button, a')
      .forEach(element => {
        element.addEventListener(
          'mouseenter',
          () => {
            cursorAura.style.width = '42px';
            cursorAura.style.height = '42px';
          }
        );

        element.addEventListener(
          'mouseleave',
          () => {
            cursorAura.style.width = '26px';
            cursorAura.style.height = '26px';
          }
        );
      });
  }

  console.log(
    'BlackVault Resolutions™ interface initialized.'
  );
});