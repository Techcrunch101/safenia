import beardGrooming from './safenia_beard_grooming_1787295352369.jpg';
import darkHeroBg from './safenia_dark_hero_bg_1787788259317.jpg';
import darkPhilosophy from './safenia_dark_philosophy_1787788278268.jpg';
import emeraldBotanicalHero from './safenia_emerald_botanical_hero_1787295575998.jpg';
import goldLogo from './safenia_gold_logo_1787334718432.jpg';
import growthAfro from './safenia_growth_afro_1787295304984.jpg';
import heroBottle from './safenia_hero_bottle_1785599770184.jpg';
import locCareGold from './safenia_loc_care_gold_1787295319757.jpg';
import officialLogoPrimary from './safenia_official_logo_1787293412342.jpg';
import officialLogoSecondary from './safenia_official_logo_1787739602613.jpg';
import productBoxes from './safenia_product_boxes_1785599787566.jpg';
import scalpPipettePrimary from './safenia_scalp_pipette_1787295337432.jpg';
import scalpPipetteSecondary from './safenia_scalp_pipette_1787788293314.jpg';
import serenAesthetic from './safenia_seren_aesthetic_1785599818225.jpg';
import serenWarmHero from './safenia_seren_warm_hero_1787295590207.jpg';
import silkInspo from './safenia_silk_inspo_1785599801373.jpg';

export const SAFENIA_IMAGES = {
  beardGrooming,
  darkHeroBg,
  darkPhilosophy,
  emeraldBotanicalHero,
  goldLogo,
  growthAfro,
  heroBottle,
  locCareGold,
  officialLogo: officialLogoSecondary,
  officialLogoPrimary,
  officialLogoSecondary,
  productBoxes,
  scalpPipette: scalpPipettePrimary,
  scalpPipettePrimary,
  scalpPipetteSecondary,
  serenAesthetic,
  serenWarmHero,
  silkInspo,
  // Semantic aliases for reliable UI references
  founderPortrait: serenAesthetic,
  roseInfusion: serenWarmHero,
} as const;

export default SAFENIA_IMAGES;
