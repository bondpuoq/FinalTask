function OfferList() {
  var self, _offerHbTemplate, _popupHbTemplate, _offerHbObject, _popupHbObject;
  self = this;
  self = {
    init: _init,
    render: _render,
    initPopup: _initPopup,
    renderPopup: _renderPopup,
    data : []
  }
  function _init(offerData, hbTemplate) {
    self.data = offerData;
    _offerHbTemplate = _offerHbTemplate || hbTemplate.html();
    _offerHbObject = Handlebars.compile(_offerHbTemplate);
    $('body').on('click', '.offer', _offerClick);
    $('.popup').on('click', '.close-link', _togglePopup);
  }
  function _render(destinationObj) {
    $(destinationObj).html(_offerHbObject(self.data));
  }

  // ToDo: засовываем в инит шаблон Handlebars и данные выбранного оффера
  function _initPopup(hbTemplate) {
    _popupHbTemplate = _popupHbTemplate || hbTemplate.html();
    _popupHbObject = Handlebars.compile(_popupHbTemplate);
  }

  // ToDo: здесь мы сделаем чтобы он у нас заполнял выбранный попап
  function _renderPopup(offerIndex, destinationObj, currentUser) {
    $(destinationObj).html(_popupHbObject( { data: self.data[offerIndex], currentUser: currentUser }));
  }
  return self;
}