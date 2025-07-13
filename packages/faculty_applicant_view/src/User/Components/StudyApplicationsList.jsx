import { Card } from "react-bootstrap"
import { StudyApplicationCard } from "./StudyApplicationCard"

/**
 * Displays a list of study applications for a user.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.studies - Array of study applications
 * @param {Array<Object>} props.documents - Array of student documents
 * @param {Array<Object>} props.evaluations - Array of evaluations
 * @param {Function} props.onUpdate - Callback function when data needs to be refreshed
 * @returns {JSX.Element} Rendered component
 */
export const StudyApplicationsList = ({ studies, documents, evaluations, onUpdate, ...props }) => {
    return (
        <>
            <Card.Title>Podané přihlášky ({studies.length})</Card.Title>
            {studies.map((study, index) => (
                <StudyApplicationCard
                    key={index}
                    study={study}
                    documents={documents}
                    evaluations={evaluations}
                    onUpdate={onUpdate}
                    {...props}
                />
            ))}
        </>
    )
}
