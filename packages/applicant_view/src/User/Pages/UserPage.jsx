import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { UserLargeCard } from "../Components"
import { UserReadAsyncAction } from "../Queries"
import { UserPageNavbar } from "./UserPageNavbar"
import { Accordion, Card, Badge, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Check } from "react-bootstrap-icons"

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
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an user entity.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 * 
 * <UserPageContent user={userEntity} />
 */
const UserPageContent = ({ user }) => {
    return (<>
        <UserPageNavbar user={user} />
        <UserLargeCard user={user}>
            <Card.Title>Platby</Card.Title>
            <Accordion defaultActiveKey="0">
                {user.studies.map((study, index) => (
                    <Accordion.Item key={index}>
                        <Accordion.Header>
                            <Check />
                            <Link to={'/programs/program/view/' + study.program.id}>{study.program.name}</Link>
                        </Accordion.Header>
                        <Accordion.Body>
                            {study.payments.map((payment, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>
                                            <Badge bg="success" className="me-2">Zaplaceno</Badge>
                                            {index + 1}. Platba
                                        </Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <strong>Částka:</strong> {payment.amount} Kč
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <strong>Požadovaná Částka:</strong> {payment.paymentInfo.amount} Kč
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <strong>Datum:</strong> {payment.paymentInfo.date}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <Card.Title className="mt-3">Nahrané Dokumenty</Card.Title>
            <ListGroup variant="flush" className="mt-2">
                {user.documents.map((document, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <Link to={'/documents/document/view/' + document.id}>{document.name}</Link>
                        <Badge bg="info">{document.type || "Dokument"}</Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Card.Title className="mt-3">Výsledky přijmacího řízení</Card.Title>
            <ListGroup variant="flush" className="mt-2">
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
            </ListGroup>
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
    let { error, loading, entity, fetch } = useAsyncAction(UserReadAsyncAction, user)
    const [delayer] = useState(() => CreateDelayer())

    if (entity !== undefined) {
        entity = {
            ...entity,
            startdate: "01.09.2023",
            enddate: "30.06.2024",
            studies: [
                ...(entity.studies || []),
                {
                    program: {
                        name: "Vojenská matematika",
                        id: "1234567890"
                    },
                    payments: [
                        {
                            amount: 1000,
                            paymentInfo: {
                                id: "1234567890",
                                date: "01.09.2023",
                                amount: 1000
                            }
                        }
                    ]
                }
            ],
            documents: [
                ...(entity.documents || []),
                {
                    id: "doc-123",
                    name: "Rodný list",
                    type: "PDF"
                },
                {
                    id: "doc-456",
                    name: "Životopis",
                    type: "Word"
                },
                {
                    id: "doc-789",
                    name: "dick pick",
                    type: "PNG"
                }
            ],
            evaluations: [
                ...(entity.evaluations || []),
                {
                    id: "eval-123",
                    name: "Tělocvik",
                    result: 80
                },
                {
                    id: "eval-456",
                    name: "Matematika",
                    result: 67
                },
                {
                    id: "eval-789",
                    name: "Anglický jazyk",
                    result: 45
                }
            ],
        };
    }

    const handleChange = async (e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async (e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <UserPageContent user={entity} onChange={handleChange} onBlur={handleBlur} />}
    </>)
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