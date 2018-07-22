import angular from 'angular'
import 'angular-ui-router'
import './db'
import './utiles'

angular.module('app',['ui.router','app.db', 'app.utiles'])
.run(function($location,$rootScope){
  if( !(/access_token/.test($location.path()) || $location.path() === '/') & !$rootScope.email){
    $location.path('/')
  }
})
.config(function($urlRouterProvider, $stateProvider)  {
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('base', {
    // abstract: true,
    url: '/',
    templateUrl: 'nav.html',
    controller: function($rootScope, $http, Utiles) {
      // $rootScope.nonce = Utiles.nonce(20)
      let client_id = '959282212396-jbdjfr06b47iok1j29kf5qote0nr3252.apps.googleusercontent.com',
        scope = 'email profile',
        redirect_uri = 'http://127.0.0.1:8181',
        response_type ='token',
        endPoint = 'https://accounts.google.com/o/oauth2/v2/auth?',
        url = `${endPoint}scope=${scope}&redirect_uri=${redirect_uri}&response_type=${response_type}&client_id=${client_id}`
      window.location.replace(url)
    }
  })
  .state('bienvenido', {
    url: '/bienvenido',
    templateUrl: 'bienvenido.html',
  })

  .state('token', {
    url: '/access_token=:accessToken&token_type=:type&expires_in=:expiration',
    templateUrl: 'nav.html',
    controller: function($rootScope, $stateParams, $http, $state){
      let verifyTokenEndPoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
      $http.get(verifyTokenEndPoint, {params: {access_token: $stateParams.accessToken }})
      .then(res => {
        $rootScope.email = res.data.email
        $rootScope.sub = res.data.sub

      })
      $state.go('bienvenido')
    }
  })

})
