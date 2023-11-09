import { Box } from "@chakra-ui/react"
import Card from "../../components/card"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialJobs } from "../../redux/reducers/jobs";
import { RootState } from "../../redux";

export interface jobProps {
    jobDescription: string;
    jobTitle: string;
    jobType: string;
    jobArea: string;
    datePosted: Date;
}

const List = () => {
    
    const dispatch = useDispatch()
    const { jobsList } = useSelector((state:RootState) => state.jobs)
    
    useEffect(() => {
        dispatch(initialJobs())    
    }, [])
    
    return (
        <Box>
            {jobsList && jobsList.map((job:any,i:number) => {
                return (<Card jobData={job} key={i} />)
            })}
        </Box>
    )
}

export default List