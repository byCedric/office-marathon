// import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect } from 'react';
import { createUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';
import { Box, Paragraph, Spinner, Title } from '../providers/theme';

export const AuthLoadingScreen: React.FC = () => {
    // const navigation = useNavigation();
    //run this snippet only when App is first mounted
    useEffect( () => { // around the 1 hour mark in tutorial
        const fetchUser = async () => {
            // get authenticated user from Auth
            const userInfo = await Auth.currentAuthenticatedUser( { bypassCache: true });
            // console.log(userInfo);

            if (userInfo) {
            // get the user from Backend with user ID (SUB) from Auth
                const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}))

                if (userData.data.getUser) {
                    console.log("User is already registered in database")
                } 

                const newUser = {
                    id: userInfo.attributes.sub,
                    email: userInfo.attributes.email,
                }

                await API.graphql(
                    graphqlOperation(
                        createUser,
                        { input: newUser }
                    )
                )
            // if there is no user in our database with that ID, then create one
            }
        }
        fetchUser();
    }, [])

    return (
        <Box variant='page'>
            <Box>
                <Title>Authenticating</Title>
                <Paragraph>Please wait while we authenticate your stuff</Paragraph>
            </Box>
            <Spinner />
        </Box>
    )
}