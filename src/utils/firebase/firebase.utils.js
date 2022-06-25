import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCO6x5_4xdMj3ockWd31RGG8xtegVAeM9A",
    authDomain: "hsr-clothing-db.firebaseapp.com",
    projectId: "hsr-clothing-db",
    storageBucket: "hsr-clothing-db.appspot.com",
    messagingSenderId: "825667945936",
    appId: "1:825667945936:web:c12aaf7cf2ef373315a5d5"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }

    return userDocRef;
  };