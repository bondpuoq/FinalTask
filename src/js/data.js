function demoData() {
  var self, _users, _comments;
  var self = this;
  _users = [{
    id : 0,
    fio : "Василий Кожемякин",
    avatar : "img/vasily"
  }, {
    id : 1,
    fio : "Евгений Пологов",
    avatar : "img/eugen"
  }, {
    id : 2,
    fio : "Ксения Заболоцкая",
    avatar : "img/ksenya"
  }, {
    id : 3,
    fio : "Анастасия Кузнецова",
    avatar : "img/nastya"
  }, {
    id : 4,
    fio : "Алена Сафина",
    avatar : "img/nastya"
  }, {
    id : 5,
    fio : "Иван Стрельников",
    avatar : "img/jeff"
  }, {
    id : 6,
    fio : "Алексей Чуваков",
    avatar : "img/vasily"
  }, {
    id : 7,
    fio : "Вячеслав Путин",
    avatar : "img/eugen"
  }, {
    id : 8,
    fio : "Current User",
    avatar : "img/vasily"
  }];

  _comments = [{
    author : _users[2],
    text : "В Березовском можно в 3 раза дешевле взять"
  }, {
    author : _users[4],
    text : "Приезжай к нам в Голливуд, есть приличная квартирка"
  }, {
    author : _users[5],
    text : "WTF.."
  }, {
    author : _users[3],
    text : "В Березовском можно в 3 раза дешевле взять"
  }, {
    author : _users[0],
    text : "4 поколение, а начинка все еще как в смартах на 2ом андроиде"
  }, {
    author : _users[6],
    text : "Зато дизаин красивый, имиджевая вещь"
  }, {
    author : _users[2],
    text : "Крутое место"
  }];

  _mentions = [{
    author : _users[1],
    text: "Хорошее место, вернемся еще"
  }, {
    author : _users[5],
    text: "Были там всей семьей, вкусная пища, чистый воздух. Есть отдельные спальные для детей и стариков и собак и кошек. До моря идти минут 5-10"
  }, {
    author : _users[2],
    text: "Никогда туда не поеду...денег просто нет"
  }, {
    author : _users[3],
    text: "Хорошая штука, приобрел недавно, вроде пока все устраивает"
  }, {
    author : _users[4],
    text: "Недавно случайно сел на него, все, теперь надо покупать новую версию"
  }, {
    author : _users[7],
    text: "Такая сумка называется в армейке планшет, контрабасы сержики с ним гоняют"
  }];
  _adds = [
    _users[2], _users[6], _users[3]
  ];

  _offers= [{ 
    offerImg : "img/vacation-offer",
    caption : "Отпуск семьей на море",
    category : "Путешествия",
    dateBegin : "12.06.12",
    dateEnd : "14.06.12",
    location : "Тиват, Черногория",
    description : "Разместиться можно по своему вкусу в Тивате," + 
                  "в  Которе, в Будве или в местности под названием Радовичи "+
                  "( это что-то типа дерев... ...на побережье моря, "+
                  "с пляжем «Плави Горизонт», и с целой кучей туристических отелей). \n \n "+
                  "От Тивата и Котора на такси вам обойдется примерно в 10-15 евро \ "+
                  "до пляжа «Плави Горизонт». Так  же, там есть возможность взять машину "+
                  "на прокат  на время своего отпуска. "+
                  "В Радовичах есть отель «Маки апартамент», с кухней, где можно готовить " +
                  "свою еду и с номерами на 2их, 4рех , 6рых персон. " + 
                  "Хозяйку отеля зовут Зорика.  Вот тел, и координаты этого отеля: " +
                  "Maki apartaments +381606326060 ( in English ) +38268288772" +
                  "more.radovici@gmail.com, maki-apartaments. com Zorica I Dragan Sestovic .",
    author : _users[1],
    mentions : [_mentions[0], _mentions[1], _mentions[2]],
    comments: [_comments[6]],
    commentsCount: 1,
    adds: [_users[0], _users[3], _users[4], _users[5]],
    likes: [_users[0], _users[2], _users[5]]
  }, {
    offerImg : "img/hands",
    caption : "Новый сайт-портфолио",
    category : "Детские игрушки",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    description : "Мелкий дурацкий сайт с хреновым дизайном за гроши, - вы же такое любите, да?",
    author : _users[7]
  }, {
    offerImg : "img/velo-dog",
    caption : "Новая 3-х комнатная квартира",
    category : "Недвижимость",
    location : "Москва",
    description : "Вы спросите: \"А почему на картинке велосипед, продается же квартира?!\"." +
                  "А мы ответим: \"А почему бы по такой охренененно большой квартире не раскатывать на велике?",
    comments : [_comments[0], _comments[1], _comments[2]],
    commentsCount: 3,
    author : _users[0]
  }, {
    offerImg : "img/watch",
    caption : "Крутые часы Bell&rose",
    category : "Аксессуары",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    description: "Счастливые часы не наблюдают, а еще их не наблюдают бедные и скупердяи, ибо нечего наблюдать."+ 
                 "Чтобы вас случайно не приняли за скупердяя, приобретайте наши часы и не мучайте наш мозг. ",
    likes: [_users[1], _users[5]],
    author : _users[6]
  }, {
    offerImg : "img/ipad",
    caption : "iPad 4th generation",
    category : "Путешествия",
    dateBegin : "12.06.12",
    dateEnd : "14.06.12",
    location : "Екатеринбург",
    description: "Мы вам гарантируем, когда вы почувствуете разницу между айпадом и НЕайпадом - " + 
                 "губы в трубочку у вас свернуться автоматически",
    author : _users[2],
    comments : [_comments[4], _comments[5]],
    commentsCount: 2
  }, {
    offerImg : "img/orange-room",
    caption : "Оформление интерьера",
    category : "Недвижимость",
    location : "Москва",
    description : "Наши дизайнеры по интерьеру покрасят вашу квартиру в оранжевый цвет, " +
                  "потому что они любят группу Чайф и у них оранжевое настроение и все такое прочее..."+
                  " Сопротивленние бесполезно. Вы тоже полюбите группу Чайф.",
    comments : [_comments[3]],
    commentsCount: 1,
    author : _users[5]
  }, {
    offerImg : "img/bag",
    caption : "Стильная кожаная сумка",
    category : "Одежда",
    location : "Екатеринбург",
    description : "Если вы хотите быть похожи на младшего сержанта, - эта сумка - ваш выбор.",
    author : _users[7]
  }, {
    offerImg : "img/visiting-card",
    caption : "Новые корпоративные визитки",
    category : "Полиграфия",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    description : "Визитки вам - чего же боле, что я могу еще сказать?",
    author : _users[4]
  }, {
    offerImg : "img/jeep",
    caption : "Стильная модная тачила",
    category : "Авто",
    location : "Ульяновск",
    description : "Будь рыцарем, купи Knight б..я!",
    author : _users[6]
  }, { 
    offerImg : "img/vacation-offer",
    caption : "Отпуск семьей на море",
    category : "Путешествия",
    dateBegin : "12.06.12",
    dateEnd : "14.06.12",
    location : "Тиват, Черногория",
    description : "Разместиться можно по своему вкусу в Тивате," + 
                  "в  Которе, в Будве или в местности под названием Радовичи "+
                  "( это что-то типа дерев... ...на побережье моря, "+
                  "с пляжем «Плави Горизонт», и с целой кучей туристических отелей). \n \n "+
                  "От Тивата и Котора на такси вам обойдется примерно в 10-15 евро \ "+
                  "до пляжа «Плави Горизонт». Так  же, там есть возможность взять машину "+
                  "на прокат  на время своего отпуска. "+
                  "В Радовичах есть отель «Маки апартамент», с кухней, где можно готовить " +
                  "свою еду и с номерами на 2их, 4рех , 6рых персон. " + 
                  "Хозяйку отеля зовут Зорика.  Вот тел, и координаты этого отеля: " +
                  "Maki apartaments +381606326060 ( in English ) +38268288772" +
                  "more.radovici@gmail.com, maki-apartaments. com Zorica I Dragan Sestovic .",
    author : _users[1],
    mentions : [_mentions[0], _mentions[1], _mentions[2]],
    comments: [_comments[6]],
    commentsCount: 1,
    adds: [_users[0], _users[3], _users[4], _users[5]],
    likes: [_users[0], _users[2], _users[5]]
  }, {
    offerImg : "img/hands",
    caption : "Новый сайт-портфолио",
    category : "Детские игрушки",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    description : "Мелкий дурацкий сайт с хреновым дизайном за гроши, - вы же такое любите, да?",
    author : _users[7]
  }, {
    offerImg : "img/velo-dog",
    caption : "Новая 3-х комнатная квартира",
    category : "Недвижимость",
    location : "Москва",
    description : "Вы спросите: \"А почему на картинке велосипед, продается же квартира?!\"." +
                  "А мы ответим: \"А почему бы по такой охренененно большой квартире не раскатывать на велике?",
    comments : [_comments[0], _comments[1], _comments[2]],
    commentsCount: 3,
    author : _users[0]
  }, {
    offerImg : "img/watch",
    caption : "Крутые часы Bell&rose",
    category : "Аксессуары",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    description: "Счастливые часы не наблюдают, а еще их не наблюдают бедные и скупердяи, ибо нечего наблюдать."+ 
                 "Чтобы вас случайно не приняли за скупердяя, приобретайте наши часы и не мучайте наш мозг. ",
    likes: [_users[1], _users[5]],
    author : _users[6]
  }, {
    offerImg : "img/ipad",
    caption : "iPad 4th generation",
    category : "Путешествия",
    dateBegin : "12.06.12",
    dateEnd : "14.06.12",
    location : "Екатеринбург",
    description: "Мы вам гарантируем, когда вы почувствуете разницу между айпадом и НЕайпадом - " + 
                 "губы в трубочку у вас свернуться автоматически",
    author : _users[2],
    comments : [_comments[4], _comments[5]],
    commentsCount: 2
  }, {
    offerImg : "img/orange-room",
    caption : "Оформление интерьера",
    category : "Недвижимость",
    location : "Москва",
    description : "Наши дизайнеры по интерьеру покрасят вашу квартиру в оранжевый цвет, " +
                  "потому что они любят группу Чайф и у них оранжевое настроение и все такое прочее..."+
                  " Сопротивленние бесполезно. Вы тоже полюбите группу Чайф.",
    comments : [_comments[3]],
    commentsCount: 1,
    author : _users[5]
  }, {
    offerImg : "img/bag",
    caption : "Стильная кожаная сумка",
    category : "Одежда",
    location : "Екатеринбург",
    description : "Если вы хотите быть похожи на младшего сержанта, - эта сумка - ваш выбор.",
    author : _users[7]
  }, {
    offerImg : "img/visiting-card",
    caption : "Новые корпоративные визитки",
    category : "Полиграфия",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    description : "Визитки вам - чего же боле, что я могу еще сказать?",
    author : _users[4]
  }, {
    offerImg : "img/jeep",
    caption : "Стильная модная тачила",
    category : "Авто",
    location : "Ульяновск",
    description : "Будь рыцарем, купи Knight б..я!",
    author : _users[6]
  }];

  self = {
    users : _users,
    comments : _comments,
    offers : _offers,
    currentUser : _users[8]
  }
  return self;
}