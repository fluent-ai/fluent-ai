import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import * as firestoreService from '@libs/firestore-service';
import * as mockData from '@libs/mock-data';
import {
  FormFieldComponent,
  Validation,
  ButtonComponent,
  User,
} from '@tool-ai/ui';

const auth = getAuth();

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.email) {
          const newUser: User = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            // TODO: we need to ask for a username on signup and regex the initials from it
            name: mockData.client.name,
            initials: mockData.client.name.slice(0, 2).toUpperCase(),
          };
          // write new user to firestore & store auth UUID as user ID/ document ID
          firestoreService.writeToDB('users', newUser);

          // TODO: fetch user from firestore and store user state in redux

          // redirect to dashboard
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
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
        message: 'Please enter a Password',
      } as Validation,
      {
        match: 'typeMismatch',
        message: 'Please provide a valid Password',
      } as Validation,
    ],
    type: 'password',
    required: true,
    onChange: setPassword,
    placeholder: 'Enter a password',
  };

  return (
    <Form.Root onSubmit={signUp}>
      <FormFieldComponent {...EmailInput} value={email} />
      <FormFieldComponent {...PasswordInput} value={password} />
      <Form.Submit asChild>
        <ButtonComponent
          type="submit"
          ariaLabel="sign up button"
          buttonContent="Register"
        />
      </Form.Submit>
    </Form.Root>
  );
}

export default SignUp;
