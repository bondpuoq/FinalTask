function OfferCard() {
  var self, _cardHbTemplate, _cardHbObject;
  self = this;
  self = {
    init : _init,
    render : _render
  }

    // ToDo: засовываем в инит шаблон Handlebars и данные выбранного оффера
  function _init(hbTemplate) {
    _cardHbTemplate = _cardHbTemplate || hbTemplate.html();
    _cardHbObject = Handlebars.compile(_cardHbTemplate);
    $('#js-popup-placeholder').on('click', '.close-link', _togglePopup);
  }

  // ToDo: здесь мы сделаем чтобы он у нас заполнял выбранный попап
  function _render(offer, destinationObj, currentUser) {
    $(destinationObj).html(_cardHbObject( { data: offer, currentUser: currentUser }));
  }

  function _togglePopup() {
    $('.blind').toggle();
  }
  return self;
}