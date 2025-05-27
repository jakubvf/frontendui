import { Card } from "react-bootstrap"
import { StudyApplicationCard } from "./StudyApplicationCard"

/**
 * Displays a list of study applications for a user.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.studies - Array of study applications
 * @param {Array<Object>} props.documents - Array of student documents
 * @param {boolean} props.documentsLoading - Loading state for documents
 * @param {Error} props.documentsError - Error state for documents
 * @param {Function} props.onUpdate - Callback function when data needs to be refreshed
 * @returns {JSX.Element} Rendered component
 */
export const StudyApplicationsList = ({ studies, documents, documentsLoading, documentsError, onUpdate }) => {
    return (
        <>
            <Card.Title>Podané přihlášky</Card.Title>
            {studies.map((study, index) => (
                <StudyApplicationCard
                    key={index}
                    study={study}
                    documents={documents}
                    documentsLoading={documentsLoading}
                    documentsError={documentsError}
                    onUpdate={onUpdate}
                />
            ))}
        </>
    )
} 