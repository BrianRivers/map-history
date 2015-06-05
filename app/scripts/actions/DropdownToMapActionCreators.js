var Dispatcher = require('../util/MappingDispatcher');

module.exports = {

  selectDropdownOption: function(value) {
    Dispatcher.dispatch({
      type: 'Select-Dropdown',
      value: value
    });
  }

};
