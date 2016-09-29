'use strict';
(function (){
  var offerList, _hbOfferTemplate, _demo, _demoUsers, _demoComments;
  
  $(document).ready(createOfferList);

  function createOfferList() {
    _demo = new demoData();
    _demoUsers = _demo.users;
    _demoComments = _demo.comments;
    _demoOffers = _demo.offers;
    _hbOfferTemplate = $('#js-offer-list');
    var offer = new Offer();
    offer.init(_demoOffers, _hbOfferTemplate);
    offer.render();
  }
})();