import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//import { proccess } from 'dotenv';


export const login = async (pool, req, res) => {
  console.log("hola mundo")
  try {
    const { email, password } = req.body;

    //Consulta a la base de datos para obtener el usuario con ese email
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(404).send('El usuario no existe');
    
    //Comparar la contraseña encriptada con la que se envia
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Contraseña incorrecta');

    //Crear y asignar un token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
}

