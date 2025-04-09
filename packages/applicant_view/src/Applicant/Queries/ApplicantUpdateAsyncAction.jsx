import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ApplicantLargeFragment } from "./ApplicantFragments";

const ApplicantUpdateMutation = createQueryStrLazy(
`
mutation ApplicantUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: applicantUpdate(
    applicant: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ApplicantGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ApplicantLarge
      }      
    }
    ...ApplicantLarge
  }
}
`, ApplicantLargeFragment)

export const ApplicantUpdateAsyncAction = createAsyncGraphQLAction(ApplicantUpdateMutation)