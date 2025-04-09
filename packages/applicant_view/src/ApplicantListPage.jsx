import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ApplicantPageNavbar } from "./ApplicantPageNavbar"

const ApplicantListPageContent = ({ applicants }) => {
};

const ApplicantPageContentLazy = ({applicants}) => {
  if (false) {
    const { error, loading, entity, fetch } = useAsyncAction(ApplicantReadAsyncAction, applicants)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <ApplicantListPage applicants={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
  } else {
    const entity = getApplicants();
    const handleChange = async(e) => {}
    const handleBlur = async(e) => {}

    return (<>
        {entity && <ApplicantListPage applicants={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
  }

}

export const ApplicantListPage = () => {
    return <ApplicantPageContentLazy applicant={applicant} />
}

const getApplicants = () => {

};
