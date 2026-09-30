import type { Language } from './content'

type DesignCopy = {
  heroStart: string; heroEnd: string;
  scroll: string;
  galleryHeading: string;
  countryLabel: string; teamIntro: string; contactEyebrow: string;
  geographyEyebrow: string; teamEyebrow: string;
}

export const designCopy: Record<Language, DesignCopy> = {
  ru: {
    heroStart: 'Соединяем страны', heroEnd: 'через лёд',
    scroll: 'Знакомьтесь с фондом',
    galleryHeading: 'Матчи и тренировки',
    countryLabel: 'Страны сотрудничества', teamIntro: 'Люди, которые знают спорт изнутри.', contactEyebrow: 'Сотрудничество',
    geographyEyebrow: 'ISEF WORLDWIDE', teamEyebrow: 'ISEF TEAM',
  },
  en: {
    heroStart: 'Connecting countries', heroEnd: 'through ice',
    scroll: 'Discover the foundation',
    galleryHeading: 'Games and training',
    countryLabel: 'Partner countries', teamIntro: 'People who know sport first-hand.', contactEyebrow: 'Partnerships',
    geographyEyebrow: 'ISEF WORLDWIDE', teamEyebrow: 'ISEF TEAM',
  },
  es: {
    heroStart: 'Unimos países', heroEnd: 'a través del hielo',
    scroll: 'Descubre la fundación',
    galleryHeading: 'Partidos y entrenamientos',
    countryLabel: 'Países colaboradores', teamIntro: 'Personas que conocen el deporte desde dentro.', contactEyebrow: 'Colaboración',
    geographyEyebrow: 'ISEF EN EL MUNDO', teamEyebrow: 'EQUIPO ISEF',
  },
}
