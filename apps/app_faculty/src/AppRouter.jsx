import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { Program } from '@jakubvf/uoisfrontend-faculty';

export const Routes = [
  {
    path: "/",
    element: <Program/>
  },
  {
    path: "/faculty",
    element: <h1>Hello world!</h1>,
  }
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
