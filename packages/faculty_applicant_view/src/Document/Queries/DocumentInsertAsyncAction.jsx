import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentLargeFragment } from "./DocumentFragments";

const DocumentInsertMutation = createQueryStrLazy(
`
mutation DocumentInsertMutation($id: UUID, $name: String, $nameEn: String, $description: String) {
  result: documentInsert(
    document: {id: $id, name: $name, nameEn: $nameEn, description: $description}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ... on ElectronicDocumentGQLModel {
      __typename
      id
      name
    }
  }
}
`,
)


export const DocumentInsertAsyncAction = createAsyncGraphQLAction(DocumentInsertMutation)