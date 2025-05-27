import { DocumentURI } from "../Components/DocumentLink"
import { DocumentPage } from "./DocumentPage"

/**
 * A router segment definition for the Document page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `DocumentURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} DocumentRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/document/document/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <DocumentPage />.
 */
export const DocumentRouterSegment = {
    path: `/${DocumentURI}:id`,
    element: <DocumentPage />,
}