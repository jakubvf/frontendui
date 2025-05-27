import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { UserRouterSegment } from '@jakubvf/uoisfrontend-faculty_applicant_view';

export const Routes = [
  UserRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
