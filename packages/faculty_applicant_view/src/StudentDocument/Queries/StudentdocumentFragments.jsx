import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"


// Query nefunguje
// studentDocumentPage {
//   document {
//     name
//   }
// }
// {
// "code": "INTERNAL_SERVER_ERROR",
//   "AggregateError: Unexpected error value: { message: \"'function' object has no attribute 'load'\", path: [\"studentDocumentPage\", 0, \"document\"], extensions: { serviceName: \"office\", code: \"DOWNSTREAM_SERVICE_ERROR\", exception: [Object] } }, ",
//   "Unexpected error value: { message: \"'function' object has no attribute 'load'\", path: [\"studentDocumentPage\", 1, \"document\"], extensions: { serviceName: \"office\", code: \"DOWNSTREAM_SERVICE_ERROR\", exception: [Object] } }, ",
//   "Unexpected error value: { message: \"'function' object has no attribute 'load'\", path: [\"studentDocumentPage\", 2, \"document\"], extensions: { serviceName: \"office\", code: \"DOWNSTREAM_SERVICE_ERROR\", exception: [Object] } }, ",
//   "Unexpected error value: { message: \"'function' object has no attribute 'load'\", path: [\"studentDocumentPage\", 3, \"document\"], extensions: { serviceName: \"office\", code: \"DOWNSTREAM_SERVICE_ERROR\", exception: [Object] } }, ",
//   "Unexpected error value: { message: \"'function' object has no attribute 'load'\", path: [\"studentDocumentPage\", 4, \"document\"], extensions: { serviceName: \"office\", code: \"DOWNSTREAM_SERVICE_ERROR\", exception: [Object] } }",
//   "    at reportUnpathedErrorsViaNull (/usr/src/app/node_modules/@graphql-tools/delegate/dist/index.cjs:421:14)",
//   "    at resolveExternalValue (/usr/src/app/node_modules/@graphql-tools/delegate/dist/index.cjs:297:12)",
//   "    at handleResult (/usr/src/app/node_modules/@graphql-tools/delegate/dist/index.cjs:1962:25)",
//   "    at defaultMergedResolver (/usr/src/app/node_modules/@graphql-tools/delegate/dist/index.cjs:1956:10)",
//   "    at field.resolve (/usr/src/app/node_modules/@apollo/server/dist/cjs/utils/schemaInstrumentation.js:41:28)",
//   "    at executeField (/usr/src/app/node_modules/graphql/execution/execute.js:500:20)",
//   "    at executeFields (/usr/src/app/node_modules/graphql/execution/execute.js:422:22)",
//   "    at completeObjectValue (/usr/src/app/node_modules/graphql/execution/execute.js:933:10)",
//   "    at completeValue (/usr/src/app/node_modules/graphql/execution/execute.js:654:12)",
//   "    at executeField (/usr/src/app/node_modules/graphql/execution/execute.js:508:19)"


export const StudentdocumentLinkFragment = createQueryStrLazy(
`
fragment StudentdocumentLink on StudentDocumentGQLModel {
  __typename
  id
  lastchange
  student {
    id
  }
  document {
    id
  }
}
`)


export const StudentdocumentMediumFragment = createQueryStrLazy(
`
fragment StudentdocumentMedium on StudentDocumentGQLModel {
  ...StudentdocumentLink
}
`, StudentdocumentLinkFragment)

export const StudentdocumentLargeFragment = createQueryStrLazy(
`
fragment StudentdocumentLarge on StudentDocumentGQLModel {
  ...StudentdocumentMedium
}
`, StudentdocumentMediumFragment)
