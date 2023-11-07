import { Router } from 'express';
import {
  getPrestamos,
  getPrestamo,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
  getPrestamosByClienteName,
  getPrestamoDetalleByID
} from '../controllers/prestamos.controller';

const router = Router();

router.get('/prestamos', getPrestamos);
router.get('/prestamos/:id', getPrestamo);
router.post('/prestamos', createPrestamo);
router.put('/prestamos/:id', updatePrestamo);
router.delete('/prestamos/:id', deletePrestamo);
router.get('/buscarNombre', getPrestamosByClienteName);
router.get('/detalleID/:id', getPrestamoDetalleByID);

export default router;
