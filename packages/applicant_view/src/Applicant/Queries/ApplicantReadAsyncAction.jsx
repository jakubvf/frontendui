import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ApplicantLargeFragment } from "./ApplicantFragments";

const ApplicantReadQuery = createQueryStrLazy(
`
query ApplicantReadQuery($id: UUID!) {
  result: applicantById(id: $id) {
    ...ApplicantLarge
  }
}
`, 
    ApplicantLargeFragment)

    /**
 * An async action for executing a GraphQL query to read applicant entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `ApplicantQueryRead` query.
 * It can be dispatched with query variables to fetch data related to applicant entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the applicant entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(ApplicantReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
export const ApplicantReadAsyncAction = createAsyncGraphQLAction(ApplicantReadQuery)