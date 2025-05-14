import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const DocumentLinkFragment = createQueryStrLazy(
`
fragment DocumentLink on DocumentGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const DocumentMediumFragment = createQueryStrLazy(
`
fragment DocumentMedium on DocumentGQLModel {
  ...DocumentLink
}
`, DocumentLinkFragment)

export const DocumentLargeFragment = createQueryStrLazy(
`
fragment DocumentLarge on DocumentGQLModel {
  ...DocumentMedium
}
`, DocumentMediumFragment)
  