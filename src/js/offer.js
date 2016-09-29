function Offer() {
  var self, _hbTemplate, _hbObject;
  self = this;
  self = {
    init: _init,
    render: _render,
    data : {}
  }
  function _init(offerData, hbTemplate) {
    self.data = offerData;
    _hbTemplate = hbTemplate;
    _hbObject = Handlebars.compile(_hbTemplate);
  }
  function _render($destinationObj) {
    $destinationObj.html(_hbObject(self));
  }
  return self;
}