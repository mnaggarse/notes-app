import mongoose from "mongoose";
import Note from "../models/noteModel.js";

export const getAllNotes = async (req, res) => {
  const userId = req.userId;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const note = await Note.create({ title, content, userId: req.userId });
    res.status(200).json({ message: "Note created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateNote = async (req, res) => {
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
    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json("Invalid id");
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.deleteOne({ _id: id });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
