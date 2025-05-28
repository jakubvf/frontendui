import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { StudentdocumentLink } from "."
import { ListGroup, Button } from "react-bootstrap"
import { StudentDocumentButton } from "."

export const StudentDocumentList = ({ documents, studentId, onUpdate, isEditMode = false }) => {
    console.log(studentId);
    return (
        <ListGroup >
            {documents.map(document => (
                <ListGroup.Item key={document.id} className="d-flex justify-content-between align-items-center">
                    <StudentdocumentLink studentdocument={document} />
                    {isEditMode && (
                        <div>
                            <StudentDocumentButton
                                operation="U"
                                studentdocument={document}
                                onDone={onUpdate}
                                style={{ marginLeft: '10px' }}
                            >
                                <Button variant="outline-primary" size="sm">Upravit</Button>
                            </StudentDocumentButton>
                            <StudentDocumentButton
                                operation="D"
                                studentdocument={{ id: document.id, lastchange: document.lastchange }}
                                onDone={onUpdate}
                                style={{ marginLeft: '10px' }}
                            >
                                <Button variant="outline-danger" size="sm">Smazat</Button>
                            </StudentDocumentButton>
                        </div>
                    )}
                </ListGroup.Item>
            ))}
            {isEditMode && (
                <ListGroup.Item>
                    <StudentDocumentButton
                        operation="C"
                        studentdocument={{ studentId: studentId }}
                        onDone={onUpdate}
                    >
                        <Button variant="outline-success" size="sm">Přidat dokument</Button>
                    </StudentDocumentButton>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}
