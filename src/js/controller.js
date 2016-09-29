'use strict';
(function (){
  var offerList, _hbOfferTemplate, _jsonUserData;
  _hbOfferTemplate = $('#js-offer-list');


  offerList = [];
  
  $(document).ready(createOfferList);

  function createOfferList() {
    var offer = new Offer();
    offer.init();
  }
})();