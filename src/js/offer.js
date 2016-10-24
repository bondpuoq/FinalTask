function Offer() {
  var self;
  self = this;
  self = {
    toggleVisibility : _toggleVisibility,
    addFeedback : _addFeedback,
    deleteFeedback : _deleteFeedback,
    renderPopup : _renderPopup,
    deleteOffer : _deleteOffer
  }
  function _renderPopup(template, $placeholder, currentOffer, currentUser) {
    var hbTemplateObject = Handlebars.compile(template);
    $placeholder.html(hbTemplateObject({ offer: currentOffer, currentUser: currentUser}));
    $placeholder.css({marginTop: 50 + $(document).scrollTop()});
  }
  function _toggleVisibility(selector) {
    $(selector).toggle();
  }
  function _addFeedback(whatAdd, offerArray, currentOffer, currentUser, event) {
    var affectOn, triggerFieldName, isDone;
    isDone = false;
    switch (whatAdd) {
      case 'mentions': 
      case 'comments': {
        if (event.keyCode == 13) {
          affectOn = whatAdd;
          triggerFieldName = whatAdd + 'Count';
          var currentInput, lastFeedbackId = 0;
          currentInput = event.target;
          // Если нет еще массива с отзывами, создаем его, иначе выдаст undefined
          if (!currentOffer[affectOn]) {
            currentOffer[affectOn] = [];
            currentOffer[triggerFieldName] = 0;
          }
          // Так как мы добавили idшники к комментам - теперь нам надо еще и сохранять id, поэтому если в массиве уже есть комменты или отзывы, мы ищем максимальный idшник и прибавляем к нему 1
          // чтобы получить id для нового коммента/отзыва  
          else {
            currentOffer[affectOn].forEach(function(item) {
              itemId = parseInt(item.id)
              if (itemId >= parseInt(lastFeedbackId)) {
                lastFeedbackId = itemId + 1; 
              }
            });
          }
          currentOffer[affectOn].splice(currentOffer[affectOn].length,0,{ id: lastFeedbackId, author: currentUser, text: $(currentInput).val() });
          currentOffer[triggerFieldName]++;
          $(currentInput).val('');
          // Триггер на обновление содержимого листинга, иначе обновляется при нажатии на каждую кнопку, из-за инпутов
          isDone = true;
        }
        break;
      }
      case 'likes':
      case 'adds': { 
        affectOn = whatAdd; 
        triggerFieldName = whatAdd+'ByCurrentUser';
        // Если уже поставили лайк или добавили к себе
        if (currentOffer[triggerFieldName] == true) {
          return;
        }
        if (!currentOffer[affectOn]) {
          currentOffer[affectOn] = [];
        }
        currentOffer[affectOn].splice(currentOffer[affectOn].length, 0, currentUser)
        currentOffer[triggerFieldName] = true;
        isDone = true;
        break;
      }
    }
    return isDone;
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

  return self;
}