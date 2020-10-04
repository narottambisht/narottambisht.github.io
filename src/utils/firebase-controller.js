import { useContext } from 'react';

import { AboutContext } from '../context/AboutContext';
import { firestoreDB } from './FirebaseConfig';

/**
 * Custom hook to fetch data from the firebase `about-info` collection
 */
export const useAboutController = () => {
  const [aboutStore, setAboutStore] = useContext(AboutContext);

  firestoreDB.collection('about-info').onSnapshot(snapshot => {
    snapshot.docs.map(doc => setAboutStore(doc.data()));
  });
}
