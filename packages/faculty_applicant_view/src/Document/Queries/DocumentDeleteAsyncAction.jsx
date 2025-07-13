import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentLargeFragment } from "./DocumentFragments";

/**
 * GraphQL mutation string for deleting a document
 * @private
 */
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

/**
 * DocumentDeleteAsyncAction
 *
 * An async action hook for deleting documents via GraphQL mutation.
 * Handles the deletion of a document by its ID and lastchange timestamp
 * for optimistic concurrency control.
 *
 * @function
 * @param {Object} variables - The mutation variables
 * @param {string} variables.id - UUID of the document to delete
 * @param {string} variables.lastchange - Timestamp for optimistic locking
 * @returns {Object} Async action object with execute function and state
 *
 * @example
 * const deleteAction = DocumentDeleteAsyncAction()
 * 
 * const handleDelete = () => {
 *   deleteAction.execute({
 *     id: "550e8400-e29b-41d4-a716-446655440000",
 *     lastchange: "2024-01-01T12:00:00Z"
 *   })
 * }
 */
export const DocumentDeleteAsyncAction = createAsyncGraphQLAction(DocumentDeleteMutation)