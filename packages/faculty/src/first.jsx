import { createAsyncGraphQLAction, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'

import { FacultyMediumCard } from './Faculty/Components/FacultyMediumCard';

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

const readAdmissionPageAsyncAction = createAsyncGraphQLAction(`{
    admissionPage {
      __typename
      id
      name
    }
  }`);

export const Admission = () => {
  const { loading, error, entity, dispatchResult } = useAsyncAction(readAdmissionPageAsyncAction, {});

  if (loading) return <p>Loading</p>;

  return (
    <div>
      {dispatchResult.data.admissionPage.map((admission, i) => (
        <FacultyMediumCard key={i} faculty={{ id: admission.id, name: admission.name }} />
      ))}
    </div>
  );

};
