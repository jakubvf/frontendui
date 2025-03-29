import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacultyLargeFragment } from "./FacultyFragments";

const FacultyInsertMutation = createQueryStrLazy(
`
mutation FacultyInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: facultyInsert(
    faculty: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...FacultyLarge
  }
}
`,
    FacultyLargeFragment)


export const FacultyInsertAsyncAction = createAsyncGraphQLAction(FacultyInsertMutation)