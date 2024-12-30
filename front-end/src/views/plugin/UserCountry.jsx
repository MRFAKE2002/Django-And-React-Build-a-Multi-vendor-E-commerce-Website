import React, { useEffect, useState } from "react";

/*
  ma inja mikhaim az 'component react' be esm 'GetCurrentAddress' estefade konim ta 'address user' ro bar asas 
  'mokhtasat joghrafiai yani geolocation' peida konim.
*/
function GetCurrentAddress() {
    // Initialize a state variable 'address' to store the user's current address.
    const [address, setAddress] = useState('');

    /* 
      The 'useEffect' hook is used to execute side effects in function components. 
      In this case, it's used to fetch the user's address based on geolocation when the component mounts (empty dependency array).
    */
    useEffect(() => {
        /* 
          The 'navigator.geolocation.getCurrentPosition' function is used to retrieve the user's current geolocation coordinates.
          inja az 'API mokhtasat joghrafiai browser' estefade mikonim ta 'address user' peida konim.
          in function yek 'callback' dare ke inja 'position' mishe va 'data' dakhel oun gharar dare.
        */
        navigator.geolocation.getCurrentPosition(position => {
          /*
              console.log(position);
              '
              {
                coords: {
                    latitude: 51.5074, // عرض جغرافیایی
                    longitude: -0.1278 // طول جغرافیایی
                },
                timestamp: 1621296000000 // زمان ثبت موقعیت جغرافیایی (اختیاری)
              }
              '

              dar inja ma mikhaim 'mokhtasat joghrafiai yani arz va tool joghrafiati' ro az 'position.coords' begirim.
              inja 'latitude mishe arz joghrafiai' va 'longitude mishe tool joghrafiai'.

              dar in khat ma miaim az mafhume 'Destructuring Assignment' dar 'JavaScript' estefade mikonim.
              'Destructuring' yek emkan dar 'JavaScript' ke mishe maghadir darun 'object' ro mostaghim begirim.
            */
            const { latitude, longitude } = position.coords;

            /*
              inja ma estelah 'geocoding' darim ke miad 'address' ro be 'mokhtasat joghrafiai' tabdil mikone.
              hala ma mikhaim 'reverse geocoding' estefade konim va 'mokhtasat joghrafiai' ro be 'address' tabdil konim.
              dar inja ham 'format=json' yani 'pasokh' be surat 'JSON' bashe.
            */
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            // Perform an HTTP fetch request to the API URL and handle the response data.
            fetch(url)
                // Convert the response to JSON format.
                .then(response => response.json()) 

                // Set the 'address state' with the 'user's address information' from the 'API response'.
                .then(data => setAddress(data.address)) 
        });
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts.

    // The 'add' state variable now contains the user's current address information.

    // Return the user's current address, which will be rendered by the component that uses this function.
    return address;
}

// Export the GetCurrentAddress component for use in other parts of the application.
export default GetCurrentAddress;
