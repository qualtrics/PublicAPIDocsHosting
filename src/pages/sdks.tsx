import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { PageProps } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StoplightPage from '../components/stoplight-page';

const SDKsPage = ({ location }: PageProps) => {
  const nodeUri = location.pathname.split('/sdks/')[1] || '/docs/sdks.md';

  return (
    <Layout centered={false}>
      <SEO title="SDKs" />

      <StoplightPage path="sdks" projectSrn="gh/qualtrics/publicapidocs" nodeUri={nodeUri} />
    </Layout>
  );
};

export default SDKsPage;
