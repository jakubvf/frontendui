import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const ApplicantLinkFragment = createQueryStrLazy(
`
fragment ApplicantLink on ApplicantGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const ApplicantMediumFragment = createQueryStrLazy(
`
fragment ApplicantMedium on ApplicantGQLModel {
  ...ApplicantLink
}
`, ApplicantLinkFragment)

export const ApplicantLargeFragment = createQueryStrLazy(
`
fragment ApplicantLarge on ApplicantGQLModel {
  ...ApplicantMedium
}
`, ApplicantMediumFragment)
  