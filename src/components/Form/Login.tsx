import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Flex,
  } from '@chakra-ui/react'
import { useState } from 'react'

interface LoginProps {
    modalTitle : string
}

const Login:React.FC<LoginProps> = ({modalTitle}) => {
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const isError = username === ''

    return (<>
        <FormControl isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input rounded={'lg'} size={'sm'} type='email' value={username} onChange={(e) => setUsername(e.target.value)} />
            {!isError && <FormErrorMessage>Email is required.</FormErrorMessage>}
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input rounded={'lg'} size={'sm'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        { modalTitle.split(' ').join('').toLowerCase() === 'signin' && 
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input rounded={'lg'} size={'sm'} type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormControl>
        }
        <Flex justifyContent={'end'} >
            <Button mt={2} rounded={'lg'} size={'sm'} _hover={{bgColor:'#394867'}} bgColor={'#394867'} color='white' >{modalTitle}</Button>
        </Flex>
    </>)
}

export default Login
