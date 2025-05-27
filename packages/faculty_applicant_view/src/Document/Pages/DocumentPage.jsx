import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { DocumentLargeCard } from "../Components"
import { DocumentReadAsyncAction } from "../Queries"
import { DocumentPageNavbar } from "./DocumentPageNavbar"

/**
 * A page content component for displaying detailed information about an document entity.
 *
 * This component utilizes `DocumentLargeCard` to create a structured layout and displays 
 * the serialized representation of the `document` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the DocumentPageContent component.
 * @param {Object} props.document - The object representing the document entity.
 * @param {string|number} props.document.id - The unique identifier for the document entity.
 * @param {string} props.document.name - The name or label of the document entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an document entity.
 *
 * @example
 * // Example usage:
 * const documentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <DocumentPageContent document={documentEntity} />
 */
const DocumentPageContent = ({document}) => {
    return (<>
        <DocumentPageNavbar document={document} />
        <DocumentLargeCard document={document}>
            Document {JSON.stringify(document)}
        </DocumentLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an document entity.
 *
 * This component is created using `createLazyComponent` and wraps `DocumentPageContent` to provide
 * automatic data fetching for the `document` entity. It uses the `DocumentReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `document` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.document - The identifier of the document entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `document` entity data and displays it
 * using `DocumentPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const documentId = "12345";
 *
 * <DocumentPageContentLazy document={documentId} />
 */
const DocumentPageContentLazy = ({document}) => {
    const { error, loading, entity, fetch } = useAsyncAction(DocumentReadAsyncAction, document)
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
        {entity && <DocumentPageContent document={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an document entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `document` object, and passes it to the `DocumentPageContentLazy` component.
 * The `DocumentPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the document entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/document/:id" element={<DocumentPage />} />
 *
 * // Navigating to "/document/12345" will render the page for the document entity with ID 12345.
 */
export const DocumentPage = () => {
    const {id} = useParams()
    const document = {id}
    return <DocumentPageContentLazy document={document} />
}