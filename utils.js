import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from './firebase';

export function utilsSeperateEmailFromUsername(email) {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  }
  return email;
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to generate a random username
export const generateRandomUsername = () => {
  return 'user' + Math.random().toString(36).substr(2, 9);
};

// Function to check if a username exists
// calledFrom is either 'update username' or 'create account'
export const utilsCheckUsername = async (username, calledFrom) => {
  const usersRef = collection(FIREBASE_DB, "Users");
  let newUsername = username;

  while (true) {
    const q = query(usersRef, where("username", "==", newUsername));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If the username doesn't exist, break the loop
      break;
    } else {
      if (calledFrom === 'create account') {
        newUsername = generateRandomUsername();
      } else {
        return 'Username already exists'

      }

    }
  }

  return newUsername;
};

export const utilsConvertTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns a zero-based value (where zero indicates the first month)
  const year = date.getFullYear();

  return `${hour}:${minute}, ${day}/${month}/${year}`;
};