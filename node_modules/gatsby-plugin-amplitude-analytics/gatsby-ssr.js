"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      setPostBodyComponents = _ref.setPostBodyComponents;

  // Only include if the current env is included in the environments specified in
  // pluginOptions. Default to [`production`] if the config option is not present.
  if ((pluginOptions.environments || ["production"]).includes(process.env.NODE_ENV)) {
    var amplitudeExcludePaths = [];

    if (typeof pluginOptions.exclude !== "undefined") {
      var Minimatch = require("minimatch").Minimatch;

      pluginOptions.exclude.map(function (exclude) {
        var mm = new Minimatch(exclude);
        amplitudeExcludePaths.push(mm.makeRe());
      });
    }

    var amplitudeScript = /*#__PURE__*/_react["default"].createElement("script", {
      key: "gatsby-plugin-amplitude-analytics",
      dangerouslySetInnerHTML: {
        __html: "\n  " + (amplitudeExcludePaths.length ? "window.amplitudeExcludePaths=[" + amplitudeExcludePaths.join(",") + "];" : "") + "\n  window.amplitudeEventTypes = {\n    outboundLinkClick: \"" + ((pluginOptions.eventTypes || {}).outboundLinkClick || 'outbound link click') + "\",\n    pageView: \"" + ((pluginOptions.eventTypes || {}).pageView || 'page view') + "\"\n  };\n  if(" + (typeof pluginOptions.respectDNT !== "undefined" && pluginOptions.respectDNT == true ? "!(navigator.doNotTrack == \"1\" || window.doNotTrack == \"1\")" : "true") + ") {\n    (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement(\"script\")\n    ;r.type=\"text/javascript\"\n    ;r.integrity=\"sha384-cukXwabQy+j/QA1+RqiXSzxhgQg5Rrn3zVszlwH3pWj/bXJxlA8Ge7NhcD6vP2Ik\"\n    ;r.crossOrigin=\"anonymous\";r.async=true\n    ;r.src=\"https://cdn.amplitude.com/libs/amplitude-7.1.0-min.gz.js\"\n    ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){\n    console.log(\"[Amplitude] Error: could not load SDK\")}}\n    ;var i=t.getElementsByTagName(\"script\")[0];i.parentNode.insertBefore(r,i)\n    ;function s(e,t){e.prototype[t]=function(){\n    this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}\n    var o=function(){this._q=[];return this}\n    ;var a=[\"add\",\"append\",\"clearAll\",\"prepend\",\"set\",\"setOnce\",\"unset\"]\n    ;for(var c=0;c<a.length;c++){s(o,a[c])}n.Identify=o;var u=function(){this._q=[]\n    ;return this}\n    ;var l=[\"setProductId\",\"setQuantity\",\"setPrice\",\"setRevenueType\",\"setEventProperties\"]\n    ;for(var p=0;p<l.length;p++){s(u,l[p])}n.Revenue=u\n    ;var d=[\"init\",\"logEvent\",\"logRevenue\",\"setUserId\",\"setUserProperties\",\"setOptOut\",\"setVersionName\",\"setDomain\",\"setDeviceId\",\"enableTracking\",\"setGlobalUserProperties\",\"identify\",\"clearUserProperties\",\"setGroup\",\"logRevenueV2\",\"regenerateDeviceId\",\"groupIdentify\",\"onInit\",\"logEventWithTimestamp\",\"logEventWithGroups\",\"setSessionId\",\"resetSessionId\"]\n    ;function v(e){function t(t){e[t]=function(){\n    e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}\n    for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){\n    e=(!e||e.length===0?\"$default_instance\":e).toLowerCase()\n    ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}\n    ;e.amplitude=n})(window,document);\n  }\n  if (typeof window.amplitude === \"object\") {\n    window.amplitude.getInstance().init(\"" + pluginOptions.apiKey + "\", null, " + JSON.stringify(pluginOptions.amplitudeConfig) + ");\n  }"
      }
    });

    setHeadComponents([/*#__PURE__*/_react["default"].createElement("link", {
      key: "gatsby-plugin-amplitude-analytics-preconnect-0",
      rel: "preconnect",
      href: "https://cdn.amplitude.com"
    }), /*#__PURE__*/_react["default"].createElement("link", {
      key: "gatsby-plugin-amplitude-analytics-preconnect-1",
      rel: "preconnect",
      href: "https://api.amplitude.com"
    }), pluginOptions.head ? amplitudeScript : '']);
    return setPostBodyComponents([!pluginOptions.head ? amplitudeScript : '']);
  }

  return null;
};