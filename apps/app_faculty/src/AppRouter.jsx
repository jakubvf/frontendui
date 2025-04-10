import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { UserRouterSegment } from '@jakubvf/uoisfrontend-applicant_view';


export const Routes = [
  UserRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
