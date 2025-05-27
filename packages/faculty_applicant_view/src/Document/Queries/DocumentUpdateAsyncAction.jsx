import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentLargeFragment } from "./DocumentFragments";

const DocumentUpdateMutation = createQueryStrLazy(
`
mutation DocumentUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: documentUpdate(
    document: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on DocumentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...DocumentLarge
      }      
    }
    ...DocumentLarge
  }
}
`, DocumentLargeFragment)

export const DocumentUpdateAsyncAction = createAsyncGraphQLAction(DocumentUpdateMutation)