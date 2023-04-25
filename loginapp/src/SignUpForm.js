import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignUpForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  function getUserFromToken(token) {
    try {
      const decodedToken = jwt_decode(token, 'secret_key'); // vérifier et décoder le token
      return decodedToken.sub; // extraire les informations de l'utilisateur
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const onSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:8000/login', values);
      alert(res.data.token);
      console.log(getUserFromToken(res.data.token))
    } catch (error) {
      alert('Erreur lors de l\'inscription : ' + error.message);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Veuillez saisir une adresse e-mail.';
    }
    if (!values.password) {
      errors.password = 'Veuillez saisir un mot de passe.';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">Adresse e-mail :</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Mot de passe :</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            S'inscrire
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
