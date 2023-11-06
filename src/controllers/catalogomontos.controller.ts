import { Request, Response } from 'express';
import { CatalogoMontos } from '../entities/CatalogoMontos';

// Crear un nuevo registro en el catálogo de montos
export const createCatalogoMonto = async (req: Request, res: Response) => {
  const { monto, cantidad_plazos } = req.body;
  const catalogoMonto = new CatalogoMontos();
  catalogoMonto.monto = monto;
  catalogoMonto.cantidad_plazos = cantidad_plazos;

  try {
    await catalogoMonto.save();
    return res.status(201).json(catalogoMonto);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Actualizar un registro en el catálogo de montos por ID
export const updateCatalogoMonto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const catalogoMonto = await CatalogoMontos.findOneBy({ id: parseInt(id) });

    if (!catalogoMonto) return res.status(404).json({ message: 'Catálogo de montos no encontrado' });

    await CatalogoMontos.update(id, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Eliminar un registro en el catálogo de montos por ID
export const deleteCatalogoMonto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await CatalogoMontos.delete(id);

    if (result.affected === 0) return res.status(404).json({ message: 'Catálogo de montos no encontrado' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Obtener todos los registros del catálogo de montos
export const getCatalogoMontos = async (req: Request, res: Response) => {
  try {
    const catalogoMontos = await CatalogoMontos.find();
    return res.status(200).json(catalogoMontos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Obtener un registro del catálogo de montos por ID
export const getCatalogoMonto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const catalogoMonto = await CatalogoMontos.findOneBy({ id: parseInt(id) });

    if (!catalogoMonto) return res.status(404).json({ message: 'Catálogo de montos no encontrado' });

    return res.status(200).json(catalogoMonto);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
