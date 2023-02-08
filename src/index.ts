import "reflect-metadata"
import app from "./app"
import {AppDataSource} from "./db"

import loginRoutes from './routes/login.routes';
import registerRoutes from './routes/register.routes';
import forgotpasswordRoutes from './routes/forgotpassword.routes';

app.use(loginRoutes);
app.use(registerRoutes);
app.use(forgotpasswordRoutes);

async function main() {
    await AppDataSource.initialize();
    app.listen(3000)
    console.log('Server is running on port 3000');
}

main()