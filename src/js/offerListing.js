function OfferListing() {
  var self, _hbTemplateObject;
  self = this;
  self = {
    init : _init,
    render : _render
  }
  function _init(template) {
  // Так как при первом рендере у нас исчезает handlebars шаблон, мы его сохраняем в _hbTemplateObject. Но если нам при вызове _init предоставляют шаблон, то мы используем его
    _hbTemplateObject = Handlebars.compile($(template).html());
  }
  // Тут нам указывают, куда складывать сгенеренный шаблон
  function _render(placeToPut, offers, currentUser) {
    $(placeToPut).html(_hbTemplateObject({ offers: offers, currentUser: currentUser}));
  }
  return self;
}