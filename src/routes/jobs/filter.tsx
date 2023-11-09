import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Input } from "@chakra-ui/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Loader } from '@googlemaps/js-api-loader'
import { useSelector } from "react-redux"
import { RootState } from "../../redux"



const Filter = () => {
    const { jobCategoriesArr, jobDepartmentsArr, jobsExperienceLevelArr } = useSelector((state:RootState) => state.jobs)
    return (
        <Box mx="auto" px={8} py={4}  rounded="lg" shadow="lg" bgColor={'white'} style={{height:'fit-content', display:'flex', flexDirection:'column'}}>
            <Flex mb={4} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>                    
                <Heading as={'h2'} size={'sm'}>Filters</Heading>
                <Button size={'xs'}>Clear All</Button>
            </Flex>
            <Flex mb={3} flexDirection={'column'}>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Location</Heading>
                    <LocationInput />
                </Flex>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Job Type</Heading>
                    <CheckboxGroup colorScheme='green' defaultValue={[]}>
                        {jobCategoriesArr.map(cat => (<Checkbox value={cat.toLowerCase()}>{cat}</Checkbox>))}
                    </CheckboxGroup>
                </Flex>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Experience Level</Heading>
                    <CheckboxGroup colorScheme='green' defaultValue={[]}>
                        {jobsExperienceLevelArr.map(exp => (<Checkbox value={exp.toLowerCase()}>{exp}</Checkbox>))}
                    </CheckboxGroup>
                </Flex>
                <Flex mb={3} flexDirection={'column'}>
                    <Heading as={'h2'} size={'sm'} >Department</Heading>
                    <CheckboxGroup colorScheme='green' defaultValue={[]}>
                        {jobDepartmentsArr.map(dept => (<Checkbox value={dept.toLowerCase()}>{dept}</Checkbox>))}
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
          apiKey: 'AIzaSyB3CeVhjj81B6cRb_32g1z-QbTFNKTuP14',
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