const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const app = express();
app.use(cors());
app.use(express.json());

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase',
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez saisir une adresse e-mail et un mot de passe.' });
    }
    try {
      const conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      conn.release();
      if (rows.length > 0) {
        const user = rows[0];
        console.log(password,  user.password)
        console.log(await bcrypt.compare(password, user.password));
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign({ sub: user.id }, 'secret_key');
          return res.json({ message: 'Connexion réussie !',  token });
        } else {
          return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
        }
      } else {
        return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
    }
  })
  .post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    try {
      const connection = await pool.getConnection();
      await connection.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );
      connection.release();
      res.json({ success: true, message: 'User created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error creating user.' });
    }
  });
  

app.listen(8000, () => {
  console.log('Le serveur est en cours d\'exécution sur le port 8000.');
});
