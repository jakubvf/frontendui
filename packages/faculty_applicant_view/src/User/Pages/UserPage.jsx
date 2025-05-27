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

const handleDocumentSubmit = (data) => {
    console.log("Document submitted:", data)
}

const handlePaymentUpdate = (data, fetch) => {
    console.log("Payment update submitted:", data)
    if (fetch) {
    }
}

/**
 * A page content component for displaying detailed information about an user entity.
 *
 * This component utilizes `UserLargeCard` to create a structured layout and displays 
 * the serialized representation of the `user` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the UserPageContent component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The name or label of the user entity.
 * @param {function} props.fetch - Function to refetch user data.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an user entity.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 * 
 * <UserPageContent user={userEntity} />
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
                        <br></br>
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
                            documents={documents.filter(doc => doc.student.id === study.id)} // tohle je workaround, dokud GQL where filtr nefugnuje
                            loading={documentsLoading}
                            error={documentsError}
                        />
                        <Card.Title className="mt-3">Výsledky přijmacího řízení</Card.Title>
                    </Card.Body>
                </Card>
            ))}
            {/* <ListGroup variant="flush" className="mt-2">
                {user.evaluations.map((evaluation, index) => {
                    let variant = "secondary";
                    let icon = "⬤";

                    if (evaluation.result > 75) {
                        variant = "success";
                        icon = "🏆"; // Top placement
                    } else if (evaluation.result > 50) {
                        variant = "warning";
                        icon = "⭐"; // Mid placement
                    } else {
                        variant = "danger";
                        icon = "⚠️"; // Low placement
                    }

                    return (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                                <Link to={'/evaluations/evaluation/view/' + evaluation.id}>{evaluation.name}</Link>
                            </div>
                            <div className="d-flex align-items-center">
                                <Badge bg={variant} className="me-2">
                                    {icon}
                                </Badge>
                                <span>{evaluation.result} %</span>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup> */}
        </UserLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an user entity.
 *
 * This component is created using `createLazyComponent` and wraps `UserPageContent` to provide
 * automatic data fetching for the `user` entity. It uses the `UserReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `user` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.user - The identifier of the user entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `user` entity data and displays it
 * using `UserPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const userId = "12345";
 *
 * <UserPageContentLazy user={userId} />
 */
const UserPageContentLazy = ({ user }) => {
    let { error: userError, loading: userLoading, entity, fetch: fetchUser } = useAsyncAction(UserReadAsyncAction, user)
    const { error: docError, loading: docLoading, dispatchResult: docResult, fetch: fetchDocs } = useAsyncAction(StudentdocumentReadPageAsyncAction, {})
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async (e) => {
        const data = e.target.value
        const serverResponse = await delayer(() => fetchUser(data))
    }

    const handleBlur = async (e) => {
        const data = e.target.value
        const serverResponse = await delayer(() => fetchUser(data))
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
 * A page component for displaying lazy-loaded content of an user entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `user` object, and passes it to the `UserPageContentLazy` component.
 * The `UserPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the user entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/user/:id" element={<UserPage />} />
 *
 * // Navigating to "/user/12345" will render the page for the user entity with ID 12345.
 */
export const UserPage = () => {
    const { id } = useParams()
    const user = { id }
    return <UserPageContentLazy user={user} />
}