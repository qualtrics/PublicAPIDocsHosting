import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { PageProps } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StoplightPage from '../components/stoplight-page';

const TutorialsPage = ({ location }: PageProps) => {
  const nodeUri = location.pathname.replace('/tutorials/', '') || '/docs/markdown/basic-syntax.md';

  return (
    <Layout centered={false}>
      <SEO title="Tutorials" />

      <StoplightPage path="tutorials" projectSrn="gh/stoplightio/studio-demo" nodeUri={nodeUri} />
    </Layout>
  );
};

export default TutorialsPage;
