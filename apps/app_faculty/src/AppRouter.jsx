import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";

import { AdmissionMediumCard, AdmissionRouterSegment } from '@hrbolek/uoisfrontend-admissions';

export const Routes = [
  {
    path: "/",
    element: <AdmissionMediumCard admission={{
      id: "995a0dd2-3697-4e40-ae68-5bc3d9fe8c81", name: "Nevim"
    }} />
  },
  AdmissionRouterSegment,
]
console.log(Routes)

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
