import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBEGPYxaq4YXakAjChHulD4oQoZ0152-Eg',
  authDomain: 'glamguide-f3629.firebaseapp.com',
  projectId: 'glamguide-f3629',
  storageBucket: 'glamguide-f3629.appspot.com',
  messagingSenderId: '728338698172',
  appId: '1:728338698172:web:2f1078dae99e9833f025b9',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};
