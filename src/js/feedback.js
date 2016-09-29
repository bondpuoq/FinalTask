function Feedback() {
  var self;
  self = this;
  self = {
    init : _init,
    author,
    text
  }

  function _init(user, text) {
    self.author = user;
    self.text = text;
  }
  return self;
}