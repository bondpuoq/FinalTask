function OfferCard() {
  var self, _cardHbTemplate, _cardHbObject, _currentUser, _offer, _destinationObject, _offerList;
  self = this;
  self = {
    init : _init,
    render : _render,
    addMention : _addMention
  }

    // ToDo: засовываем в инит шаблон Handlebars и данные выбранного оффера
  function _init(hbTemplate, offerList) {
    _offerList = _offerList || offerList;
    _cardHbTemplate = _cardHbTemplate || hbTemplate.html();
    _cardHbObject = Handlebars.compile(_cardHbTemplate);
    $('#js-popup-placeholder').on('click', '.close-link', _togglePopup);
    $('#js-popup-placeholder').on('keypress', '.js-mention-text', _addMention);
  }

  // ToDo: здесь мы сделаем чтобы он у нас заполнял выбранный попап
  function _render(offer, destinationObj, currentUser) {
    _offer = offer;
    _currentUser = currentUser;
    _destinationObject = _destinationObject || destinationObj;
    $(_destinationObject).html(_cardHbObject( { data: offer, currentUser: currentUser }));
  }

  function _addMention(e) { 
    //var offerList;
    //offerList = JSON.parse(sessionStorage.getItem('offerList')); 
    if (e.keyCode == 13)
    {
      var offerIndex, currentInput, currentOffer;
      currentOffer = _offer;
      currentInput = e.target;
      if (!currentOffer.mentions) {
        currentOffer.mentions = [];
      }
      currentOffer.mentions.splice(currentOffer.mentions.length,0,{ author: _currentUser, text: $(currentInput).val() });
      $(currentInput).val('');
      $(currentInput).blur();
      console.log(currentOffer);
      _offerList.offers[currentOffer.index] = currentOffer;
      _save();
      _render(currentOffer, undefined, _currentUser);
      _offerList.render();
    }
  }
  
  function _togglePopup() {
    $('.blind').toggle();
  }

  function _save(){
    sessionStorage.removeItem('offerList');
    sessionStorage.setItem('offerList', JSON.stringify(_offerList.offers));
  }
  return self;
}