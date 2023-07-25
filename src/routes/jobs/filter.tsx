import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Input } from "@chakra-ui/react"

const Filter = () => {
    return (
      <Box mx="auto" px={8} py={4}  rounded="lg" shadow="lg" bgColor={'white'} style={{height:'fit-content', display:'flex', flexDirection:'column'}}>
          <Flex mb={4} alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>                    
              <Heading as={'h2'} size={'sm'}>Filters</Heading>
              <Button size={'xs'}>Clear All</Button>
          </Flex>
          <Flex mb={3} flexDirection={'column'}>
              <Flex mb={3} flexDirection={'column'}>
                  <Heading as={'h2'} size={'sm'} >Location</Heading>
                  <Input size={'sm'} />
              </Flex>
              <Flex mb={3} flexDirection={'column'}>
                  <Heading as={'h2'} size={'sm'} >Job Type</Heading>
                  <CheckboxGroup colorScheme='green' defaultValue={[]}>
                      <Checkbox value='naruto'>Naruto</Checkbox>
                      <Checkbox value='sasuke'>Sasuke</Checkbox>
                      <Checkbox value='kakashi'>Kakashi</Checkbox>
                  </CheckboxGroup>
              </Flex>
              <Flex mb={3} flexDirection={'column'}>
                  <Heading as={'h2'} size={'sm'} >Experience Level</Heading>
                  <CheckboxGroup colorScheme='green' defaultValue={[]}>
                      <Checkbox value='naruto'>Naruto</Checkbox>
                      <Checkbox value='sasuke'>Sasuke</Checkbox>
                      <Checkbox value='kakashi'>Kakashi</Checkbox>
                  </CheckboxGroup>
              </Flex>
              <Flex mb={3} flexDirection={'column'}>
                  <Heading as={'h2'} size={'sm'} >Department</Heading>
                  <CheckboxGroup colorScheme='green' defaultValue={[]}>
                      <Checkbox value='naruto'>Naruto</Checkbox>
                      <Checkbox value='sasuke'>Sasuke</Checkbox>
                      <Checkbox value='kakashi'>Kakashi</Checkbox>
                  </CheckboxGroup>
              </Flex>
          </Flex>
      </Box>
    )
}

export default Filter