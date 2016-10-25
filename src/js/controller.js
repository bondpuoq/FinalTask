'use strict';
(function () {
  var demo, offerArray, offer, currentUser, offerListing, POPUP_TEMPLATE, $POPUP_PLACEHOLDER, OFFER_LIST_TEMPLATE, $OFFER_LIST_PLACEHOLDER, $grid;
  OFFER_LIST_TEMPLATE = $('#js-offer-list-template').html();
  $OFFER_LIST_PLACEHOLDER = $('#js-offer-list-placeholder');
  POPUP_TEMPLATE = $('#js-popup-template').html();
  $POPUP_PLACEHOLDER = $('#js-popup-placeholder');

  $(document).ready(function() {
    init(); 
    initializeHandlers(); 
  });

  // Хелпер берет нужное нам количество элементов из массива, 
  // Если в массиве меньше элементов, чем мы указали взять, берет соответственно только имеющиеся
  Handlebars.registerHelper('take', function(num, visibleOnly, context, options) {
    var arr, ret = '';
    // Если нет массива для отображения - выходим из хелпера
    if (!context) {
      return;
    }
    if (visibleOnly) {
      arr = $.grep(context, function(item) {
        return !item.deleted;
      });
      //arr.reverse().slice(0,num);
      arr.slice(0,num);
      $.each(arr,function() { 
        ret+= options.fn(this);
      });
    } else {
      $.each(context,function() { 
        ret+= options.fn(this);
      });
    }
    
    return ret;
  });

  function init() {
    offerArray = JSON.parse(sessionStorage.getItem('offerArray'));

    if (!offerArray) {
      demo = new demoData();
      // Задаем от лица кого мы сидим на сайте
      offerArray = demo.offers;
    }
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
      currentUser = demo.currentUser;
    }
    // Очищаем текст недозаполненного коммента, если он там есть
    clearUndoneText();
    // Начинаем генерировать плитку офферов
    offerListing = new OfferListing();

    $grid = offerListing.render(OFFER_LIST_TEMPLATE, $OFFER_LIST_PLACEHOLDER, offerArray, currentUser);
    offer = new Offer();
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  function initializeHandlers() {
    $POPUP_PLACEHOLDER
      .on('click', '.js-close-link', function() { 
        toggleVisibility('.js-blind'); 
      })
      .on('click', '.js-add', function() { 
        addFeedback('adds', true); 
      })
      .on('click', '.js-like', function() { 
        addFeedback('likes', true); 
      })
      .on('click', '.js-mention', function() { 
        toggleVisibility('.js-add-mention'); 
      })
      .on('keypress', '.js-mention-text', function() { 
        addFeedback('mentions', true); 
      })
      .on('click', '.js-delete-offer', function() { 
        deleteOffer(); 
        toggleVisibility('.js-blind'); 
      });
    $OFFER_LIST_PLACEHOLDER
      .on('click', '.js-more-info', function() { 
        showPopup(); 
        toggleVisibility('.js-blind'); 
      })
      .on('click', '.js-comment-link', function() { 
        toggleVisibility('.js-comment'); 
      })
      .on('click', '.js-comments', function() { 
        toggleVisibility('.js-comment'); 
        stopPropagation();
      })
      .on('click', '.js-like-link', function() { 
        addFeedback('likes'); 
      })
      .on('click', '.js-add-link', function() { 
        addFeedback('adds'); 
      })
      .on('click', '.js-delete-comment', function() { 
        deleteFeedback('comments'); 
      })
      .on('keypress', '.js-comment-input', function() { 
        addFeedback('comments'); 
      })
      .on('blur', '.js-comment-input', function() {
        saveInputState();
      });
  }
  function clearUndoneText() {
    if (offerArray) {
      for (var i = 0, length = offerArray.length; i<length; i++) {
        delete offerArray[i].commentText;
      }
      saveOfferArray();
    }
  }

  function toggleVisibility(selector) {
    var offerId;
    offerId = $(event.target).data('offer-id');
    if ($(event.target).hasClass('js-comment-link') || $(event.target).hasClass('js-comments')) {
      selector += '[data-offer-id='+ offerId +']'
    }
    offer.toggleVisibility(selector);
    $grid.masonry();
  }

  function addFeedback(feedbackType, isPopup) {
    var currentOffer, offerId, allowUpdate;
    offerId = $(event.target).data('offer-id');
    currentOffer = getFirstItemById(offerArray, offerId);
    allowUpdate = offer.addFeedback(feedbackType, offerArray, currentOffer, currentUser, event);
    if (allowUpdate) {
      offerListing.render(OFFER_LIST_TEMPLATE, $OFFER_LIST_PLACEHOLDER, offerArray, currentUser);
      saveOfferArray();
      if (isPopup) {
        offer.renderPopup(POPUP_TEMPLATE, $POPUP_PLACEHOLDER, currentOffer, currentUser);
        event.stopPropagation();
      }
      event.stopPropagation();
    }
    clearUndoneText();
  }

  function saveInputState() {
    offerId = $(event.target).data('offer-id');
    currentOffer = getFirstItemById(offerArray, offerId);
    offer.saveInputState(event, currentOffer);
    saveOfferArray();
  }

  function deleteFeedback(whatDelete) {
    var currentOffer, currentComment, offerId, commentId, affectOn;
    affectOn = whatDelete;
    offerId = $(event.target).data('offer-id');
    currentOffer = getFirstItemById(offerArray, offerId);
    commentId = $(event.target).data('comment-id');
    currentComment = getFirstItemById(currentOffer[affectOn], commentId);

    offer.deleteFeedback(whatDelete, offerArray, currentOffer, currentComment);

    offerListing.render(OFFER_LIST_TEMPLATE, $OFFER_LIST_PLACEHOLDER, offerArray, currentUser);
    event.preventDefault();
    saveOfferArray();
  }

  function showPopup() {
    var offerId, currentOffer;
    offerId = $(event.target).data('offer-id');
    currentOffer = getFirstItemById(offerArray, offerId);
    offer.renderPopup(POPUP_TEMPLATE, $POPUP_PLACEHOLDER, currentOffer, currentUser);
  }

  function deleteOffer() {
    offerId = $(event.target).data('offer-id');
    currentOffer = getFirstItemById(offerArray, offerId);
    offer.deleteOffer(currentOffer);
    saveOfferArray();
    offerListing.render(OFFER_LIST_TEMPLATE, $OFFER_LIST_PLACEHOLDER, offerArray, currentUser);
  }
  // Получаем определенный оффер по его id
  function getFirstItemById(arr, itemId) {
    if (!arr) {
      return;
    }
    var result;
    result = $.grep(arr, function(item) {
      return (item.id == itemId);
    });
    return result[0];
  }
  
  function saveOfferArray() {
    sessionStorage.setItem('offerArray',  JSON.stringify(offerArray));
  }

})();