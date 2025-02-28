// libraries
import React from "react";

function CartID() {
  // Function to generate a random string with the desired length
  const generateRandomString = () => {
    const length = 30; // Desired length of the random string
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Characters to choose from
    let randomString = "";

    for (let i = 0; i < length; i++) {
      // Generate a random index to select a character from the 'characters' string
      // dar inja 'Math.random()' yek 'number ke bein 0 va 1' bashe ro entekhab mikone.
      // oun 'number bein 0 va 1' dar 'tedad characters yani 62' zarb mishe.
      // alan meghdar 'randomIndex' mishe oun zarb 'Math.random() * characters.length' be 'number sahih' kamtar 'gerdesh' mikone.
      const randomIndex = Math.floor(Math.random() * characters.length);

      // Append the selected character to the 'randomString'
      // inja ham miad oun 'character' ke ba 'random index' peida mishe ro dakhel 'randomString' mizare.
      // string.charAt(index);
      randomString += characters.charAt(randomIndex);
    }

    // Store the generated 'randomString' in localStorage for later use
    localStorage.setItem("randomString", randomString);
  };

  // Function to check if the random string exists in localStorage.
  const existingRandomString = localStorage.getItem("randomString");

  if (!existingRandomString) {
    // if there isn`t returns null.
    // Random string doesn't exist in localStorage, generate and add it
    generateRandomString();
  } else {
    // Log the existing 'randomString' found in localStorage
    // console.log(`Random string in localStorage: ${existingRandomString}`);
  }

  // Return the existing 'randomString' or 'undefined' if it doesn't exist
  return existingRandomString;
}

export default CartID;

/*
  localStorage 5 method dare:
  1. setItem(key, value)
  2. getItem(key)
  3. removeItem(key)
  4. clear()
  5. key(index)

  age mikhaim 'object' zakhire konim bayad 'object ro be string' tabdil konim va zaman gereftan 'string ro be object' tabdil konim:
    
  const user = { name: 'Roozbeh', age: 30 };
  localStorage.setItem('user', JSON.stringify(user));

  const retrievedUser = JSON.parse(localStorage.getItem('user'));
  console.log(retrievedUser.name); // مقدار 'Roozbeh'

*/
