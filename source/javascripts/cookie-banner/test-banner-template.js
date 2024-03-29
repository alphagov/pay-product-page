module.exports = `
    <div id="pay-cookie-banner" class="pay-cookie-banner govuk-width-container" data-module="pay-cookie-banner" role="region" aria-describedby="pay-cookie-banner__heading">
        <div class="pay-cookie-banner__wrapper">
          <h2 class="pay-cookie-banner__heading govuk-heading-m" id="pay-cookie-banner__heading">
            Can we store analytics cookies on your device?
          </h2>
          <p class="govuk-body">
            Analytics cookies help us understand how our website is being used.
          </p>
          <div class="pay-cookie-banner__buttons">
            <button class="govuk-button pay-cookie-banner__button pay-cookie-banner__button--accept" type="submit" data-accept-cookies="true" aria-describedby="pay-cookie-banner__heading">
              Yes<span class="govuk-visually-hidden">, GOV.UK&nbsp;Pay can store analytics cookies on your device</span>
            </button>
            <button class="govuk-button pay-cookie-banner__button pay-cookie-banner__button--reject" type="submit" data-accept-cookies="false" aria-describedby="pay-cookie-banner__heading">
              No<span class="govuk-visually-hidden">, GOV.UK&nbsp;Pay cannot store analytics cookies on your device</span>
            </button>
            <a class="govuk-link pay-cookie-banner__link" href="/cookies">How GOV.UK&nbsp;Pay uses cookies</a>
          </div>
        </div>

        <div class="pay-cookie-banner__confirmation" tabindex="-1">
          <p class="pay-cookie-banner__confirmation-message govuk-body">
            You can <a class="govuk-link" href="/cookies">change your cookie settings</a> at any time.
          </p>
          <button class="pay-cookie-banner__hide-button govuk-link" data-hide-cookie-banner="true" role="link">Hide</button>
        </div>
      </div>
    `
