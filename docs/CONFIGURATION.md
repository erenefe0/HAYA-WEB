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
| Araştırma alanları ve ayrıntıları | `src/content.ts` → `areas` |
| 2209-A, 2209-B, LİFT-UP ve 2242 projeleri | `src/content.ts` → `projects` |
| TEKNOFEST, topluluk ve iletişim metinleri | `src/page.ts` → ilgili HTML bölümü |
| Başlık ve arama motoru açıklaması | `index.html` |
| Renkler, yazı boyutları ve ekran kırılımları | `src/style.css` |
| 3D modeller, materyaller ve kamera | `src/models/` ve `src/scene.ts` |

Sayfa bölümlerinin kimlikleri: `hakkimizda`, `arastirmalar`, `projeler`, `topluluk`, `katil`, `iletisim`. Bölüm kimliğini değiştirdiğinizde menü ve içerik bağlantılarını birlikte güncelleyin.

### Araştırma kartı eklemek

`src/content.ts` içindeki `areas` listesine aynı yapıda bir kayıt ekleyin:

```ts
{
  no: '04',                         // Benzersiz kart ve pencere kimliği.
  icon: 'cpu',                      // Lucide ikon adı.
  title: 'Yeni araştırma alanı',     // Kart ve pencere başlığı.
  text: 'Kartta görünen kısa özet.',
  tags: ['Konu', 'Yöntem'],          // Kısa etiketler.
  detail: 'Ayrıntı penceresinde görünen açıklama.',
}
```

Şablon ve ayrıntı penceresi bu listeyi birlikte kullanır. Yeni ikon kullanırsanız `interactions.ts` içindeki Lucide importunu ve `refreshIcons()` haritasını da güncelleyin. Kart sayısı arttığında mobil ve masaüstü yerleşimlerini kontrol edin.

### Proje kartı eklemek

`projects` kayıtlarında `code` program kodu, `group` çalışma grubu, `icon` ikon adı, `title` başlık, `text` açıklama, `tags` etiketler ve `className` CSS görünümüdür. Başlıktaki `<br>` satır kırılımı sağlar. `className` için var olan proje sınıflarından uygun olanı seçin veya `style.css` içinde yeni bir görünüm tanımlayın.

TEKNOFEST tanıtımı ayrı bir bölüm olduğundan `projects` listesine bağlı değildir; `page.ts` içindeki `.tracking-project` bölümünü düzenleyin. Danışman, sorumlu ve adres bilgileri aynı dosyadaki `#iletisim` bölümündedir. İçerikleri güncellerken topluluğun onayladığı bilgileri kullanın.

### Metin güvenliği

Bu veriler geliştirici tarafından depoda düzenlenen içeriktir ve HTML şablonuna yerleştirilir. Kullanıcının yazdığı veya uzak bir kaynaktan alınan metinleri doğrudan bu alanlara bağlamayın. Böyle bir entegrasyon için metinleri `textContent` ile yazmak veya HTML temizleme katmanı eklemek gerekir.

## Logolar ve yazı tipleri

Site, HAYA logosunun WebP türevlerini yükler. PNG kaynaklar `public/` altında, marka kaynakları `docs/branding/` içinde tutulur. ESTÜ'nün yatay logosu masaüstünde, dairesel logosu küçük ekranlarda kullanılır.

DM Sans ve Manrope Google Fonts üzerinden yüklenir. Bağlantı kullanılamadığında CSS'teki sistem yazı tipi alternatifleri devreye girer.

Görsel dosyaları ve kaynaklar için [varlık rehberini](ASSETS.md) inceleyin.
