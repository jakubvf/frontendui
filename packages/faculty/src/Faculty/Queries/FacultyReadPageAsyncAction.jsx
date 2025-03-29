import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { FacultyLargeFragment } from "./FacultyFragments";

const FacultyReadPageQuery = createQueryStrLazy(
`
query FacultyReadPageQuery($skip: Int, $limit: Int, $where: FacultyWhereInputFilter) {
  result: facultyPage(skip: $skip, limit: $limit, where: $where) {
    ...FacultyLarge
  }
}
`, 
    FacultyLargeFragment)

export const FacultyReadPageAsyncAction = createAsyncGraphQLAction(FacultyReadPageQuery)