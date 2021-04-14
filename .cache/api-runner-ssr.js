var plugins = [{
      plugin: require('C:/Users/SESA141987/Documents/GitHub/PublicAPIDocsHosting/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/SESA141987/Documents/GitHub/PublicAPIDocsHosting/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-starter-stoplight","short_name":"stoplight","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"6c98489d2ee6e2fc7fd7de2095d0fa9d"},
    },{
      plugin: require('C:/Users/SESA141987/Documents/GitHub/PublicAPIDocsHosting/node_modules/gatsby-plugin-amplitude-analytics/gatsby-ssr'),
      options: {"plugins":[],"apiKey":"e831b49703fdedc9f40d77ace463433b","respectDNT":true,"head":false,"eventTypes":{"outboundLinkClick":"ApiDocs.OUTBOUND_LINK_CLICK","pageView":"ApiDocs.Navigate"},"amplitudeConfig":{"saveEvents":true,"includeUtm":true,"includeReferrer":true}},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
