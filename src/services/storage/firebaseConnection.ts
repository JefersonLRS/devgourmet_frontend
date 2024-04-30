import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjUv1WR4obOC1uzkYmdcNwHW9oZQxYe8M",
  authDomain: "devgourmet-3c225.firebaseapp.com",
  projectId: "devgourmet-3c225",
  storageBucket: "devgourmet-3c225.appspot.com",
  messagingSenderId: "312874641285",
  appId: "1:312874641285:web:7dfd56183f934a6ed346ec"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
