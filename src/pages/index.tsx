import { Card, Icon } from '@stoplight/ui-kit';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import Header from '../components/header';
import SEO from '../components/seo';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery2 {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="bg-gray-1 h-screen">
      <SEO title="Home" />
      <Header siteTitle={data.site.siteMetadata.title} centered />

      <div className="h-96 bg-blue-6 flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto text-center text-white">
          <div className="text-3xl mb-5">Qualtrics API Docs</div>
          <div className="text-xl max-w-3xl opacity-75">
            Documentation for the Qualtrics API Platform.
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex flex-wrap">
          <Link className="reset mr-10 mb-10 flex-1" to="/instructions/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="book" iconSize={24} />
                <div className="flex-1 ml-4">
                  <div className="text-xl">Instructions</div>
                  <p>Get started quickly with the API with basic instructions</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link className="reset mr-10 mb-10 flex-1" to="/guides/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="manual" iconSize={24} />
                <div className="flex-1 ml-4">
                  <div className="text-xl">Guides</div>
                  <p>Learn how to use the API with how-to guides</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link className="reset mr-10 mb-10 flex-1" to="/api-reference/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="cloud" iconSize={24} />
                <div className="flex-1 ml-4">
                  <div className="text-xl">API Reference</div>
                  <p>Discover endpoints you can use to build innovative solutions</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link className="reset mr-10 mb-10 flex-1" to="/sdks/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="code" iconSize={24} />
                <div className="flex-1 ml-4">
                  <div className="text-xl">SDKs</div>
                  <p>Development Kits for Building your own Applications.</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
