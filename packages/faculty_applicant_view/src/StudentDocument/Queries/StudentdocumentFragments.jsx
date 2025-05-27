import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

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
  