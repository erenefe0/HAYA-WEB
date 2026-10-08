// Araştırma ve proje kartlarının içerikleri burada tutulur. Metin değişikliklerinde bu dosyayı düzenleyin.
// no: ayrıntı penceresinin kart kimliği; icon: Lucide ikon adı; tags: kısa konu etiketleri.
export const areas = [
  {
    no: '01',
    icon: 'scan-eye',
    title: 'Yapay zekâ & veri',
    text: 'Derin öğrenme, bilgisayarlı görü ve havacılık veri analizi. Veriden anlam çıkarıyor, yeni araştırma sorularını takip ediyoruz.',
    tags: ['Derin öğrenme', 'Hedef tespiti'],
    detail:
      'Havacılık verilerini makine öğrenmesi yöntemleriyle modelliyor; görüntü işleme, hedef tespiti ve takibi üzerine çalışıyoruz. Farklı algoritmaların performanslarını karşılaştırmak ve sonuçları akademik araştırmaya dönüştürmek çalışma alanlarımız arasında.',
  },
  {
    no: '02',
    icon: 'navigation',
    title: 'Otonom uçuş',
    text: 'Algılamadan karar vermeye, rota planlamadan kontrole. Drone ve İHA teknolojileri için otonom sistemler geliştiriyoruz.',
    tags: ['Drone / İHA', 'Görsel takip'],
    detail:
      'Drone ve İHA sistemlerinde algılama, planlama ve kontrolü birlikte ele alıyoruz. TEKNOFEST FPV Drone İzleme (Tracking) Yarışması kapsamında otonom uçuş, hedef tespiti ve takip sistemleri üzerinde çalışıyoruz.',
  },
  {
    no: '03',
    icon: 'gamepad-2',
    title: 'Uçuş simülasyonu',
    text: 'Kendi yazılımımız, kendi donanımımız. Pilot eğitimine yönelik sanal uçuş ortamları ve fiziksel kontrol sistemleri tasarlıyoruz.',
    tags: ['Unity', 'Yazılım & donanım'],
    detail:
      'İHA pilot eğitimi için Unity tabanlı simülasyon tasarımı ve TB20 eğitim uçakları için uçuş simülatörü geliştirme projeleri yürütüyoruz. Simülasyon yazılımını, kendi geliştirdiğimiz uçuş kontrol donanımlarıyla birlikte düşünüyoruz.',
  },
];
// title alanındaki <br>, başlığın tasarımdaki satır kırılımını belirler.
// className, karta uygulanan CSS görünümünü seçer; code proje/program kodudur.
export const projects = [
  {
    code: '2209-A',
    group: 'OTONOM SİSTEMLER',
    icon: 'monitor',
    title: 'Sanal ortam.<br>Gerçek uçuş deneyimi.',
    text: 'İHA pilot eğitimi için yüksek gerçeklikli, Unity tabanlı uçuş simülasyonu tasarımı.',
    tags: ['Unity tabanlı simülasyon', 'Pilot eğitimi'],
    className: 'project-software',
  },
  {
    code: '2209-B',
    group: 'SİMÜLASYON SİSTEMLERİ',
    icon: 'gamepad-2',
    title: 'Kontrolün her detayında<br>kendi tasarımımız.',
    text: 'TB20 eğitim uçakları için yüksek doğruluklu ve düşük gecikmeli uçuş simülatör sistemi tasarımı ve prototip üretimi. Kendi uçuş simülasyon donanımlarımızı geliştiriyoruz.',
    tags: ['TB20', 'Donanım & prototip'],
    className: 'project-hardware',
  },
  {
    code: 'LİFT-UP',
    group: 'SAVUNMA TEKNOLOJİLERİ',
    icon: 'cpu',
    title: 'Uçuş verisinden<br>yeni içgörülere.',
    text: 'Muharip bir hava aracının performans veri setini farklı makine öğrenmesi yöntemleriyle modelliyor ve karşılaştırıyoruz.',
    tags: ['Makine öğrenmesi', 'Performans analizi'],
    className: 'project-data',
  },
  {
    code: '2242',
    group: 'AKADEMİK PROJELER',
    icon: 'layers',
    title: 'Araştırıyoruz.<br>Bilgiye katkı sunuyoruz.',
    text: 'Yapay zekâ, havacılık ve otonom sistemler alanında yenilikçi araştırma projeleri geliştiriyoruz. Literatür araştırmaları ve akademik makalelerle çalışmalarımızı paylaşıyoruz.',
    tags: ['Bilimsel proje', 'Yayın & araştırma'],
    className: 'project-academic',
  },
];
