import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { PageProps } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StoplightPage from '../components/stoplight-page';

const TutorialsPage = ({ location }: PageProps) => {
  const nodeUri = location.pathname.split('/tutorials/')[1] || '/docs/Common%20Use%20Case%20Examples/generate-custom-distribution-links-1.md';

  return (
    <Layout centered={false}>
      <SEO title="Tutorials" />

      <StoplightPage path="tutorials" projectSrn="gh/qualtrics/publicapidocs" nodeUri={nodeUri} />
    </Layout>
  );
};

export default TutorialsPage;
