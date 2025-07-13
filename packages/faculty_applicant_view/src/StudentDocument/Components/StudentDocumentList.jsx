import { StudentdocumentLink } from "."
import { ListGroup, Button } from "react-bootstrap"
import { StudentDocumentButton } from "."
import { useState, useRef } from "react"

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
    const [isDragOver, setIsDragOver] = useState(false)
    const [draggedFile, setDraggedFile] = useState(null)
    const createButtonRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isEditMode) return
        setIsDragOver(true)
    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isEditMode) return
        setIsDragOver(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isEditMode) return
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragOver(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isEditMode) return
        
        setIsDragOver(false)
        
        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            const file = files[0]
            setDraggedFile({
                name: file.name,
                description: `Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
                studentId: studentId
            })
            
            // Trigger the create button click
            if (createButtonRef.current) {
                createButtonRef.current.click()
            }
        }
    }

    const handleCreateDone = (result) => {
        setDraggedFile(null)
        if (onUpdate) {
            onUpdate(result)
        }
    }

    return (
        <ListGroup 
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                transition: 'all 0.2s ease',
                border: isDragOver ? '2px dashed #007bff' : '1px solid #dee2e6',
                backgroundColor: isDragOver ? '#f8f9fa' : 'transparent',
                borderRadius: '0.375rem'
            }}
        >
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
                <ListGroup.Item style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    backgroundColor: isDragOver ? '#e7f3ff' : 'transparent'
                }}>
                    <StudentDocumentButton
                        ref={createButtonRef}
                        operation="C"
                        studentdocument={draggedFile || { studentId: studentId }}
                        onDone={handleCreateDone}
                    >
                        <Button variant="outline-success" size="sm">
                            {isDragOver ? 'Přetáhněte soubor sem' : 'Přidat dokument'}
                        </Button>
                    </StudentDocumentButton>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}
