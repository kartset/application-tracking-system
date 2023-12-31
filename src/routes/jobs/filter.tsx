import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Input } from "@chakra-ui/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Loader } from '@googlemaps/js-api-loader'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { resetFilter, updateFilter } from "../../redux/reducers/jobs"

const Filter = () => {

    const { 
        jobCategoriesArr, jobDepartmentsArr, 
        jobsExperienceLevelArr, filters 
    } = useSelector((state:RootState) => state.jobs)
    const dispatch = useDispatch()

    return (
        <Box mx="auto" px={8} py={4}  rounded="lg" shadow="lg" bgColor={'white'} style={{height:'fit-content', display:'flex', flexDirection:'column'}}>
            <Flex mb={4} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>                    
                <Heading as={'h2'} size={'sm'}>Filters</Heading>
                <Button onClick={() => dispatch(resetFilter())} size={'xs'}>Clear All</Button>
            </Flex>
            <Flex mb={3} flexDirection={'column'}>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Location</Heading>
                    <LocationInput />
                </Flex>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Job Type</Heading>
                    <CheckboxGroup value={filters.jobTypes} onChange={(val) => {dispatch(updateFilter({jobTypes:val}))}} colorScheme='green' defaultValue={[]}>
                        {jobCategoriesArr.map((cat, i) => (<Checkbox key={i} value={cat.toLowerCase()}>{cat}</Checkbox>))}
                    </CheckboxGroup>
                </Flex>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Experience Level</Heading>
                    <CheckboxGroup value={filters.jobExperienceLevels} colorScheme='green' onChange={(val) => {dispatch(updateFilter({jobExperienceLevels:val}))}} defaultValue={[]}>
                        {jobsExperienceLevelArr.map((exp, i) => (<Checkbox key={i} value={exp.toLowerCase()}>{exp}</Checkbox>))}
                    </CheckboxGroup>
                </Flex>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Department</Heading>
                    <CheckboxGroup value={filters.jobDepartments} colorScheme='green' onChange={(val) => {dispatch(updateFilter({jobDepartments:val}))}} defaultValue={[]}>
                        {jobDepartmentsArr.map((dept,i) => (<Checkbox key={i} value={dept.toLowerCase()}>{dept}</Checkbox>))}
                    </CheckboxGroup>
                </Flex>
            </Flex>
        </Box>
    )
}

const LocationInput = () => {

    const isMounted = useRef(false)
    const inputRef = useRef(null)
    const [isLoaded, setLoaded] = useState(false)

    const loader = useMemo(() => {
        return new Loader({
          id:'google-map-script',
          libraries: ['places'],
          apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
          language: 'en',
          region:  'US',
          mapIds:  [],
          nonce:  '',
          authReferrerPolicy:  'origin',
        })
    }, [])

    useEffect(function trackMountedState() {
        isMounted.current = true
        return (): void => {
          isMounted.current = false
        }
    }, [])

    
    useEffect(() => {
        if (isLoaded) {
          return
        } else {
          loader.load().then(() => {
            if (isMounted.current) {setLoaded(true)}
            return
          })
          .catch((error) => {
            console.log({error})
          })
        }
    }, [isLoaded, loader])
   
    
    useEffect(() => {
       if(isLoaded) {
            const autoComplete = new window.google.maps.places.Autocomplete(
                (inputRef as any).current,
            )
            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace()
                if (!place.geometry || !place.geometry.location) {
                  // User entered the name of a Place that was not suggested and
                  // pressed the Enter key, or the Place Details request failed.
                    alert("this location not available")
                } else {
                    if (place.geometry.viewport || place.geometry.location) {
                        // do something
                        console.log(place.geometry.location)
                    }
                }
            })
       }
        
      
    }, [isLoaded])
    
    return (
        <div className="App">
            <Input
                size={'sm'}
                placeholder=' Location'
                borderRadius={'md'}
                ref={inputRef}
            />
        </div>
    )
}


export default Filter