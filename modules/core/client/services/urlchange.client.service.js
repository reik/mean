'use strict';

// declares a page/state to be viewed only by authenticated users
angular.module('core').service('UrlChange', ['Authentication', '$state',
    function (Authentication, $state) {

        //add url states that users need to authenticate
        var restrictedUrlStates = ['app.home', 'app.dashboard', 'app.settings.picture',
            'app.settings.profile', 'app.settings.password', 'app.price-tiers'];

        function checkUrlState(states, find) {
            var i, len = states.length, state;
            for (i = 0; i < len; i++) {
                state = states[i];
                if (state === find) {
                    return state;
                }
            }
            return false;
        }

        this.checkForRestrictedState = function (stateToMatch) {
            var user = Authentication.user,
                isRestricted = checkUrlState(restrictedUrlStates, stateToMatch);
            if (!user && isRestricted) {
                $state.go('page.authentication.signin');
            }
        };
    }
]);
