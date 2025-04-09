import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ApplicantLargeFragment } from "./ApplicantFragments";

const ApplicantInsertMutation = createQueryStrLazy(
`
mutation ApplicantInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: applicantInsert(
    applicant: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ApplicantLarge
  }
}
`,
    ApplicantLargeFragment)


export const ApplicantInsertAsyncAction = createAsyncGraphQLAction(ApplicantInsertMutation)