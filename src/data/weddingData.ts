/**
 * Centralized Wedding Configuration
 * SARIYU WEDS VAMSI
 * 
 * Groom: Kandagatla Vamsi (కందగట్ల వంశీ)
 * Bride: Madas Sariyu (మాడస్ సరియు)
 */

export interface WeddingData {
  brideName: string;
  groomName: string;
  brideSurname: string;
  groomSurname: string;
  brideFullName: string;
  groomFullName: string;
  
  // Telugu specific names and titles
  brideTeluguName: string;
  groomTeluguName: string;
  weddingInvitationTelugu: string;
  welcomeMessageTelugu: string;
  blessingShlokaTelugu: string;
  sacredVowTelugu: string;
  mangalaShlokaTelugu: string;
  
  // Family & Parent details for Groom and Bride
  groomFatherName: string;
  groomMotherName: string;
  groomBlessingText: string;
  brideFatherName: string;
  brideMotherName: string;
  brideBlessingText: string;

  // Section 03 - How We Met Video details
  howWeMetHeading: string;
  howWeMetTeluguCaption: string;
  howWeMetSubtitle: string;
  howWeMetVideo: string;
  howWeMetPoster: string;

  weddingDate: string | null;
  haldiDate: string | null;
  djDate: string | null;
  muhurtamTime: string;
  venue: string;
  venueTelugu: string;
  address: string;
  addressTelugu: string;
  googleMapsUrl: string;
  
  haldiTime: string;
  haldiVenue: string;
  djTime: string;
  djVenue: string;
  weddingTime: string;
  
  // Custom user assets
  assets: {
    heroBackgroundOnly: string;
    groomBrideCutout: string;
    heroDesktop: string;
    coupleWedding: string;
    groom: string;
    bride: string;
    haldiRitual: string;
    groomPhoto: string;
    bridePhoto: string;
  };
  // Story chapters
  story: {
    chapter1Title: string;
    chapter1Quote: string;
    chapter1Photo: string;
    chapter2Title: string;
    chapter2Quote: string;
    chapter2Photo: string;
    chapter3Title: string;
    chapter3Quote: string;
    chapter3Photo: string;
    chapter4Title: string;
    chapter4Quote: string;
    chapter4Photo: string;
  };
}

export const defaultWeddingData: WeddingData = {
  brideName: "Sariyu",
  groomName: "Vamsi",
  brideSurname: "Madas",
  groomSurname: "Kandagatla",
  brideFullName: "Madas Sariyu",
  groomFullName: "Kandagatla Vamsi",

  // Parents' details
  groomFatherName: "Sri Kandagatla Venkateshwarlu",
  groomMotherName: "Smt. Kandagatla Laxmi",
  groomBlessingText: "With the blessings of his family, he begins a beautiful new journey.",
  
  brideFatherName: "Sri Madas Narsimha Rao",
  brideMotherName: "Smt. Madas Sujatha",
  brideBlessingText: "A beautiful soul, surrounded by love and blessings.",

  // How We Met
  howWeMetHeading: "HOW WE MET",
  howWeMetTeluguCaption: "తొలి అడుగు... తొలి పరిచయం...",
  howWeMetSubtitle: "Where our beautiful story began.",
  howWeMetVideo: "/videos/how-we-met.mp4",
  howWeMetPoster: "/src/assets/images/prewedding_portrait_1794328256971.jpg",

  // Authentic Telugu translations
  brideTeluguName: "మాడస్ సరియు",
  groomTeluguName: "కందగట్ల వంశీ",
  weddingInvitationTelugu: "వివాహ ఆహ్వాన పత్రిక",
  welcomeMessageTelugu: "మా వివాహ వేడుకకు మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము",
  blessingShlokaTelugu: "|| శ్రీ గణేశాయ నమః || శ్రీ లక్ష్మీ వేంకటేశ్వర స్వామి ఆశీస్సులతో ||",
  sacredVowTelugu: "|| యదేతద్ధృదయం తవ తదస్తు హృదయం మమ ||",
  mangalaShlokaTelugu: "|| శుభమస్తు · అవిఘ్నమస్తు · కళ్యాణమస్తు ||",

  weddingDate: null,
  haldiDate: null,
  djDate: null,
  muhurtamTime: "",
  venue: "",
  venueTelugu: "రాయల్ కళ్యాణ మండపం",
  address: "",
  addressTelugu: "తెలంగాణ, భారతదేశం",
  googleMapsUrl: "",

  haldiTime: "ఉదయం 08:30 గంటలకు",
  haldiVenue: "వధువు మరియు వరుని నివాసము",
  djTime: "సాయంత్రం 07:00 గంటలకు",
  djVenue: "సంగీత్ & వేడుక మందిరం",
  weddingTime: "ఉదయం సుముహూర్తం",

  assets: {
    heroBackgroundOnly: "/assets/aistudio/Hero-backgroun-desktop_01c1bf7e.png",
    groomBrideCutout: "/assets/aistudio/Groom-Bride_ad3f7ffc.png",
    heroDesktop: "/assets/aistudio/Hero-desktop_9debb60e.png",
    coupleWedding: "/assets/aistudio/bride-Groom_a6325de4.png",
    groom: "/images/groom.jpg",
    bride: "/images/bride.jpg",
    groomPhoto: "/images/groom.jpg",
    bridePhoto: "/images/bride.jpg",
    haldiRitual: "/assets/aistudio/image_2d7d7453.png",
  },

  story: {
    chapter1Title: "OUR FIRST MEET",
    chapter1Quote: "Some meetings are written in destiny. Ours became the beginning of something beautiful.",
    chapter1Photo: "/src/assets/images/first_meet_portrait_1794328262158.jpg",
    chapter2Title: "OUR JOURNEY",
    chapter2Quote: "From little conversations to countless memories, every moment brought us closer.",
    chapter2Photo: "/src/assets/images/prewedding_portrait_1794328256971.jpg",
    chapter3Title: "OUR ENGAGEMENT",
    chapter3Quote: "A beautiful promise celebrated with happiness and the blessings of our families.",
    chapter3Photo: "/src/assets/images/engagement_portrait_1794328261196.jpg",
    chapter4Title: "PRE-WEDDING MEMORIES",
    chapter4Quote: "Capturing the beautiful moments before our forever begins.",
    chapter4Photo: "/src/assets/images/wedding_venue_palace_1794328262688.jpg",
  },
};
