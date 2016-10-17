function OfferCard() {
  var self, _cardHbTemplate, _cardHbObject, _currentUser, _offer, _destinationObject, _offerList;
  self = this;
  self = {
    init : _init,
    render : _render,
    addMention : _addMention
  }

  function _init(hbTemplate, offerList) {
    _offerList = _offerList || offerList;
    _cardHbTemplate = _cardHbTemplate || hbTemplate.html();
    _cardHbObject = Handlebars.compile(_cardHbTemplate);
    $('#js-popup-placeholder').on('click', '.close-link', _togglePopup);
    $('#js-popup-placeholder').on('click', '.js-add', _addIt);
    $('#js-popup-placeholder').on('click', '.js-like', _likeIt);
    $('#js-popup-placeholder').on('click', '.js-mention', _toggleMention);
    $('#js-popup-placeholder').on('keypress', '.js-mention-text', _addMention);
    $('#js-popup-placeholder').on('click', '.js-delete-offer', _deleteOffer);
  }

  function _render(offer, destinationObj, currentUser) {
    _offer = offer || _offer;
    _currentUser = _currentUser || currentUser;
    _destinationObject = _destinationObject || destinationObj;
    $(_destinationObject).html(_cardHbObject( { data: _offer, currentUser: _currentUser }));
  }

  function _toggleMention() {
    $(this).parents('#js-popup-placeholder').children('.js-add-mention').toggle();
    $(this).parents('#js-popup-placeholder').children('.js-add-mention').find('.js-mention-text').focus();
  }

  function _addMention(e) { 
    if (e.keyCode == 13) {
      var currentInput, offerIndex;
      offerIndex = $.inArray(_offer, _offerList.offers);
      currentInput = e.target;
      if (!_offer.mentions) {
        _offer.mentions = [];
      }
      _offer.mentions.splice(_offer.mentions.length,0,{ author: _currentUser, text: $(currentInput).val() });
      $(currentInput).val('');
      $(currentInput).blur();
      _offerList.offers[offerIndex] = _offer;
      _offerList.save();
      _render(_offer, undefined, _currentUser);
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

   function _isAlreadyLiked() {
    if (!_offer.likes || !_offer.likedByCurrentUser) {  
      return false;
    }
    return true;
  }

  function _isAlreadyAdded() {
    if (!_offer.adds || !_offer.addedByCurrentUser) {
      return false;
    }
    return true;
  }

  function _deleteOffer() {
    _offer.deleted = true;
    _offerList.save();
    _togglePopup();
    _offerList.render();
  }
  return self;
}