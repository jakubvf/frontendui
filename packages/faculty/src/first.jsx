import { createAsyncGraphQLAction, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'

const readUserPageAsyncAction = createAsyncGraphQLAction(`{
    userPage {
      __typename
      id
      name
      surname
    }
  }`);

export const FirstEntity = () => {
  const { loading, error, entity, dispatchResult } = useAsyncAction(readUserPageAsyncAction, {});

  if (loading) return <p>Loading</p>;

  return <div>User: <div>{JSON.stringify(dispatchResult)}</div></div>;
}
