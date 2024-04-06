'use client'
import styles from './page.module.css'

import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/firebase'
import { useRouter } from 'next/navigation';
import AddPatientForm from './components/AddPatientForm/page'
import { Header } from './components/Header/page'
import SignIn from './sign-in/page';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/page';
import PatientList from './components/PatientList/page';
import PatientDetails from './components/PatientDetails/page';

export default function Home() {

  const [user] = useAuthState(auth);
  const router = useRouter()
  const [userSession, setUserSession] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(undefined);
  const [isListUpdated, setUpdateList] = useState(false);

  useEffect(() => {
    // Simulate a delay, such as fetching data
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    console.log(patient)
  }, [patient]);

  useEffect(() => {
      setUserSession(() => sessionStorage.getItem('user'));
    console.log(userSession, user) 
  })

  // if (!user && !userSession){
  //   router.push('/sign-in')
  // }
  return (
    <>
    {
      isLoading ? (
        <Loader />
      ) :
      (<><Header />
      <main className={styles.main}>
        {userSession ?  <><PatientList onPatientClick={setPatient} updateList={isListUpdated}/>
          {patient ? <PatientDetails selectedPatient={patient}/> : <AddPatientForm setUpdateList={setUpdateList}/>}
          </> : <SignIn />}
      </main></>)}
    </>
  )
}
