import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacultyLargeFragment } from "./FacultyFragments";

const FacultyDeleteMutation = createQueryStrLazy(
`
mutation FacultyDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: facultyDelete(
    faculty: {id: $id, lastchange: $lastchange}
  ) {
    ... on FacultyGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...FacultyLarge
      }
    }
  }
}
`,
    FacultyLargeFragment)

export const FacultyDeleteAsyncAction = createAsyncGraphQLAction(FacultyDeleteMutation)