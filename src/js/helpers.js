(function(){
  'use strict'

  window.prettyDate = function(date) {
    var _date = new Date(date);
    var formatted = '';
    formatted += _date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate();
    return formatted;
  } 
})(window);
