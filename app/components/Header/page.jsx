import React, { useEffect, useState } from "react";
import styles from './page.module.css';

import { signOut } from 'firebase/auth';
import {auth} from '@/app/firebase/firebase'
import { useAuthState } from "react-firebase-hooks/auth";

export const Header = () => {
    const [user] = useAuthState(auth);
    const [userSession, setUserSession] = useState(false);

    useEffect (() => {
        setUserSession(() => sessionStorage.getItem('user'));
    });
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <h1 className={styles.heading}>MediGraphs</h1>
            </nav>
            <div className={styles.logoutButtonWrapper}>

                {userSession ? <button onClick={() => {
                    signOut(auth)
                    sessionStorage.removeItem('user')
                }}>
                    Log out
                </button> : <></>}
            </div>
        </header>
    )
}