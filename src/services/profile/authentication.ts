// user information 

import API, { graphqlOperation } from "@aws-amplify/api";
import { Auth } from "@aws-amplify/auth";
import { createUser } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';

export async function getUserInfo() {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    return userInfo;
}

export async function getUserId() {
    const userInfo = await getUserInfo();
    const userId = userInfo.attributes.sub;
    return userId;
}

export async function getUserEmail() {
    const userInfo = await getUserInfo();
    const userEmail = userInfo.attributes.email;
    return userEmail;
}

export async function authenticateUser() {
    //run this snippet only when App is first mounted
        const fetchUser = async () => {
            // const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const userInfo = await getUserInfo();
            // console.log(userInfo);

            if (userInfo) {
                const userData = await API.graphql(
                    graphqlOperation(
                        getUser, {id: userInfo.attributes.sub}
                    )
                )

                // console.log(userData.data.getUser)

                if (userData.data.getUser) {
                    console.log("User is already registered in database")
                } else {
                //if there is no user in our database with that ID, then create one
                    const newUser = {
                        id: userInfo.attributes.sub,
                        email: userInfo.attributes.email
                    }
                    console.log(newUser);   
                
                    await API.graphql(
                        graphqlOperation(
                            createUser,
                            { input: newUser }
                        )
                    )
                }
            }
        }
        fetchUser();
}

