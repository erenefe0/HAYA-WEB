import {
  createIcons,
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Cpu,
  ScanEye,
  Navigation,
  Layers,
  Plus,
  Orbit,
  Code,
  Users,
  Monitor,
  Gamepad2,
  Mail,
  MapPin,
  MoveUpRight,
} from 'lucide';
import { areas } from './content';
import { icon, joinLink } from './ui';

// Sayfa DOM’a eklendikten sonra menü, pencereler ve hareket kontrollerini bağlar.
export function initializeInteractions() {
  function refreshIcons() {
    createIcons({
      icons: {
        ArrowUpRight,
        ArrowDown,
        Menu,
        X,
        Cpu,
        ScanEye,
        Navigation,
        Layers,
        Plus,
        Orbit,
        Code,
        Users,
        Monitor,
        Gamepad2,
        Mail,
        MapPin,
        MoveUpRight,
      },
      attrs: { 'stroke-width': 1.6 },
    });
  }
  refreshIcons();
  // Mobil menü: bağlantı seçilince, Escape basılınca veya geniş ekrana geçilince kapanır.
  const menuButton = document.querySelector<HTMLButtonElement>('.menu-button')!;
  const mobileNav = document.querySelector<HTMLElement>('.mobile-nav')!;
  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menüyü aç');
  }
  menuButton.addEventListener('click', () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });
  // Bölüm ekrana ilk kez girince görünür yap; tekrar gözlemlemek gerekmez.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  // Araştırma kartları, içerik verisini yerleşik dialog penceresinde gösterir.
  const dialog = document.querySelector<HTMLDialogElement>('#area-dialog')!;
  dialog.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
        dialog.close();
    }
  });
  document.querySelectorAll<HTMLButtonElement>('[data-area]').forEach((button) =>
    button.addEventListener('click', () => {
      const area = areas.find((a) => a.no === button.dataset.area)!;
      document.querySelector('#area-content')!.innerHTML =
        `<div class="eyebrow">ARAŞTIRMA ALANI / ${area.no}</div><div class="dialog-icon">${icon(area.icon)}</div><h2>${area.title}</h2><p>${area.detail}</p><div class="project-tags">${area.tags.map((t) => `<span>${t}</span>`).join('')}</div>${joinLink('Birlikte çalışalım')}`;
      refreshIcons();
      document.querySelector('#area-content a')!.addEventListener('click', () => dialog.close());
      dialog.showModal();
      document.body.classList.add('dialog-open');
    }),
  );
  // Sistem tercihiyle başla; kullanıcı altbilgideki düğmeyle tercihi değiştirebilir.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionPreference.matches;
  const motionButton = document.querySelector<HTMLButtonElement>('.motion-toggle')!;
  function syncMotion() {
    document.body.classList.toggle('reduced-motion', reducedMotion);
    motionButton.setAttribute('aria-pressed', String(reducedMotion));
    motionButton.querySelector('span')!.textContent = reducedMotion
      ? 'Hareketi etkinleştir'
      : 'Hareketi azalt';
  }
  motionButton.addEventListener('click', () => {
    reducedMotion = !reducedMotion;
    syncMotion();
  });
  motionPreference.addEventListener('change', (e) => {
    reducedMotion = e.matches;
    syncMotion();
  });
  syncMotion();

  if (import.meta.hot) import.meta.hot.dispose(() => revealObserver.disconnect());
  return () => reducedMotion;
}
