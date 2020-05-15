import '@stoplight/elements/styles/elements.css';
import '../styles/stoplight.css';

import { Page, Provider, TableOfContents } from '@stoplight/elements';
import { Docs } from '@stoplight/elements/components/Docs';
import { TryIt } from '@stoplight/elements/components/TryIt';
import { Link } from 'gatsby';
import { join } from 'path';
import React from 'react';

const StoplightPage = ({ projectSrn, nodeUri, path }: { projectSrn: string; nodeUri: string; path: string }) => {
  const srn = join(projectSrn, nodeUri);

  return (
    <Provider
      host="https://qualtrics.stoplight.io/api"
      components={{
        link: ({ node, children }) => {
          // Render a custom link component
          let url = node.url;
          if (!/^http/.test(url)) {
            url = url.replace(projectSrn, path);
          }

          return (
            <Link className="reset" to={url} title={node.title}>
              {children}
            </Link>
          );
        },
      }}
    >
      <div className="flex h-full w-full">
        <TableOfContents srn={srn} />

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
    </Provider>
  );
};

export default StoplightPage;
