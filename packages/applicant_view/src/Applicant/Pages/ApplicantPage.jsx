import { useState } from "react"
import { useParams } from "react-router"
import { Card } from 'react-bootstrap';

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ApplicantLargeCard } from "../Components"
import { ApplicantReadAsyncAction } from "../Queries"
import { ApplicantPageNavbar } from "./ApplicantPageNavbar"

/**
 * A page content component for displaying detailed information about an applicant entity.
 *
 * This component utilizes `ApplicantLargeCard` to create a structured layout and displays
 * the serialized representation of the `applicant` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the ApplicantPageContent component.
 * @param {Object} props.applicant - The object representing the applicant entity.
 * @param {string|number} props.applicant.id - The unique identifier for the applicant entity.
 * @param {string} props.applicant.name - The name or label of the applicant entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an applicant entity.
 *
 * @example
 * // Example usage:
 * const applicantEntity = { id: 123, name: "Sample Entity" };
 *
 * <ApplicantPageContent applicant={applicantEntity} />
 */
 const ApplicantPageContent = ({ applicant }) => {
     return (
         <>
             <ApplicantPageNavbar applicant={applicant} />
             <ApplicantLargeCard applicant={applicant}>
                 {/* Applicant {JSON.stringify(applicant)} */}
                 <Card>
                     <Card.Body>
                         <Card.Title>Applicant Details</Card.Title>
                         <Card.Text>
                             <strong>ID:</strong> {applicant.id}
                         </Card.Text>
                         <Card.Text>
                             <strong>State ID:</strong> {applicant.stateId}
                         </Card.Text>
                         {applicant.student && (
                             <>
                                 <Card.Text>
                                     <strong>Full Name:</strong> {applicant.student.name}
                                 </Card.Text>
                                 <Card.Text>
                                     <strong>Student ID:</strong> {applicant.student.id}
                                 </Card.Text>
                             </>
                         )}
                     </Card.Body>
                 </Card>
             </ApplicantLargeCard>
         </>
     );
 };



/**
 * A lazy-loading component for displaying content of an applicant entity.
 *
 * This component is created using `createLazyComponent` and wraps `ApplicantPageContent` to provide
 * automatic data fetching for the `applicant` entity. It uses the `ApplicantReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `applicant` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.applicant - The identifier of the applicant entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `applicant` entity data and displays it
 * using `ApplicantPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const applicantId = "12345";
 *
 * <ApplicantPageContentLazy applicant={applicantId} />
 */
const ApplicantPageContentLazy = ({applicant}) => {
    let { error, loading, entity, fetch } = useAsyncAction(ApplicantReadAsyncAction, applicant)
    const [delayer] = useState(() => CreateDelayer())

    if (true) {
      error = undefined
      loading = undefined
      entity = getMockApplicantData()
    }

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <ApplicantPageContent applicant={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

const getMockApplicantData = () => {
  return {
    "id": "1",
    "stateId": "12345",
    "student": {
      "name": "John Doe",
      "id": "101"
    }
  }
}

/**
 * A page component for displaying lazy-loaded content of an applicant entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `applicant` object, and passes it to the `ApplicantPageContentLazy` component.
 * The `ApplicantPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the applicant entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/applicant/:id" element={<ApplicantPage />} />
 *
 * // Navigating to "/applicant/12345" will render the page for the applicant entity with ID 12345.
 */
export const ApplicantPage = () => {
    const {id} = useParams()
    const applicant = {id}
    return <ApplicantPageContentLazy applicant={applicant} />
}
