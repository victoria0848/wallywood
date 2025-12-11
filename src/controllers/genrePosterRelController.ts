import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/authenticateToken";

// GET ALL RELATIONS
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.genrePosterRel.findMany({
      include: {
        genre: true,
        poster: true
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke hente relationer" });
  }
};

// GET SINGLE RELATION
export const getRecord = async (req: Request, res: Response) => {
  const genreId = Number(req.params.genreId);
  const posterId = Number(req.params.posterId);

  if (!genreId || !posterId)
    return res.status(404).json({ error: "IDs are missing" });

  try {
    const data = await prisma.genrePosterRel.findUnique({
      where: { genreId_posterId: { genreId, posterId } },
      include: {
        genre: true,
        poster: true
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke hente relation" });
  }
};

// CREATE RELATION (ADMIN only)
export const createRecord = async (req: AuthRequest, res: Response) => {
  const { genreId, posterId } = req.body;

  if (!genreId || !posterId)
    return res.status(404).json({ error: "All fields are required" });

  try {
    const data = await prisma.genrePosterRel.create({
      data: {
        genreId: Number(genreId),
        posterId: Number(posterId)
      }
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke oprette relation" });
  }
};

// DELETE RELATION (ADMIN only)
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const genreId = Number(req.params.genreId);
  const posterId = Number(req.params.posterId);

  if (!genreId || !posterId)
    return res.status(404).json({ error: "IDs are missing" });

  try {
    await prisma.genrePosterRel.delete({
      where: { genreId_posterId: { genreId, posterId } }
    });

    return res.status(200).json({
      message: "Relation deleted",
      deleted: { genreId, posterId }
    });
  } catch (error) {
    return res.status(500).json({ error: "Kunne ikke slette relation" });
  }
};