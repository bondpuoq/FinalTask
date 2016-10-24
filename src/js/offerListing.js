function OfferListing() {
  var self;
  self = this;
  self = {
    render : _render
  }
  // Тут нам указывают, куда складывать сгенеренный шаблон
  function _render(template, $placeholder, offers, currentUser) {
    var hbTemplateObject = Handlebars.compile(template);
    $placeholder.html(hbTemplateObject({ offers: offers, currentUser: currentUser}));
  }
  return self;
}