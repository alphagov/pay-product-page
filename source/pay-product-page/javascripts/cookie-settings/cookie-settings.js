//= require '../helpers/cookie/cookie-functions.js'

window.GovUkPay = window.GovUkPay || {};
window.GovUkPay.CookieSettings = (function() {
    $module = {}

    checkForFormAndInit = function() {
        var $cookieSettingsForm = document.querySelector(
            '#cookie-settings-form'
        );

        if ($cookieSettingsForm) {
            setModule($cookieSettingsForm);
            init();
        }
    };

    var setModule = function($form) {
        $module = $form
    }

    var init = function() {
        $module.addEventListener("submit", submitSettingsForm);

        // Ensure there aren't two forms for setting cookie preferences on the same page
        hideElement('.pay-cookie-banner');

        setInitialFormValues();
    };

    var setInitialFormValues = function() {
        var currentConsentCookie = window.GovUkPay.Cookie.getConsentCookie();

        if (!currentConsentCookie) {
            // Don't populate the form
            return;
        }

        hideElement('#pay-cookie-settings-warning');

        // Populate the form with the existing choice
        var radioButton;
        if (currentConsentCookie.analytics) {
            radioButton = $module.querySelector(
                "input[name=cookies-analytics][value=on]"
            );
        } else {
            radioButton = $module.querySelector(
                "input[name=cookies-analytics][value=off]"
            );
        }
        radioButton.checked = true;
    };

    var submitSettingsForm = function(event) {
        event.preventDefault();

        var formInputs = event.target.querySelectorAll(
            "input[name=cookies-analytics]"
        );
        var options = {};

        // Retrieve the selected value from the form inputs
        for (var i = 0; i < formInputs.length; i++) {
            var input = formInputs[i];
            if (input.checked) {
                var value = input.value === "on";

                options.analytics = value;
                break;
            }
        }
        // the cookie choice must be set when form is submitted
        if (options.analytics === undefined) {
            showErrorMessage();
            return false;
        }

        // Set the analytics cookie preferences
        // If 'Off' option not checked, this function will also delete any existing Google Analytics cookies
        window.GovUkPay.Cookie.setConsentCookie(options);

        // If 'On' option checked and analytics not yet present,
        // initialise Analytics (this includes firing the initial pageview)
        if (options.analytics) {
            window.GovUkPay.InitAnalytics.InitialiseAnalytics();
        }

        hideElement('#pay-cookie-settings-warning');
        hideElement("#pay-cookie-settings-error");
        showConfirmationMessage();

        return false;
    };

    var showConfirmationMessage = function() {
        var confirmationMessage = document.querySelector(
            "#pay-cookie-settings-success"
        );
        var previousPageLink = document.querySelector(
            ".pay-cookie-settings__prev-page"
        );
        var referrer = getReferrerLink();

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        if (referrer && referrer !== document.location.href) {
            previousPageLink.href = referrer;
            previousPageLink.style.display = "block";
        } else {
            previousPageLink.style.display = "none";
        }

        confirmationMessage.style.display = "block";
    };

    var showErrorMessage = function() {
        var errorMessage = document.querySelector("#pay-cookie-settings-error");
        if (errorMessage !== null) {
            errorMessage.style.display = "block";
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    };

    var hideElement  = function(cssSelector) {
        var errorMessage = document.querySelector(cssSelector);
        if (errorMessage !== null) {
            errorMessage.style.display = "none";
        } 
    }


    var getReferrerLink = function() {
        return document.referrer ? document.referrer : false
    };

    return {
        setModule: setModule,
        submitSettingsForm: submitSettingsForm,
        checkForFormAndInit: checkForFormAndInit,
        init: init,
        setInitialFormValues: setInitialFormValues,
        submitSettingsForm: submitSettingsForm,
        showConfirmationMessage: showConfirmationMessage,
        showErrorMessage: showErrorMessage,
        hideElement: hideElement,
        getReferrerLink: getReferrerLink
    }
})();
