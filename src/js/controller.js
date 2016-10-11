'use strict';
(function () {
  var offerList, offerCard, _hbOfferTemplate, _demo, _demoUsers, _demoComments, _currentUser;

  $(document).ready(createOfferList);

  // Хелпер берет нужное нам количество элементов из массива, 
  // Если в массиве меньше элементов, чем мы указали взять, берет соответственно только имеющиеся
  Handlebars.registerHelper('take', function(num, visibleOnly, context, options){
    var ret = '', takeCount, startIndex, shift;
    shift = 0;
    // Если нет массива для отображения - выходим из хелпера
    if (!context) {
      return;
    }
    // Определим, сколько у нас удаленных элементов в массиве и сместим начало поиска на нужное количество элементов
    if (visibleOnly) {
      // Считаем сдвиг
      shift = $.grep(context, function(item) {
        return !!item.deleted;
      }).length;
    }
    if (!num || num == -1) {
      startIndex = 0;
    }
    if (num > context.length) {
      startIndex = 0;
    }
    else {
      startIndex = context.length - num - shift;
    }
    // Может так получиться, что начало поиска станет < 0 
    if (startIndex < 0)
    {
      startIndex = 0;
    }
    // Приделываем правильный index к элементу
    while(startIndex <= context.length-1) {
      if (visibleOnly && context[startIndex].deleted) {
        startIndex++;
        continue;
      }
      var item = context[startIndex];
      item.index = startIndex;
      ret += options.fn(item);
      startIndex++;
    }
    return ret;
  });

  function createOfferList() {
    var jOfferList, offerListCache;
    _demo = new demoData();
    offerListCache = sessionStorage.getItem('offerList');
    if (offerListCache && !offerList) {
      offers = JSON.parse(offerListCache);
    }
    else {
      offers = _demo.offers;
    }
    _currentUser = _demo.currentUser;
    _hbOfferTemplate = $('#js-offer-list-template');
    _target = $('#js-offer-list-placeholder');
    if (!offerList) {
      offerList = new OfferList();
      offerList.init(offers, _hbOfferTemplate, _currentUser);
    }
    offerList.render(_target, _currentUser);
    sessionStorage.setItem('offerList', JSON.stringify(offerList.offers));
  }
})();