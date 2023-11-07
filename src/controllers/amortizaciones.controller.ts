import { Request, Response } from 'express';
import { Amortizacion } from '../entities/Amortizaciones';
import { Prestamo } from '../entities/Prestamo'; // Importa la entidad Prestamo

// Crear una nueva amortización
export const createAmortizacion = async (req: Request, res: Response) => {
  const { prestamo_id, quincena, fecha_pago, monto_pago, interes_pago, abono, capital_pendiente } = req.body;

  // Busca el Prestamo por su ID
  const prestamo = await Prestamo.findOne(prestamo_id);

  if (!prestamo) {
    return res.status(404).json({ message: 'Prestamo no encontrado' });
  }

  const amortizacion = new Amortizacion();
  amortizacion.prestamo = prestamo; // Asigna el objeto Prestamo en lugar del ID
  amortizacion.quincena = quincena;
  amortizacion.fecha_pago = fecha_pago;
  amortizacion.monto_pago = monto_pago;
  amortizacion.interes_pago = interes_pago;
  amortizacion.abono = abono;
  amortizacion.capital_pendiente = capital_pendiente;

  try {
    await amortizacion.save();
    return res.status(201).json(amortizacion);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Actualizar una amortización por ID
export const updateAmortizacion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const amortizacion = await Amortizacion.findOneBy({ id: parseInt(id) });

    if (!amortizacion) return res.status(404).json({ message: 'Amortización no encontrada' });

    await Amortizacion.update(id, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Eliminar una amortización por ID
export const deleteAmortizacion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Amortizacion.delete(id);

    if (result.affected === 0) return res.status(404).json({ message: 'Amortización no encontrada' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Obtener todas las amortizaciones
export const getAmortizaciones = async (req: Request, res: Response) => {
  try {
    const amortizaciones = await Amortizacion.find();
    return res.status(200).json(amortizaciones);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Obtener una amortización por ID
export const getAmortizacion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const amortizacion = await Amortizacion.findOneBy({ id: parseInt(id) });

    if (!amortizacion) return res.status(404).json({ message: 'Amortización no encontrada' });

    return res.status(200).json(amortizacion);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const mostrarTablaAmortizacionByPrestamo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prestamoId = parseInt(id, 10); // Convierte el ID a un número

    if (isNaN(prestamoId)) {
      return res.status(400).json({ message: 'El ID del préstamo no es un número válido.' });
    }

    // Realiza la consulta para obtener todas las amortizaciones de un préstamo específico
    const amortizaciones = await Amortizacion.find({
      where: {
        prestamo: { id: prestamoId }, // Usamos el objeto prestamo en lugar de prestamo_id
      },
      select: ["id", "quincena", "fecha_pago", "monto_pago", "interes_pago", "abono", "capital_pendiente"],
    });

    if (amortizaciones.length > 0) {
      // Realiza la consulta para obtener el préstamo específico
      const prestamo = await Prestamo.findOne({
        where: {
            id: prestamoId,
        },
        relations: {
            cliente: true,
            monto:true
        },
    })  

      if (prestamo) {
        // Envía la información del préstamo y las amortizaciones en la misma respuesta
        res.status(200).json({ prestamo, amortizaciones });
      } else {
        res.status(404).json({ message: 'No se encontraron registros del préstamo.' });
      }
    } else {
      res.status(404).json({ message: 'No se encontraron registros de amortizaciones para el préstamo.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};






