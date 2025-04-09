import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ApplicantLargeFragment } from "./ApplicantFragments";

const ApplicantDeleteMutation = createQueryStrLazy(
`
mutation ApplicantDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: applicantDelete(
    applicant: {id: $id, lastchange: $lastchange}
  ) {
    ... on ApplicantGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ApplicantLarge
      }
    }
  }
}
`,
    ApplicantLargeFragment)

export const ApplicantDeleteAsyncAction = createAsyncGraphQLAction(ApplicantDeleteMutation)