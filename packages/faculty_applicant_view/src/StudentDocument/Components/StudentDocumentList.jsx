import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { StudentdocumentLink } from "."
import { ListGroup } from "react-bootstrap"

export const StudentDocumentList = ({ documents }) => {

    return (
        <ListGroup>
            {documents.map(document => (
                <ListGroup.Item key={document.id}>
                    <StudentdocumentLink studentdocument={document} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
