function Offer() {
  var _self;
  self = this;
  self.toggleVisibility = _toggleVisibility;
  self.addFeedback = _addFeedback;

  function _renderPopup() {
    
  }
  function _toggleVisibility(whatToggle, offerId, isPopup) {
    var selector;
    if (isPopup) {
      selector = whatToggle;
    } else {
      selector = whatToggle + '[data-offer-id='+ offerId +']';
    }
    $(selector).toggle();
  }
  function _addFeedback(whatAdd, offerArray, currentOffer, currentUser) {
    var affectOn, triggerFieldName;
    switch (whatAdd) {
      case 'comment': ;
      case 'mention': ;
      case 'like': { 
        affectOn = 'likes'; 
        triggerFieldName = 'likedByCurrentUser';
        break;
      }
      case 'add': {
        affectOn = 'adds'; 
        triggerFieldName = 'addedByCurrentUser';
        break;
      }
    }
    if (currentOffer[triggerFieldName] == true) {
      return;
    }
    if (!currentOffer[affectOn]) {
      currentOffer[affectOn] = [];
    }
    currentOffer[affectOn].splice(currentOffer[affectOn].length,0, currentUser)
    currentOffer[triggerFieldName] = true;
  }

  function _saveOfferState(offerArray) {
    sessionStorage.removeItem('offerArray');
    sessionStorage.setItem('offerArray',  JSON.stringify(offerArray));
  }
  return self;
}