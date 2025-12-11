import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/authenticateToken";

// GET ALL POSTERS
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.poster.findMany({
      include: {
        genres: true,
        cartlines: true,
        userRatings: true
      }
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke hente posters" });
  }
};

// GET SINGLE POSTER
export const getRecord = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "ID is invalid" });

  try {
    const data = await prisma.poster.findUnique({
      where: { id },
      include: {
        genres: true,
        cartlines: true,
        userRatings: true
      }
    });

    if (!data) return res.status(404).json({ error: "Poster not found" });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// CREATE POSTER
export const createRecord = async (req: AuthRequest, res: Response) => {
  const { name, slug, description, image, width, height, price, stock } = req.body;

  if (!name || !slug) return res.status(400).json({ error: "Name and slug are required" });

  try {
    const data = await prisma.poster.create({
      data: {
        name,
        slug,
        description,
        image,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
        price: price ? Number(price) : undefined,
        stock: stock ? Number(stock) : undefined
      }
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke oprette poster" });
  }
};

// UPDATE POSTER
export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "ID is invalid" });

  const { name, slug, description, image, width, height, price, stock } = req.body;

  try {
    const data = await prisma.poster.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
        price: price ? Number(price) : undefined,
        stock: stock ? Number(stock) : undefined
      }
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke opdatere poster" });
  }
};

// DELETE POSTER
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "ID is invalid" });

  try {
    const deleted = await prisma.poster.delete({ where: { id } });
    res.status(200).json({ message: "Poster deleted", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunne ikke slette poster" });
  }
};