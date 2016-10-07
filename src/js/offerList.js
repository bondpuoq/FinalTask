function OfferList() {
  var self, _offerHbTemplate, _offerHbObject, _currentUser, _destinationObj, offerCard;
  self = this;
  self = {
    init: _init,
    render: _render,
    offerClick : _offerClick,
    openComment : _openComment,
    saveComment : _saveComment,
    likeIt : _likeIt,
    offers : []
  }
  function _init(offerData, hbTemplate, currentUser) {
    self.offers = offerData;
    _currentUser = currentUser;
    _offerHbTemplate = _offerHbTemplate || hbTemplate.html();
    _offerHbObject = Handlebars.compile(_offerHbTemplate);
    $('#js-offer-list-placeholder').on('click', '.js-more-info', self.offerClick);
    $('#js-offer-list-placeholder').on('click', '.js-comment-link', self.openComment);
    $('#js-offer-list-placeholder').on('click', '.js-like-link', self.likeIt);
    $('#js-offer-list-placeholder').on('keypress', '.comment-input', self.saveComment);
  }
  function _render(destinationObj, currentUserParam) {
    _destinationObj = destinationObj || _destinationObj;
    _currentUser = currentUserParam || _currentUser;
    $(_destinationObj).html(_offerHbObject({offers: self.offers, currentUser: _currentUser}));
  }

  function _openComment() {
    $(this).parents().closest('.offer').find('.js-comment').toggle();
  }

  function _saveComment(e) {  
    if (e.keyCode == 13)
    {
      var offerIndex, currentInput, currentOffer;
      offerIndex = $(this).parents().closest('.offer').data('offer-index');
      currentOffer = self.offers[offerIndex];
      currentInput = e.target;
      if (!currentOffer.comments) {
        currentOffer.comments = [];
      }
      currentOffer.comments.splice(currentOffer.comments.length,0,{ author: _currentUser, text: $(currentInput).val() });
      $(currentInput).val('');
      $(currentInput).blur();
      _save();
      _render();
    }
  }

  function _offerClick() {
    var currentIndex, $cardTemplate, $cardPlaceHolder;
    currentIndex = $(this).data('offer-index');
    $cardTemplate = $('#js-popup-template');
    $cardPlaceHolder =  $('#js-popup-placeholder');
    if (!offerCard) {
      offerCard = new OfferCard();
      offerCard.init($cardTemplate); 
    }
    offerCard.render(self.offers[currentIndex],  $cardPlaceHolder, _currentUser);
    $('.js-blind').toggle();
  }

  function _likeIt() {
    var offerIndex, currentOffer;
    offerIndex = $(this).parents().closest('.offer').data('offer-index');
    currentOffer = self.offers[offerIndex];
    if (_isAlreadyLiked(_currentUser, currentOffer)) {
      return;
    }
    if (!currentOffer.likes) {
      currentOffer.likes = [];
    }
    currentOffer.likes.splice(currentOffer.likes.length,0, _currentUser);
    _save();
    _render();
  }

  function _isAlreadyLiked(user, currentOffer)
  {
    if (!currentOffer.likes || $.inArray(user, currentOffer.likes) == -1) {
      return false;
    }
    return true;
  }

  function _save(){
    sessionStorage.removeItem('offerList');
    sessionStorage.setItem('offerList', JSON.stringify(self.offers));
  }
  return self;
}