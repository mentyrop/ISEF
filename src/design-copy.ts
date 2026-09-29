import type { Language } from './content'

type DesignCopy = {
  heroStart: string; heroEnd: string;
  scroll: string;
  galleryHeading: string;
  countryLabel: string; teamIntro: string; contactEyebrow: string;
}

export const designCopy: Record<Language, DesignCopy> = {
  ru: {
    heroStart: 'Соединяем страны', heroEnd: 'через лёд',
    scroll: 'Знакомьтесь с фондом',
    galleryHeading: 'Матчи и тренировки',
    countryLabel: 'Страны сотрудничества', teamIntro: 'Люди, которые знают спорт изнутри.', contactEyebrow: 'Сотрудничество',
  },
  en: {
    heroStart: 'Connecting countries', heroEnd: 'through ice',
    scroll: 'Discover the foundation',
    galleryHeading: 'Games and training',
    countryLabel: 'Countries of cooperation', teamIntro: 'People who know sport from the inside.', contactEyebrow: 'Partnerships',
  },
  es: {
    heroStart: 'Unimos países', heroEnd: 'a través del hielo',
    scroll: 'Descubre la fundación',
    galleryHeading: 'Partidos y entrenamientos',
    countryLabel: 'Países de cooperación', teamIntro: 'Personas que conocen el deporte desde dentro.', contactEyebrow: 'Colaboración',
  },
}
