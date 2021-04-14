// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-404-tsx": () => import("./../src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-api-reference-tsx": () => import("./../src/pages/api-reference.tsx" /* webpackChunkName: "component---src-pages-api-reference-tsx" */),
  "component---src-pages-guides-tsx": () => import("./../src/pages/guides.tsx" /* webpackChunkName: "component---src-pages-guides-tsx" */),
  "component---src-pages-index-tsx": () => import("./../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-pages-instructions-tsx": () => import("./../src/pages/instructions.tsx" /* webpackChunkName: "component---src-pages-instructions-tsx" */),
  "component---src-pages-sdks-tsx": () => import("./../src/pages/sdks.tsx" /* webpackChunkName: "component---src-pages-sdks-tsx" */)
}

