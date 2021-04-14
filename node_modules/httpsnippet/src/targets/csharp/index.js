'use strict'

module.exports = {
  info: {
    key: 'csharp',
    title: 'C#',
    extname: '.cs',
    default: 'httpclient'
  },

  restsharp: require('./restsharp'),
  httpclient: require('./httpclient')
}
