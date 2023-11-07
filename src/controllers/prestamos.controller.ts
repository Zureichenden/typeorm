import { Request, Response } from 'express';
import { Prestamo } from '../entities/Prestamo';
import { Cliente } from '../entities/Cliente'; // Importa la entidad Cliente
import { CatalogoMontos } from '../entities/CatalogoMontos'; // Importa la entidad CatalogoMontos
import { Amortizacion } from '../entities/Amortizaciones';

// export const createPrestamo = async (req: Request, res: Response) => {
//     const { cliente, monto, fecha_inicio, interes } = req.body;
//     const prestamo = new Prestamo();
//     prestamo.cliente = cliente;
//     prestamo.monto = monto;
//     prestamo.fecha_inicio = fecha_inicio;
//     prestamo.interes = interes;
  
//     try {
//       await prestamo.save();
//       return res.status(201).json(prestamo);
//     } catch (error) {
//       if (error instanceof Error) {
//         return res.status(500).json({ message: error.message });
//       }
//     }
//   };

export const createPrestamo2 = async (req: Request, res: Response) => {
    const { cliente_id, monto_id, fecha_inicio, interes } = req.body;
  
    try {
      const cliente = await Cliente.findOneBy({ id: parseInt(cliente_id) });
      const monto = await CatalogoMontos.findOneBy({ id: parseInt(monto_id) });

  
      if (!cliente || !monto) {
        return res.status(400).json({ message: 'Cliente o catálogo de montos no encontrado' });
      }
  
      const prestamo = new Prestamo();
      prestamo.cliente = cliente;
      prestamo.monto = monto;
      prestamo.fecha_inicio = fecha_inicio;
      prestamo.interes = interes;
  
      await prestamo.save();
  
      return res.status(201).json(prestamo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const createPrestamo = async (req: Request, res: Response) => {
    const { cliente_id, monto_id, fecha_inicio, interes } = req.body;
  
    try {
      const cliente = await Cliente.findOneBy({ id: cliente_id });
      const monto = await CatalogoMontos.findOneBy({ id: monto_id });
  
      if (!cliente || !monto) {
        return res.status(400).json({ message: 'Cliente o catálogo de montos no encontrado' });
      }
  
      const prestamo = new Prestamo();
      prestamo.cliente = cliente;
      prestamo.monto = monto;
      prestamo.fecha_inicio = fecha_inicio;
      prestamo.interes = interes;
  
      await prestamo.save();
  
      // Crea las amortizaciones
      const cantidadPlazos = monto.cantidad_plazos;
      const montoPorQuincenaSinInteres = monto.monto / cantidadPlazos;
      const tasaInteresQuincenal = interes / 100;
  
      let capitalPendiente = monto.monto;
      const fechaActual = new Date(fecha_inicio);

      console.log("a ver cantidadPlazos");

      console.log(cantidadPlazos);

      
  
    for (let quincena = 1; quincena <= cantidadPlazos; quincena++) {
        const interesPago = capitalPendiente * tasaInteresQuincenal;
        const abono = montoPorQuincenaSinInteres + interesPago;

        console.log("Quincena:", quincena);
        console.log("Fecha actual:", fechaActual);
        console.log("Capital pendiente:", capitalPendiente);
        console.log("Interés pago:", interesPago);
        console.log("Abono:", abono);

        const amortizacion = new Amortizacion();
        amortizacion.prestamo = prestamo;
        amortizacion.quincena = quincena;
        amortizacion.fecha_pago = fechaActual;
        amortizacion.capital_pendiente = capitalPendiente;
        amortizacion.interes_pago = interesPago;
        amortizacion.monto_pago = montoPorQuincenaSinInteres; // Calcula el valor del abono
        amortizacion.abono = abono; // Calcula el valor del abono

        console.log("Amortización:", amortizacion);

        await amortizacion.save();
    
        capitalPendiente -= montoPorQuincenaSinInteres;
        fechaActual.setDate(fechaActual.getDate() + 15); // Avanza 15 días (una quincena)
    }
  
  
      return res.status(201).json(prestamo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  
  

// Obtener todos los préstamos
// export const getPrestamos2 = async (req: Request, res: Response) => {
//   try {
//     const prestamos = await Prestamo.find();
//     return res.status(200).json(prestamos);
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }   
//   }
// };

export const getPrestamos = async (req: Request, res: Response) => {
    try {
      const prestamos = await Prestamo.find({ relations: ['cliente', 'monto'] });
      return res.status(200).json(prestamos);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  

//Obtener un préstamo por su ID
// export const getPrestamo= async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const prestamo = await Prestamo.findOneBy({ id: parseInt(id) });

//     if (!prestamo) return res.status(404).json({ message: 'Prestamo no encontrado' });

//     return res.status(200).json(prestamo);
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

export const getPrestamo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const prestamo = await Prestamo.findOne({
            where: {
                id: parseInt(id) ,
            },
            relations: {
                cliente: true,
                monto:true
            },
        })  
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
