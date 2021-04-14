const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-tsx": hot(preferDefault(require("C:\\Users\\SESA141987\\Documents\\GitHub\\PublicAPIDocsHosting\\src\\pages\\404.tsx"))),
  "component---src-pages-api-reference-tsx": hot(preferDefault(require("C:\\Users\\SESA141987\\Documents\\GitHub\\PublicAPIDocsHosting\\src\\pages\\api-reference.tsx"))),
  "component---src-pages-guides-tsx": hot(preferDefault(require("C:\\Users\\SESA141987\\Documents\\GitHub\\PublicAPIDocsHosting\\src\\pages\\guides.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("C:\\Users\\SESA141987\\Documents\\GitHub\\PublicAPIDocsHosting\\src\\pages\\index.tsx"))),
  "component---src-pages-instructions-tsx": hot(preferDefault(require("C:\\Users\\SESA141987\\Documents\\GitHub\\PublicAPIDocsHosting\\src\\pages\\instructions.tsx"))),
  "component---src-pages-sdks-tsx": hot(preferDefault(require("C:\\Users\\SESA141987\\Documents\\GitHub\\PublicAPIDocsHosting\\src\\pages\\sdks.tsx")))
}

