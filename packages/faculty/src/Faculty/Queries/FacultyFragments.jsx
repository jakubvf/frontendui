import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const FacultyLinkFragment = createQueryStrLazy(
`
fragment FacultyLink on FacultyGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const FacultyMediumFragment = createQueryStrLazy(
`
fragment FacultyMedium on FacultyGQLModel {
  ...FacultyLink
}
`, FacultyLinkFragment)

export const FacultyLargeFragment = createQueryStrLazy(
`
fragment FacultyLarge on FacultyGQLModel {
  ...FacultyMedium
}
`, FacultyMediumFragment)
  