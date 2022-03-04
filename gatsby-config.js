module.exports = {
  siteMetadata: {
    title: "Qualtrics API Documentation",
    description: "The official Qualtrics API documentation.",
    author: "@Qualtrics",
    pathPrefix: "/APIDocsWebsite",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-anchor-links`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://api-test.qualtrics.com",
        policy: [{ userAgent: "*", disallow: ["/"] }],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-stoplight`,
        short_name: `stoplight`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        // Specify the API key for your Amplitude Project (required)
        apiKey: "e831b49703fdedc9f40d77ace463433b",
        // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
        respectDNT: true,
        // Puts tracking script in the head instead of the body (optional)
        head: false,
        // Override the default event types (optional)
        eventTypes: {
          outboundLinkClick: "ApiDocs.OUTBOUND_LINK_CLICK",
          pageView: "ApiDocs.Navigate",
        },
        // Amplitude JS SDK configuration options (optional)
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true,
        },
      },
    },
  ],
};
