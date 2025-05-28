import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { UserRouterSegment, DocumentGenerator } from '@jakubvf/uoisfrontend-faculty_applicant_view';

export const Routes = [
  UserRouterSegment,
  {
    path: '/',
    element: <DocumentGenerator />
  }
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
