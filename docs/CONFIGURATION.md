# Yapılandırma ve içerik

## Katılım formu

Tek yapılandırma alanı `src/site-config.ts` içindeki `siteConfig.joinFormUrl` değeridir:

```ts
export const siteConfig = {
  joinFormUrl: '',
};
```

| Değer | Sayfadaki davranış |
| --- | --- |
| Boş değer | Menüdeki ve içerikteki katılım bağlantıları `#katil` bölümüne gider. Başvuru butonu bekleme durumundadır. |
| Geçerli Google Forms HTTPS adresi | Katılım çağrıları formu yeni sekmede açar. |
| Desteklenmeyen adres | Boş değerle aynı bekleme durumu gösterilir. |

Desteklenen adresler `https://forms.gle/...` ve yolu `/forms/` ile başlayan `https://docs.google.com/forms/...` adresleridir. Form verileri bu site tarafından toplanmaz; başvuru Google Forms üzerinden yapılır.

Bağlantıyı değiştirdikten sonra `npm run build` çalıştırın. Yayımlanmış sitede değişikliğin görünmesi için yeni `dist/` çıktısını yükleyin.

## Sayfa içeriği

| İçerik | Düzenlenecek dosya |
| --- | --- |
| Araştırma alanları ve ayrıntıları | `src/main.ts` → `areas` |
| 2209-A, 2209-B, LİFT-UP ve 2242 projeleri | `src/main.ts` → `projects` |
| TEKNOFEST, topluluk ve iletişim metinleri | `src/main.ts` → ilgili HTML bölümü |
| Başlık ve arama motoru açıklaması | `index.html` |
| Renkler, yazı boyutları ve ekran kırılımları | `src/style.css` |
| 3D modeller, materyaller ve kamera | `src/scene.ts` |

Sayfa bölümlerinin kimlikleri: `hakkimizda`, `arastirmalar`, `projeler`, `topluluk`, `katil`, `iletisim`. Bölüm kimliğini değiştirdiğinizde menü ve içerik bağlantılarını birlikte güncelleyin.

## Logolar ve yazı tipleri

Site, HAYA logosunun WebP türevlerini yükler. PNG kaynaklar `public/` altında, marka kaynakları `docs/branding/` içinde tutulur. ESTÜ'nün yatay logosu masaüstünde, dairesel logosu küçük ekranlarda kullanılır.

DM Sans ve Manrope Google Fonts üzerinden yüklenir. Bağlantı kullanılamadığında CSS'teki sistem yazı tipi alternatifleri devreye girer.

Görsel dosyaları ve kaynaklar için [varlık rehberini](ASSETS.md) inceleyin.
