import { Router } from 'express';
import {
  getPrestamos,
  getPrestamo,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
} from '../controllers/prestamos.controller';

const router = Router();

router.get('/prestamos', getPrestamos);
router.get('/prestamos/:id', getPrestamo);
router.post('/prestamos', createPrestamo);
router.put('/prestamos/:id', updatePrestamo);
router.delete('/prestamos/:id', deletePrestamo);

export default router;
