import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacultyLargeFragment } from "./FacultyFragments";

const FacultyUpdateMutation = createQueryStrLazy(
`
mutation FacultyUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: facultyUpdate(
    faculty: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on FacultyGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...FacultyLarge
      }      
    }
    ...FacultyLarge
  }
}
`, FacultyLargeFragment)

export const FacultyUpdateAsyncAction = createAsyncGraphQLAction(FacultyUpdateMutation)