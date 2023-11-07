import { Request, Response } from 'express';
import { Prestamo } from '../entities/Prestamo';
import { Cliente } from '../entities/Cliente'; // Importa la entidad Cliente
import { CatalogoMontos } from '../entities/CatalogoMontos'; // Importa la entidad CatalogoMontos
import { Amortizacion } from '../entities/Amortizaciones';

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
  
      // Calcula el interés total a pagar
      const interesTotal = capitalPendiente * tasaInteresQuincenal;
  
      // Calcula el abono constante
      const abono = montoPorQuincenaSinInteres + interesTotal;
      const interesPago = capitalPendiente * tasaInteresQuincenal;

      for (let quincena = 1; quincena <= cantidadPlazos; quincena++) {
  
        const amortizacion = new Amortizacion();
        amortizacion.prestamo = prestamo;
        amortizacion.quincena = quincena;
        amortizacion.fecha_pago = fechaActual;
        amortizacion.monto_pago = montoPorQuincenaSinInteres;
        amortizacion.interes_pago = interesPago;
        amortizacion.abono = abono; // Utiliza el valor calculado de abono
        amortizacion.capital_pendiente = capitalPendiente;

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

// Buscar un préstamo por nombre del cliente
export const getPrestamosByClienteName = async (req: Request, res: Response) => {
    const { clienteNombre } = req.query;
    try {
        // Utiliza QueryBuilder para buscar los préstamos cuyo cliente coincida con el nombre proporcionado
        const prestamos = await Prestamo.createQueryBuilder('prestamo')
          .innerJoinAndSelect('prestamo.cliente', 'cliente') // Utiliza innerJoinAndSelect para incluir la relación de cliente
          .where('cliente.nombre LIKE :nombre', { nombre: `%${clienteNombre}%` }) // Utiliza una coincidencia parcial
          .innerJoinAndSelect('prestamo.monto', 'monto') // Incluye la relación de monto
          .getMany();
      
        return res.status(200).json(prestamos);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        }
      }    
  };

  // Buscar un préstamo por nombre del cliente
  export const getPrestamoDetalleByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("a ver id");
    console.log(id);
  
    try {
      // Utiliza QueryBuilder para buscar un préstamo por su ID
      const prestamo = await Prestamo.createQueryBuilder('prestamo')
        .innerJoinAndSelect('prestamo.cliente', 'cliente') // Incluye la relación de cliente
        .where('prestamo.id = :id', { id: id }) // Filtra por ID
        .innerJoinAndSelect('prestamo.monto', 'monto') // Incluye la relación de monto
        .getMany(); // Para que se devuelva como un array aunque sea un solo registro
  
      if (!prestamo) {
        return res.status(404).json({ message: 'Prestamo no encontrado' });
      }
  
      return res.status(200).json(prestamo);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
