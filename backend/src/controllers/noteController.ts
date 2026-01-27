import type { Request, Response } from "express";
import mongoose from "mongoose";
import Note from "../models/noteModel.js";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Please enter title" });
  }

  try {
    const note = await Note.create({ title, content });
    res.status(200).json({ message: "Note created successfully", note });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ message: "Note not updated" });
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json("Note not found");
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.deleteOne({ _id: id });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
