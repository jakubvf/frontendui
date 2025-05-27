import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const EvaluationLinkFragment = createQueryStrLazy(
`
fragment EvaluationLink on EvaluationGQLModel {
  __typename
  id
  lastchange
  exam {
    name
  }
}
`)


export const EvaluationMediumFragment = createQueryStrLazy(
`
fragment EvaluationMedium on EvaluationGQLModel {
  studentId
  passed
  points
  ...EvaluationLink
}
`, EvaluationLinkFragment)

export const EvaluationLargeFragment = createQueryStrLazy(
`
fragment EvaluationLarge on EvaluationGQLModel {
  ...EvaluationMedium
}
`, EvaluationMediumFragment)
  