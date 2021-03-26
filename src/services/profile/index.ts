import { useEffect, useState } from "react";


// const userID = 2; //can this go outside the function?

/**
 * Function to get the unique userID 
 */



/**
 * Function to get the profile of the user from API
 * @param {number} userID The unique ID of the logged-in user
 * @returns {object} The full profile of the user from the API
 */
export function getProfile(userID: number) {
  // const [data, setData] = useState([]);
  const [profile, setProfile] = useState([]);
//   const userID = 2; //this line will be modified to enter the proper user ID

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/') //https://jsonplaceholder.typicode.com/users/
      .then(response => response.json())
      .then(json => {
        // setData(json);
        setProfile(json[
          json.findIndex(prof => prof.id === userID)
        ]);
      })
      .catch((error) => alert(error));
  }, []);
  
  return profile;
}

/**
 * Placeholder for extracting the assigned diary date. See: https://www.w3schools.com/js/js_dates.asp for info on dates
 * Will call it `getDate()`
 */

export const getDate = async (date:type) => {
    
}


/**
 * Function to check if today is the diary date (call it checkDate)
 */
