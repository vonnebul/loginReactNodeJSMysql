Lors de l'installation des projets:

Loginapp:
npm install pour installer les dépendances

NodeJS:
npm install pour installer les dépendances.
Créer la database 'mydatabase' ou changer le nom de la database dans server.js ligne 12 à 15
Vous pourrez ensuite installez dotenv pour mettre ne place vos variables d'environnement.

La database doit contenirune table 'users' qui contiendra 3 champs:
'id' int clé primaire
'email' chaine de 255 caractères et unique (de préférence).
'password' chaine de 255 caractères

Voici un exemple de requete SQL a intégrer dans votre BDD:

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

