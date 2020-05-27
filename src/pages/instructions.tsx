import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { PageProps } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StoplightPage from '../components/stoplight-page';

const InstructionsPage = ({ location }: PageProps) => {
  const nodeUri = location.pathname.split('/instructions/')[1] || '/docs/general-instructions.md';

  return (
    <Layout centered={false}>
      <SEO title="Instructions" />

      <StoplightPage path="instructions" projectSrn="gh/qualtrics/publicapidocs" nodeUri={nodeUri} />
    </Layout>
  );
};

export default InstructionsPage;
