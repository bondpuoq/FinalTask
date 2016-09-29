function demoData() {
  var self, _users, _comments;
  var self = this;
  _users = [{
    id : "0",
    fio : "Василий Кожемякин",
    avatar : "img\vasily.png"
  }, {
    id : "1",
    fio : "Евгений Пологов",
    avatar : "img\eugen.png"
  }, {
    id : "2",
    fio : "Ксения Заболоцкая",
    avatar : "img\ksenya.png"
  }, {
    id : "3",
    fio : "Анастасия Кузнецова",
    avatar : "img\nastya.png"
  }, {
    id : "4",
    fio : "Алена Сафина",
    avatar : "img\nastya.png"
  }, {
    id : "5",
    fio : "Иван Стрельников",
    avatar : "img\jeff.png"
  }, {
    id : "6",
    fio : "Алексей Чуваков",
    avatar : "img\vasily.png"
  }, {
    id : "7",
    fio : "Вячеслав Путин",
    avatar : "img\eugen.png"
  }];

  _comments = [{
    author : users[2],
    text : "В Березовском можно в 3 раза дешевле взять"
  }, {
    author : users[4],
    text : "Приезжай к нам в Голливуд, есть приличная квартирка"
  }, {
    author : users[5],
    text : "WTF.."
  }, {
    author : users[3],
    text : "В Березовском можно в 3 раза дешевле взять"
  }];

  _offers= [{ 
    offerImg : "img/vacation-offer.png",
    caption : "Отпуск семьей на море",
    category : "Путешествия",
    dateBegin : "12.06.12",
    dateEnd : "14.06.12",
    location : "Тиват, Черногория",
    author : _users[1]
  }, {
    offerImg : "img/hands.png",
    caption : "Новый сайт-портфолио",
    category : "Детские игрушки",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    author : _users[7]
  }, {
    offerImg : "img/velodog.png",
    caption : "Оформление интерьера",
    category : "Недвижимость",
    location : "Москва",
    feedbacks : [_comments[0], _comments[1], _comments[2]],
    author : _users[0]
  }, {
    offerImg : "img/watch.png",
    caption : "Крутые часы Bell&rose",
    category : "Детские игрушки",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    author : _users[6]
  }, {
    offerImg : "img/ipad.png",
    caption : "iPad 4th generation",
    category : "Путешествия",
    dateBegin : "12.06.12",
    dateEnd : "14.06.12",
    location : "Екатеринбург",
    author : _users[2]
  }, {
    offerImg : "img/orange_room.png",
    caption : "Новая 3-х комнатная квартира",
    category : "Недвижимость",
    location : "Москва",
    feedbacks : [_comments[3]],
    author : _users[5]
  }, {
    offerImg : "img/bag.png",
    caption : "Стильная кожаная сумка",
    category : "Одежда",
    location : "Екатеринбург",
    feedbacks : {},
    author : _users[7]
  }, {
    offerImg : "img/visiting-card.png",
    caption : "Новые корпоративные визитки",
    category : "Полиграфия",
    dateBegin : "12.01.13",
    dateEnd : "14.06.13",
    location : "Екатеринбург",
    feedbacks : {},
    author : _users[4]
  }, {
    offerImg : "img/jeep.png",
    caption : "Стильная модная тачила",
    category : "Авто",
    location : "Ульяновск",
    feedbacks : {},
    author : _users[6]
  }];

  self = {
    users : _users,
    comments : _comments,
    offers : _offers
  }
  return self;
}