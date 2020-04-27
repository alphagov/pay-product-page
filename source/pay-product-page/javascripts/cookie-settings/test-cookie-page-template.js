module.exports = 
`
    <div id="pay-cookie-banner" class="pay-cookie-banner">
        Cookie Banner
    </div>

    <div data-module="pay-cookie-settings-alert" class="pay-cookie-settings-alert pay-cookie-settings-alert--error" id="pay-cookie-settings-error" tabindex="0" >
        <h2>
            There was a problem saving your settings
        </h2>
        <div class="pay-cookie-settings-alert__body">
            Please select 'Yes' or 'No'.
        </div>    
    </div>

    <div data-module="pay-cookie-settings-alert" class="pay-cookie-settings-alert pay-cookie-settings-alert--warning" id="pay-cookie-settings-warning" tabindex="0">
        <h2>
            Your cookie settings have not yet been saved
        </h2>

        <div class="pay-cookie-settings-alert__body">
            Pay sets cookies when you visit our website. You can choose to change these settings to your own preferences. You need to save this page with your new choices.
        </div>
    </div>

    <div data-module="pay-cookie-settings-alert" class="pay-cookie-settings-alert pay-cookie-settings-alert--success" id="pay-cookie-settings-success" tabindex="0" >
        <h2>
            Your cookie settings were saved
        </h2>
    
        <div class="pay-cookie-settings-alert__body">
            <p class="govuk-body">You can change your preferences at any time on this page.</p><p class="govuk-body"><a href="/cookies" class="govuk-link pay-cookie-settings__prev-page">Go back to the page you were looking at.</a></p>
        </div>    
    </div>

    <form id='cookie-settings-form'>
        <input type="radio" name="cookies-analytics" value=on />'
        <input type="radio" name="cookies-analytics" value=off />'
        <button type="submit">Save cookie settings</button>
    </form>
`
