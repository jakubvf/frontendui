import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const StudentdocumentLinkFragment = createQueryStrLazy(
`
fragment StudentdocumentLink on StudentdocumentGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const StudentdocumentMediumFragment = createQueryStrLazy(
`
fragment StudentdocumentMedium on StudentdocumentGQLModel {
  ...StudentdocumentLink
}
`, StudentdocumentLinkFragment)

export const StudentdocumentLargeFragment = createQueryStrLazy(
`
fragment StudentdocumentLarge on StudentdocumentGQLModel {
  ...StudentdocumentMedium
}
`, StudentdocumentMediumFragment)
  