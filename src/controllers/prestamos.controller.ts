import { Request, Response } from 'express';
import { Prestamo } from '../entities/Prestamo';
import { Cliente } from '../entities/Cliente'; // Importa la entidad Cliente
import { CatalogoMontos } from '../entities/CatalogoMontos'; // Importa la entidad CatalogoMontos

export const createPrestamo = async (req: Request, res: Response) => {
    const { cliente, monto, fecha_inicio, interes } = req.body;
    const prestamo = new Prestamo();
    prestamo.cliente = cliente;
    prestamo.monto = monto;
    prestamo.fecha_inicio = fecha_inicio;
    prestamo.interes = interes;
  
    try {
      await prestamo.save();
      return res.status(201).json(prestamo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  

// Obtener todos los préstamos
export const getPrestamos = async (req: Request, res: Response) => {
  try {
    const prestamos = await Prestamo.find();
    return res.status(200).json(prestamos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Obtener un préstamo por su ID
export const getPrestamo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const prestamo = await Prestamo.findOneBy({ id: parseInt(id) });

    if (!prestamo) return res.status(404).json({ message: 'Prestamo no encontrado' });

    return res.status(200).json(prestamo);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};



// Actualizar un préstamo por su ID
export const updatePrestamo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Prestamo.update({ id: parseInt(id) }, req.body);

    if (result.affected === 0) return res.status(404).json({ message: 'Prestamo no encontrado' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Eliminar un préstamo por su ID
export const deletePrestamo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Prestamo.delete({ id: parseInt(id) });

    if (result.affected === 0) return res.status(404).json({ message: 'Prestamo no encontrado' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
