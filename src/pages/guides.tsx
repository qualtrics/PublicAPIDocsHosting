import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { PageProps } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StoplightPage from '../components/stoplight-page';

const GuidesPage = ({ location }: PageProps) => {
  const nodeUri = location.pathname.split('/guides/')[1] || '/docs/overview.md';

  return (
    <Layout centered={false}>
      <SEO title="Guides" />

      <StoplightPage path="guides" projectSrn="gh/qualtrics/publicapidocs" nodeUri={nodeUri} />
    </Layout>
  );
};

export default GuidesPage;
