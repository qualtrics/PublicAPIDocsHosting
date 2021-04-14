# node-parse-prefer-header

Parses an HTTP `Prefer` header, aka
[RFC7240](https://tools.ietf.org/html/rfc7240).

```js
const parsePreferHeader = require('parse-prefer-header');

const preferences = parsePreferHeader('respond-async, wait=300');
// preferences = { respondAsync: true, wait: '300' }
```

## Installation

```
$ npm install parse-prefer-header
```

## Features

- Parses the HTTP `Prefer` header into a friendly JavaScript object
- Normalizes tokens into JavaScript properties (e.g. `respondAsync`)
- Handles quoting correctly (e.g. `foo=";= ,;="` becomes `{ foo: ';= ,;='}`)
- Supports token parameters

## API

```typescript
parsePreferHeader(preferHeader: string | string[]): { [key: string]: string | boolean }
```

Parses the Prefer header value, or an Array of such values, and returns an
object mapping each preference token to its value or `true`.

See [here](https://tools.ietf.org/html/rfc7240#section-4) for an explanation of
the initial set of preferences.
