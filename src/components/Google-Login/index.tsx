import {googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { create } from 'apisauce'
import { Avatar} from '@chakra-ui/react';

function GoogleLoginWrapper() {
    const [ user, setUser ] = useState<any>();
    const [ profile, setProfile ] = useState<any>();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    useEffect(      //this will go to backend
        () => {
            if (user) {
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
                        setProfile(res.data);
                    })
                    .catch((err:any) => console.log(err));
            }
        },
        [ user ]
    );

    console.log({user, profile})
    
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <Avatar src={profile.picture} name="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    )
}
export default GoogleLoginWrapper;