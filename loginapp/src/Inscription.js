import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';


const Inscription = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/signup', { email, password });
      setMessage('Inscription réussie.');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Adresse e-mail :</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Inscription;
