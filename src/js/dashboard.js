angular.module('dashboard', [])
  .controller('SliderController', function ($scope, $element, $injector) {

    $element = angular.element($element)[0];

    const
      vm = this,
      $log = $injector.get('$log'),
      $body = angular.element(document.body),
      $bar = angular.element($element.querySelector('.bar'))[0],
      $dragger = angular.element($element.querySelector('.dragger'))[0],
      minX = 0,
      maxX = $bar.getBoundingClientRect().width,
      calculateAmount = () => {
          vm.amount = Math.round(vm.currentX);
      },
      calculateX = () => {

        let
          width = $dragger.getBoundingClientRect().width,
          left = $dragger.offsetLeft;

        left = left + (width / 2);

        return left;
      };

    window.$dragger = $dragger;
    window.$bar = $bar;

    $log.debug(`SliderController initialized with amount of ${$scope.amount}`);

    Object.assign(vm, {

      amount : Math.round(($scope.max - $scope.min) / 2),
      inTheZone : false,
      dragging : false,

      currentX : calculateX(),

      mouseDown : ($event) => {
        $event.preventDefault();
        $log.debug('mouseDown', $event);
        vm.dragging = true;
      }

    });

    $body.on('mousemove', ($event) => {
      if (vm.dragging === true) {
        $event.preventDefault();

        let currentX = calculateX($event) + $event.movementX;

        if (currentX <= maxX && currentX >= minX) {
          $log.debug('dragging', currentX);
          vm.currentX = currentX;
          calculateAmount();
          $scope.$digest();
        }

      }
    });

    $body.on('mouseup', ($event) => {
      if (vm.dragging === true) {
        $event.preventDefault();
        $log.debug('mouseUp');
        vm.dragging = false;
      }
    });

    $scope.$watch(() => vm.amount, (newVal) => $scope.amount);

  })
  .directive('slider', () => {
    return {
      scope :       {
        'amount' :  '=?amount',
        'min' :     '=min',
        'max' :     '=max',
        'title' :   '@title',
        'measure' : '@measure'
      },
      restrict :    'E',
      replace :     true,
      templateUrl : './template/slider.html',
      controllerAs: 'vm',
      controller : 'SliderController'
    };
  })
  .factory('WeatherApiFactory', ($injector) => {

    const

      $log = $injector.get('$log'),

      $http = $injector.get('$http'),

      factory = {

        get : () => (new Promise((resolve, reject) => {

          $log.debug('requesting api');

          return $http({
            method : 'GET',
            url : 'http://private­4945e­weather34.apiary­proxy.com/weather34/rain'
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
  .controller('DashboardController', function ($scope, $injector) {

    const

      vm = this,

      $log = $injector.get('$log'),

      weatherApi = $injector.get('WeatherApiFactory'),

      chanceOfRain = (pressure, temperature, amount) => {

        var score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);

        var mean = Math.min(Math.max(score, 0), 100);

        var upper_bound = Math.min(1.5 * mean, 100);

        var lower_bound = Math.max(0.5 * mean, 0);

        return [lower_bound, mean, upper_bound];

      },

      onChange = () => {
        vm.chanceOfRain = chanceOfRain(vm.pressureAmount, vm.temperatureAmount, vm.amount);
        $log.debug('chanceOfRain', vm.chanceOfRain);
      };

    Object.assign(vm, {



      // locale strings
      str : {
        title : 'Weather Dasboard',
        sliderPressure : 'Pressure',
        sliderTemperature : 'Temperature'
      },

      error : '',

      pressureAmount : 0,

      temperatureAmount : 0,

      chanceOfRain : [],

    });

    console.log(vm.temperatureAmount);

    $scope.$watch(vm.temperatureAmount, (newVal) => onChange());
    $scope.$watch(vm.pressureAmount, (newVal) => onChange());

  });
