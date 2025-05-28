import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { StudentdocumentInsertAsyncAction } from "../Queries/StudentdocumentInsertAsyncAction"
import { DocumentInsertAsyncAction } from "../../Document/Queries/DocumentInsertAsyncAction"

/**
 * DocumentGenerator Component
 * 
 * This component provides functionality to generate random documents and student documents
 * for a given student. It interacts with asynchronous actions to insert data and 
 * displays the generated data in a structured format.
 * 
 * @component
 * @returns {JSX.Element} Input field for student ID and button for generating data, displays generated data/error when pressed.
 */
export const DocumentGenerator = () => {
    const { fetch: fetchStudentDocumentInsert } = useAsyncAction(StudentdocumentInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchDocumentInsert } = useAsyncAction(DocumentInsertAsyncAction, {}, { deffered: true });
    const [studentDocument, setStudentDocument] = useState(null);
    const [document, setDocument] = useState(null);
    const [studentId, setStudentId] = useState('');

    const documentTypes = [
        { name: "Diploma", nameEn: "Diploma", description: "Official degree certificate" },
        { name: "Transcript", nameEn: "Transcript", description: "Academic record" },
        { name: "ID Card", nameEn: "ID Card", description: "Student identification" },
        { name: "Certificate", nameEn: "Certificate", description: "Course completion certificate" },
        { name: "Recommendation", nameEn: "Recommendation", description: "Letter of recommendation" }
    ];

    const generateRandomDocument = () => {
        const randomType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
        return {
            id: crypto.randomUUID(),
            name: randomType.name,
            nameEn: randomType.nameEn,
            description: randomType.description,
            content: `Sample content for ${randomType.name}`,
            mimetype: "application/pdf"
        };
    };

    const generateRandomStudentDocument = (documentId) => {
        return {
            id: crypto.randomUUID(),
            studentId: studentId,
            documentId: documentId,
            description: `Student document for ${studentId}`
        };
    };

    const GenerateDocuments = async () => {
        if (!studentId) return;
        
        try {
            // First create a document
            const documentData = generateRandomDocument();
            const fetchedDocument = await fetchDocumentInsert(documentData);
            setDocument(fetchedDocument);

            // Then create a student document linking to the created document
            const studentDocumentData = generateRandomStudentDocument(fetchedDocument.id);
            const fetchedStudentDocument = await fetchStudentDocumentInsert(studentDocumentData);
            setStudentDocument(fetchedStudentDocument);
        } catch (error) {
            console.error("Error generating documents:", error);
        }
    };

    // Translation keys for better labels in the table
    const keyLabels = {
        id: "Identifikátor",
        studentId: "ID studenta",
        documentId: "ID dokumentu",
        name: "Název",
        nameEn: "Název (EN)",
        description: "Popis",
        content: "Obsah",
        mimetype: "Typ souboru",
        lastchange: "Poslední změna",
        created: "Vytvořeno",
        createdbyId: "Vytvořil",
        changedbyId: "Změnil",
        rbacobjectId: "RBAC objekt"
    };

    return (
        <div style={{ maxWidth: 600, margin: "32px auto", padding: 24, background: "#f8f9fa", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 24 }}>
                <Form.Group>
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Enter student ID"
                    />
                </Form.Group>
                <Button 
                    onClick={GenerateDocuments}
                    disabled={!studentId}
                >
                    Generovat dokumenty
                </Button>
            </div>
            {document && (
                <div style={{ marginBottom: 32, background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: 20 }}>
                    <h4 style={{ color: "#1976d2", marginBottom: 16 }}>Dokument</h4>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table table-bordered" style={{ background: "#fafdff", borderRadius: 8, minWidth: 600 }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%", whiteSpace: 'nowrap' }}>Název</th>
                                    <th style={{ width: "35%", whiteSpace: 'nowrap' }}>Hodnota</th>
                                    <th style={{ width: "35%", whiteSpace: 'nowrap' }}>JSON</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(document).map(([key, value]) => (
                                    <tr key={key}>
                                        <th style={{ width: "30%", background: "#f0f4fa", fontWeight: 600, textTransform: "capitalize", whiteSpace: 'nowrap' }}>{keyLabels[key] || key}</th>
                                        <td style={{ width: "35%", whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 0 }}>{String(value)}</td>
                                        <td style={{ width: "35%", color: "#888", fontStyle: "italic", whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 0 }}>{key}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {studentDocument && (
                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: 20, marginBottom: 32 }}>
                    <h4 style={{ color: "#1976d2", marginBottom: 16 }}>Studentský dokument</h4>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table table-bordered" style={{ background: "#fafdff", borderRadius: 8, minWidth: 600 }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%", whiteSpace: 'nowrap' }}>Popis</th>
                                    <th style={{ width: "35%", whiteSpace: 'nowrap' }}>Hodnota</th>
                                    <th style={{ width: "35%", whiteSpace: 'nowrap' }}>Klíč</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(studentDocument).map(([key, value]) => (
                                    <tr key={key}>
                                        <th style={{ width: "30%", background: "#f0f4fa", fontWeight: 600, textTransform: "capitalize", whiteSpace: 'nowrap' }}>{keyLabels[key] || key}</th>
                                        <td style={{ width: "35%", whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 0 }}>{String(value)}</td>
                                        <td style={{ width: "35%", color: "#888", fontStyle: "italic", whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 0 }}>{key}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}; 