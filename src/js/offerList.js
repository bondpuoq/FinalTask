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
    $('#js-offer-list-placeholder')
      .on('click', '.js-more-info', self.offerClick)
      .on('click', '.js-comment-link', self.openComment)
      .on('click', '.js-comments', self.openComment)
      .on('click', '.js-like-link', self.likeIt)
      .on('click', '.js-add-link', self.addIt)
      .on('click', '.js-delete-comment', self.deleteComment)
      .on('keypress', '.js-comment-input', self.createComment);
  }
  function _render(destinationObj, currentUserParam) {
    _destinationObj = destinationObj || _destinationObj;
    _currentUser = currentUserParam || _currentUser;
    $(_destinationObj).html(_offerHbObject({offers: self.offers, currentUser: _currentUser }));
  }

  function _openComment() {
    $(this).parents().closest('.js-offer').find('.js-comment').toggle();
    $(this).parents().closest('.js-offer').find('.js-comment-input').focus();
  }

  function _createComment(e) {  
    if (e.keyCode == 13) {
      var offerId, currentInput, currentOffer;
      offerId = $(this).parents().closest('.js-offer').data('offer-id');
      currentOffer = self.offers[offerId];
      currentInput = e.target;
      if (!currentOffer.comments) {
        currentOffer.comments = [];
        currentOffer.commentsCount = 0;
      }
      currentOffer.comments.splice(currentOffer.comments.length,0,{ author: _currentUser, text: $(currentInput).val() });
      currentOffer.commentsCount++;
      $(currentInput).val('');
      _save();
      _render();
    }
  }

  function _deleteComment() {
    var offerId, currentOffer, currentComment;
      offerId = $(this).data('offer-id');
      currentOffer = _getFirstItemById(self.offers, offerId);
      if (currentOffer.commentsCount == 0)
        return;
      commentId = $(this).data('comment-id');
      currentComment = _getFirstItemById(currentOffer.comments, commentId);
      currentComment.deleted = true;
      currentOffer.commentsCount--;
      _save();
      _render();
  }

  function _offerClick() {
    var currentIndex, $cardTemplate, $cardPlaceHolder;
    currentIndex = $(this).data('offer-id');
    $cardTemplate = $('#js-popup-template');
    $cardPlaceHolder =  $('#js-popup-placeholder');
    if (!offerCard) {
      offerCard = new OfferCard();
      offerCard.init($cardTemplate, self); 
    }
    offerCard.render(self.offers[currentIndex],  $cardPlaceHolder, _currentUser);
    $('.js-blind').toggle();
    $('.popup').css({marginTop: 50 + $(document).scrollTop()});
  }

  function _likeIt() {
    var offerId, currentOffer;
    offerId = $(this).parents().closest('.js-offer').data('offer-id');
    currentOffer = self.offers[offerId];
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
    var offerId, currentOffer;
    offerId = $(this).parents().closest('.js-offer').data('offer-id');
    currentOffer = self.offers[offerId];
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

  function _isAlreadyLiked(user, currentOffer) {
    if (!currentOffer.likes || !currentOffer.likedByCurrentUser) {
      return false;
    }
    return true;
  }

  function _isAlreadyAdded(user, currentOffer) {
    if (!currentOffer.adds || !currentOffer.addedByCurrentUser) {
      return false;
    }
    return true;
  }
  function _getFirstItemById(arr, itemId) {
    if (!arr) return;
    var result;
    result = $.grep(arr, function(item) {
      return (item.id == itemId);
    });
    return result[0];
  }
  function _save() {
    sessionStorage.removeItem('offerList');
    sessionStorage.setItem('offerList', JSON.stringify(self.offers));
  }
  return self;
}