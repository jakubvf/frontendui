import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentLargeFragment } from "./StudentdocumentFragments";

const StudentdocumentDeleteMutation = createQueryStrLazy(
`
mutation StudentDocumentDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: studentDocumentDelete(
    studentDocument: {id: $id, lastchange: $lastchange}
  ) {
    ... on StudentDocumentGQLModelDeleteError {
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