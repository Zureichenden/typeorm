import { Request, Response } from 'express';
import { Cliente } from '../entities/Cliente';

export const createCliente = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  const cliente = new Cliente();
  cliente.nombre = nombre;

  try {
    await cliente.save();
    return res.status(201).json(cliente);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const user = await Cliente.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "Not user found" });
  
      await Cliente.update({ id: parseInt(id) }, req.body);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Cliente.delete(id);

    if (result.affected === 0) return res.status(404).json({ message: 'Cliente not found' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.find();
    return res.status(200).json(clientes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Cliente.findOneBy({ id: parseInt(id) });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
