import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/authenticateToken";

// GET ALL CARTLINES
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cartline.findMany({
      include: {
        user: true,
        poster: true
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke hente cartlines" });
  }
};

// GET SINGLE CARTLINE
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) return res.status(404).json({ error: "ID is missing" });

  try {
    const data = await prisma.cartline.findUnique({
      where: { id },
      include: {
        user: true,
        poster: true
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke hente cartline" });
  }
};

// CREATE CARTLINE
export const createRecord = async (req: AuthRequest, res: Response) => {
  const { userId, posterId, quantity } = req.body;

  if (!userId || !posterId || !quantity)
    return res.status(404).json({ error: "All fields are required" });

  try {
    const data = await prisma.cartline.create({
      data: {
        userId: Number(userId),
        posterId: Number(posterId),
        quantity: Number(quantity)
      }
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke oprette cartline" });
  }
};

// UPDATE CARTLINE
export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  if (!id) return res.status(404).json({ error: "ID is missing" });

  const { quantity } = req.body;

  try {
    const data = await prisma.cartline.update({
      where: { id },
      data: {
        quantity: Number(quantity)
      }
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke opdatere cartline" });
  }
};

// DELETE CARTLINE
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  if (!id) return res.status(404).json({ error: "ID is missing" });

  try {
    await prisma.cartline.delete({ where: { id } });

    return res.status(200).json({ message: "Record deleted", deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke slette cartline" });
  }
};