function OfferList() {
  var self, _offerHbTemplate, _offerHbObject, _currentUser, _destinationObj, offerCard;
  self = this;
  self = {
    init: _init,
    render: _render,
    offerClick : _offerClick,
    openComment : _openComment,
    createComment : _createComment,
    deleteComment : _deleteComment,
    save: _save,
    likeIt : _likeIt,
    addIt : _addIt,
    offers : []
  }
  function _init(offerData, hbTemplate, currentUser) {
    self.offers = offerData;
    _currentUser = currentUser;
    _offerHbTemplate = _offerHbTemplate || hbTemplate.html();
    _offerHbObject = Handlebars.compile(_offerHbTemplate);
    $('#js-offer-list-placeholder').on('click', '.js-more-info', self.offerClick);
    $('#js-offer-list-placeholder').on('click', '.js-comment-link', self.openComment);
    $('#js-offer-list-placeholder').on('click', '.js-comments', self.openComment);
    $('#js-offer-list-placeholder').on('click', '.js-like-link', self.likeIt);
    $('#js-offer-list-placeholder').on('click', '.js-add-link', self.addIt);
    $('#js-offer-list-placeholder').on('click', '.js-delete-comment', self.deleteComment);
    $('#js-offer-list-placeholder').on('keypress', '.comment-input', self.createComment);
  }
  function _render(destinationObj, currentUserParam) {
    _destinationObj = destinationObj || _destinationObj;
    _currentUser = currentUserParam || _currentUser;
    $(_destinationObj).html(_offerHbObject({offers: self.offers, currentUser: _currentUser }));
  }

  function _openComment() {
    $(this).parents().closest('.js-offer').find('.js-comment').toggle();
  }

  function _createComment(e) {  
    if (e.keyCode == 13)
    {
      var offerIndex, currentInput, currentOffer;
      offerIndex = $(this).parents().closest('.js-offer').data('offer-index');
      currentOffer = self.offers[offerIndex];
      currentInput = e.target;
      if (!currentOffer.comments) {
        currentOffer.comments = [];
      }
      currentOffer.comments.splice(currentOffer.comments.length,0,{ author: _currentUser, text: $(currentInput).val() });
      currentOffer.commentsCount++;
      $(currentInput).val('');
      $(currentInput).blur();
      _save();
      _render();
    }
  }

  function _deleteComment() {
    var offerIndex, currentInput, currentOffer;
      offerIndex = $(this).parents().closest('.js-offer').data('offer-index');
      if (self.offers[offerIndex].commentsCount == 0)
        return;
      commentIndex = $(this).data('comment-index');
      self.offers[offerIndex].comments[commentIndex].deleted = true;
      self.offers[offerIndex].commentsCount--;
      _save();
      _render();
  }

  function _offerClick() {
    var currentIndex, $cardTemplate, $cardPlaceHolder;
    currentIndex = $(this).data('offer-index');
    $cardTemplate = $('#js-popup-template');
    $cardPlaceHolder =  $('#js-popup-placeholder');
    if (!offerCard) {
      offerCard = new OfferCard();
      offerCard.init($cardTemplate, self); 
    }
    offerCard.render(self.offers[currentIndex],  $cardPlaceHolder, _currentUser);
    $('.js-blind').toggle();
  }

  function _likeIt() {
    var offerIndex, currentOffer;
    offerIndex = $(this).parents().closest('.js-offer').data('offer-index');
    currentOffer = self.offers[offerIndex];
    if (_isAlreadyLiked(_currentUser, currentOffer)) {
      return;
    }
    if (!currentOffer.likes) {
      currentOffer.likes = [];
    }
    currentOffer.likes.splice(currentOffer.likes.length,0, _currentUser);
    currentOffer.likedByCurrentUser = true;
    _save();
    _render();
  }

  function _addIt() {
    var offerIndex, currentOffer;
    offerIndex = $(this).parents().closest('.js-offer').data('offer-index');
    currentOffer = self.offers[offerIndex];
    if (_isAlreadyAdded(_currentUser, currentOffer)) {
      return;
    }
    if (!currentOffer.adds) {
      currentOffer.adds = [];
    }
    currentOffer.adds.splice(currentOffer.adds.length,0, _currentUser);
    currentOffer.addedByCurrentUser = true;
    _save();
    _render();
  }

  function _isAlreadyLiked(user, currentOffer)
  {
    if (!currentOffer.likes || !currentOffer.likedByCurrentUser) {
      return false;
    }
    return true;
  }

  function _isAlreadyAdded(user, currentOffer)
  {
    if (!currentOffer.adds || !currentOffer.addedByCurrentUser) {
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