import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect } from 'react';
import { create } from 'apisauce'
import { Button, Flex, Image, Text} from '@chakra-ui/react';
import  ico from '../../assets/search.ico'
import { setProfile, setUser } from '../../redux/reducers/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';


interface GoogleLoginWrapperProps {
    onClose: () => void
}


const GoogleLoginWrapper:React.FC<GoogleLoginWrapperProps> = ({onClose}) => {
    let { user, profile } = useSelector((state:RootState) => state.login)
    const dispatch = useDispatch()
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => dispatch(setUser(codeResponse)),
        onError: (error) => console.log('Login Failed:', error)
    });

    //this will go to backend
    useEffect(() => {
        if (Object.keys(user).length > 0 &&  user) {
            
            console.log({user})
            
            let api = create({
                baseURL: 'https://www.googleapis.com/oauth2/v1/',
                headers: {
                    Authorization: `${user.token_type} ${user.access_token}`,
                    Accept: 'application/json'
                },
            })
            
            api.get('userinfo?access_token=' + user.access_token)
            .then((res:any) => {
                dispatch(setProfile(res.data));
                onClose()

            })
            .catch((err:any) => console.log(err));
        }
    }, [user]);

    console.log({user, profile})
    
    return (
        <Flex justifyContent={'center'}>
            <Button size={'sm'} variant={'outline'} onClick={() => login()}>
                <Image mr={2} borderRadius={'full'} boxSize='20px' src={ico} />
                <Text fontWeight={'bold'} >Sign in with Google </Text>
            </Button>
        </Flex>
    )
}
export default GoogleLoginWrapper;