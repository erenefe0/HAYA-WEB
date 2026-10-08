// Kaydırma anlatımı ve 3D sahnenin başlatılması.
export function initializeFlightStory(getReducedMotion: () => boolean) {
  const story = document.querySelector<HTMLElement>('.flight-story')!;
  const pin = document.querySelector<HTMLElement>('.flight-pin')!;
  const firstCopy = document.querySelector<HTMLElement>('.hero-copy-first')!;
  const secondCopy = document.querySelector<HTMLElement>('.hero-copy-second')!;
  const progressBar = document.querySelector<HTMLElement>('.flight-progress span')!;
  const modelButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-model]')];
  let flightProgress = 0,
    chapter = -1,
    scrollFrame = 0;
  // Sabit açılış bölümündeki kaydırmayı 0–1 aralığına çevirir.
  // Bölüm değişince görünür metin, erişilebilirlik ve sahne etiketi birlikte güncellenir.
  function updateFlight() {
    scrollFrame = 0;
    const headerHeight = document.querySelector<HTMLElement>('.site-header')!.offsetHeight;
    const range = Math.max(story.offsetHeight - pin.offsetHeight, 1);
    flightProgress = Math.min(
      1,
      Math.max(0, (window.scrollY - story.offsetTop + headerHeight) / range),
    );
    const nextChapter = flightProgress >= 0.53 ? 1 : 0;
    progressBar.style.transform = `scaleX(${flightProgress})`;
    if (nextChapter !== chapter) {
      chapter = nextChapter;
      pin.classList.toggle('hardware-active', chapter === 1);
      firstCopy.inert = chapter === 1;
      secondCopy.inert = chapter === 0;
      firstCopy.setAttribute('aria-hidden', String(chapter === 1));
      secondCopy.setAttribute('aria-hidden', String(chapter === 0));
      modelButtons.forEach((b) =>
        b.setAttribute('aria-pressed', String(Number(b.dataset.model) === chapter)),
      );
      document.querySelector('#scene-title')!.textContent = chapter
        ? '02 — SİMÜLASYON DONANIMI'
        : '01 — FPV DRONE';
      document.querySelector('#scene-feature')!.innerHTML = chapter
        ? 'FİZİKSEL KONTROL<br><strong>Uçuşu hisset. Birlikte geliştir.</strong>'
        : 'GÖRSEL ALGILAMA<br><strong>Hedefe yeni bir bakış.</strong>';
    }
  }
  // Çok sayıda scroll olayını tek bir ekran karesinde birleştirir.
  function scheduleFlight() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateFlight);
  }
  window.addEventListener('scroll', scheduleFlight, { passive: true });
  window.addEventListener('resize', scheduleFlight);
  modelButtons.forEach((button) =>
    button.addEventListener('click', () => {
      const headerHeight = document.querySelector<HTMLElement>('.site-header')!.offsetHeight;
      const range = story.offsetHeight - pin.offsetHeight;
      window.scrollTo({
        top:
          story.offsetTop - headerHeight + range * (Number(button.dataset.model) === 1 ? 0.8 : 0),
        behavior: getReducedMotion() ? 'instant' : 'smooth',
      });
    }),
  );
  updateFlight();
  // Ağır 3D kodunu ana sayfa kodundan ayrı yükle; hata durumunda alternatif görseli göster.
  import('./scene')
    .then(({ createFlightScene }) =>
      createFlightScene(
        document.querySelector<HTMLElement>('#flight-canvas')!,
        () => flightProgress,
        getReducedMotion,
      ),
    )
    .catch(() => {
      document.querySelector<HTMLElement>('#flight-canvas')!.hidden = true;
      document.querySelector<HTMLElement>('.scene-fallback')!.hidden = false;
    });

  // Geliştirme sırasında eski kaydırma dinleyicilerini ve bekleyen kareyi temizle.
  if (import.meta.hot)
    import.meta.hot.dispose(() => {
      window.removeEventListener('scroll', scheduleFlight);
      window.removeEventListener('resize', scheduleFlight);
      cancelAnimationFrame(scrollFrame);
    });
}
