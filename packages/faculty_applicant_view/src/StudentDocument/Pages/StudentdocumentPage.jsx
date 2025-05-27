import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudentdocumentLargeCard } from "../Components"
import { StudentdocumentReadAsyncAction } from "../Queries"
import { StudentdocumentPageNavbar } from "./StudentdocumentPageNavbar"

/**
 * A page content component for displaying detailed information about an studentdocument entity.
 *
 * This component utilizes `StudentdocumentLargeCard` to create a structured layout and displays 
 * the serialized representation of the `studentdocument` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the StudentdocumentPageContent component.
 * @param {Object} props.studentdocument - The object representing the studentdocument entity.
 * @param {string|number} props.studentdocument.id - The unique identifier for the studentdocument entity.
 * @param {string} props.studentdocument.name - The name or label of the studentdocument entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an studentdocument entity.
 *
 * @example
 * // Example usage:
 * const studentdocumentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentdocumentPageContent studentdocument={studentdocumentEntity} />
 */
const StudentdocumentPageContent = ({studentdocument}) => {
    return (<>
        <StudentdocumentPageNavbar studentdocument={studentdocument} />
        <StudentdocumentLargeCard studentdocument={studentdocument}>
            Studentdocument {JSON.stringify(studentdocument)}
        </StudentdocumentLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an studentdocument entity.
 *
 * This component is created using `createLazyComponent` and wraps `StudentdocumentPageContent` to provide
 * automatic data fetching for the `studentdocument` entity. It uses the `StudentdocumentReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `studentdocument` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.studentdocument - The identifier of the studentdocument entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `studentdocument` entity data and displays it
 * using `StudentdocumentPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const studentdocumentId = "12345";
 *
 * <StudentdocumentPageContentLazy studentdocument={studentdocumentId} />
 */
const StudentdocumentPageContentLazy = ({studentdocument}) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudentdocumentReadAsyncAction, studentdocument)
    const [delayer] = useState(() => CreateDelayer())

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
        {entity && <StudentdocumentPageContent studentdocument={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an studentdocument entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `studentdocument` object, and passes it to the `StudentdocumentPageContentLazy` component.
 * The `StudentdocumentPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the studentdocument entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/studentdocument/:id" element={<StudentdocumentPage />} />
 *
 * // Navigating to "/studentdocument/12345" will render the page for the studentdocument entity with ID 12345.
 */
export const StudentdocumentPage = () => {
    const {id} = useParams()
    const studentdocument = {id}
    return <StudentdocumentPageContentLazy studentdocument={studentdocument} />
}