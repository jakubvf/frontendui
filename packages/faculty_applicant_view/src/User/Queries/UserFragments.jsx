import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const UserLinkFragment = createQueryStrLazy(
`
fragment UserLink on UserGQLModel {
  __typename
  id
  lastchange
  name
  fullname
}
`)


export const UserMediumFragment = createQueryStrLazy(
`
fragment UserMedium on UserGQLModel {
  startdate
  enddate
  email
  studies {
    program {
      name
    }
  }


  ...UserLink
}
`, UserLinkFragment)

export const UserLargeFragment = createQueryStrLazy(
`
fragment UserLarge on UserGQLModel {
  studies {
    id
    payment {
      id
      amount
      lastchange
      paymentInfo {
        id
        amount
      }
    }
  }

  ...UserMedium
}
`, UserMediumFragment)
