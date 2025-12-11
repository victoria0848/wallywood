import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/authenticateToken";

// GET ALL GENRES
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.genre.findMany({
      include: {
        posters: true
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Kunne ikke hente genres" });
  }
};

// GET SINGLE GENRE
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "ID is missing" });

  try {
    const data = await prisma.genre.findUnique({
      where: { id },
      include: {
        posters: true
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke hente genre" });
  }
};

// CREATE GENRE (ADMIN only)
export const createRecord = async (req: AuthRequest, res: Response) => {
  const { title, slug } = req.body;

  if (!title || !slug) {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const data = await prisma.genre.create({
      data: { title, slug }
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke oprette genre" });
  }
};

// UPDATE GENRE (ADMIN only)
export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "ID is missing" });

  const { title, slug } = req.body;

  try {
    const data = await prisma.genre.update({
      where: { id },
      data: { title, slug }
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke opdatere genre" });
  }
};

// DELETE GENRE (ADMIN only)
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "ID is missing" });

  try {
    await prisma.genre.delete({ where: { id } });

    return res.status(200).json({ message: "Record deleted", deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke slette genre" });
  }
};