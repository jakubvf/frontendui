import { ApplicantURI } from "../Components/ApplicantLink"
import { ApplicantPage } from "./ApplicantPage"

/**
 * A router segment definition for the Applicant page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `ApplicantURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} ApplicantRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/applicant/applicant/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <ApplicantPage />.
 */
export const ApplicantRouterSegment = {
    path: `/${ApplicantURI}:id`,
    element: <ApplicantPage />,
}
