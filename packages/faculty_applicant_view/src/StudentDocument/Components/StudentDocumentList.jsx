import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { StudentdocumentLink } from "."
import { ListGroup, Button } from "react-bootstrap"
import { StudentDocumentButton } from "."

/**
 * StudentDocumentList Component
 *
 * Displays a list of student documents with optional edit capabilities.
 * In edit mode, provides buttons for updating, deleting, and creating new documents.
 * Each document is displayed as a clickable link in a Bootstrap ListGroup.
 *
 * @component
 * @param {Object} props - The props for the StudentDocumentList component
 * @param {Array<Object>} props.documents - Array of student document objects to display
 * @param {Object} props.documents[].id - Unique identifier for the document
 * @param {string} props.documents[].lastchange - Last modification timestamp
 * @param {string} props.studentId - The ID of the student associated with these documents
 * @param {Function} [props.onUpdate] - Callback function called when documents are updated
 * @param {boolean} [props.isEditMode=false] - Whether to show edit controls (update/delete/create buttons)
 * @returns {JSX.Element} A Bootstrap ListGroup containing document items with optional edit controls
 *
 * @example
 * // Basic read-only usage
 * <StudentDocumentList documents={studentDocs} studentId="123" />
 *
 * @example
 * // With edit mode enabled
 * <StudentDocumentList 
 *   documents={studentDocs} 
 *   studentId="123"
 *   isEditMode={true}
 *   onUpdate={(data) => refreshDocuments()}
 * />
 */
export const StudentDocumentList = ({ documents, studentId, onUpdate, isEditMode = false }) => {
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
