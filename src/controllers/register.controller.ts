import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (pool, req, res) => {
  try {
    const { email, password, name } = req.body;
    //Comprobar si el usuario ya existe
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) return res.status(400).send('Usuario ya existe');
    //Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Crear el usuario
    const newUser = await pool.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );
    //Crear y asignar el token
    const token = jwt.sign({ id: newUser.insertId }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};
