import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentLargeFragment } from "./StudentdocumentFragments";

const StudentdocumentReadPageQuery = createQueryStrLazy(
`
query StudentdocumentReadPageQuery($skip: Int, $limit: Int, $where: StudentdocumentWhereInputFilter) {
  result: studentdocumentPage(skip: $skip, limit: $limit, where: $where) {
    ...StudentdocumentLarge
  }
}
`, 
    StudentdocumentLargeFragment)

export const StudentdocumentReadPageAsyncAction = createAsyncGraphQLAction(StudentdocumentReadPageQuery)