"use strict";

exports.onRouteUpdate = function (_ref, pluginOptions) {
  var location = _ref.location;

  // Only track when in an environment specified by pluginOptions. Default to
  // [`production`] if the config option is not present.
  if ((pluginOptions.environments || ["production"]).includes(process.env.NODE_ENV) && typeof window.amplitude === "object") {
    if (location && typeof window.amplitudeExcludePaths !== "undefined" && window.amplitudeExcludePaths.some(function (rx) {
      return rx.test(location.pathname);
    })) {
      return;
    }

    window.amplitude.getInstance().logEvent(window.amplitudeEventTypes.pageView, {
      location: location ? location.pathname + location.search + location.hash : undefined
    });
  }
};