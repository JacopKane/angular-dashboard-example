angular.module('dashboard', ['chart.js'])
  .controller('SliderController', function ($scope, $element, $injector) {

    $element = angular.element($element)[0];

    const
      vm = this,
      $log = $injector.get('$log'),
      $timeout = $injector.get('$timeout'),
      $document = $injector.get('$document'),
      $body = angular.element($document.find('body')),
      $bar = angular.element($element.querySelector('.bar'))[0],
      $dragger = angular.element($element.querySelector('.dragger'))[0],
      minX = 0,
      maxX = $bar.getBoundingClientRect().width,

      /**
       * Calculates the real amount for given min and max values to directive
       */
      calculateAmount = () => {
        $scope.amount = Math.round((vm.currentX / maxX) * ($scope.max - $scope.min) + $scope.min);
        $timeout(() => $scope.$digest())
      },

      /**
       * Calculates dragger position relative to left
       * @returns {number|Number}
       */
      calculateX = () => {

        let
          width = $dragger.getBoundingClientRect().width,
          left = $dragger.offsetLeft;

        left = left + (width / 2);

        return left;
      };

    $scope.amount = Math.round(($scope.max - $scope.min) / 2);
    $timeout(() => {
      calculateAmount();
    });

    Object.assign(vm, {

      dragging : false,

      currentX : calculateX(),

      /**
       * Starts the drag
       * @param $event
       */
      mouseDown : ($event) => {
        $event.preventDefault();
        $log.debug('mouseDown', $event);
        vm.dragging = true;
      }

    });

    /**
     * Watches the mouse movement on the page
     */
    $body.on('mousemove', ($event) => {
      if (vm.dragging === true) {
        $event.preventDefault();

        let currentX = calculateX($event) + $event.movementX;

        if (currentX <= maxX && currentX >= minX) {
          $log.debug('dragging', currentX);
          vm.currentX = currentX;
          calculateAmount();
        }

      }
    });

    /**
     * Ends the drag operation
     */
    $body.on('mouseup', ($event) => {
      if (vm.dragging === true) {
        $event.preventDefault();
        $log.debug('mouseUp');
        vm.dragging = false;
      }
    });

  })
  /**
   * Slider directive
   *
   * You can use it with <slider /> tag
   * Requires amount, min, max, title and measure
   */
  .directive('slider', () => {
    return {
      scope :       {
        'measure' : '@measure',
        'amount' : '=amount',
        'title' : '@title',
        'min' : '=min',
        'max' : '=max'
      },
      restrict :    'E',
      replace :     true,
      templateUrl : './template/slider.html',
      controllerAs: 'vm',
      controller : 'SliderController'
    };
  })
  /**
   * A helper factory for fetching data from weather API
   */
  .factory('WeatherApiFactory', ($injector) => {

    const

      $log = $injector.get('$log'),

      $http = $injector.get('$http'),

      factory = {

        get : () => (new Promise((resolve, reject) => {

          $log.debug('requesting data from weather api');

          return $http({
            method : 'GET',
            url : '//private-4945e-weather34.apiary-proxy.com/weather34/rain'
          }).then((response) => {

            if (!response.status) {
              return reject(response);
            }

            if (response.status !== 200) {
              return reject(response);
            }

            return resolve(response);

          }, reject)

        }))

      };

    return factory;

  })
  /**
   * Dashboard Controller
   *
   * Sets widgets and fetches data when initialized
   */
  .controller('DashboardController', function ($scope, $injector) {

    const

      vm = this,

      $log = $injector.get('$log'),

      $timeout = $injector.get('$timeout'),

      weatherApi = $injector.get('WeatherApiFactory'),

      /**
       * Calculates daily chance of rain
       * @param pressure
       * @param temperature
       * @param amount
       * @returns {*[]}
       */
      chanceOfRain = (pressure, temperature, amount) => {

        $log.debug('chanceOfRain started', {pressure, temperature, amount});

        var score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);

        var mean = Math.min(Math.max(score, 0), 100);

        var upperBound = Math.min(1.5 * mean, 100);

        var lowerBound = Math.max(0.5 * mean, 0);

        return [lowerBound, mean, upperBound];

      },

      /**
       * Prepares data for Chance of rain chart
       * @returns {Array}
       */
      setChanceOfRain = () => {
        if (vm.days.length === 0) {
          return vm.chanceOfRain;
        }
        if (vm.pressureAmount === 0) {
          return vm.chanceOfRain;
        }
        if (vm.temperatureAmount === 0) {
          return vm.chanceOfRain;
        }

        vm.days.map((amount, dayNo) => {

          chanceOfRain(vm.pressureAmount, vm.temperatureAmount, amount)
            .map((chance, chanceNo) => {

              vm.chanceOfRain[chanceNo] = vm.chanceOfRain[chanceNo] || [];
              vm.chanceOfRain[chanceNo][dayNo] = chance;

            });

        });

        $log.debug('chanceOfRain', vm.chanceOfRain);

        $timeout(() => $scope.$digest());

        return vm.chanceOfRain;
      },

      /**
       * Prepares data Amount of rainfall chart
       * It's getting called after API fetch.
       * @param response
       */
      updateWeather = (response) => {
        vm.days = response.data[0].days.map((dailyInfo) => {
          vm.labels.push(dailyInfo.day);
          return dailyInfo.amount;
        });
        setChanceOfRain();
        $log.debug('days', vm.days);
      },

      /**
       * Handles errors on API fetching
       * @param error
       */
      failedToUpdateWeather = (error) => {
        $log.error(error);
        vm.error = vm.str.apiError;
      };

    Object.assign($scope, {
      pressureAmount : 0,
      temperatureAmount : 0
    });

    Object.assign(vm, {
      // locale strings
      str : {
        title : 'Weather Dasboard',
        apiError : 'Could not fetch the weather data',
        sliderPressure : 'Pressure',
        sliderTemperature : 'Temperature'
      },

      error : '',

      labels : [],

      days : [],

      chanceOfRain : [],

      /**
       * Triggers chance of calculation when pressure measure is changed
       * @param pressureValue
       */
      onPressureChange : (pressureValue) => {
        $log.debug('onPressureChange', pressureValue);
        vm.pressureAmount = pressureValue;
        setChanceOfRain();
      },

      /**
       * Triggers chance of calculation when temperature measure is changed
       * @param temperatureValue
       */
      onTemperatureChange : (temperatureValue) => {
        $log.debug('onTemperatureChange', temperatureValue);
        vm.temperatureAmount = temperatureValue;
        setChanceOfRain();
      },

      /**
       * Initializes measure watchers and fetches weather API
       */
      initialize : () => {
        $scope.$watch(vm.days, (newVal) => setChanceOfRain());
        $scope.$watch('temperatureAmount', vm.onTemperatureChange);
        $scope.$watch('pressureAmount', vm.onPressureChange);

        weatherApi
          .get()
          .then(updateWeather)
          .catch(failedToUpdateWeather);

      }

    });

  });
