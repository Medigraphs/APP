"use client";
import { useEffect, useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import styles  from './page.module.css';

const SignUp = ({toggle}) => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [createUserWithEmailAndPassword, registeredUser, loading, creationError] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (creationError && creationError.code === "auth/email-already-in-use") {
      setError("Email Already Registered!");
    }

    if (registeredUser && registeredUser?.user?.uid !== "") {
      alert("User registered successfully.");
      toggle();
    }
  }, [loading, registeredUser, creationError])

  const onToggle = () => {
    toggle();
  }
  const handleSignUp = async () => {
    try {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
  
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
        createUserWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    } catch(e){
        console.log(e)
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Sign Up</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <span className={styles.toggleLink} onClick={onToggle}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUp;