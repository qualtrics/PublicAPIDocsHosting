"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.OutboundLink = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var OutboundLink = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var eventType = _ref.eventType,
      eventProperties = _ref.eventProperties,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["eventType", "eventProperties"]);
  return /*#__PURE__*/_react["default"].createElement("a", (0, _extends2["default"])({}, props, {
    ref: ref,
    onClick: function onClick(e) {
      var amplitudeEventType = eventType || window.amplitudeEventTypes.outboundLinkClick;
      var amplitudeEventProperties = Object.assign({
        href: props.href
      }, eventProperties);

      if (typeof props.onClick === "function") {
        props.onClick();
      }

      var redirect = true;

      if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
        redirect = false;
      }

      if (props.target && props.target.toLowerCase() !== "_self") {
        redirect = false;
      }

      if (typeof window.amplitude === 'object') {
        window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeEventProperties, function () {
          if (redirect) {
            document.location = props.href;
          }
        });
      } else {
        if (redirect) {
          document.location = props.href;
        }
      }

      return false;
    }
  }));
});

exports.OutboundLink = OutboundLink;
OutboundLink.propTypes = {
  href: _propTypes["default"].string,
  target: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  eventType: _propTypes["default"].string,
  eventProperties: _propTypes["default"].object
};