import { Box } from "@chakra-ui/react"
import Card from "../../components/card"
import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";


export interface jobProps {
    jobDescription: string;
    jobTitle: string;
    jobType: string;
    jobArea: string;
    datePosted: Date;
}

const List = () => {
    const [jobsArray, setJobsArray] = useState<jobProps[]>([])
    useEffect(() => {
        let jobsArrayLocal = [1,2,3,4,5,6,7,8,9,10].map(i => {
            return {
                jobDescription: faker.lorem.lines(5),
                jobTitle: faker.person.jobTitle(),
                jobType: faker.person.jobType(),
                jobArea: faker.person.jobArea(),
                datePosted: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: (new Date()).toISOString() }),
                jobLocation: faker.location.city()
            }
        })
        setJobsArray(jobsArrayLocal.sort((d1, d2) => new Date(d1.datePosted).getTime() - new Date(d2.datePosted).getTime()));
        
    }, [])
    
    return (
        <Box>
            {
                jobsArray.map((job,i) => {
                    return (
                        <Card jobData={job} key={i} />
                    )
                })
            }
        </Box>
    )
}

export default List