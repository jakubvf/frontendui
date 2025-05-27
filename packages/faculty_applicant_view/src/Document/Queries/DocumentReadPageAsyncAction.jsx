import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentLargeFragment } from "./DocumentFragments";

const DocumentReadPageQuery = createQueryStrLazy(
`
query DocumentReadPageQuery($skip: Int, $limit: Int, $where: DocumentWhereInputFilter) {
  result: documentPage(skip: $skip, limit: $limit, where: $where) {
    ...DocumentLarge
  }
}
`, 
    DocumentLargeFragment)

export const DocumentReadPageAsyncAction = createAsyncGraphQLAction(DocumentReadPageQuery)