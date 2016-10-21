'use strict';
(function () {
  var offerArray, offer, currentUser, offerListing, isPopupReady, popupTemplate, popupPlaceholder, offerListTemplate, offerListPlaceholder;

  $(document).ready(function() { start(); initializeHandlers(); });

  // Хелпер берет нужное нам количество элементов из массива, 
  // Если в массиве меньше элементов, чем мы указали взять, берет соответственно только имеющиеся
  Handlebars.registerHelper('take', function(num, visibleOnly, context, options){
    var ret = '';
    // Если нет массива для отображения - выходим из хелпера
    if (!context) {
      return;
    }
    if (visibleOnly) {
      arr = $.grep(context, function(item) {
        return !item.deleted;
      })
      arr.reverse().slice(0,num);
      $.each(arr,function() { ret+= options.fn(this)});
    }
    else {
      $.each(context,function(){ ret+= options.fn(this)});
    }
    
    return ret;
  });

  function start() {
    offerArray = JSON.parse(sessionStorage.getItem('offerArray'));
    offerListTemplate = '#js-offer-list-template';
    offerListPlaceholder = '#js-offer-list-placeholder';
    popupTemplate = '#js-popup-template';
    popupPlaceholder = '#js-popup-placeholder';

    if (!offerArray) {
      var demo;
      demo = new demoData();
      // Задаем от лица кого мы сидим на сайте
      offerArray = demo.offers;
    }
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
      currentUser = demo.currentUser;
    }
    // Начинаем генерировать плитку офферов
    offerListing = new OfferListing();
    offerListing.init('#js-offer-list-template');
    offerListing.render('#js-offer-list-placeholder', offerArray, currentUser);
    offer = new Offer();
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  function initializeHandlers() {
    $('#js-popup-placeholder')
      .on('click', '.js-close-link', function() { toggleVisibility('.js-blind', true); })
      .on('click', '.js-add', function() { addFeedback('adds', true); })
      .on('click', '.js-like', function() { addFeedback('likes', true); })
      .on('click', '.js-mention', function() { toggleVisibility('.js-add-mention'); })
      .on('keypress', '.js-mention-text', function() { addFeedback('mentions', true); })
      .on('click', '.js-delete-offer', function() { deleteOffer(); toggleVisibility('.js-blind', true); });
    $('#js-offer-list-placeholder')
      .on('click', '.js-more-info', function() { showPopup(); toggleVisibility('.js-blind', true); })
      .on('click', '.js-comment-link', function() { toggleVisibility('.js-comment'); })
      .on('click', '.js-comments', function() { toggleVisibility('.js-comment'); })
      .on('click', '.js-like-link', function() { addFeedback('likes'); })
      .on('click', '.js-add-link', function() { addFeedback('adds'); })
      .on('click', '.js-delete-comment', function() { deleteFeedback('comments'); })
      .on('keypress', '.js-comment-input', function() { addFeedback('comments'); });
  }

  function toggleVisibility(whatToggle, isPopup) {
    var offerId = getEntityId(event, 'offer');
    offer.toggleVisibility(whatToggle, offerId, isPopup);
  }

  function addFeedback(whatAdd, isPopup) {
    var currentOffer, offerId, allowUpdate;
    offerId = getEntityId(event, 'offer');
    currentOffer = getFirstItemById(offerArray, offerId);
    allowUpdate = offer.addFeedback(whatAdd, offerArray, currentOffer, currentUser, event);
    if (allowUpdate) {
      offerListing.render(offerListPlaceholder, offerArray, currentUser);
      saveOfferArray();
      if (isPopup) {
        offer.renderPopup(popupPlaceholder, currentOffer, currentUser);
        event.stopPropagation();
      }
    }
  }

  function deleteFeedback(whatDelete) {
    var currentOffer, currentComment, offerId, commentId, affectOn;
    affectOn = whatDelete;
    offerId = getEntityId(event, 'offer');
    currentOffer = getFirstItemById(offerArray, offerId);
    commentId = getEntityId(event, 'comment');
    currentComment = getFirstItemById(currentOffer[affectOn], commentId);

    offer.deleteFeedback(whatDelete, offerArray, currentOffer, currentComment);

    offerListing.render(offerListPlaceholder, offerArray, currentUser);
    saveOfferArray();
  }

  function showPopup() {
    var hbTemplate, placeToPut, offerId, currentOffer;
    offerId = getEntityId(event, 'offer');
    currentOffer = getFirstItemById(offerArray, offerId);
    if (!isPopupReady) {
      offer.initPopup(popupTemplate);
      isPopupReady = true;
    }
    offer.renderPopup(popupPlaceholder, currentOffer, currentUser);
  }

  function deleteOffer() {
    offerId = getEntityId(event, 'offer');
    currentOffer = getFirstItemById(offerArray, offerId);
    offer.deleteOffer(currentOffer);
    saveOfferArray();
    offerListing.render(offerListPlaceholder, offerArray, currentUser);
  }
  // Получаем определенный оффер по его id
  function getFirstItemById(arr, itemId) {
    if (!arr) return;
    var result;
    result = $.grep(arr, function(item) {
      return (item.id == itemId);
    });
    return result[0];
  }

  // Получаем id какой-либо сущности (не важно, оффера, коммента или чего либо еще)
  function getEntityId(event, entityName) {
    var dataName = entityName + '-id';
    return $(event.target).data(dataName);
  }
  
  function saveOfferArray() {
    sessionStorage.setItem('offerArray',  JSON.stringify(offerArray));
  }

})();