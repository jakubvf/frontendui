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
};

const readProgramPageAsyncAction = createAsyncGraphQLAction(`{
    programPage {
      __typename
      id
      name
    }
  }`);

export const Program = () => {
  const { loading, error, entity, dispatchResult } = useAsyncAction(readProgramPageAsyncAction, {});

  if (loading) return <p>Loading</p>;

  console.log(dispatchResult);

  return (
    <div>
      {dispatchResult.data.programPage.map(program => (
        <div key={program.id}>{program.name}</div>
      ))}
    </div>
  );

};
