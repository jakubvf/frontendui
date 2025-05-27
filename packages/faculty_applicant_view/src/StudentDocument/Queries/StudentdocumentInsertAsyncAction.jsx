import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentLargeFragment } from "./StudentdocumentFragments";

const StudentdocumentInsertMutation = createQueryStrLazy(
`
mutation StudentdocumentInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: studentdocumentInsert(
    studentdocument: {id: $id, name: $name, nameEn: $name_en}
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