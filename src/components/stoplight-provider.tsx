import { Provider } from '@stoplight/elements';
import { Link } from 'gatsby';
import { dirname, resolve } from 'path';
import React from 'react';

const StoplightProvider: React.FC<{ projectSrn: string; nodeUri?: string; path: string }> = ({
  projectSrn,
  nodeUri,
  path,
  children,
}) => {
  return (
    <Provider
      host="https://qualtrics.stoplight.io/api"
      components={{
        link: ({ node, children }, key) => {
          // Render a custom link component
          let url = node.url;

          // Open external links in a new tab
          if (/^(http|#)/.test(url)) {
            return (
              <a href={url} target="_blank" rel="noreferrer noopener">
                {children}
              </a>
            );
          }

          if (nodeUri && /^\./.test(url)) {
            // Resolve relative links
            url = `/${path}${resolve(dirname(nodeUri), url)}`;
          } else {
            url = url.replace(projectSrn, `/${path}`);
          }

          return (
            <Link key={key} className="reset" to={url} title={node.title}>
              {children}
            </Link>
          );
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default StoplightProvider;
