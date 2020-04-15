window.GovPay = window.GovPay || {};
window.GovPay.Pii = (function () {
  // Based on https://github.com/alphagov/static/pull/1863
  EMAIL_PATTERN = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g;

  // Not quite sure what this is doing,
  // see https://github.com/alphagov/digitalmarketplace-frontend-toolkit/blob/master/toolkit/javascripts/analytics/_govukAnalytics.js#L19
  PIISafe = function (value) {
    this.value = value;
  };

  stripPII = function (value) {
    if (typeof value === "string") {
      return stripPIIFromString(value);
    } else if (
      Object.prototype.toString.call(value) === "[object Array]" ||
      Object.prototype.toString.call(value) === "[object Arguments]"
    ) {
      return stripPIIFromArray(value);
    } else if (typeof value === "object") {
      return stripPIIFromObject(value);
    } else {
      return value;
    }
  };

  stripPIIFromString = function (string) {
    return string.replace(EMAIL_PATTERN, "[email]");
  };

  stripPIIFromObject = function (object) {
    if (object) {
      if (object instanceof PIISafe) {
        return object.value;
      } else {
        for (var property in object) {
          var value = object[property];

          object[property] = stripPII(value);
        }
        return object;
      }
    }
  };

  stripPIIFromArray = function (array) {
    for (var i = 0, l = array.length; i < l; i++) {
      var elem = array[i];

      array[i] = stripPII(elem);
    }
    return array;
  };

  return {
    PIISafe: PIISafe,
    stripPII: stripPII,
    stripPIIFromString: stripPIIFromString,
    stripPIIFromObject: stripPIIFromObject,
    stripPIIFromArray: stripPIIFromArray,
  };
})();
