var Dispatcher = require('../util/MappingDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'dropdown-changed';

var MAP_LOCATIONS = {
    exalted: {
        title: 'Exalted World Map',
        filename: 'exalted-world-map.jpg'
    },
    earlyworld: {
        title: 'Early World Map',
        filename: 'early-world-map.jpg'
    },
    historychart01: {
        title: 'History Chart 01',
        filename: 'history-chart-01.jpg'
    }
};

var _currentMap;

var MapStore = assign({}, EventEmitter.prototype, {
    init: function () {},
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback ){
        this.removeListener(CHANGE_EVENT, callback);
    },
    getCurrentMapKey: function () {
        return _currentMap;
    },
    getCurrent: function () {
        return MAP_LOCATIONS[this.getCurrentMapKey()];
    }
})

MapStore.dispatchToken = Dispatcher.register(function (action) {
    switch(action.type) {
        case 'Select-Dropdown':
            _currentMap = action.value;
            MapStore.emitChange();
            break;
        default:
            //do nothing
    }
});

module.exports = MapStore;
