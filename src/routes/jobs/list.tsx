import { Box } from "@chakra-ui/react"
import Card from "../../components/card"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialJobs, resetJobs, updateJobs } from "../../redux/reducers/jobs";
import { RootState } from "../../redux";

export interface jobProps {
    jobDescription: string;
    jobTitle: string;
    jobType: string;
    jobArea: string;
    datePosted: Date;
    jobLocation: string;
    jobExperienceLevel: string;
}

const List = () => {
    
    const dispatch = useDispatch()
    const { jobsList, filters } = useSelector((state:RootState) => state.jobs)
    
    useEffect(() => {
        dispatch(initialJobs())    
    }, [])

    useEffect(() => {
        if(
            (filters.location.length > 0) || 
            (filters.jobDepartments.length > 0) ||
            (filters.jobExperienceLevels.length > 0) ||
            (filters.jobTypes.length > 0)
        ) {
            dispatch(updateJobs())
        } else {
            dispatch(resetJobs())
        }
    }, [filters])
    
    
    return (
        <Box>
            {jobsList && jobsList.map((job:any,i:number) => {
                return (<Card jobData={job} key={i} />)
            })}
        </Box>
    )
}

export default List