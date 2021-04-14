module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-stoplight","short_name":"stoplight","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"6c98489d2ee6e2fc7fd7de2095d0fa9d"},
    },{
      plugin: require('../node_modules/gatsby-plugin-amplitude-analytics/gatsby-browser.js'),
      options: {"plugins":[],"apiKey":"e831b49703fdedc9f40d77ace463433b","respectDNT":true,"head":false,"eventTypes":{"outboundLinkClick":"ApiDocs.OUTBOUND_LINK_CLICK","pageView":"ApiDocs.Navigate"},"amplitudeConfig":{"saveEvents":true,"includeUtm":true,"includeReferrer":true}},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
