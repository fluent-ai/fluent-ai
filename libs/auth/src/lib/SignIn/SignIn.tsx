import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import * as firestoreService from '@libs/firestore-service';
import {
  FormFieldComponent,
  Validation,
  ButtonComponent,
  User,
} from '@tool-ai/ui';
import { store, userActions } from '@tool-ai/state';
import { dispatchToStore } from '../load-userdata';

const auth = getAuth();

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch(userActions.setLoadingStatus('loading'));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(`fetch user from firestore`);
        firestoreService
          .getSomeFromDB('users', 'id', '==', userCredential.user.uid)
          .then((users) => {
            if (users.length > 0) {
              // store user state in redux
              console.log(`redirect to dashboard`);
              dispatchToStore(users[0] as User);
              // redirect user to dashboard
              navigate('/dashboard');
            }
          });
      })
      .catch((error) => {
        console.log(error);
        store.dispatch(userActions.setLoadingStatus('error'));
      });
  };
  const EmailInput = {
    label: 'Email',
    validations: [
      {
        match: 'valueMissing',
        message: 'Please enter your email',
      } as Validation,
      {
        match: 'typeMismatch',
        message: 'Please provide a valid email',
      } as Validation,
    ],
    type: 'email',
    required: true,
    onChange: setEmail,
    placeholder: 'Enter your email',
  };
  const PasswordInput = {
    label: 'Password',
    validations: [
      {
        match: 'valueMissing',
        message: 'Please enter your Password',
      } as Validation,
      {
        match: 'typeMismatch',
        message: 'Please provide a valid Password',
      } as Validation,
    ],
    type: 'password',
    required: true,
    onChange: setPassword,
    placeholder: 'Enter your password',
  };
  return (
    <Form.Root onSubmit={signIn} className="w-full">
      <FormFieldComponent {...EmailInput} value={email} />
      <FormFieldComponent {...PasswordInput} value={password} />
      <Form.Submit asChild>
        <ButtonComponent
          type="submit"
          ariaLabel="sign in button"
          buttonContent="Log in"
        />
      </Form.Submit>
    </Form.Root>
  );
}

export default SignIn;
