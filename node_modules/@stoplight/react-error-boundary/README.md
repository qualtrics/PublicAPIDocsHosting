# @stoplight/react-error-boundary

<!-- BADGES -->

<!-- SUMMARY -->

The React error boundary tailored to Stoplight needs, inspired by [react-error-boundary](https://github.com/bvaughn/react-error-boundary).

- Explore the components: [Storybook](https://stoplightio.github.io/react-error-boundary)
- View the changelog: [Releases](https://github.com/stoplightio/react-error-boundary/releases)

### Features

- all the great features provided by [react-error-boundary](https://github.com/bvaughn/react-error-boundary),
- built-in error reporting,
- supports recovering,
- fallback component can try to recover error boundary.

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add @stoplight/react-error-boundary
```

### Usage

Before you start, you need to place the `ErrorBoundaryProvider` component, preferably at the root component

```tsx
import { ErrorBoundaryProvider } from '@stoplight/react-error-boundary';

// a standard instance of Stoplight reporter 
const reporter: IReporter = {
  reportError() {},
};

const App = () => {
  <ErrorBoundaryProvider reporter={reporter}>
    <Content />
  </ErrorBoundaryProvider>
};
```

then, you can either make use of:

- withErrorBoundary HOC

```tsx
import { withErrorBoundary } from '@stoplight/react-error-boundary';

const SchemaViewer: React.FunctionComponent<{ schema: unknown }> = ({ schema }) => {
  if (typeof schema !== 'object' || schema === null) {
    throw new Error('Schema must be an object');
  }

  if (Object.keys(schema).length === 0) {
    throw new Error('Schema cannot be empty');
  }

  return <span>This is fine.</span>;
};

const MyWrappedComponent = withErrorBoundary(SchemaViewer, {
  recoverableProps: ['schema'],
});

const Page = () => (
  <div>
    <h1>Schema Viewer</h1>
    <MyWrappedComponent schema={{}} />
  </div>
);
```

- ErrorBoundary component

```tsx
import { ErrorBoundary } from '@stoplight/react-error-boundary';

const SchemaViewer: React.FunctionComponent<{ schema: unknown }> = ({ schema }) => {
  if (typeof schema !== 'object' || schema === null) {
    throw new Error('Schema must be an object');
  }

  if (Object.keys(schema).length === 0) {
    throw new Error('Schema cannot be empty');
  }

  return <span>This is fine.</span>;
};

const Page = () => (
  <div>
    <h1>Schema Viewer</h1>
    <ErrorBoundary>
      <SchemaViewer schema={{}} />
    </ErrorBoundary>
  </div>
);
```

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `master` branch.
