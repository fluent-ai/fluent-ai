import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';

import { FormFieldComponent, Validation, ButtonComponent } from '@tool-ai/ui';
import { store, userActions } from '@tool-ai/state';
import { dispatchToStore, createNewUser } from '../load-userdata';

const auth = getAuth();

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch(userActions.setLoadingStatus('loading'));
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.email) {
          const newUser = createNewUser(userCredential);
          dispatchToStore(newUser);
          // redirect to dashboard
          navigate('/dashboard');
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
