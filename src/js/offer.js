function Offer() {
  var self, _hbTemplate, _hbObject;
  self = this;
  self = {
    init: _init,
    render: _render,
    offerImg,
    caption,
    category,
    dateBegin,
    dateEnd,
    location,
    feedbacks:[],
    author

  }
  function _init(offerData, hbTemplate) {
    self.offerImg = offerData.img;
    self.caption = offerData.caption;
    self.category = offerData.category;
    self.dateBegin = offerData.dateBegin;
    self.dateEnd = offerData.dateEnd;
    self.location = offerData.location;
    self.feedbacks = offerData.feedbacks;
    self.author = offerData.author;
    _hbTemplate = hbTemplate;
    _hbObject = Handlebars.compile(_hbTemplate);
  }
  function _render($destinationObj) {
    $destinationObj.html(_hbObject(self));
  }
  return self;
}