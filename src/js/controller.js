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
    _target = $('.offer-list')[0];
    offerList = new OfferList();
    offerList.init(_demoOffers, _hbOfferTemplate);
    offerList.render(_target);
    $('body').off('click', '.offer');
    $('body').on('click', '.offer', offerClick);
  }

  function offerClick() {
    var currentIndex;
    currentIndex = $(this).data('offer-index');
    $('.js-blind').toggle();
  }
})();