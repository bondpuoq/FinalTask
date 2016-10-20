'use strict';
(function () {
  var offerArray, offer, currentUser, offerListing;

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
      // Считаем сдвиг
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

  // function createOfferList() {
  //   var offerListCache, _target;
  //   _demo = new demoData();
  //   offerListCache = sessionStorage.getItem('offerList');
  //   if (offerListCache && !offerList) {
  //     offers = JSON.parse(offerListCache);
  //   }
  //   else {
  //     offers = _demo.offers;
  //   }
  //   _currentUser = _demo.currentUser;
  //   _hbOfferTemplate = $('#js-offer-list-template');
  //   _target = $('#js-offer-list-placeholder');
  //   if (!offerList) {
  //     offerList = new OfferList();
  //     offerList.init(offers, _hbOfferTemplate, _currentUser);
  //   }
  //   offerList.render(_target, _currentUser);
  //   sessionStorage.setItem('offerList', JSON.stringify(offerList.offers));
  // }

  // !!!!!!!!!!!! Добавить сюда, чтобы он данные брал из SessionStorage, когда перезагружает страницу !!!!!!!!!!!!!!!!
  function start() {
    var demo;
    demo = new demoData();
    // Задаем от лица кого мы сидим на сайте
    currentUser = demo.currentUser;
    offerArray = demo.offers;
    // Начинаем генерировать плитку офферов
    offerListing = new OfferListing();
    offerListing.init('#js-offer-list-template');
    offerListing.render('#js-offer-list-placeholder', offerArray, currentUser);

    offer = new Offer();
  }

  function initializeHandlers() {
    $('#js-popup-placeholder')
      .on('click', '.js-close-link', function() { toggleVisibility('.js-blind', true); })
      //.on('click', '.js-add', _addIt)
      //.on('click', '.js-like', _likeIt)
      .on('click', '.js-mention', function() { toggleVisibility('.js-add-mention'); });
      //.on('keypress', '.js-mention-text', _addMention)
      //.on('click', '.js-delete-offer', _deleteOffer);
    $('#js-offer-list-placeholder')
      //.on('click', '.js-more-info', _renderPopup)
      .on('click', '.js-comment-link', function() { toggleVisibility('.js-comment'); })
      //.on('click', '.js-comments', self.openComment)
      .on('click', '.js-like-link', function() { addFeedback('like'); })
      .on('click', '.js-add-link', function() { addFeedback('add'); });
      //.on('click', '.js-delete-comment', self.deleteComment)
      //.on('keypress', '.js-comment-input', self.createComment);
  }

  function toggleVisibility(whatToggle, isPopup) {
    var offerId = getOfferId(event);
    offer.toggleVisibility(whatToggle, offerId, isPopup);
  }

  function addFeedback(whatAdd) {
    var currentOffer, offerId;
    offerId = getOfferId(event);
    currentOffer = getFirstItemById(offerArray, offerId);
    offer.addFeedback(whatAdd, offerArray, currentOffer, currentUser);
    offerListing.render('#js-offer-list-placeholder', offerArray, currentUser);
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

  // Получаем id оффера с разметки через event
  function getOfferId(event) {
    return $(event.target).data('offer-id');
  }
  function saveOfferArray() {
    sessionStorage.setItem('offerArray',  JSON.stringify(offerArray));
  }

})();