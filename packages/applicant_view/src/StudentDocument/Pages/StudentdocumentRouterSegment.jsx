import { StudentdocumentURI } from "../Components/StudentdocumentLink"
import { StudentdocumentPage } from "./StudentdocumentPage"

/**
 * A router segment definition for the Studentdocument page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `StudentdocumentURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} StudentdocumentRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/studentdocument/studentdocument/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <StudentdocumentPage />.
 */
export const StudentdocumentRouterSegment = {
    path: `/${StudentdocumentURI}:id`,
    element: <StudentdocumentPage />,
}