import { asset, portraits, type Language } from './content'

export const personIds = ['vladimir-milyaev', 'alexander-glazov', 'valery-afanasyev', 'alexander-sazykin', 'alexey-sazykin', 'sergey-glazov'] as const
type PersonId = typeof personIds[number]

// Generated from the supplied originals before development and production builds.
const originalPortraits = import.meta.glob<string>('./assets/people/optimized/*.webp', {
  eager: true, query: '?url', import: 'default',
})
export function personPhoto(index: number) {
  const replacement = Object.entries(originalPortraits).find(([path]) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '') === personIds[index])
  return replacement?.[1] ?? (index === 0 ? undefined : asset(portraits[index]))
}

export const biographyLabels = {
  ru: { open: 'Открыть биографию', biography: 'Биография', leadership: 'Руководство', experts: 'Эксперты', previous: 'Предыдущий профиль', next: 'Следующий профиль' },
  en: { open: 'Read biography', biography: 'Biography', leadership: 'Leadership', experts: 'Experts', previous: 'Previous profile', next: 'Next profile' },
  es: { open: 'Leer biografía', biography: 'Biografía', leadership: 'Dirección', experts: 'Expertos', previous: 'Perfil anterior', next: 'Siguiente perfil' },
}

// Biographies supplied by the client, with English and Spanish translations.
export const biographies: Record<Language, Record<PersonId, string[]>> = {
  ru: {
    'vladimir-milyaev': [
      'Предприниматель, больше 25 лет работает в строительной отрасли.',
      'Выпускник Санкт-Петербургского государственного университета, кандидат экономических наук, MBA.',
      'Развивает несколько компаний, участвует в социальных проектах и поддерживает детский и взрослый спорт, в том числе любительскую хоккейную команду «Петротех».',
    ],
    'alexander-glazov': [
      'Отвечает за стратегию, коммуникации и работу с партнёрами фонда.',
      'С 2014 года руководит брендинговым агентством Glazov Branding, соавтор более 100 брендинговых проектов. Доцент Университета ИТМО. Руководит исследованием хоккейного рынка Мексики, США и Канады.',
      'Хоккей в семье: родственники отца Сергей и Юрий Глазовы играли за сборную СССР, Сергей участвовал в Суперсерии против клубов НХЛ.',
    ],
    'valery-afanasyev': [
      'Президент петербургского клуба «СКА-Звезда», который входит в Академию СКА.',
      'С 1996 по 2001 год работал в Мексике по приглашению национальной федерации хоккея и возглавлял команду Mexico-Select.',
      'Один из основателей клуба «Серебряные львы», работал главным тренером в системе СКА. Среди воспитанников Николай Кныжов, игравший в НХЛ. В 2021 году разработал концепцию хоккейной академии в Дубае.',
    ],
    'alexander-sazykin': [
      'Воспитанник СКА, тренировался с первой командой под руководством Бориса Михайлова. Тренирует с конца 2000-х.',
      'Вместе с братом основал клуб ледового спорта SBS: хоккей и фигурное катание для детей с трёх лет и взрослых на аренах «Юбилейный» и «Север Парк Арена». В клубе старший тренер взрослых групп.',
      'Играет в Санкт-Петербургской хоккейной лиге с первого сезона, член её Зала славы.',
    ],
    'alexey-sazykin': [
      'Воспитанник СКА, в составе команды своего года многократно выигрывал первенство Санкт-Петербурга. С отличием окончил тренерский факультет университета Лесгафта, тренирует со студенческих лет.',
      'Вместе с братом основал клуб SBS и выстроил в нём систему из нескольких любительских команд разного уровня. Тренировал команду «Чисто Питер» в Медиалиге.',
    ],
    'sergey-glazov': [
      'Воспитанник хоккейной школы ЦСКА. Начинал нападающим, позже играл в защите. В 1971 году в составе юниорской сборной СССР стал чемпионом Европы.',
      'С 1971 по 1976 год выступал за ЦСКА: трижды чемпион СССР, обладатель Кубка СССР 1973 года, участник Суперсерии 1975/76 против клубов НХЛ. Играл за сборную СССР.',
      'Сезон 1976/77 провёл в ленинградском СКА.',
    ],
  },
  en: {
    'vladimir-milyaev': [
      'An entrepreneur with more than 25 years of experience in the construction industry.',
      'A graduate of Saint Petersburg State University, he holds a Candidate of Sciences degree in Economics and an MBA.',
      'He develops several businesses, takes part in social projects and supports youth and adult sports, including the amateur ice hockey team Petrotech.',
    ],
    'alexander-glazov': [
      'Responsible for the foundation’s strategy, communications and partner relations.',
      'Has led Glazov Branding since 2014 and co-created more than 100 branding projects. Associate Professor at ITMO University. Leads research into the hockey markets of Mexico, the United States and Canada.',
      'Hockey runs in the family: his father’s relatives Sergey and Yuri Glazov played for the USSR national team. Sergey took part in the Super Series against NHL clubs.',
    ],
    'valery-afanasyev': [
      'President of the Saint Petersburg club SKA-Zvezda, which is part of the SKA Academy.',
      'From 1996 to 2001, he worked in Mexico at the invitation of the national ice hockey federation and led the Mexico-Select team.',
      'A co-founder of the Silver Lions club, he worked as a head coach within the SKA organisation. His former players include Nikolai Knyzhov, who played in the NHL. In 2021, he developed a concept for a hockey academy in Dubai.',
    ],
    'alexander-sazykin': [
      'A product of the SKA system who trained with the first team under Boris Mikhailov. He has been coaching since the late 2000s.',
      'Together with his brother, he founded SBS, an ice sports club offering hockey and figure skating for children aged three and above and for adults at the Yubileyny and Sever Park Arena rinks. He is the club’s senior coach for adult groups.',
      'He has played in the Saint Petersburg Hockey League since its inaugural season and is a member of its Hall of Fame.',
    ],
    'alexey-sazykin': [
      'A product of the SKA system, he won the Saint Petersburg championship multiple times with his age-group team. He graduated with honours from the coach education faculty of Lesgaft University and has been coaching since his student years.',
      'Together with his brother, he founded SBS and established a network of amateur teams at different levels within the club. He coached Chisto Piter in the Media League.',
    ],
    'sergey-glazov': [
      'A graduate of the CSKA hockey school. He began as a forward and later played in defence. In 1971, he won the European Championship with the USSR junior national team.',
      'He played for CSKA from 1971 to 1976, winning three USSR championships and the 1973 USSR Cup, and taking part in the 1975/76 Super Series against NHL clubs. He also played for the USSR national team.',
      'He spent the 1976/77 season with SKA Leningrad.',
    ],
  },
  es: {
    'vladimir-milyaev': [
      'Empresario con más de 25 años de experiencia en el sector de la construcción.',
      'Graduado de la Universidad Estatal de San Petersburgo, con el grado de Candidato en Ciencias Económicas y un MBA.',
      'Desarrolla varias empresas, participa en proyectos sociales y apoya el deporte infantil y adulto, incluido el equipo de hockey sobre hielo aficionado Petrotech.',
    ],
    'alexander-glazov': [
      'Responsable de la estrategia, las comunicaciones y las relaciones con los socios de la fundación.',
      'Dirige Glazov Branding desde 2014 y es coautor de más de 100 proyectos de marca. Profesor asociado de la Universidad ITMO. Dirige una investigación sobre los mercados del hockey de México, Estados Unidos y Canadá.',
      'El hockey forma parte de su familia: Sergey y Yuri Glazov, parientes de su padre, jugaron en la selección de la URSS. Sergey participó en la Super Series contra clubes de la NHL.',
    ],
    'valery-afanasyev': [
      'Presidente del club SKA-Zvezda de San Petersburgo, que forma parte de la Academia SKA.',
      'De 1996 a 2001 trabajó en México por invitación de la federación nacional de hockey sobre hielo y dirigió el equipo Mexico-Select.',
      'Uno de los fundadores del club Silver Lions, trabajó como entrenador principal dentro de la organización del SKA. Entre sus alumnos se encuentra Nikolai Knyzhov, que jugó en la NHL. En 2021 desarrolló el concepto de una academia de hockey en Dubái.',
    ],
    'alexander-sazykin': [
      'Formado en el SKA, entrenó con el primer equipo bajo la dirección de Boris Mikhailov. Es entrenador desde finales de la década de 2000.',
      'Junto con su hermano fundó el club de deportes de hielo SBS, que ofrece hockey y patinaje artístico para niños a partir de los tres años y para adultos en las pistas Yubileyny y Sever Park Arena. Es el entrenador responsable de los grupos de adultos del club.',
      'Juega en la Liga de Hockey de San Petersburgo desde su primera temporada y forma parte de su Salón de la Fama.',
    ],
    'alexey-sazykin': [
      'Formado en el SKA, ganó varias veces el campeonato de San Petersburgo con el equipo de su categoría de edad. Se graduó con honores en la facultad de formación de entrenadores de la Universidad Lesgaft y ejerce como entrenador desde su etapa universitaria.',
      'Junto con su hermano fundó el club SBS y creó una red de equipos aficionados de distintos niveles dentro del club. Entrenó al equipo Chisto Piter en la Media League.',
    ],
    'sergey-glazov': [
      'Formado en la escuela de hockey del CSKA. Comenzó como delantero y más tarde jugó en defensa. En 1971 se proclamó campeón de Europa con la selección júnior de la URSS.',
      'Jugó en el CSKA de 1971 a 1976: fue tres veces campeón de la URSS, ganó la Copa de la URSS de 1973 y participó en la Super Series de 1975/76 contra clubes de la NHL. También jugó en la selección de la URSS.',
      'Disputó la temporada 1976/77 en el SKA de Leningrado.',
    ],
  },
}
