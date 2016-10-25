function Offer() {
  var self;
  self = this;
  self = {
    toggleVisibility : _toggleVisibility,
    addFeedback : _addFeedback,
    deleteFeedback : _deleteFeedback,
    renderPopup : _renderPopup,
    deleteOffer : _deleteOffer,
    saveInputState : _saveInputState
  }
  function _renderPopup(template, $placeholder, currentOffer, currentUser) {
    var hbTemplateObject = Handlebars.compile(template);
    $placeholder.html(hbTemplateObject({ offer: currentOffer, currentUser: currentUser}));
    $placeholder.css({marginTop: $(document).scrollTop()});
  }
  function _toggleVisibility(selector) {
    $(selector).toggle();
  }
  function _addFeedback(feedbackType, offerArray, currentOffer, currentUser, event) {
    var isDone;
    isDone = false;
    switch (feedbackType) {
      case 'mentions': 
      case 'comments': {
        if (event.keyCode == 13) {
          var currentInput;
          currentInput = event.target;
          _createTextFeedback(feedbackType, currentInput, currentOffer, currentUser);
          // Триггер на обновление содержимого листинга, иначе обновляется при нажатии на каждую кнопку, из-за инпутов
          isDone = true;
        }
        break;
      }
      case 'likes':
      case 'adds': { 
        _createCounterFeedback(feedbackType, currentOffer, currentUser);
        isDone = true;
        break;
      }
    }
    return isDone;
  }
  function _saveInputState(event, currentOffer) {
    var inputValue, currentInput;
    currentInput = event.target;
    inputValue = $(currentInput).val();
    if (inputValue) {
      currentOffer['commentText'] = inputValue;
    }
  }
  function _deleteFeedback(whatDelete, offerArray, currentOffer, currentComment) {
    var triggerFieldName;
    triggerFieldName = whatDelete + 'Count';
    if (currentOffer[triggerFieldName] == 0) {
      return;
    }
    currentComment.deleted = true;
    currentOffer[triggerFieldName]--;
  }

  function _deleteOffer(currentOffer) {
    currentOffer.deleted = true;
  }
  function _createTextFeedback(affectOn, currentInput, currentOffer, currentUser) {
    var newFeedback;
    triggerFieldName = affectOn + 'Count';
    nextId = (Math.random().toString(16)+"000000000").substr(2,8).toString();
    newFeedback = {
      id : nextId,
      author : currentUser,
      text : $(currentInput).val()
    };
    currentOffer[affectOn].splice(currentOffer[affectOn].length, 0, newFeedback);
    currentOffer[triggerFieldName]++;
    $(currentInput).val('');
  }
  function _createCounterFeedback(affectOn, currentOffer, currentUser) {
    triggerFieldName = affectOn+'ByCurrentUser';
    // Если уже поставили лайк или добавили к себе
    if (currentOffer[triggerFieldName] == true) {
      return;
    }
    currentOffer[affectOn].splice(currentOffer[affectOn].length, 0, currentUser)
    currentOffer[triggerFieldName] = true;
  }
  return self;
}