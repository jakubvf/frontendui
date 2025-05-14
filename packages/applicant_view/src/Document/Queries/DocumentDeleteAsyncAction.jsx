import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentLargeFragment } from "./DocumentFragments";

const DocumentDeleteMutation = createQueryStrLazy(
`
mutation DocumentDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: documentDelete(
    document: {id: $id, lastchange: $lastchange}
  ) {
    ... on DocumentGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...DocumentLarge
      }
    }
  }
}
`,
    DocumentLargeFragment)

export const DocumentDeleteAsyncAction = createAsyncGraphQLAction(DocumentDeleteMutation)