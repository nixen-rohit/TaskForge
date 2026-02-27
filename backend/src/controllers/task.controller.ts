import { Request, Response } from "express";
import { prisma } from "../prisma/client";

interface AuthRequest extends Request<
  { id?: string },  
  any,
  any,
  any
> {
  userId?: string;
}
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.userId!,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { page = "1", limit = "10", status, search } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId!,
        ...(status ? { status: String(status) } : {}),
        ...(search
          ? {
              title: {
                contains: String(search),
                mode: "insensitive",
              },
            }
          : {}),
      },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.task.count({
      where: {
        userId: req.userId!,
      },
    });

    res.json({
      total,
      page: Number(page),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId!,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        status: task.status === "pending" ? "completed" : "pending",
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};