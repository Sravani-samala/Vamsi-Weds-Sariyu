import mandapamOpeningImg from '../assets/images/mandapam_agni_opening_1794581213876.jpg';
import venueShowcaseImg from '../assets/images/wedding_venue_palace_1794328262688.jpg';
import mandapamFinaleImg from '../assets/images/mandapam_twilight_finale_1794581214103.jpg';

/**
 * Centralized Configuration for the South Indian Wedding Section
 * Edit the venue name, Muhurtam timing, address, Google Maps URL,
 * and Jilakara Bellam image path below in one place.
 */

export interface WeddingSectionConfig {
  /** Exact wedding date in YYYY-MM-DD (Asia/Kolkata) */
  targetDateISO: string;
  /** Muhurtam target time in 24h HH:MM:SS (Asia/Kolkata, +05:30) used by the live countdown */
  targetTimeIST24h: string;
  /** Formatted Save the Date display */
  saveTheDateDisplay: {
    day: string;
    month: string;
    year: string;
  };
  /** Full formatted date line */
  fullDateDisplay: string;
  /** Editable Muhurtam timing text shown in Venue details */
  muhurtamTimePlaceholder: string;
  /** Editable Venue Name placeholder */
  venueNamePlaceholder: string;
  /** Editable Complete Venue Address placeholder */
  venueAddressPlaceholder: string;
  /**
   * Editable Google Maps URL for "VIEW ON GOOGLE MAPS".
   * Replace with your exact Google Maps share link (e.g. "https://maps.app.goo.gl/...").
   */
  googleMapsUrl: string;
  /**
   * Path to your uploaded Jilakara Bellam ritual image (e.g. "/images/jilakara-bellam.jpg").
   * Leave empty until uploaded to render a clean, minimal framed placeholder.
   */
  jilakaraBellamImage: string;
  /** Mandapam & Sacred Agni opening image */
  mandapamOpeningImage: string;
  /** Traditional venue showcase image */
  venueShowcaseImage: string;
  /** Mandapam twilight finale image for Thank You screen */
  mandapamFinaleImage: string;
}

export const WEDDING_SECTION_CONFIG: WeddingSectionConfig = {
  targetDateISO: '2026-11-26',
  targetTimeIST24h: '09:00:00',

  saveTheDateDisplay: {
    day: '26',
    month: 'NOV',
    year: '2026',
  },
  fullDateDisplay: '26 NOVEMBER 2026',

  // =========================================================================
  // EDITABLE EVENT DETAILS — Replace placeholders when details are finalized
  // =========================================================================
  muhurtamTimePlaceholder: 'Muhurtam timing to be announced',
  venueNamePlaceholder: 'Wedding venue name to be announced',
  venueAddressPlaceholder: 'Complete venue address to be announced',
  googleMapsUrl: '',

  // =========================================================================
  // JILAKARA BELLAM IMAGE — Paste your uploaded Jilakara Bellam image path
  // =========================================================================
  jilakaraBellamImage: '/assets/aistudio/image_57498358.png',

  // Mandapam & Venue Imagery
  mandapamOpeningImage: mandapamOpeningImg,
  venueShowcaseImage: venueShowcaseImg,
  mandapamFinaleImage: mandapamFinaleImg,
};
