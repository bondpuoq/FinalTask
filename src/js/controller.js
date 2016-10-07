'use strict';
(function () {
  var offerList, offerCard, _hbOfferTemplate, _demo, _demoUsers, _demoComments, _currentUser;

  $(document).ready(createOfferList);
  function createOfferList() {
    var jOfferList, offerListCache;
    _demo = new demoData();
    offerListCache = sessionStorage.getItem('offerList');
    console.log(offerListCache);
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