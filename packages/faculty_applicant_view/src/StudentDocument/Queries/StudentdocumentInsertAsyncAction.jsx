import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentLargeFragment } from "./StudentdocumentFragments";

const StudentdocumentInsertMutation = createQueryStrLazy(
`
mutation StudentdocumentInsertMutation($id: UUID, $documentId: UUID, $studentId: UUID, $description: String) {
  result: studentDocumentInsert(
    studentDocument: {id: $id, documentId: $documentId, studentId: $studentId, description: $description}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...StudentdocumentLarge
  }
}
`,
    StudentdocumentLargeFragment)


export const StudentdocumentInsertAsyncAction = createAsyncGraphQLAction(StudentdocumentInsertMutation)