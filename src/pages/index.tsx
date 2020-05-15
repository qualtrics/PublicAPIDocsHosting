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
          <div className="text-3xl mb-5">The Best APIs Start with Stoplight</div>
          <div className="text-xl max-w-3xl opacity-75">
            The API Design Management Platform powering the world's leading API first companies.
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex flex-wrap">
          <Link className="reset mr-10 mb-10 flex-1" to="/guides/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="book" iconSize={24} />

                <div className="flex-1 ml-4">
                  <div className="text-xl">Guides</div>

                  <p>Get started quickly with how to guides</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link className="reset mr-10 mb-10 flex-1" to="/tutorials/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="manual" iconSize={24} />

                <div className="flex-1 ml-4">
                  <div className="text-xl">Tutorials</div>

                  <p>Learn all the ins and outs of how to use the Platform</p>
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
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
