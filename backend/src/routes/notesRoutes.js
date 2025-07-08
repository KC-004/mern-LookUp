import express from "express";
import * as obj from "../controllers/notesController.js"

const router = express.Router();

router.get("/", obj.getAllNotes);

router.get("/:id", obj.getNoteById);

router.post("/", obj.createNote);

router.put("/:id", obj.updateNote);

router.delete("/:id", obj.deleteNote);


export default router;