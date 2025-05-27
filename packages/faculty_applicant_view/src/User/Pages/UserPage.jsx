import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { UserLargeCard } from "../Components"
import { UserReadAsyncAction } from "../Queries"
import { UserPageNavbar } from "./UserPageNavbar"
import { Card, Badge, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Check } from "react-bootstrap-icons"
import Button from 'react-bootstrap/Button';
import { StudentdocumentReadPageAsyncAction } from "../../StudentDocument/Queries"

import { PaymentButton } from "../../Payment/Components"
import { StudentDocumentList, StudentDocumentButton } from "../../StudentDocument/Components"

/**
 * Displays detailed information about a user's applications and related documents.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - User entity data
 * @param {string} props.user.id - User's unique identifier
 * @param {string} props.user.name - User's name
 * @param {Array<Object>} props.user.studies - Array of study applications
 * @param {Array<Object>} props.documents - Array of student documents
 * @param {boolean} props.documentsLoading - Loading state for documents
 * @param {Error} props.documentsError - Error state for documents
 * @param {Function} props.fetch - Function to refetch data
 * @returns {JSX.Element} Rendered component
 */
const UserPageContent = ({ user, fetch, documents, documentsLoading, documentsError }) => {
    return (<>
        <UserPageNavbar user={user} />
        <UserLargeCard user={user}>
            <Card.Title>Podané přihlášky</Card.Title>
            {user.studies.map((study, index) => (
                <Card key={index}>
                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ alignItems: 'left' }}>
                            <Link to={'/programs/program/view/' + study.program.id}>{study.program.name}</Link>
                        </div>
                        <div style={{ alignItems: 'right' }}>
                            {study.payment.amount >= study.payment.paymentInfo.amount && <Badge bg="success">Zaplaceno</Badge>}
                            {study.payment.amount < study.payment.paymentInfo.amount && <Badge bg="danger">Nezaplaceno</Badge>}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Platba</Card.Title>
                        <ListGroup>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                <span><strong>Zaplacená částka:</strong> {study.payment.amount} Kč</span>
                                <PaymentButton
                                    operation="U"
                                    payment={{ id: study.payment.id, amount: study.payment.amount, lastchange: study.payment.lastchange }}
                                    onDone={(data) => fetch()}
                                >
                                    <Button variant="outline-primary" size="sm">Upravit</Button>
                                </PaymentButton>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Požadovaná částka:</strong> {study.payment.paymentInfo.amount} Kč
                            </ListGroup.Item>
                        </ListGroup>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Card.Title>Nahrané dokumenty</Card.Title>
                            <StudentDocumentButton
                                operation="C"
                                studentdocument={{ studentId: study.id }}
                                onDone={fetch}
                                style={{ marginLeft: '10px' }}
                            >
                                <Button variant="outline-primary" size="sm">+</Button>
                            </StudentDocumentButton>
                        </div>

                        <StudentDocumentList 
                            documents={documents.filter(doc => doc.student.id === study.id)}
                            loading={documentsLoading}
                            error={documentsError}
                        />
                        <Card.Title className="mt-3">Výsledky přijmacího řízení</Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </UserLargeCard>
    </>)
}

/**
 * Lazy-loading wrapper component for UserPageContent that handles data fetching.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - User identifier object
 * @param {string} props.user.id - User's unique identifier
 * @returns {JSX.Element} Component that fetches and displays user data
 */
const UserPageContentLazy = ({ user }) => {
    const { error: userError, loading: userLoading, entity, fetch: fetchUser } = useAsyncAction(UserReadAsyncAction, user)
    const { error: docError, loading: docLoading, dispatchResult: docResult, fetch: fetchDocs } = useAsyncAction(StudentdocumentReadPageAsyncAction, {})
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async (e) => {
        const data = e.target.value
        await delayer(() => fetchUser(data))
    }

    const handleBlur = async (e) => {
        const data = e.target.value
        await delayer(() => fetchUser(data))
    }

    const handleDocumentUpdate = async () => {
        await fetchUser()
        await fetchDocs()
    }

    if (userLoading || docLoading) return <LoadingSpinner />
    if (userError) return <ErrorHandler errors={userError} />
    if (docError) return <ErrorHandler errors={docError} />
    if (!entity) return null

    return <UserPageContent 
        user={entity} 
        onChange={handleChange} 
        onBlur={handleBlur} 
        fetch={handleDocumentUpdate}
        documents={docResult?.data?.result || []}
        documentsLoading={docLoading}
        documentsError={docError}
    />
}

/**
 * Main page component that displays user information based on URL parameters.
 * 
 * @component
 * @returns {JSX.Element} The rendered user page component
 */
export const UserPage = () => {
    const { id } = useParams()
    const user = { id }
    return <UserPageContentLazy user={user} />
}