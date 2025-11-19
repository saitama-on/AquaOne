import { initializeApp} from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence , getAuth} from 'firebase/auth'
// TODO: Replace the following with your app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChK5UYG_whbhl5ulftgElEgwOXM2tEp4g",
  authDomain: "newproj2-fc003.firebaseapp.com",
  projectId: "newproj2-fc003",
  storageBucket: "newproj2-fc003.appspot.com",
  messagingSenderId: "918494578722",
  appId: "1:918494578722:web:f12433c8f25bed2c53627b",
  measurementId: "G-J7ZJCZL7N5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});



