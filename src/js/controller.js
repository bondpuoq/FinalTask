'use strict';
(function (){
  var offerList, _hbOfferTemplate, _demo, _demoUsers, _demoComments, _currentUser;

  $(document).ready(createOfferList);

  function createOfferList() {
    _demo = new demoData();
    _demoUsers = _demo.users;
    _demoComments = _demo.comments;
    _demoOffers = _demo.offers;
    _currentUser = _demo.currentUser;
    _hbOfferTemplate = $('#js-offer-list');
    _target = $('.js-offer-list')[0];
    offerList = new OfferList();
    offerList.init(_demoOffers, _hbOfferTemplate);
    offerList.render(_target);
    console.log(this);
  }

  _offerClick = function offerClick() {
    var currentIndex;
    currentIndex = $(this).data('offer-index');
    offerList.initPopup($('#js-popup')); 
    offerList.renderPopup(currentIndex, $('.js-popup'), _currentUser);
    $('.js-blind').toggle();
  }

  _togglePopup = function togglePopup() {
    $('.blind').toggle();
  }
})();