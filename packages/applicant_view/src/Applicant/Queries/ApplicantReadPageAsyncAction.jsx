import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ApplicantLargeFragment } from "./ApplicantFragments";

const ApplicantReadPageQuery = createQueryStrLazy(
`
query ApplicantReadPageQuery($skip: Int, $limit: Int, $where: ApplicantWhereInputFilter) {
  result: applicantPage(skip: $skip, limit: $limit, where: $where) {
    ...ApplicantLarge
  }
}
`, 
    ApplicantLargeFragment)

export const ApplicantReadPageAsyncAction = createAsyncGraphQLAction(ApplicantReadPageQuery)