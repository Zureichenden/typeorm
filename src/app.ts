import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import clienteRoutes from './routes/cliente.routes'; // Importa las rutas de clientes
import catalogomontosRoutes from './routes/catalogomontos.routes'; // Importa las rutas de catalogomontos
import prestamosRoutes from './routes/prestamos.routes'; // Importa las rutas de prestamos
import amortizacionesRoutes from './routes/amortizaciones.routes'; // Importa las rutas de amortizaciones
import path from 'path'; // Importa la librería path para manejar rutas de archivos
import ejs from 'ejs'; // Importa el motor de plantillas EJS

const app = express();

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Establece tus rutas
app.use(userRoutes);
app.use(clienteRoutes); // Utiliza las rutas de clientes
app.use(catalogomontosRoutes); // Utiliza las rutas de catalogomontos
app.use(prestamosRoutes); // Utiliza las rutas de prestamos
app.use(amortizacionesRoutes); // Utiliza las rutas de amortizaciones

export default app;
