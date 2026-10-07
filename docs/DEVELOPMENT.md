# Geliştirici rehberi

## Kurulum

Node.js 22.12 veya üzeri kullanın. `.nvmrc` Node.js 24'ü belirtir. Bağımlılık sürümlerini sabitleyen `package-lock.json` depoya dahildir.

```sh
npm ci
npm run dev
```

PowerShell `npm.ps1` çalıştırılmasını engelliyorsa aynı komutların `npm.cmd ci`, `npm.cmd run dev` ve `npm.cmd run build` biçimlerini kullanabilirsiniz.

Geliştirme sunucusu varsayılan olarak `127.0.0.1:5173` üzerinde çalışır. Belirli bir portu zorunlu tutmak için:

```sh
npm run dev -- --port 5173 --strictPort
```

## Uygulama akışı

`src/main.ts` sayfa içeriğini oluşturur; gezinme, mobil menü, araştırma pencereleri, katılım bağlantıları ve hareket tercihini yönetir. 3D sahne ayrı bir dinamik import ile yüklenir.

`src/scene.ts`, Three.js geometrilerinden FPV drone ve uçuş simülasyonu kumandalarını oluşturur. Modeller ve materyaller yereldir; uzaktan model dosyası indirilmez. Sahne yalnızca tanıtım için kavramsal bir görseldir.

Kaydırma ilerlemesi iki sahne arasında geçiş sağlar. Kullanıcı sahne düğmeleriyle ilgili kaydırma noktasına gidebilir. İşaretçi hareketi küçük perspektif değişiklikleri oluşturur.

## Hareket ve performans

- Sahne ekran dışında veya sekme gizliyken çizim durur.
- Küçük ekranlarda kare hızı yaklaşık 30 FPS ile sınırlandırılır.
- Piksel oranı en fazla 1.75 olur.
- `prefers-reduced-motion` tercihi ve altbilgideki hareket kontrolü desteklenir.
- WebGL başlatılamadığında veya bağlam kaybolduğunda alternatif görünüm gösterilir.
- Sayfa kapanırken ve geliştirme modülünün yaşam döngüsü sonlanırken 3D kaynaklar temizlenir.

## Değişikliği doğrulama

```sh
npm run build
```

Bu komut TypeScript kontrolünü ve Vite üretim derlemesini çalıştırır. Derleme başarılı olsa da Three.js sahne paketi için boyut uyarısı görülebilir; sahne ana uygulamadan ayrı yüklenir.

Arayüz değişikliklerini tarayıcıda ilgili akışla inceleyin. Masaüstü ve mobil yerleşimlerde yatay taşma, sabit üst menü ve bölüm bağlantılarını kontrol edin. Etkilenen alanlara göre mobil menü, araştırma pencereleri, katılım formu yönlendirmesi, sahne seçimi ve azaltılmış hareket davranışını doğrulayın.

## Yayınlama

```sh
npm run build
npm run preview
```

`npm run preview`, üretilen `dist/` çıktısını yerelde sunar. Üretim ortamına `dist/` klasörünün içeriğini yükleyin. Uygulama için ayrı bir sunucu uygulaması veya veritabanı gerekmez.

### Kök dizin

Alan adı kökünde yayınlama mevcut yapılandırmayla desteklenir. `index.html`, üretilen `assets/` klasörü ve `public/` kaynaklarından kopyalanan logolar birlikte sunulmalıdır.

### Alt yol ve GitHub Pages

Bir proje sayfası `/HAYA-WEB/` altında sunulacaksa Vite'ın `base` ayarını bu yola göre yapılandırın. `src/main.ts` ve `index.html` içindeki `/haya-...`, `/estu-...` ve `/favicon.png` gibi kökten başlayan görsel yollarını da aynı tabana göre düzenleyin. Yalnızca `base` ayarını değiştirmek görsel yollarını düzeltmez.

Bu depoda otomatik yayınlama iş akışı tanımlanmamıştır. Statik barındırma seçildiğinde ilgili platformun yükleme adımları ayrıca yapılandırılabilir.
