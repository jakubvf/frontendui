import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentLargeFragment } from "./StudentdocumentFragments";

const StudentdocumentDeleteMutation = createQueryStrLazy(
`
mutation StudentdocumentDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studentdocumentDelete(
    studentdocument: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudentdocumentGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...StudentdocumentLarge
      }
    }
  }
}
`,
    StudentdocumentLargeFragment)

export const StudentdocumentDeleteAsyncAction = createAsyncGraphQLAction(StudentdocumentDeleteMutation)