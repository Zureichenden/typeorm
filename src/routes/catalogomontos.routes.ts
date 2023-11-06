import { Router } from 'express';
import {
  getCatalogoMontos,
  getCatalogoMonto,
  createCatalogoMonto,
  updateCatalogoMonto,
  deleteCatalogoMonto,
} from '../controllers/catalogomontos.controller';

const router = Router();

router.get('/catalogomontos', getCatalogoMontos);
router.get('/catalogomontos/:id', getCatalogoMonto);
router.post('/catalogomontos', createCatalogoMonto);
router.put('/catalogomontos/:id', updateCatalogoMonto);
router.delete('/catalogomontos/:id', deleteCatalogoMonto);

export default router;
