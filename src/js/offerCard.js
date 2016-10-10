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
    $('#js-popup-placeholder').on('click', '.js-add', _addIt);
    $('#js-popup-placeholder').on('click', '.js-like', _likeIt);
    $('#js-popup-placeholder').on('click', '.js-mention', _toggleMention);
    $('#js-popup-placeholder').on('keypress', '.js-mention-text', _addMention);
  }

  // ToDo: здесь мы сделаем чтобы он у нас заполнял выбранный попап
  function _render(offer, destinationObj, currentUser) {
    _offer = offer || _offer;
    _currentUser = _currentUser || currentUser;
    _destinationObject = _destinationObject || destinationObj;
    $(_destinationObject).html(_cardHbObject( { data: _offer, currentUser: _currentUser }));
  }

  function _toggleMention() {
    s = $(this).parents('#js-popup-placeholder').children('.js-add-mention').toggle();
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
      _offerList.offers[currentOffer.index] = currentOffer;
      _offerList.save();
      _render(currentOffer, undefined, _currentUser);
      _offerList.render();
    }
  }
  
  function _togglePopup() {
    $('.blind').toggle();
  }

  function _addIt() {
    var offerIndex;
    offerIndex = $.inArray(_offer, _offerList.offers);
    if (_isAlreadyAdded()) {
      return;
    }
    if (!_offer.adds) {
      _offer.adds = [];
    }
    _offer.addedByCurrentUser = true;
    _offer.adds.splice(_offer.adds.length, 0, _currentUser);
    _offerList.offers.splice(offerIndex, 1, _offer);
    _offerList.save();
    _render();
    _offerList.render();
  }

  function _likeIt() {
    var offerIndex;
    offerIndex = $.inArray(_offer, _offerList.offers);
    if (_isAlreadyLiked()) {
      return;
    }
    if (!_offer.likes) {
      _offer.likes = [];
    }
    _offer.likedByCurrentUser = true;
    _offer.likes.splice(_offer.likes.length, 0, _currentUser);
    _offerList.offers.splice(offerIndex, 1, _offer);
    _offerList.save();
    _render();
    _offerList.render();
  }

   function _isAlreadyLiked()
  {
    if (!_offer.likes || !_offer.likedByCurrentUser) {  
      return false;
    }
    return true;
  }

  function _isAlreadyAdded()
  {
    if (!_offer.adds || !_offer.addedByCurrentUser) {
      return false;
    }
    return true;
  }
  return self;
}