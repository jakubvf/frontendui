import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentLargeFragment } from "./DocumentFragments";

const DocumentReadQuery = createQueryStrLazy(
`
query DocumentReadQuery($id: UUID!) {
  result: documentById(id: $id) {
    ...DocumentLarge
  }
}
`, 
    DocumentLargeFragment)

    /**
 * An async action for executing a GraphQL query to read document entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `DocumentQueryRead` query.
 * It can be dispatched with query variables to fetch data related to document entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the document entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(DocumentReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const DocumentReadAsyncAction = createAsyncGraphQLAction(DocumentReadQuery)