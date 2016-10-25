function OfferListing() {
  var self, $grid;
  self = this;
  self = {
    render : _render
  }
  // Тут нам указывают, куда складывать сгенеренный шаблон
  function _render(template, $placeholder, offers, currentUser) {
    if ($grid) {
      $grid.masonry('destroy');
    }
    var hbTemplateObject = Handlebars.compile(template);
    $placeholder.html(hbTemplateObject({ offers: offers, currentUser: currentUser}));
    $grid = $('.js-offer-list').masonry({
      itemSelector: '.js-offer',
      gutter: 10,
      initLayout: false,
    });

    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });

    return $grid;
  }
  return self;
}