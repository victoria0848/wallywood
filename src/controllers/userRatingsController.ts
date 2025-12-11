import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/authenticateToken";

// GET ALL RATINGS
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.userRating.findMany({
      include: {
        user: true,
        poster: true
      }
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke hente ratings" });
  }
};

// GET SINGLE RATING
export const getRecord = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: "ID is invalid" });

  try {
    const data = await prisma.userRating.findUnique({
      where: { id },
      include: {
        user: true,
        poster: true
      }
    });

    if (!data) return res.status(404).json({ error: "Rating not found" });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke hente rating" });
  }
};

// CREATE RATING
export const createRecord = async (req: AuthRequest, res: Response) => {
  const { userId, posterId, numStars } = req.body;

  if (!userId || !posterId || !numStars)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const data = await prisma.userRating.create({
      data: {
        userId: Number(userId),
        posterId: Number(posterId),
        numStars: Number(numStars)
      },
      include: {
        user: true,
        poster: true
      }
    });

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke oprette rating" });
  }
};

// UPDATE RATING
export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "ID is invalid" });

  const { numStars } = req.body;
  if (!numStars) return res.status(400).json({ error: "numStars is required" });

  try {
    const data = await prisma.userRating.update({
      where: { id },
      data: { numStars: Number(numStars) },
      include: { user: true, poster: true }
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke opdatere rating" });
  }
};

// DELETE RATING
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "ID is invalid" });

  try {
    const deleted = await prisma.userRating.delete({
      where: { id }
    });

    res.status(200).json({ message: "Record deleted", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke slette rating" });
  }
};