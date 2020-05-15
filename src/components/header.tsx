import cn from 'classnames';
import { Link } from 'gatsby';
import React from 'react';

const Header = ({ siteTitle, centered }: { siteTitle: string; centered: boolean }) => {
  return (
    <header className="bg-purple-6">
      <div
        className={cn('flex items-baseline py-8', {
          'max-w-6xl mx-auto': centered,
          'px-10': !centered,
        })}
      >
        <Link to="/" className="text-white reset mr-10 text-xl">
          <span className="text-white font-bold">{siteTitle}</span>
        </Link>

        <Link to="/guides/" className="reset mr-6 text-lg">
          <span className="text-white">Guides</span>
        </Link>

        <Link to="/tutorials/" className="reset mr-6 text-lg">
          <span className="text-white">Tutorials</span>
        </Link>

        <Link to="/api-reference/" className="reset mr-6 text-lg">
          <span className="text-white">API Reference</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
