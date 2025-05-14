import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { DocumentButton } from "../Components/DocumentCUDButton"

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