const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      // Needed for node_modules/@stoplight/prism-http/dist/getHttpOperations.js
      fs: 'empty',
    },
    resolve: {
      alias: {
        'decimal.js': path.join(__dirname, 'node_modules', 'decimal.js', 'decimal.js'),
      },
    },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  const match = page.path.match(/^\/(instructions|guides|api-reference)/);
  if (match) {
    page.matchPath = `${match[0]}/*`;

    // Update the page.
    createPage(page);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions
  createRedirect({ fromPath: '/reference', toPath: '/api-reference', isPermanent: true })
  createRedirect({ fromPath: '/docs/api-general-instructions', toPath: '/instructions', isPermanent: true })
  createRedirect({ fromPath: '/docs/common-tasks', toPath: '/guides/#common-tasks', isPermanent: true })
  createRedirect({ fromPath: '/docs/getting-survey-responses-via-the-new-export-apis', toPath: '/guides/docs/Guides/Common%20Tasks/getting-survey-responses-via-the-new-export-apis.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/common-use-case-examples', toPath: '/guides/#common-tasks', isPermanent: true })
  createRedirect({ fromPath: '/docs/api-key-authentication', toPath: '/guides/docs/Instructions/api-key-authentication.md', isPermanent: true })
  createRedirect({ fromPath: '/docs', toPath: '/instructions', isPermanent: true })
  createRedirect({ fromPath: '/docs/oauth-authentication', toPath: '/instructions/docs/Instructions/Quick%20Start/getting-more-secure-with-oauth.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/overview-2', toPath: '/instructions/docs/Instructions/Quick%20Start/qualtrics-api-quick-start.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/base-url-and-datacenter-ids', toPath: '/instructions/docs/Instructions/base-url-and-datacenter-ids.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/listen-to-and-retrieve-responses-in-real-time', toPath: '/guides/docs/Guides/Common%20Tasks/listen-to-and-retrieve-responses-in-real-time.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/getting-started-with-the-mobile-app-sdk-on-ios', toPath: '/guides/docs/SDKs/Mobile%20iOS%20Intercept%20SDK/getting-started-with-the-mobile-app-sdk-on-ios.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/finding-your-qualtrics-ids-1', toPath: '/instructions/docs/Instructions/finding-your-qualtrics-ids.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/webhooks', toPath: '/guides/docs/Guides/Actions%20and%20Webhooks/webhooks.md', isPermanent: true })
  createRedirect({ fromPath: '/docs/responses', toPath: '/instructions/docs/Instructions/responses.md', isPermanent: true })
}
