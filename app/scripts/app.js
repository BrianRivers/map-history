// (function(){
//     'use strict';

    var React = window.React = require('react'),
        Dispatcher = require('flux').Dispatcher,
        mountNode = document.getElementById("app"),
        mountDropdown = document.getElementById('map-selection-js'),
        MapStore = require('./store/MapStore');
   // JSlicer = require('./GMap-JSlicer.js');
   //in order for this require to work, the stuff in the file needs to be added to module.exports

    var getStateFromMapStore = function () {
      var currentMap = MapStore.getCurrent()
      return {
        text: currentMap.title,
        map: '../images/' + currentMap.filename
      }
    }
    var Map = React.createClass({
      getInitialState: function() {
        return {
            items: [],
            text: 'Exalted World Map',
            map: '../images/exalted-world-map.jpg'
        };
      },
      propType: {
        mapLink: React.PropTypes.string,
        mapTitle: React.PropTypes.string
      },
      // clickTest: function (component,e) {
      //   var getElementPosition= function(element){
      //           var xPosition = (element.offsetLeft - element.scrollLeft + element.clientLeft),
      //               yPosition = (element.offsetTop - element.scrollTop + element.clientTop);

      //               return {
      //                   x: xPosition,
      //                   y: yPosition
      //               }
      //       },
      //       elementPosition = getElementPosition(e.currentTarget);

      //   console.log(e.clientX - elementPosition.x);
      //   console.log(e.clientY - elementPosition.y);
      //   console.log(jSlicer);
      // },
      componentDidMount: function () {
        MapStore.addChangeListener(this._onChange);
        document.getElementById('map').innerHTML = '';
        slicer = new JSlicer(document.getElementById('map'), this.state.map);
        slicer.init();
      },
    _onChange: function () {
      this.setState(getStateFromMapStore(), function(){
        slicer = new JSlicer(document.getElementById('map'), this.state.map);
        slicer.init();
      });

    },
      render: function() {

        return (
          <div>
            <h3>{this.state.text}</h3>
            <div id='map'></div>
          </div>
        );
      }
    });

    module.exports = Map;
    React.render(<Map />, mountNode);

    var DropdownToMapActionCreators = require('./actions/DropdownToMapActionCreators');

    var DropdownList = React.createClass({
        getInitialState: function (){
            return {
                currentMap: ''
            }
        },
        getDefaultProps: function () {
            return {
                maps: {
                        'Exalted World Map': 'exalted',
                        'Early World Map' : 'earlyworld',
                        'History Chart 01' : 'historychart01'
                    }
            }
        },
        onDropdownChange: function (e) {
            // console.log(e.target.value);
            DropdownToMapActionCreators.selectDropdownOption(e.target.value);

        },
        render: function () {
               var maps =  this.props.maps;
            var options = Object.keys(maps).map(function(key, index){
                return <option key={key} value={maps[key]}>{key}</option>;
            });

            return (
                    <select onChange={this.onDropdownChange}>{options}</select>
                )
        }
    });

    module.exports = DropdownList;
    React.render(<DropdownList />, mountDropdown);
// })()


