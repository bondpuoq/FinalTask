function OfferList() {
  var self, _hbTemplate, _hbObject;
  self = this;
  self = {
    init: _init,
    render: _render,
    data : []
  }
  function _init(offerData, hbTemplate) {
    self.data = offerData;
    _hbTemplate = hbTemplate.html();
    _hbObject = Handlebars.compile(_hbTemplate);
    $('body').on('click', '.offer', function() { _offerClick(); });
    $('.popup').on('click', '.close-link', function() { _togglePopup(); });
  }
  function _render(destinationObj) {
    console.log(self.data);
    $(destinationObj).html(_hbObject(self.data));
  }
  // ToDo: здесь мы сделаем чтобы он у нас заполнял выбранный попап
  function _renderPopup(offerIndex) {

  }
  return self;
}