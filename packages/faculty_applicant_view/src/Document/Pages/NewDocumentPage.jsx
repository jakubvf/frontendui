import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { DocumentButton } from "../Components/DocumentCUDButton"

/**
 * NewDocumentPage Component
 *
 * A page component that provides a form interface for creating new documents.
 * It renders a DocumentButton configured for create operations with default values.
 * The component manages local state for document name and content fields.
 *
 * @component
 * @returns {JSX.Element} A page containing a form to create new documents
 *
 * @example
 * // Usage in router configuration
 * <Route path="/documents/new" component={NewDocumentPage} />
 */
export const NewDocumentPage = () => {
    const [name, setName] = useState("")
    const [content, setContent] = useState("")

    const handleDone = (data) => console.log("Operation completed:", data);

    return (
        <>
            <DocumentButton
                operation="C"
                document={{ name: "New Item", name_en: "New Item EN" }}
                onDone={handleDone}
            >
                Insert
            </DocumentButton>
        </>
    )
}