import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { StudentdocumentLink } from "."
import { ListGroup, Button } from "react-bootstrap"
import { StudentDocumentButton } from "."

export const StudentDocumentList = ({ documents, onUpdate }) => {

    return (
        <ListGroup>
            {documents.map(document => (
                <ListGroup.Item key={document.id}>
                    <StudentdocumentLink studentdocument={document} />
                    <StudentDocumentButton
                        operation="D"
                        studentdocument={{ id: document.id, lastchange: document.lastchange }}
                        onDone={onUpdate}
                        style={{ marginLeft: '10px' }}
                    >
                        <Button variant="outline-primary" size="sm">Smazat</Button>
                    </StudentDocumentButton>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
