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

// Biographies supplied by the client. Sergey's short entry uses the two facts
// supplied in Alexander Glazov's biography until a separate text is available.
export const biographies: Record<Language, Record<PersonId, string[]>> = {
  ru: {
    'vladimir-milyaev': [
      'Предприниматель в строительной отрасли Санкт-Петербурга. Владелец ЗАО «Фирма „Техника“», которая больше 20 лет выполняет электромонтажные работы.',
      'Работает с генподрядной компанией «Петрополис», которая строит промышленные и энергетические объекты под ключ: около 90 проектов, среди них водогрейная котельная для ТГК-1 и электрохаб «Правобережный».',
    ],
    'alexander-glazov': [
      'Отвечает за стратегию, коммуникации и работу с партнёрами фонда.',
      'С 2014 года руководит брендинговым агентством Glazov Branding, соавтор более 100 брендинговых проектов. Доцент Университета ИТМО. Руководит исследованием хоккейного рынка Мексики, США и Канады.',
      'Хоккей в семье: родственники отца Сергей и Юрий Глазовы играли за сборную СССР, Сергей участвовал в Суперсерии против клубов НХЛ.',
    ],
    'valery-afanasyev': [
      'Тренер. С 1996 по 2001 год работал в Мексике по приглашению национальной федерации хоккея: главный тренер команды Mexico-Select, турниры в России, Финляндии, Канаде и США.',
      'В Петербурге стал одним из основателей клуба «Серебряные львы», работал главным тренером в системе СКА. Среди воспитанников Николай Кныжов, игравший в НХЛ.',
      'В 2021 году разработал концепцию хоккейной академии в Дубае.',
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
    'sergey-glazov': ['Играл за сборную СССР по хоккею. Участвовал в Суперсерии против клубов НХЛ.'],
  },
  en: {
    'vladimir-milyaev': [
      'An entrepreneur in Saint Petersburg’s construction industry. Owner of Tekhnika, a company that has carried out electrical installation work for more than 20 years.',
      'Works with general contractor Petropolis, which delivers turnkey industrial and energy facilities. Its portfolio includes around 90 projects, among them a hot-water boiler plant for TGC-1 and the Pravoberezhny electrical hub.',
    ],
    'alexander-glazov': [
      'Responsible for the foundation’s strategy, communications and partner relations.',
      'Has led Glazov Branding since 2014 and co-created more than 100 branding projects. Associate Professor at ITMO University. Leads research into the hockey markets of Mexico, the United States and Canada.',
      'Hockey runs in the family: his father’s relatives Sergey and Yuri Glazov played for the USSR national team. Sergey took part in the Super Series against NHL clubs.',
    ],
    'valery-afanasyev': [
      'A coach who worked in Mexico from 1996 to 2001 at the invitation of the national ice hockey federation. As head coach of Mexico-Select, he took the team to tournaments in Russia, Finland, Canada and the United States.',
      'In Saint Petersburg, he co-founded the Silver Lions club and worked as a head coach within the SKA organisation. His former players include Nikolai Knyzhov, who played in the NHL.',
      'In 2021, he developed a concept for a hockey academy in Dubai.',
    ],
    'alexander-sazykin': [
      'A product of the SKA system who trained with the first team under Boris Mikhailov. He has been coaching since the late 2000s.',
      'Together with his brother, he founded SBS, an ice sports club offering hockey and figure skating for children aged three and above and for adults at the Yubileyny and Sever Park Arena rinks. He is the club’s senior coach for adult groups.',
      'He has played in the Saint Petersburg Hockey League since its inaugural season and is a member of its Hall of Fame.',
    ],
    'alexey-sazykin': [
      'A product of the SKA system, he won the Saint Petersburg championship multiple times with his age-group team. He graduated with honours from the coaching faculty of Lesgaft University and has coached since his student years.',
      'Together with his brother, he founded SBS and developed a structure of amateur teams at different levels. He coached Chisto Piter in the Media League.',
    ],
    'sergey-glazov': ['Played for the USSR national hockey team. Took part in the Super Series against NHL clubs.'],
  },
  es: {
    'vladimir-milyaev': [
      'Empresario del sector de la construcción de San Petersburgo. Propietario de Tekhnika, empresa que lleva más de 20 años realizando instalaciones eléctricas.',
      'Trabaja con la constructora general Petropolis, que desarrolla instalaciones industriales y energéticas llave en mano. Su cartera incluye unos 90 proyectos, entre ellos una planta de calderas de agua caliente para TGC-1 y el centro eléctrico Pravoberezhny.',
    ],
    'alexander-glazov': [
      'Responsable de la estrategia, las comunicaciones y las relaciones con los socios de la fundación.',
      'Dirige Glazov Branding desde 2014 y es coautor de más de 100 proyectos de marca. Profesor asociado de la Universidad ITMO. Dirige una investigación sobre los mercados del hockey de México, Estados Unidos y Canadá.',
      'El hockey forma parte de su familia: Sergey y Yuri Glazov, parientes de su padre, jugaron en la selección de la URSS. Sergey participó en la Super Series contra clubes de la NHL.',
    ],
    'valery-afanasyev': [
      'Entrenador. Trabajó en México de 1996 a 2001 por invitación de la federación nacional de hockey. Como entrenador principal de Mexico-Select, participó en torneos en Rusia, Finlandia, Canadá y Estados Unidos.',
      'En San Petersburgo fue uno de los fundadores del club Silver Lions y trabajó como entrenador principal dentro de la organización del SKA. Entre sus alumnos se encuentra Nikolai Knyzhov, que jugó en la NHL.',
      'En 2021 desarrolló el concepto de una academia de hockey en Dubái.',
    ],
    'alexander-sazykin': [
      'Formado en el SKA, entrenó con el primer equipo bajo la dirección de Boris Mikhailov. Es entrenador desde finales de la década de 2000.',
      'Junto con su hermano fundó el club de deportes de hielo SBS, que ofrece hockey y patinaje artístico para niños a partir de los tres años y adultos en las pistas Yubileyny y Sever Park Arena. Es el entrenador sénior de los grupos de adultos del club.',
      'Juega en la Liga de Hockey de San Petersburgo desde su primera temporada y forma parte de su Salón de la Fama.',
    ],
    'alexey-sazykin': [
      'Formado en el SKA, ganó varias veces el campeonato de San Petersburgo con el equipo de su categoría de edad. Se graduó con honores en la facultad de formación de entrenadores de la Universidad Lesgaft y entrena desde sus años de estudiante.',
      'Junto con su hermano fundó el club SBS y creó una estructura de equipos aficionados de distintos niveles. Entrenó al equipo Chisto Piter en la Media League.',
    ],
    'sergey-glazov': ['Jugó en la selección de hockey de la URSS. Participó en la Super Series contra clubes de la NHL.'],
  },
}
