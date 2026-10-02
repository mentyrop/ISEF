export type Language = 'ru' | 'en' | 'es'
export const countryIds = ['serbia', 'kazakhstan', 'uae', 'egypt', 'mexico', 'india', 'china', 'thailand', 'south-africa'] as const
export type CountryId = typeof countryIds[number]
type Item = { title: string; description: string }
export type Copy = {
  title: string; description: string; nav: string[]; heroTitle: string; heroText: string;
  aboutButton: string; contactButton: string; activitiesTitle: string; activities: Item[];
  missionLabel: string; missionLead: string; missionRest: string; missionText: string; pillars: Item[];
  geographyTitle: string; geographyIntro: string; countryDescriptions: Record<CountryId, string>; countries: string[]; teamTitle: string;
  people: { name: string; role: string }[]; governance: Item[]; galleryTitle: string; photoAlts: string[];
  contactsTitle: string; contactsText: string; email: string; phone: string; addressLabel: string;
  address: string; foundationName: string; openMap: string; skip: string; openMenu: string;
  close: string; openPhoto: string; previous: string; next: string; languageLabel: string;
}

export const content: Record<Language, Copy> = {
  ru: {
    title: 'ISEF — Соединяем страны через лёд',
    description: 'Ice Sport Exchange Foundation развивает ледовые виды спорта: арены, спортивный обмен, подготовка тренеров и международное сотрудничество.',
    nav: ['О фонде', 'Деятельность', 'География', 'Руководство', 'Фото', 'Контакты'],
    heroTitle: 'Соединяем страны через лед',
    heroText: 'Ice Sport Exchange Foundation развивает хоккей, фигурное катание и другие ледовые виды спорта в странах, где у них большое будущее. Мы создаём качественную инфраструктуру, готовим тренеров и растим спортсменов, опираясь на опыт российской школы.',
    aboutButton: 'Узнать о фонде', contactButton: 'Связаться', activitiesTitle: 'Чем занимается фонд',
    activities: [
      { title: 'Ледовые арены', description: 'Разрабатываем концепции ледовых арен и тренировочных центров и сопровождаем проекты: от выбора площадки до запуска и загрузки льда.' },
      { title: 'Спортивный обмен', description: 'Тренировочные сборы и стажировки для юных спортсменов и тренеров в России и в странах-партнёрах.' },
      { title: 'Школы и методики', description: 'Методические материалы для национальных хоккейных школ и программы подготовки тренеров.' },
      { title: 'Турниры', description: 'Международные турниры по ледовым видам спорта для команд из стран-партнёров.' },
      { title: 'Бренд и маркетинг', description: 'Айдентика, спортивный маркетинг и продвижение городских, университетских и национальных команд.' },
      { title: 'Виды спорта', description: 'Хоккей, следж-хоккей, фигурное катание, конькобежный спорт, кёрлинг, массовое и детское катание.' },
    ],
    missionLabel: 'Миссия', missionLead: 'Сделать ледовые виды спорта доступными',
    missionRest: 'в странах, где к ним есть интерес, но пока не хватает льда, тренеров и опыта',
    missionText: 'Exchange в названии фонда означает обмен. Мы соединяем федерации, клубы, города и семьи с опытом российской школы, создаём качественную инфраструктуру и учимся у партнёров, чтобы решения работали в местных условиях.',
    pillars: [
      { title: 'Тренеры', description: 'Российские специалисты работают в паре с местными тренерами и передают им методики, чтобы школа дальше развивалась своими силами.' },
      { title: 'Инфраструктура', description: 'Закладываем в концепцию каждого катка загрузку льда с утра до вечера: детские группы, секции, массовое катание, любительские и профессиональные команды.' },
      { title: 'Партнеры', description: 'Работаем с федерациями, городскими властями, университетами и частными инвесторами.' },
    ],
    geographyTitle: 'География',
    geographyIntro: 'ISEF (Фонд развития международного сотрудничества в ледовых видах спорта) выстраивает партнерские отношения с федерациями, клубами и городами разных стран.',
    countryDescriptions: {
      'serbia': 'Среди них Сербия: в стране есть национальная хоккейная лига, а белградские клубы «Црвена звезда» и «Партизан» ведут свою историю с 1940-х годов.',
      'kazakhstan': 'Среди них Казахстан: в стране больше 40 крытых катков и свой национальный чемпионат, а «Барыс» из Астаны с 2008 года играет в КХЛ.',
      'uae': 'Среди них ОАЭ: в стране больше десяти крытых катков и своя хоккейная лига, а в 2021 году в Дубае прошёл матч регулярного чемпионата КХЛ между «Ак Барсом» и «Авангардом».',
      'egypt': 'Среди них Египет: в Каире в хоккей играют с 2002 года на небольших катках в торговых центрах, а в 2023 году сборная страны сыграла на Кубке арабских стран.',
      'mexico': 'Особое место среди них занимает Мексика: в стране есть ледовая инфраструктура и национальная лига, а российские тренеры работают в мексиканском хоккее с 1990-х годов.',
      'india': 'Среди них Индия: центр индийского хоккея находится в Ладакхе, и в августе 2026 года в Лехе открылся первый в регионе каток международного уровня с круглогодичным льдом.',
      'china': 'Среди них Китай: перед Олимпиадой в Пекине в стране было уже больше 650 стандартных катков, а китайский клуб с 2016 года играет в КХЛ и сейчас проводит домашние матчи в Петербурге.',
      'thailand': 'Среди них Таиланд: в 2022 году в Бангкоке открылась арена международного размера 60 на 30 метров, а сборные страны выигрывали азиатские турниры IIHF среди юниоров и женщин.',
      'south-africa': 'Среди них ЮАР: в хоккей здесь играют с 1930-х годов, в IIHF страна входит с 1937-го, а Кейптаун регулярно принимает турниры чемпионата мира.',
    },
    countries: ['Сербия', 'Казахстан', 'ОАЭ', 'Египет', 'Мексика', 'Индия', 'Китай', 'Таиланд', 'ЮАР'],
    teamTitle: 'Руководство и эксперты',
    people: [
      { name: 'Владимир Миляев', role: 'Президент фонда' },
      { name: 'Александр Глазов', role: 'Исполнительный директор' },
      { name: 'Валерий Афанасьев', role: 'Эксперт по развитию хоккея' },
      { name: 'Александр Сазыкин', role: 'Эксперт по детскому и любительскому спорту' },
      { name: 'Алексей Сазыкин', role: 'Эксперт по детскому и любительскому спорту' },
      { name: 'Сергей Глазов', role: 'Игрок сборной СССР по хоккею' },
    ],
    governance: [
      { title: 'Попечительский совет', description: 'Инвесторы и представители бизнеса. Утверждает план работы фонда.' },
      { title: 'Экспертный совет', description: 'Хоккеисты, тренеры, спортивные менеджеры, архитекторы и строители арен, специалисты по маркетингу и спортивной медицине.' },
      { title: 'Проектный офис', description: 'Реализует программы фонда, проводит мероприятия, работает с партнёрами.' },
    ],
    galleryTitle: 'Фотографии', photoAlts: ['Хоккеисты борются за шайбу во время матча', 'Тренер обсуждает игру с командой на скамейке', 'Общее фото хоккейных команд на ледовой арене'],
    contactsTitle: 'Контакты', contactsText: 'Чтобы обсудить сотрудничество, напишите нам на почту или позвоните.',
    email: 'Почта', phone: 'Телефон', addressLabel: 'Адрес', address: 'Санкт-Петербург, Малый проспект Васильевского острова, 64к1',
    foundationName: 'Фонд развития международного сотрудничества в ледовых видах спорта',
    openMap: 'Открыть в Google Maps', skip: 'Перейти к содержимому', openMenu: 'Открыть меню', close: 'Закрыть',
    openPhoto: 'Открыть фотографию', previous: 'Предыдущая фотография', next: 'Следующая фотография', languageLabel: 'Язык сайта',
  },
  en: {
    title: 'ISEF — Connecting countries through ice',
    description: 'Ice Sport Exchange Foundation develops ice sports through ice arenas, sports exchanges, coach education and international cooperation.',
    nav: ['About', 'Our work', 'Geography', 'Our team', 'Photos', 'Contact'],
    heroTitle: 'Connecting countries through ice',
    heroText: 'Ice Sport Exchange Foundation develops hockey, figure skating and other ice sports in countries where they have a promising future. Drawing on the expertise of the Russian sporting tradition, we build quality infrastructure, train coaches and nurture athletes.',
    aboutButton: 'About the foundation', contactButton: 'Get in touch', activitiesTitle: 'What we do',
    activities: [
      { title: 'Ice arenas', description: 'We develop concepts for ice arenas and training centres and support projects from site selection to opening and ice-time planning.' },
      { title: 'Sports exchanges', description: 'Training camps and placements for young athletes and coaches in Russia and partner countries.' },
      { title: 'Schools and methods', description: 'Teaching resources for national hockey schools and coach education programmes.' },
      { title: 'Tournaments', description: 'International ice sports tournaments for teams from partner countries.' },
      { title: 'Brand and marketing', description: 'Brand identity, sports marketing and promotion for city, university and national teams.' },
      { title: 'Our sports', description: 'Hockey, para ice hockey, figure skating, speed skating, curling, recreational skating and skating for children.' },
    ],
    missionLabel: 'Our mission', missionLead: 'Make ice sports accessible',
    missionRest: 'in countries where there is interest, but a shortage of ice rinks, coaches and expertise',
    missionText: 'Exchange is at the heart of our name. We connect federations, clubs, cities and families with Russian sporting expertise, create quality infrastructure and learn from our partners so that every solution works in its local context.',
    pillars: [
      { title: 'Coaches', description: 'Russian specialists work alongside local coaches and share their methods, helping each school develop independently.' },
      { title: 'Infrastructure', description: 'Every rink is designed for use from morning to evening: children’s groups, sports clubs, public skating, amateur and professional teams.' },
      { title: 'Partners', description: 'We work with federations, city authorities, universities and private investors.' },
    ],
    geographyTitle: 'Geography',
    geographyIntro: 'ISEF (Foundation for the development of international cooperation in ice sports) builds partnerships with federations, clubs and cities around the world.',
    countryDescriptions: {
      'serbia': 'Serbia is one of them: the country has a national ice hockey league, and Belgrade clubs Crvena zvezda and Partizan trace their history back to the 1940s.',
      'kazakhstan': 'Kazakhstan is one of them: the country has more than 40 indoor ice rinks and its own national championship, while Astana’s Barys has played in the KHL since 2008.',
      'uae': 'The UAE is one of them: the country has more than ten indoor ice rinks and its own ice hockey league. In 2021, Dubai hosted a KHL regular-season game between Ak Bars and Avangard.',
      'egypt': 'Egypt is one of them: ice hockey has been played in Cairo since 2002 on small rinks in shopping centres, and the national team competed in the Arab Cup in 2023.',
      'mexico': 'Mexico holds a special place: the country has ice rinks and a national league, and Russian coaches have been working in Mexican ice hockey since the 1990s.',
      'india': 'India is one of them: Ladakh is the heart of Indian ice hockey, and in August 2026, the region’s first international-standard rink with year-round ice opened in Leh.',
      'china': 'China is one of them: the country already had more than 650 standard ice rinks before the Beijing Olympics. A Chinese club has played in the KHL since 2016 and currently plays its home games in Saint Petersburg.',
      'thailand': 'Thailand is one of them: an international-sized 60-by-30-metre arena opened in Bangkok in 2022, and the country’s junior and women’s national teams have won IIHF Asian tournaments.',
      'south-africa': 'South Africa is one of them: ice hockey has been played here since the 1930s, the country has been an IIHF member since 1937, and Cape Town regularly hosts World Championship tournaments.',
    },
    countries: ['Serbia', 'Kazakhstan', 'UAE', 'Egypt', 'Mexico', 'India', 'China', 'Thailand', 'South Africa'],
    teamTitle: 'Leadership and experts',
    people: [
      { name: 'Vladimir Milyaev', role: 'President of the foundation' },
      { name: 'Alexander Glazov', role: 'Executive Director' },
      { name: 'Valery Afanasyev', role: 'Hockey development expert' },
      { name: 'Alexander Sazykin', role: 'Youth and amateur sports expert' },
      { name: 'Alexey Sazykin', role: 'Youth and amateur sports expert' },
      { name: 'Sergey Glazov', role: 'USSR national hockey team player' },
    ],
    governance: [
      { title: 'Board of Trustees', description: 'Comprises investors and business representatives and approves the foundation’s work plan.' },
      { title: 'Expert Council', description: 'Hockey players, coaches, sports managers, arena architects and builders, marketing and sports medicine specialists.' },
      { title: 'Project Office', description: 'Delivers the foundation’s programmes, organises events and works with partners.' },
    ],
    galleryTitle: 'Photos', photoAlts: ['Hockey players competing for the puck during a match', 'A coach discussing the game with the team on the bench', 'Hockey teams posing together on the ice rink'],
    contactsTitle: 'Contact', contactsText: 'To discuss working together, send us an email or give us a call.',
    email: 'Email', phone: 'Phone', addressLabel: 'Address', address: '64 Maly Prospekt, Building 1, Vasilyevsky Island, Saint Petersburg',
    foundationName: 'Foundation for the development of international cooperation in ice sports',
    openMap: 'Open in Google Maps', skip: 'Skip to content', openMenu: 'Open menu', close: 'Close',
    openPhoto: 'Open photo', previous: 'Previous photo', next: 'Next photo', languageLabel: 'Website language',
  },
  es: {
    title: 'ISEF — Unimos países a través del hielo',
    description: 'Ice Sport Exchange Foundation impulsa los deportes de hielo mediante el desarrollo de pistas, el intercambio deportivo, la formación de entrenadores y la cooperación internacional.',
    nav: ['La fundación', 'Actividad', 'Geografía', 'Equipo', 'Fotos', 'Contacto'],
    heroTitle: 'Unimos países a través del hielo',
    heroText: 'Ice Sport Exchange Foundation impulsa el hockey, el patinaje artístico y otros deportes de hielo en países donde tienen un gran futuro. Basándonos en la experiencia de la escuela deportiva rusa, creamos infraestructuras de calidad, formamos entrenadores y acompañamos el desarrollo de los deportistas.',
    aboutButton: 'Conoce la fundación', contactButton: 'Contáctanos', activitiesTitle: 'Qué hacemos',
    activities: [
      { title: 'Pistas de hielo', description: 'Desarrollamos propuestas para pistas de hielo y centros de entrenamiento y acompañamos cada proyecto, desde la elección del emplazamiento hasta su apertura y la planificación del uso de las pistas.' },
      { title: 'Intercambio deportivo', description: 'Campamentos y estancias de formación para jóvenes deportistas y entrenadores en Rusia y en los países colaboradores.' },
      { title: 'Escuelas y métodos', description: 'Materiales didácticos para las escuelas nacionales de hockey y programas de formación de entrenadores.' },
      { title: 'Torneos', description: 'Torneos internacionales de deportes de hielo para equipos de los países colaboradores.' },
      { title: 'Marca y marketing', description: 'Identidad de marca, marketing deportivo y promoción de equipos municipales, universitarios y nacionales.' },
      { title: 'Deportes', description: 'Hockey, hockey sobre trineo, patinaje artístico, patinaje de velocidad, curling, patinaje recreativo e infantil.' },
    ],
    missionLabel: 'Misión', missionLead: 'Hacer accesibles los deportes de hielo',
    missionRest: 'en países donde despiertan interés, pero aún faltan pistas, entrenadores y experiencia',
    missionText: 'Exchange, en el nombre de la fundación, significa intercambio. Conectamos federaciones, clubes, ciudades y familias con la experiencia de la escuela deportiva rusa, creamos infraestructuras de calidad y aprendemos de nuestros socios para que las soluciones se adapten a cada realidad local.',
    pillars: [
      { title: 'Entrenadores', description: 'Los especialistas rusos trabajan junto a entrenadores locales y comparten sus métodos para que cada escuela pueda seguir desarrollándose de forma autónoma.' },
      { title: 'Infraestructura', description: 'Cada pista se concibe para su uso de la mañana a la noche: grupos infantiles, escuelas deportivas, sesiones de patinaje abiertas al público y equipos aficionados y profesionales.' },
      { title: 'Socios', description: 'Colaboramos con federaciones, autoridades municipales, universidades e inversores privados.' },
    ],
    geographyTitle: 'Geografía',
    geographyIntro: 'ISEF (Fundación para el desarrollo de la cooperación internacional en los deportes de hielo) establece alianzas con federaciones, clubes y ciudades de distintos países.',
    countryDescriptions: {
      'serbia': 'Entre ellos está Serbia: el país cuenta con una liga nacional de hockey sobre hielo, y los clubes de Belgrado Crvena zvezda y Partizan se remontan a la década de 1940.',
      'kazakhstan': 'Entre ellos está Kazajistán: el país cuenta con más de 40 pistas de hielo cubiertas y su propio campeonato nacional, y el Barys de Astaná juega en la KHL desde 2008.',
      'uae': 'Entre ellos están los Emiratos Árabes Unidos: el país cuenta con más de diez pistas de hielo cubiertas y su propia liga de hockey sobre hielo. En 2021, Dubái acogió un partido de la temporada regular de la KHL entre Ak Bars y Avangard.',
      'egypt': 'Entre ellos está Egipto: en El Cairo se juega al hockey sobre hielo desde 2002 en pequeñas pistas de centros comerciales, y en 2023 la selección nacional participó en la Copa Árabe.',
      'mexico': 'México ocupa un lugar especial: cuenta con pistas de hielo y una liga nacional, y los entrenadores rusos trabajan en el hockey sobre hielo mexicano desde los años noventa.',
      'india': 'Entre ellos está India: Ladakh es el centro del hockey sobre hielo del país, y en agosto de 2026 se inauguró en Leh la primera pista de la región de nivel internacional con hielo durante todo el año.',
      'china': 'Entre ellos está China: antes de los Juegos Olímpicos de Pekín, el país ya contaba con más de 650 pistas de hielo de tamaño estándar. Un club chino juega en la KHL desde 2016 y actualmente disputa sus partidos como local en San Petersburgo.',
      'thailand': 'Entre ellos está Tailandia: en 2022 se inauguró en Bangkok una pista de dimensiones internacionales, de 60 por 30 metros, y las selecciones nacionales júnior y femenina han ganado torneos asiáticos de la IIHF.',
      'south-africa': 'Entre ellos está Sudáfrica: el hockey sobre hielo se practica aquí desde la década de 1930, el país es miembro de la IIHF desde 1937 y Ciudad del Cabo acoge regularmente torneos del Campeonato Mundial.',
    },
    countries: ['Serbia', 'Kazajistán', 'EAU', 'Egipto', 'México', 'India', 'China', 'Tailandia', 'Sudáfrica'],
    teamTitle: 'Dirección y expertos',
    people: [
      { name: 'Vladimir Milyaev', role: 'Presidente de la fundación' },
      { name: 'Alexander Glazov', role: 'Director ejecutivo' },
      { name: 'Valery Afanasyev', role: 'Experto en desarrollo del hockey' },
      { name: 'Alexander Sazykin', role: 'Experto en deporte infantil y aficionado' },
      { name: 'Alexey Sazykin', role: 'Experto en deporte infantil y aficionado' },
      { name: 'Sergey Glazov', role: 'Jugador de la selección de hockey de la URSS' },
    ],
    governance: [
      { title: 'Patronato', description: 'Está formado por inversores y representantes empresariales y aprueba el plan de trabajo de la fundación.' },
      { title: 'Consejo de expertos', description: 'Jugadores de hockey, entrenadores, gestores deportivos, arquitectos y constructores de pistas, especialistas en marketing y medicina deportiva.' },
      { title: 'Oficina de proyectos', description: 'Ejecuta los programas de la fundación, organiza eventos y trabaja con los socios.' },
    ],
    galleryTitle: 'Fotos', photoAlts: ['Jugadores de hockey disputando el disco durante un partido', 'Un entrenador hablando con su equipo en el banquillo', 'Foto de los equipos de hockey en la pista de hielo'],
    contactsTitle: 'Contacto', contactsText: 'Para hablar de una posible colaboración, escríbenos o llámanos.',
    email: 'Correo', phone: 'Teléfono', addressLabel: 'Dirección', address: 'Maly Prospekt, 64, edificio 1, isla Vasílievski, San Petersburgo',
    foundationName: 'Fundación para el desarrollo de la cooperación internacional en los deportes de hielo',
    openMap: 'Abrir en Google Maps', skip: 'Ir al contenido', openMenu: 'Abrir menú', close: 'Cerrar',
    openPhoto: 'Abrir foto', previous: 'Foto anterior', next: 'Foto siguiente', languageLabel: 'Idioma del sitio',
  },
}

export const sectionIds = ['about', 'activities', 'geography', 'team', 'photos', 'contacts']
export const flags = ['a04bb.png', 'ea52a.png', '8b078.png', 'e88dc.png', 'b446a.png', '10764.png', '3b415.png', '9c645.png', '8633d.png']
export const portraits = ['99929.svg', '009ea.png', 'ae288.png', '50927.png', '1a437.png', 'sergey-glazov.jpg']
export const photos = ['218e8.png', '39df7.png', 'cbe9e.png']
export const asset = (filename: string) => /\.(png|jpe?g)$/.test(filename)
  ? `${import.meta.env.BASE_URL}optimized/${filename.replace(/\.(png|jpe?g)$/, '.webp')}`
  : `${import.meta.env.BASE_URL}assets/${filename}`
export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(content.ru.address)
