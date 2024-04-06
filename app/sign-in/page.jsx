'use client';
import { useEffect, useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/firebase'
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import SignUp from '../sign-up/page';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [signInWithEmailAndPassword, loggedInUser, loading, loginError] = useSignInWithEmailAndPassword(auth);
  const [showSignUp, setSignUp] = useState(false);

  const onToggle = () => {
    setSignUp(prev => !prev);
  }

  useEffect(() => {
    if (loginError?.code === "auth/invalid-credential") {
      setError("Invalid Credentials!");
    }

    if (loginError?.code === "auth/too-many-requests") {
      setError("Too many requests.");
    }

    if (loggedInUser) {
      console.log("signin", {loggedInUser});
      sessionStorage.setItem('user', true);
    }
  }, [loading, loggedInUser, loginError]);

  const handleSignIn = async () => {
    try {
        setError('');
        signInWithEmailAndPassword(email, password);
        // setEmail('');
        // setPassword('');
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  return (
    <>
    {
      showSignUp ? 
      <SignUp toggle={onToggle}/>: 
    <div className={styles.formContainer}>
      <h2>Sign In</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className={styles.error}>{error}</p>}
        <button type="button" onClick={handleSignIn} disabled={loading}>
          {loading ? "LoggingIn..." : "Sign In"}
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <span className={styles.toggleLink} onClick={onToggle}>
          Sign Up
        </span>
      </p>
    </div>
    }
    </>
  );
};

export default SignIn;