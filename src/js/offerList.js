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
  }
  function _render(destinationObj) {
    console.log(self.data);
    $(destinationObj).html(_hbObject(self.data));
  }
  return self;
}