import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { FacultyLargeCard } from "../Components"
import { FacultyReadAsyncAction } from "../Queries"
import { FacultyPageNavbar } from "./FacultyPageNavbar"

/**
 * A page content component for displaying detailed information about an faculty entity.
 *
 * This component utilizes `FacultyLargeCard` to create a structured layout and displays 
 * the serialized representation of the `faculty` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the FacultyPageContent component.
 * @param {Object} props.faculty - The object representing the faculty entity.
 * @param {string|number} props.faculty.id - The unique identifier for the faculty entity.
 * @param {string} props.faculty.name - The name or label of the faculty entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an faculty entity.
 *
 * @example
 * // Example usage:
 * const facultyEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacultyPageContent faculty={facultyEntity} />
 */
const FacultyPageContent = ({faculty}) => {
    return (<>
        <FacultyPageNavbar faculty={faculty} />
        <FacultyLargeCard faculty={faculty}>
            Faculty {JSON.stringify(faculty)}
        </FacultyLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an faculty entity.
 *
 * This component is created using `createLazyComponent` and wraps `FacultyPageContent` to provide
 * automatic data fetching for the `faculty` entity. It uses the `FacultyReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `faculty` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.faculty - The identifier of the faculty entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `faculty` entity data and displays it
 * using `FacultyPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const facultyId = "12345";
 *
 * <FacultyPageContentLazy faculty={facultyId} />
 */
const FacultyPageContentLazy = ({faculty}) => {
    const { error, loading, entity, fetch } = useAsyncAction(FacultyReadAsyncAction, faculty)
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
        {entity && <FacultyPageContent faculty={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an faculty entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `faculty` object, and passes it to the `FacultyPageContentLazy` component.
 * The `FacultyPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the faculty entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/faculty/:id" element={<FacultyPage />} />
 *
 * // Navigating to "/faculty/12345" will render the page for the faculty entity with ID 12345.
 */
export const FacultyPage = () => {
    const {id} = useParams()
    const faculty = {id}
    return <FacultyPageContentLazy faculty={faculty} />
}