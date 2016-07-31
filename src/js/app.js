angular.module('app', [
  'template-cache',
  'dashboard'
])
  .config(function ($logProvider) {

    // @if environment='production'
    $logProvider.debugEnabled(false);
    // @endif

  });
