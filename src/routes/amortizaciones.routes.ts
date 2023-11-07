import { Router } from 'express';
import {
  getAmortizaciones,
  getAmortizacion,
  createAmortizacion,
  updateAmortizacion,
  deleteAmortizacion,
  mostrarTablaAmortizacionByPrestamo,
} from '../controllers/amortizaciones.controller';

const router = Router();

router.get('/amortizaciones', getAmortizaciones);
router.get('/amortizaciones/:id', getAmortizacion);
router.post('/amortizaciones', createAmortizacion);
router.put('/amortizaciones/:id', updateAmortizacion);
router.delete('/amortizaciones/:id', deleteAmortizacion);

router.get('/amortizaciones/prestamo/:id', mostrarTablaAmortizacionByPrestamo);

export default router;
