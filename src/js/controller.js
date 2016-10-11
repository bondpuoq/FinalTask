'use strict';
(function () {
  var offerList, offerCard, _hbOfferTemplate, _demo, _demoUsers, _demoComments, _currentUser;

  $(document).ready(createOfferList);

  Handlebars.registerHelper('take', function(num, context, options){
    var ret = '', takeCount, startIndex;
    if (!context) {
      return;
    }
    if (num > context.length) {
      startIndex = 0;
    }
    else {
      startIndex = context.length - num;
    }
    
    while(startIndex <= context.length-1) {
      ret = ret + options.fn(context[startIndex]);
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