import { siteConfig } from './site-config';

// Sayfa ve ayrıntı penceresi tarafından paylaşılan küçük HTML yardımcıları.
export const icon = (name: string) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
export const colors = `<span class="brand-colors" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
export const logo = `<img src="/haya-logo-v2.webp" width="806" height="990" alt="HAYA topluluğu logosu">`;
// Yalnızca HTTPS üzerinden açılan Google Forms adreslerini kabul eder.
// Boş veya geçersiz adreslerde katılım bölümüne yönlendirme kullanılır.
function getJoinUrl() {
  if (!siteConfig.joinFormUrl.trim()) return '';
  try {
    const url = new URL(siteConfig.joinFormUrl);
    return url.protocol === 'https:' &&
      (url.hostname === 'forms.gle' ||
        (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')))
      ? url.href
      : '';
  } catch {
    return '';
  }
}
export const joinUrl = getJoinUrl();
export const joinLink = (label: string, classes = 'button button-dark') =>
  `<a class="${classes}" href="${joinUrl || '#katil'}" ${joinUrl ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label} ${icon('arrow-up-right')}${joinUrl ? '<span class="sr-only"> (Google Forms, yeni sekmede açılır)</span>' : ''}</a>`;
