import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { UserRouterSegment } from '@jakubvf/uoisfrontend-applicant_view';
import { NewDocumentPage } from "../../../packages/applicant_view/src/Document/Pages/NewDocumentPage";


export const Routes = [
  UserRouterSegment,
  {
    path: "/",
    element: <NewDocumentPage />
  }
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
