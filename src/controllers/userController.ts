import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/authenticateToken";

// GET ALL USERS
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Kunne ikke hente brugere" });
  }
};

// GET SINGLE USER
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(404).json({ error: "ID is missing" });
  }

  try {
    const data = await prisma.user.findUnique({
      where: { id }
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Kunne ikke hente bruger" });
  }
};

// CREATE USER (ADMIN only)
export const createRecord = async (req: AuthRequest, res: Response) => {
  const { firstname, lastname, email, password, role, isActive } = req.body;

  if (!firstname || !lastname || !email || !password || !role) {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const data = await prisma.user.create({
      data: { firstname, lastname, email, password, role, isActive: Boolean(isActive) }
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Kunne ikke oprette bruger" });
  }
};

// UPDATE USER (ADMIN only)
export const updateRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  if (!id) return res.status(404).json({ error: "ID is missing" });

  const { firstname, lastname, email, password, role, isActive } = req.body;

  if (!firstname || !lastname || !email || !role) {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const data = await prisma.user.update({
      where: { id },
      data: { firstname, lastname, email, password, role, isActive: Boolean(isActive) }
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Kunne ikke opdatere bruger" });
  }
};

// DELETE USER (ADMIN only)
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  if (!id) return res.status(404).json({ error: "ID is missing" });

  try {
    await prisma.user.delete({ where: { id } });

    return res.status(200).json({ message: "Record deleted", deletedId: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};