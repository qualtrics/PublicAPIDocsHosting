import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { Page, TableOfContents } from '@stoplight/elements';
import { Docs } from '@stoplight/elements/components/Docs';
import { TryIt } from '@stoplight/elements/components/TryIt';
import { join } from 'path';
import React from 'react';

import StoplightProvider from './stoplight-provider';

const StoplightPage = ({ projectSrn, nodeUri, path }: { projectSrn: string; nodeUri: string; path: string }) => {
  const srn = join(projectSrn, nodeUri);

  return (
    <StoplightProvider projectSrn={projectSrn} nodeUri={nodeUri} path={path}>
      <div className="flex h-full w-full">
        <TableOfContents srn={decodeURIComponent(srn)} />

        <Page
          className="flex-1"
          srn={srn}
          tabs={({ node }) => {
            const tabs = [{ title: 'Docs', content: <Docs node={node} /> }];

            if (node.type === 'http_operation') {
              tabs.push({ title: 'Try It', content: <TryIt value={node.data} /> });
            }

            return tabs;
          }}
        />
      </div>
    </StoplightProvider>
  );
};

export default StoplightPage;
