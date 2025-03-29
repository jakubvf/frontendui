import { FacultyURI } from "../Components/FacultyLink"
import { FacultyPage } from "./FacultyPage"

/**
 * A router segment definition for the Faculty page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `FacultyURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} FacultyRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/faculty/faculty/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <FacultyPage />.
 */
export const FacultyRouterSegment = {
    path: `/${FacultyURI}/:id`,
    element: <FacultyPage />,
}