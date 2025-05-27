import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentLargeFragment } from "./StudentdocumentFragments";

const StudentdocumentUpdateMutation = createQueryStrLazy(
`
mutation StudentdocumentUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: studentdocumentUpdate(
    studentdocument: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on StudentdocumentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...StudentdocumentLarge
      }      
    }
    ...StudentdocumentLarge
  }
}
`, StudentdocumentLargeFragment)

export const StudentdocumentUpdateAsyncAction = createAsyncGraphQLAction(StudentdocumentUpdateMutation)