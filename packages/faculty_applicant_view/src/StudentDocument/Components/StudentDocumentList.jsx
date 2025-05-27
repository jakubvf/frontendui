import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudentdocumentLink } from "."
import { StudentdocumentReadPageAsyncAction } from "../Queries"
import { ListGroup } from "react-bootstrap"


export const StudentDocumentList = ({ studentId }) => {
    const { dispatchResult, loading, error } = useAsyncAction(StudentdocumentReadPageAsyncAction, {})


    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorHandler errors={error} />
    }

    // filter documents by student id
    const filteredDocuments = dispatchResult.data.result.filter(document => document.student.id === studentId)


    return (
        <ListGroup>
            {filteredDocuments.map(document => (
                <ListGroup.Item key={document.id}>
                    <StudentdocumentLink studentdocument={document} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
