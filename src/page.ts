import { areas, projects } from './content';
import { icon, colors, logo, joinUrl, joinLink } from './ui';

// Sayfa iskeleti: bölüm sırası ve tanıtım metinleri bu şablonda düzenlenir.
export function renderPage() {
  return /* HTML */ `
    <header class="site-header">
      <a class="brand" href="#" aria-label="HAYA ana sayfa"
        >${logo}<span>HAVACILIKTA YAPAY ZEKÂ<br />ARAŞTIRMALARI TOPLULUĞU</span></a
      >
      <nav class="desktop-nav" aria-label="Ana menü">
        <a href="#hakkimizda">HAYA'yı tanı</a><a href="#projeler">Projelerimiz</a
        ><a href="#topluluk">Topluluk</a><a href="#iletisim">İletişim</a>
      </nav>
      ${joinLink('Bize katıl', 'header-cta')}
      <a
        class="university-identity"
        href="https://www.eskisehir.edu.tr/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Eskişehir Teknik Üniversitesi (yeni sekmede açılır)"
        ><picture
          ><source
            media="(max-width: 600px)"
            srcset="/estu-logo-circular.svg"
            width="477"
            height="477" />
          <img
            src="/estu-logo-horizontal.svg"
            width="978"
            height="246"
            alt="Eskişehir Teknik Üniversitesi resmî logosu" /></picture
      ></a>
      <button
        class="menu-button"
        aria-label="Menüyü aç"
        aria-expanded="false"
        aria-controls="mobile-nav"
      >
        ${icon('menu')}
      </button>
      <nav id="mobile-nav" class="mobile-nav" aria-label="Mobil menü" hidden>
        <a href="#hakkimizda">HAYA'yı tanı</a><a href="#projeler">Projelerimiz</a
        ><a href="#topluluk">Topluluk</a
        ><a href="#iletisim">İletişim</a>${joinLink('Bize katıl', 'mobile-join')}
      </nav>
    </header>
    <main id="main-content">
      <section class="flight-story" aria-label="HAYA: otonom uçuştan simülasyona">
        <div class="flight-pin">
          <div class="hero-grid" aria-hidden="true"></div>
          <div class="hero-copy hero-copy-first">
            <div class="eyebrow">${colors} ESKİŞEHİR TEKNİK ÜNİVERSİTESİ</div>
            <h1>Gökyüzünün<br />geleceğini<br /><em>birlikte</em><br />tasarlıyoruz.</h1>
            <p>
              Yapay zekâ, otonom uçuş ve simülasyon.<br />Merakla araştırıyor, özenle üretiyoruz.
            </p>
            <div class="hero-actions">
              <a class="button button-white" href="#projeler"
                >Projelerimizi keşfet ${icon('arrow-up-right')}</a
              ><a class="text-link" href="#hakkimizda">HAYA'yı tanı ${icon('arrow-down')}</a>
            </div>
          </div>
          <div class="hero-copy hero-copy-second" aria-hidden="true" inert>
            <div class="eyebrow">${colors} YAZILIMDAN DONANIMA</div>
            <h2>Uçuşun<br /><em>hissini de</em><br />biz geliştiriyoruz.</h2>
            <p>
              Uçuş simülasyon yazılımlarımızı, kendi tasarladığımız fiziksel kontrol donanımlarıyla
              buluşturuyoruz.
            </p>
            <a class="button button-white" href="#projeler"
              >Simülasyon projelerimiz ${icon('arrow-up-right')}</a
            >
          </div>
          <div class="flight-visual">
            <div class="scene-orbit" aria-hidden="true"></div>
            <div class="scene-topline">
              <span>HAYA / ARAŞTIRMA ATÖLYESİ</span>
            </div>
            <div
              id="flight-canvas"
              role="img"
              aria-label="Kaydırma ile dönüşen üç boyutlu FPV drone ve uçuş simülasyonu kontrol donanımı"
            ></div>
            <div class="scene-fallback" hidden>
              <img src="/haya-symbol-v2.webp" width="805" height="790" alt="" />
              <p>Otonom uçuştan simülasyona.</p>
            </div>
            <div class="scene-annotation">
              <span class="annotation-line"></span
              ><span id="scene-feature"
                >GÖRSEL ALGILAMA<br /><strong>Hedefe yeni bir bakış.</strong></span
              >
            </div>
            <div class="scene-caption">
              <span id="scene-title">01 — FPV DRONE</span><span>KONSEPT GÖRÜNÜM</span>
            </div>
          </div>
          <div class="hero-bottom">
            <span class="scroll-hint"
              >${icon('arrow-down')} KAYDIR. BİR SONRAKİ PERSPEKTİFİ KEŞFET.</span
            >
            <div class="model-controls" aria-label="3D sahne bölümleri">
              <button data-model="0" aria-pressed="true">01 <span>FPV drone</span></button
              ><span class="model-divider">/</span
              ><button data-model="1" aria-pressed="false">
                02 <span>Simülasyon donanımı</span>
              </button>
            </div>
            <span class="hero-coordinate">ESTÜ · İKİ EYLÜL KAMPÜSÜ</span>
          </div>
          <div class="flight-progress" aria-hidden="true"><span></span></div>
        </div>
      </section>
      <section class="about section-pad" id="hakkimizda">
        <div class="section-top reveal">
          <span class="eyebrow">01 / HAYA'YI TANI</span
          ><span class="section-note">2022 — GÜNÜMÜZ</span>
        </div>
        <div class="about-grid">
          <div class="about-title reveal">
            <h2>Hayâ sahibi olarak<br /><em>geleceğe kanat veriyoruz.</em></h2>
            <div class="about-logo">${logo}${colors}</div>
          </div>
          <div class="about-copy reveal">
            <p class="lead">Havacılığın sorularına,<br />yapay zekânın olanaklarıyla bakıyoruz.</p>
            <p>
              Eskişehir Teknik Üniversitesi'nde yapay zekâ ve havacılık teknolojilerini
              birleştirerek otonom sistemler ve savunma sanayii üzerine yenilikçi Ar-Ge çalışmaları
              yürüten bir topluluğuz.
            </p>
            <p>Merakla araştırıyor, yapay zekâyla geliştiriyor, birlikte yükseliyoruz.</p>
            <div class="vision-note">
              ${icon('move-up-right')}
              <p>
                Vizyonumuz, Türkiye'nin savunma ve sivil havacılık sektörüne yapay zekâ ve havacılık
                teknolojileriyle katkı sağlamak.
              </p>
            </div>
          </div>
        </div>
        <div class="research-heading reveal" id="arastirmalar">
          <span class="eyebrow">ÇALIŞMA ALANLARIMIZ</span>
          <p>Fikirden algoritmaya. Algoritmadan uçuşa.</p>
        </div>
        <div class="research-cards">
          ${areas.map((a) => `<button class="research-card reveal" data-area="${a.no}" aria-label="${a.title} hakkında bilgi"><div class="card-top"><span class="card-number">${a.no}</span>${icon(a.icon)}</div><h3>${a.title}</h3><p>${a.text}</p><div class="card-footer"><span>${a.tags.join(' · ')}</span><span class="card-more">${icon('plus')}</span></div></button>`).join('')}
        </div>
      </section>
      <section class="projects section-pad" id="projeler">
        <div class="section-top reveal">
          <span class="eyebrow">02 / 2026 PROJE TAKVİMİ</span>${colors}
        </div>
        <div class="section-heading reveal">
          <h2>Bir fikrin<br /><em>uçuşa geçtiği yer.</em></h2>
          <p>
            Simülasyonda deniyor, donanımda geliştiriyor,<br class="desktop-break" />
            araştırmalarımızı sahaya taşıyoruz.
          </p>
        </div>
        <article class="tracking-project reveal">
          <div class="tracking-copy">
            <span class="project-kicker">TEKNOFEST / OTONOM SİSTEMLER</span>
            <h3>Hedef hareket ediyor.<br /><em>Biz takip ediyoruz.</em></h3>
            <p>
              FPV Drone İzleme (Tracking) Yarışması'na katılıyoruz. Yüksek hızlı ve çevik dronlar
              için otonom uçuş, hedef tespiti ve takip sistemleri geliştiriyoruz.
            </p>
            <p class="tracking-context">
              GNSS kullanmadan, görüntü işleme ve otonom kontrol ile hareketli hedef drone'un
              takibi.
            </p>
            <a
              class="text-link"
              href="https://teknofest.org/tr/yarismalar/fpv-drone-izleme-tracking-yarismasi/"
              target="_blank"
              rel="noopener noreferrer"
              >Resmî yarışma sayfası ${icon('arrow-up-right')}<span class="sr-only">
                (yeni sekmede açılır)</span
              ></a
            >
          </div>
          <div class="tracking-visual" aria-label="Görsel hedef takibini temsil eden drone çizimi">
            <div class="tracking-grid"></div>
            <svg class="tracking-drone" viewBox="0 0 420 330" fill="none" aria-hidden="true">
              <g stroke="#8397c2" stroke-width="2">
                <path
                  d="m151 122-64-49M269 122l64-49M151 205l-64 48M269 205l64 48"
                  stroke-width="18"
                  stroke-linecap="round"
                />
                <circle cx="78" cy="66" r="45" />
                <circle cx="342" cy="66" r="45" />
                <circle cx="78" cy="263" r="45" />
                <circle cx="342" cy="263" r="45" />
              </g>
              <g fill="#405477" stroke="#aebce2" stroke-width="2">
                <path d="m158 102 103 0 26 61-26 65H158l-26-65 26-61Z" />
                <rect x="181" y="122" width="58" height="87" rx="12" fill="#192b4c" />
                <circle cx="210" cy="163" r="16" fill="#07182d" />
              </g>
              <g stroke="#fff" stroke-width="2">
                <path d="M126 116V94h22m124 0h22v22m0 94v22h-22m-124 0h-22v-22" />
                <path d="M201 163h18m-9-9v18" />
              </g></svg
            ><span class="tracking-label">GÖRÜNTÜ → ALGILAMA → TAKİP</span
            ><span class="tracking-corner">FPV / TRACKING</span>
          </div>
        </article>
        <div class="project-grid">
          ${projects.map((p) => `<article class="project-card ${p.className} reveal"><div class="project-top"><span class="project-code">${p.code}</span>${icon(p.icon)}</div><span class="project-kicker">${p.group}</span><h3>${p.title}</h3><p>${p.text}</p><div class="project-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div></article>`).join('')}
        </div>
        <div class="project-endnote reveal">
          <span>${icon('code')} Yazılımı da donanımı da birlikte tasarlıyoruz.</span
          ><a href="#iletisim">Çalışmalarımız hakkında iletişime geç ${icon('arrow-up-right')}</a>
        </div>
      </section>
      <section class="community section-pad" id="topluluk">
        <div class="community-heading reveal">
          <span class="eyebrow">03 / ORTAK MERAK, ORTAK EMEK</span>
          <h2>Farklı disiplinler.<br /><em>Aynı gökyüzü.</em></h2>
          <p>Birlikte öğrenen, bilgisini paylaşan, fikrini projeye dönüştüren bir topluluk.</p>
          ${joinLink('Sen de aramıza katıl', 'button button-white')}
          <div class="community-mark" aria-hidden="true">HAYA<span>×</span>ESTÜ</div>
        </div>
        <div class="community-list">
          <article class="community-item reveal">
            <span>01</span>
            <div>
              <h3>Deneyerek öğreniyoruz.</h3>
              <p>
                Workshop ve hackathonlarla teknik bilgiyi uygulamaya dönüştürüyor, bilimsel
                projelerimizi birlikte geliştiriyoruz.
              </p>
              <span class="community-tags">WORKSHOP · HACKATHON · PROJE</span>
            </div>
            ${icon('code')}
          </article>
          <article class="community-item reveal">
            <span>02</span>
            <div>
              <h3>Deneyimden güç alıyoruz.</h3>
              <p>
                Sektör profesyonelleriyle buluşmalar, seminerler ve mentörlük programlarıyla yeni
                bakış açıları kazanıyoruz.
              </p>
              <span class="community-tags">SEMİNER · SEKTÖREL MENTÖRLÜK</span>
            </div>
            ${icon('users')}
          </article>
          <article class="community-item reveal">
            <span>03</span>
            <div>
              <h3>Araştırmayı paylaşıyoruz.</h3>
              <p>
                Otonom uçuştan havacılık veri analizine; akademik araştırmalar, yayınlar ve
                makalelerle bilgi üretiyoruz.
              </p>
              <span class="community-tags">LİTERATÜR · YAYIN · ARAŞTIRMA</span>
            </div>
            ${icon('layers')}
          </article>
        </div>
      </section>
      <section class="join section-pad" id="katil">
        <div class="join-symbol" aria-hidden="true">
          <img src="/haya-symbol-v2.webp" width="217" height="211" alt="" loading="lazy" />
        </div>
        <div class="eyebrow reveal">04 / SIRADAKİ FİKİR SENİN OLABİLİR</div>
        <h2 class="reveal">Merakın varsa,<br /><em>yerin burada.</em></h2>
        <div class="join-bottom reveal">
          <div>
            <p>
              Mühendislik, Havacılık ve Uzay Bilimleri, Fen, Bilişim / Bilgisayar Bilimleri
              fakültelerinden ve farklı disiplinlerden; yapay zekâ ve havacılığa ilgi duyan herkese
              kapımız açık.
            </p>
            <span>Öğrenmeye, araştırmaya ve projelere katkı sunmaya birlikte başlayalım.</span>
          </div>
          <div class="join-action">
            ${joinUrl ? joinLink('HAYA’ya katıl') : `<button class="button button-dark" disabled>Katılım formu yakında ${icon('arrow-up-right')}</button><p>Başvuru bağlantısı burada paylaşılacak.</p>`}
          </div>
        </div>
      </section>
      <section class="contact section-pad" id="iletisim">
        <div class="section-top reveal">
          <span class="eyebrow">05 / İLETİŞİM</span
          ><span class="section-note">Fikirler buluşunca yükselir.</span>
        </div>
        <div class="contact-grid">
          <div class="contact-main reveal">
            <h2>Tanışalım.<br /><em>Birlikte düşünelim.</em></h2>
            <a class="contact-email" href="mailto:azizkaba@eskisehir.edu.tr"
              >${icon('mail')} azizkaba@eskisehir.edu.tr ${icon('arrow-up-right')}</a
            >
            <div class="contact-address">
              ${icon('map-pin')}
              <p>
                Eskişehir Teknik Üniversitesi<br />İki Eylül Kampüsü<br />Havacılık ve Uzay
                Bilimleri Fakültesi / E Blok
              </p>
            </div>
          </div>
          <div class="team-list reveal">
            <div>
              <span>DANIŞMAN</span>
              <h3>Doç. Dr. Aziz KABA</h3>
              <p>Eskişehir Teknik Üniversitesi · Pilotaj Bölümü</p>
            </div>
            <div>
              <span>LAB TEKNİK SORUMLUSU</span>
              <h3>Arş. Gör. Onur Güney</h3>
            </div>
            <div>
              <span>LİSANS SORUMLUSU</span>
              <h3>Tayfun Yılmaz</h3>
            </div>
            <div>
              <span>İLETİŞİM SORUMLUSU</span>
              <h3>Arş. Gör. Oktay Mayruk</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div class="footer-main">
        <a class="brand footer-brand" href="#" aria-label="Sayfa başına dön"
          >${logo}<span>HAVACILIKTA YAPAY ZEKÂ<br />ARAŞTIRMALARI TOPLULUĞU</span></a
        ><a
          class="university-footer"
          href="https://www.eskisehir.edu.tr/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Eskişehir Teknik Üniversitesi (yeni sekmede açılır)"
          ><img
            src="/estu-logo-horizontal.svg"
            width="978"
            height="246"
            alt="Eskişehir Teknik Üniversitesi resmî logosu"
            loading="lazy" /></a
        ><a class="back-top" href="#" aria-label="Başa dön">${icon('arrow-up-right')}</a>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} HAYA · ESTÜ</span
        ><span>Merakla araştır. Özenle üret. Birlikte yüksel.</span
        ><button class="motion-toggle" aria-pressed="false">
          ${icon('orbit')} <span>Hareketi azalt</span>
        </button>
      </div>
      ${colors}
    </footer>
    <dialog class="detail-dialog" id="area-dialog" aria-label="Araştırma alanı ayrıntıları">
      <button class="dialog-close" aria-label="Pencereyi kapat">${icon('x')}</button>
      <div id="area-content"></div>
    </dialog>
  `;
}
