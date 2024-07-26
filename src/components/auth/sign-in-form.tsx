'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signInWithPopup } from 'firebase/auth';


const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#4285F4" d="M24 9.5c3.03 0 5.67 1.14 7.73 3.02L37.94 6C33.94 2.29 29.16 0 24 0 14.58 0 6.94 6.26 3.68 15h10.32v5H3.68C6.94 33.74 14.58 40 24 40c5.16 0 9.94-2.29 13.94-6.5L31.73 35.48C29.67 37.36 27.03 38.5 24 38.5 17.3 38.5 11.64 34.26 9.5 28H0v5h9.5c1.15 3.92 4.2 7.11 8 9.02 3.8 1.91 8.3 3.48 12.97 3.48 12.97 0 23.53-11.19 23.53-25 0-1.65-.22-3.25-.62-4.75H24v9.5h15.38c-.3 1.65-1.03 3.16-2.06 4.5z"/>
  </svg>
);

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    router.push('/dashboard'); // Redirect to the dashboard or any other route after sign-in
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>    
      </Stack>
      
      <Button 
        variant="contained" 
        startIcon={<GoogleIcon />} 
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>
    </Stack>
  );
}



const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Handle sign-in result (result.user contains user info)
  } catch (error) {
    console.error('Error signing in with Google: ', error);
  }
};
