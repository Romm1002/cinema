import { Router, Request, Response } from "express";
import Seance from "../models/Seance";
import mongoose from "mongoose";

const router = Router();

const seanceSchema = new mongoose.Schema({
    id: Number,
    film: {
        title: String,
        releaseYear: Number,
        genre: String,
        directors: {
            name: String, 
            birthDate: Date,
            biography: String,
        },
    }, 
    date: Date, 
    time: String, 
    availableSeats: Number
});

const seanceModel = mongoose.model<Seance>("seances", seanceSchema);

router.get("/", async (req: Request, res: Response) => {
    try {
        const seance = await seanceModel.find();
        res.status(200).json(seance);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const seance = await seanceModel.findOne({ id: req.params.id });
        if (!seance)
            return res.status(404).json({ message: "Séance non trouvé" });
        res.status(200).json(seance);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    const seance = new seanceModel(req.body);
    try {
        const newSeance = await seance.save();
        res.status(201).json(newSeance);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const seance = await seanceModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
        );
        if (!seance)
            return res.status(404).json({ message: "Séance non trouvé" });
        res.status(200).json(seance);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const seance = await seanceModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!seance)
            return res.status(404).json({ message: "Séance non trouvé" });
        res.status(200).json(seance);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
