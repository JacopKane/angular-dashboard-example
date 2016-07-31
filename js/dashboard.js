!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.dashboard=n.exports}}(this,function(e){!function(t,n){if("function"==typeof define&&define.amd)define([],n);else if("undefined"!=typeof e)n();else{var r={exports:{}};n(),t.dashboard=r.exports}}(this,function(){"use strict";angular.module("dashboard",["chart.js"]).controller("SliderController",["$scope","$element","$injector",function(e,t,n){t=angular.element(t)[0];var r=this,a=n.get("$log"),o=n.get("$timeout"),u=n.get("$document"),i=angular.element(u.find("body")),s=angular.element(t.querySelector(".bar"))[0],c=angular.element(t.querySelector(".dragger"))[0],m=0,d=s.getBoundingClientRect().width,f=function(){e.amount=Math.round(r.currentX/d*(e.max-e.min)+e.min),o(function(){return e.$digest()})},g=function(){var e=c.getBoundingClientRect().width,t=c.offsetLeft;return t+=e/2};e.amount=Math.round((e.max-e.min)/2),o(function(){f()}),Object.assign(r,{inTheZone:!1,dragging:!1,currentX:g(),mouseDown:function(e){e.preventDefault(),a.debug("mouseDown",e),r.dragging=!0}}),i.on("mousemove",function(e){if(r.dragging===!0){e.preventDefault();var t=g(e)+e.movementX;t<=d&&t>=m&&(a.debug("dragging",t),r.currentX=t,f())}}),i.on("mouseup",function(e){r.dragging===!0&&(e.preventDefault(),a.debug("mouseUp"),r.dragging=!1)})}]).directive("slider",function(){return{scope:{measure:"@measure",amount:"=amount",title:"@title",min:"=min",max:"=max"},restrict:"E",replace:!0,templateUrl:"./template/slider.html",controllerAs:"vm",controller:"SliderController"}}).factory("WeatherApiFactory",["$injector",function(e){var t=e.get("$log"),n=e.get("$http"),r={get:function(){return new Promise(function(e,r){return t.debug("requesting data from weather api"),n({method:"GET",url:"http://private-4945e-weather34.apiary-proxy.com/weather34/rain"}).then(function(t){return t.status?200!==t.status?r(t):e(t):r(t)},r)})}};return r}]).controller("DashboardController",["$scope","$injector",function(e,t){var n=this,r=t.get("$log"),a=t.get("$timeout"),o=t.get("WeatherApiFactory"),u=function(e,t,n){r.debug("chanceOfRain started",{pressure:e,temperature:t,amount:n});var a=Math.log(n+1)*Math.log(e-929)*Math.log(t-9),o=Math.min(Math.max(a,0),100),u=Math.min(1.5*o,100),i=Math.max(.5*o,0);return[i,o,u]},i=function(){return 0===n.days.length?n.chanceOfRain:0===n.pressureAmount?n.chanceOfRain:0===n.temperatureAmount?n.chanceOfRain:(n.days.map(function(e,t){u(n.pressureAmount,n.temperatureAmount,e).map(function(e,r){n.chanceOfRain[r]=n.chanceOfRain[r]||[],n.chanceOfRain[r][t]=e})}),r.debug("chanceOfRain",n.chanceOfRain),a(function(){return e.$digest()}),n.chanceOfRain)},s=function(e){n.days=e.data[0].days.map(function(e){return n.labels.push(e.day),e.amount}),i(),r.debug("days",n.days)},c=function(e){r.error(e),n.error=n.str.apiError};Object.assign(e,{pressureAmount:0,temperatureAmount:0}),Object.assign(n,{str:{title:"Weather Dasboard",apiError:"Could not fetch the weather data",sliderPressure:"Pressure",sliderTemperature:"Temperature"},error:"",labels:[],days:[],chanceOfRain:[],onPressureChange:function(e){r.debug("onPressureChange",e),n.pressureAmount=e,i()},onTemperatureChange:function(e){r.debug("onTemperatureChange",e),n.temperatureAmount=e,i()},initialize:function(){e.$watch(n.days,function(e){return i()}),e.$watch("temperatureAmount",n.onTemperatureChange),e.$watch("pressureAmount",n.onPressureChange),o.get().then(s)["catch"](c)}})}])})});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZCIsImRhc2hib2FyZCIsInRoaXMiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29udHJvbGxlciIsIiRzY29wZSIsIiRlbGVtZW50IiwiJGluamVjdG9yIiwiZWxlbWVudCIsInZtIiwiJGxvZyIsImdldCIsIiR0aW1lb3V0IiwiJGRvY3VtZW50IiwiJGJvZHkiLCJmaW5kIiwiJGJhciIsInF1ZXJ5U2VsZWN0b3IiLCIkZHJhZ2dlciIsIm1pblgiLCJtYXhYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJjYWxjdWxhdGVBbW91bnQiLCJhbW91bnQiLCJNYXRoIiwicm91bmQiLCJjdXJyZW50WCIsIm1heCIsIm1pbiIsIiRkaWdlc3QiLCJjYWxjdWxhdGVYIiwibGVmdCIsIm9mZnNldExlZnQiLCJPYmplY3QiLCJhc3NpZ24iLCJpblRoZVpvbmUiLCJkcmFnZ2luZyIsIm1vdXNlRG93biIsIiRldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGVidWciLCJvbiIsIm1vdmVtZW50WCIsImRpcmVjdGl2ZSIsInNjb3BlIiwibWVhc3VyZSIsInRpdGxlIiwicmVzdHJpY3QiLCJyZXBsYWNlIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyQXMiLCIkaHR0cCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWV0aG9kIiwidXJsIiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwid2VhdGhlckFwaSIsImNoYW5jZU9mUmFpbiIsInByZXNzdXJlIiwidGVtcGVyYXR1cmUiLCJzY29yZSIsImxvZyIsIm1lYW4iLCJ1cHBlckJvdW5kIiwibG93ZXJCb3VuZCIsInNldENoYW5jZU9mUmFpbiIsImRheXMiLCJsZW5ndGgiLCJwcmVzc3VyZUFtb3VudCIsInRlbXBlcmF0dXJlQW1vdW50IiwibWFwIiwiZGF5Tm8iLCJjaGFuY2UiLCJjaGFuY2VObyIsInVwZGF0ZVdlYXRoZXIiLCJkYXRhIiwiZGFpbHlJbmZvIiwibGFiZWxzIiwicHVzaCIsImRheSIsImZhaWxlZFRvVXBkYXRlV2VhdGhlciIsImVycm9yIiwic3RyIiwiYXBpRXJyb3IiLCJzbGlkZXJQcmVzc3VyZSIsInNsaWRlclRlbXBlcmF0dXJlIiwib25QcmVzc3VyZUNoYW5nZSIsInByZXNzdXJlVmFsdWUiLCJvblRlbXBlcmF0dXJlQ2hhbmdlIiwidGVtcGVyYXR1cmVWYWx1ZSIsImluaXRpYWxpemUiLCIkd2F0Y2giLCJuZXdWYWwiXSwibWFwcGluZ3MiOiJDQUFBLFNBQVdBLEVBQVFDLEdBQ2pCLEdBQXNCLGtCQUFYQyxTQUF5QkEsT0FBT0MsSUFDekNELFFBQVEsV0FBWUQsT0FDZixJQUF1QixtQkFBWkcsU0FDaEJILEVBQVFHLGFBQ0gsQ0FDTCxHQUFJQyxJQUNGRCxXQUVGSCxHQUFRSSxFQUFJRCxTQUNaSixFQUFPTSxVQUFZRCxFQUFJRCxVQUV4QkcsS0FBTSxTQUFVSCxJQUNqQixTQUFXSixFQUFRQyxHQUNqQixHQUFzQixrQkFBWEMsU0FBeUJBLE9BQU9DLElBQ3pDRCxVQUFXRCxPQUNOLElBQXVCLG1CQUFaRyxHQUNoQkgsUUFDSyxDQUNMLEdBQUlJLElBQ0ZELFdBRUZILEtBQ0FELEVBQU9NLFVBQVlELEVBQUlELFVBRXhCRyxLQUFNLFdBQ1AsWUExQkpDLFNBQVFDLE9BQU8sYUFBYyxhQUMxQkMsV0FBVyxvQkFBQSxTQUFBLFdBQUEsWUFBb0IsU0FBVUMsRUFBUUMsRUFBVUMsR0FFMURELEVBQVdKLFFBQVFNLFFBQVFGLEdBQVUsRUFFckMsSUFDRUcsR0FBS1IsS0FDTFMsRUFBT0gsRUFBVUksSUFBSSxRQUNyQkMsRUFBV0wsRUFBVUksSUFBSSxZQUN6QkUsRUFBWU4sRUFBVUksSUFBSSxhQUMxQkcsRUFBUVosUUFBUU0sUUFBUUssRUFBVUUsS0FBSyxTQUN2Q0MsRUFBT2QsUUFBUU0sUUFBUUYsRUFBU1csY0FBYyxTQUFTLEdBQ3ZEQyxFQUFXaEIsUUFB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LE9BQ25DakUsRUFBTzJGLE9BQU8sb0JBQXFCdkYsRUFBR29GLHFCQUN0Q3hGLEVBQU8yRixPQUFPLGlCQUFrQnZGLEVBQUdrRixrQkFFbkM5QixFQUNHbEQsTUFDQStDLEtBQUtxQixHQUZSbEIsU0FHU3dCIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdkYXNoYm9hcmQnLCBbJ2NoYXJ0LmpzJ10pXG4gIC5jb250cm9sbGVyKCdTbGlkZXJDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRpbmplY3Rvcikge1xuXG4gICAgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnQpWzBdO1xuXG4gICAgY29uc3RcbiAgICAgIHZtID0gdGhpcyxcbiAgICAgICRsb2cgPSAkaW5qZWN0b3IuZ2V0KCckbG9nJyksXG4gICAgICAkdGltZW91dCA9ICRpbmplY3Rvci5nZXQoJyR0aW1lb3V0JyksXG4gICAgICAkZG9jdW1lbnQgPSAkaW5qZWN0b3IuZ2V0KCckZG9jdW1lbnQnKSxcbiAgICAgICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudC5maW5kKCdib2R5JykpLFxuICAgICAgJGJhciA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFyJykpWzBdLFxuICAgICAgJGRyYWdnZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyYWdnZXInKSlbMF0sXG4gICAgICBtaW5YID0gMCxcbiAgICAgIG1heFggPSAkYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLFxuXG4gICAgICBjYWxjdWxhdGVBbW91bnQgPSAoKSA9PiB7XG4gICAgICAgICRzY29wZS5hbW91bnQgPSBNYXRoLnJvdW5kKCh2bS5jdXJyZW50WCAvIG1heFgpICogKCRzY29wZS5tYXggLSAkc2NvcGUubWluKSArICRzY29wZS5taW4pO1xuICAgICAgICAkdGltZW91dCgoKSA9PiAkc2NvcGUuJGRpZ2VzdCgpKVxuICAgICAgfSxcblxuICAgICAgY2FsY3VsYXRlWCA9ICgpID0+IHtcblxuICAgICAgICBsZXRcbiAgICAgICAgICB3aWR0aCA9ICRkcmFnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLFxuICAgICAgICAgIGxlZnQgPSAkZHJhZ2dlci5vZmZzZXRMZWZ0O1xuXG4gICAgICAgIGxlZnQgPSBsZWZ0ICsgKHdpZHRoIC8gMik7XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgICB9O1xuXG4gICAgJHNjb3BlLmFtb3VudCA9IE1hdGgucm91bmQoKCRzY29wZS5tYXggLSAkc2NvcGUubWluKSAvIDIpO1xuICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgIGNhbGN1bGF0ZUFtb3VudCgpO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbih2bSwge1xuXG4gICAgICBpblRoZVpvbmUgOiBmYWxzZSxcblxuICAgICAgZHJhZ2dpbmcgOiBmYWxzZSxcblxuICAgICAgY3VycmVudFggOiBjYWxjdWxhdGVYKCksXG5cbiAgICAgIG1vdXNlRG93biA6ICgkZXZlbnQpID0+IHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRsb2cuZGVidWcoJ21vdXNlRG93bicsICRldmVudCk7XG4gICAgICAgIHZtLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgJGJvZHkub24oJ21vdXNlbW92ZScsICgkZXZlbnQpID0+IHtcbiAgICAgIGlmICh2bS5kcmFnZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgY3VycmVudFggPSBjYWxjdWxhdGVYKCRldmVudCkgKyAkZXZlbnQubW92ZW1lbnRYO1xuXG4gICAgICAgIGlmIChjdXJyZW50WCA8PSBtYXhYICYmIGN1cnJlbnRYID49IG1pblgpIHtcbiAgICAgICAgICAkbG9nLmRlYnVnKCdkcmFnZ2luZycsIGN1cnJlbnRYKTtcbiAgICAgICAgICB2bS5jdXJyZW50WCA9IGN1cnJlbnRYO1xuICAgICAgICAgIGNhbGN1bGF0ZUFtb3VudCgpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRib2R5Lm9uKCdtb3VzZXVwJywgKCRldmVudCkgPT4ge1xuICAgICAgaWYgKHZtLmRyYWdnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkbG9nLmRlYnVnKCdtb3VzZVVwJyk7XG4gICAgICAgIHZtLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSlcbiAgLmRpcmVjdGl2ZSgnc2xpZGVyJywgKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZSA6ICAgICAgIHtcbiAgICAgICAgJ21lYXN1cmUnIDogJ0BtZWFzdXJlJyxcbiAgICAgICAgJ2Ftb3VudCcgOiAnPWFtb3VudCcsXG4gICAgICAgICd0aXRsZScgOiAnQHRpdGxlJyxcbiAgICAgICAgJ21pbicgOiAnPW1pbicsXG4gICAgICAgICdtYXgnIDogJz1tYXgnXG4gICAgICB9LFxuICAgICAgcmVzdHJpY3QgOiAgICAnRScsXG4gICAgICByZXBsYWNlIDogICAgIHRydWUsXG4gICAgICB0ZW1wbGF0ZVVybCA6ICcuL3RlbXBsYXRlL3NsaWRlci5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgIGNvbnRyb2xsZXIgOiAnU2xpZGVyQ29udHJvbGxlcidcbiAgICB9O1xuICB9KVxuICAuZmFjdG9yeSgnV2VhdGhlckFwaUZhY3RvcnknLCAoJGluamVjdG9yKSA9PiB7XG5cbiAgICBjb25zdFxuXG4gICAgICAkbG9nID0gJGluamVjdG9yLmdldCgnJGxvZycpLFxuXG4gICAgICAkaHR0cCA9ICRpbmplY3Rvci5nZXQoJyRodHRwJyksXG5cbiAgICAgIGZhY3RvcnkgPSB7XG5cbiAgICAgICAgZ2V0IDogKCkgPT4gKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICRsb2cuZGVidWcoJ3JlcXVlc3RpbmcgZGF0YSBmcm9tIHdlYXRoZXIgYXBpJyk7XG5cbiAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kIDogJ0dFVCcsXG4gICAgICAgICAgICB1cmwgOiAnaHR0cDovL3ByaXZhdGUtNDk0NWUtd2VhdGhlcjM0LmFwaWFyeS1wcm94eS5jb20vd2VhdGhlcjM0L3JhaW4nXG4gICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzcG9uc2UpO1xuXG4gICAgICAgICAgfSwgcmVqZWN0KVxuXG4gICAgICAgIH0pKVxuXG4gICAgICB9O1xuXG4gICAgcmV0dXJuIGZhY3Rvcnk7XG5cbiAgfSlcbiAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkaW5qZWN0b3IpIHtcblxuICAgIGNvbnN0XG5cbiAgICAgIHZtID0gdGhpcyxcblxuICAgICAgJGxvZyA9ICRpbmplY3Rvci5nZXQoJyRsb2cnKSxcblxuICAgICAgJHRpbWVvdXQgPSAkaW5qZWN0b3IuZ2V0KCckdGltZW91dCcpLFxuXG4gICAgICB3ZWF0aGVyQXBpID0gJGluamVjdG9yLmdldCgnV2VhdGhlckFwaUZhY3RvcnknKSxcblxuICAgICAgY2hhbmNlT2ZSYWluID0gKHByZXNzdXJlLCB0ZW1wZXJhdHVyZSwgYW1vdW50KSA9PiB7XG5cbiAgICAgICAgJGxvZy5kZWJ1ZygnY2hhbmNlT2ZSYWluIHN0YXJ0ZWQnLCB7cHJlc3N1cmUsIHRlbXBlcmF0dXJlLCBhbW91bnR9KTtcblxuICAgICAgICB2YXIgc2NvcmUgPSBNYXRoLmxvZyhhbW91bnQgKyAxKSAqIE1hdGgubG9nKHByZXNzdXJlIC0gOTI5KSAqIE1hdGgubG9nKHRlbXBlcmF0dXJlIC0gOSk7XG5cbiAgICAgICAgdmFyIG1lYW4gPSBNYXRoLm1pbihNYXRoLm1heChzY29yZSwgMCksIDEwMCk7XG5cbiAgICAgICAgdmFyIHVwcGVyQm91bmQgPSBNYXRoLm1pbigxLjUgKiBtZWFuLCAxMDApO1xuXG4gICAgICAgIHZhciBsb3dlckJvdW5kID0gTWF0aC5tYXgoMC41ICogbWVhbiwgMCk7XG5cbiAgICAgICAgcmV0dXJuIFtsb3dlckJvdW5kLCBtZWFuLCB1cHBlckJvdW5kXTtcblxuICAgICAgfSxcblxuICAgICAgc2V0Q2hhbmNlT2ZSYWluID0gKCkgPT4ge1xuICAgICAgICBpZiAodm0uZGF5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdm0uY2hhbmNlT2ZSYWluO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bS5wcmVzc3VyZUFtb3VudCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB2bS5jaGFuY2VPZlJhaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZtLnRlbXBlcmF0dXJlQW1vdW50ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHZtLmNoYW5jZU9mUmFpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZtLmRheXMubWFwKChhbW91bnQsIGRheU5vKSA9PiB7XG5cbiAgICAgICAgICBjaGFuY2VPZlJhaW4odm0ucHJlc3N1cmVBbW91bnQsIHZtLnRlbXBlcmF0dXJlQW1vdW50LCBhbW91bnQpXG4gICAgICAgICAgICAubWFwKChjaGFuY2UsIGNoYW5jZU5vKSA9PiB7XG5cbiAgICAgICAgICAgICAgdm0uY2hhbmNlT2ZSYWluW2NoYW5jZU5vXSA9IHZtLmNoYW5jZU9mUmFpbltjaGFuY2VOb10gfHwgW107XG4gICAgICAgICAgICAgIHZtLmNoYW5jZU9mUmFpbltjaGFuY2VOb11bZGF5Tm9dID0gY2hhbmNlO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICAkbG9nLmRlYnVnKCdjaGFuY2VPZlJhaW4nLCB2bS5jaGFuY2VPZlJhaW4pO1xuXG4gICAgICAgICR0aW1lb3V0KCgpID0+ICRzY29wZS4kZGlnZXN0KCkpO1xuXG4gICAgICAgIHJldHVybiB2bS5jaGFuY2VPZlJhaW47XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSByZXNwb25zZVxuICAgICAgICovXG4gICAgICB1cGRhdGVXZWF0aGVyID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHZtLmRheXMgPSByZXNwb25zZS5kYXRhWzBdLmRheXMubWFwKChkYWlseUluZm8pID0+IHtcbiAgICAgICAgICB2bS5sYWJlbHMucHVzaChkYWlseUluZm8uZGF5KTtcbiAgICAgICAgICByZXR1cm4gZGFpbHlJbmZvLmFtb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldENoYW5jZU9mUmFpbigpO1xuICAgICAgICAkbG9nLmRlYnVnKCdkYXlzJywgdm0uZGF5cyk7XG4gICAgICB9LFxuXG4gICAgICBmYWlsZWRUb1VwZGF0ZVdlYXRoZXIgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgJGxvZy5lcnJvcihlcnJvcik7XG4gICAgICAgIHZtLmVycm9yID0gdm0uc3RyLmFwaUVycm9yO1xuICAgICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24oJHNjb3BlLCB7XG4gICAgICBwcmVzc3VyZUFtb3VudCA6IDAsXG4gICAgICB0ZW1wZXJhdHVyZUFtb3VudCA6IDBcbiAgICB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24odm0sIHtcbiAgICAgIC8vIGxvY2FsZSBzdHJpbmdzXG4gICAgICBzdHIgOiB7XG4gICAgICAgIHRpdGxlIDogJ1dlYXRoZXIgRGFzYm9hcmQnLFxuICAgICAgICBhcGlFcnJvciA6ICdDb3VsZCBub3QgZmV0Y2ggdGhlIHdlYXRoZXIgZGF0YScsXG4gICAgICAgIHNsaWRlclByZXNzdXJlIDogJ1ByZXNzdXJlJyxcbiAgICAgICAgc2xpZGVyVGVtcGVyYXR1cmUgOiAnVGVtcGVyYXR1cmUnXG4gICAgICB9LFxuXG4gICAgICBlcnJvciA6ICcnLFxuXG4gICAgICBsYWJlbHMgOiBbXSxcblxuICAgICAgZGF5cyA6IFtdLFxuXG4gICAgICBjaGFuY2VPZlJhaW4gOiBbXSxcblxuICAgICAgb25QcmVzc3VyZUNoYW5nZSA6IChwcmVzc3VyZVZhbHVlKSA9PiB7XG4gICAgICAgICRsb2cuZGVidWcoJ29uUHJlc3N1cmVDaGFuZ2UnLCBwcmVzc3VyZVZhbHVlKTtcbiAgICAgICAgdm0ucHJlc3N1cmVBbW91bnQgPSBwcmVzc3VyZVZhbHVlO1xuICAgICAgICBzZXRDaGFuY2VPZlJhaW4oKTtcbiAgICAgIH0sXG5cbiAgICAgIG9uVGVtcGVyYXR1cmVDaGFuZ2UgOiAodGVtcGVyYXR1cmVWYWx1ZSkgPT4ge1xuICAgICAgICAkbG9nLmRlYnVnKCdvblRlbXBlcmF0dXJlQ2hhbmdlJywgdGVtcGVyYXR1cmVWYWx1ZSk7XG4gICAgICAgIHZtLnRlbXBlcmF0dXJlQW1vdW50ID0gdGVtcGVyYXR1cmVWYWx1ZTtcbiAgICAgICAgc2V0Q2hhbmNlT2ZSYWluKCk7XG4gICAgICB9LFxuXG4gICAgICBpbml0aWFsaXplIDogKCkgPT4ge1xuICAgICAgICAkc2NvcGUuJHdhdGNoKHZtLmRheXMsIChuZXdWYWwpID0+IHNldENoYW5jZU9mUmFpbigpKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgndGVtcGVyYXR1cmVBbW91bnQnLCB2bS5vblRlbXBlcmF0dXJlQ2hhbmdlKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgncHJlc3N1cmVBbW91bnQnLCB2bS5vblByZXNzdXJlQ2hhbmdlKTtcblxuICAgICAgICB3ZWF0aGVyQXBpXG4gICAgICAgICAgLmdldCgpXG4gICAgICAgICAgLnRoZW4odXBkYXRlV2VhdGhlcilcbiAgICAgICAgICAuY2F0Y2goZmFpbGVkVG9VcGRhdGVXZWF0aGVyKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=