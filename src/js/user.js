function User() {
  var self;
  self = this;
  self = {
    init: _init,
    render: _render
  }
  function _init(userData) {
    self.id = userData.id;
    self.name = userData.name;
    self.avatar = userData.avatarImg;
  }
  function _render() {

  }
  return self;
}