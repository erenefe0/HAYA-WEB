# Katkı rehberi

HAYA Web üzerindeki geliştirmeleri küçük, amacı açık değişiklikler halinde gönderin. Hata bildirimleri ve yeni özellik önerileri için GitHub Issues şablonlarını kullanabilirsiniz.

## Çalışma akışı

1. Depoyu klonlayın ve `npm ci` ile bağımlılıkları kurun.
2. Değişikliğinizi `feature/mobil-menu` gibi açıklayıcı bir dalda hazırlayın.
3. `npm run dev` ile ilgili kullanıcı akışını tarayıcıda inceleyin.
4. `npm run format`, `npm run format:check` ve `npm run build` ile biçimi, TypeScript kontrolünü ve üretim derlemesini doğrulayın.
5. `main` dalına bir pull request açın; problemi, değişikliği ve yaptığınız kontrolleri açıklayın.

## Kod ve içerik

- Mevcut TypeScript, CSS ve HTML yapısını izleyin. Yeni bağımlılık eklerken neden gerekli olduğunu açıklayın.
- Modül sorumluluklarını koruyun: içerik `content.ts`, şablon `page.ts`, etkileşimler `interactions.ts`, 3D modeller `models/` altındadır. [Geliştirici rehberi](docs/DEVELOPMENT.md) akışı açıklar.
- Anlaşılması zor kararları Türkçe yorumlarla açıklayın; yalnızca kodu tekrar eden yorumlar eklemeyin.
- Form bağlantısını `src/site-config.ts` üzerinden yönetin; aynı adresi farklı yerlere kopyalamayın.
- Proje, yarışma ve ekip bilgilerini topluluğun doğruladığı kaynaklarla güncelleyin.
- ESTÜ logosunun oranlarını ve renklerini koruyun. Marka kaynakları `docs/branding/` içindedir.
- Hareket içeren değişikliklerde azaltılmış hareket tercihini ve sahnenin ekran dışında durmasını koruyun.
- Geniş kapsamlı tasarım değişikliklerinde masaüstü ve mobil önizleme ekleyin.

## Doğrulama

Değişikliğinizle ilgili kontrolleri seçin: mobil menü, bölüm bağlantıları, araştırma pencerelerinin açılıp kapanması, katılım bağlantısı, 3D sahne geçişi veya azaltılmış hareket tercihi. `npm run build` sonucunu ve varsa bilinen sınırlamayı pull request açıklamasına yazın.

Üretim çıktısı, bağımlılık klasörleri ve yerel deneme dosyaları depoya eklenmez. Dokümantasyon ekran görüntülerini `docs/screenshots/` altında tutun.
