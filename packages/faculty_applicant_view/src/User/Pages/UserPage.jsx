import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { UserLargeCard } from "../Components"
import { UserReadAsyncAction } from "../Queries"
import { UserPageNavbar } from "./UserPageNavbar"
import { StudentdocumentReadPageAsyncAction } from "../../StudentDocument/Queries"

import { StudyApplicationsList } from "../Components/StudyApplicationsList"
import { UserScalarAttribute } from "../Scalars/UserScalarAttribute"
import { UserVectorsAttribute } from "../Vectors/UserVectorsAttribute"
import { EvaluationReadPageAsyncAction } from "../../Evaluation/Queries"

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
const UserPageContent = ({ user, fetch, documents, evaluations }) => {
    return (
        <>
            <UserPageNavbar user={user} />
            <UserLargeCard user={user}>
                <UserScalarAttribute user={user} />
                <UserVectorsAttribute user={user} />
                <StudyApplicationsList
                    studies={user.studies}
                    documents={documents}
                    evaluations={evaluations}
                    onUpdate={fetch}
                />
            </UserLargeCard>
        </>
    )
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
    const { error: evalError, loading: evalLoading, dispatchResult: evalResult, fetch: fetchEvals } = useAsyncAction(EvaluationReadPageAsyncAction, {})
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async (e) => {
        const data = e.target.value
        await delayer(() => fetchUser(data))
    }

    const handleBlur = async (e) => {
        const data = e.target.value
        await delayer(() => fetchUser(data))
    }

    const handleUpdate = async () => {
        await fetchUser()
        await fetchDocs()
        await fetchEvals()
    }

    if (userLoading) return <LoadingSpinner />
    if (docLoading) return <LoadingSpinner />
    if (evalLoading) return <LoadingSpinner />
    if (userError) return <ErrorHandler errors={userError} />
    if (docError) return <ErrorHandler errors={docError} />
    if (evalError) return <ErrorHandler errors={evalError} />
    if (!entity) return null

    return <UserPageContent 
        user={entity} 
        onChange={handleChange} 
        onBlur={handleBlur} 
        fetch={handleUpdate}
        documents={docResult?.data?.result || []}
        evaluations={evalResult?.data?.result || []}
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