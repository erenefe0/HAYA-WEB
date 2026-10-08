import './style.css';
import { renderPage } from './page';
import { initializeInteractions } from './interactions';
import { initializeFlightStory } from './flight-story';

// Başlatma sırası önemlidir: olay dinleyicileri bağlanmadan önce sayfa oluşturulur.
document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderPage();
const getReducedMotion = initializeInteractions();
initializeFlightStory(getReducedMotion);
