import { Router, Request, Response } from "express";
import Realisateur from "../models/Realisateur";
import mongoose from "mongoose";

const router = Router();

const reaSchema = new mongoose.Schema({
    id: Number,
    name: String,
    birthDate: Date,
    biography: String
});

const reaModel = mongoose.model<Realisateur>("realisateurs", reaSchema);

router.get("/", async (req: Request, res: Response) => {
    try {
        const reas = await reaModel.find();
        res.status(200).json(reas);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const rea = await reaModel.findOne({ id: req.params.id });
        if (!rea)
            return res.status(404).json({ message: "Réalisateur non trouvé" });
        res.status(200).json(rea);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    const rea = new reaModel(req.body);
    try {
        const newRea = await rea.save();
        res.status(201).json(newRea);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const rea = await reaModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
        );
        if (!rea)
            return res.status(404).json({ message: "Réalisateur non trouvé" });
        res.status(200).json(rea);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const rea = await reaModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!rea)
            return res.status(404).json({ message: "Réalisateur non trouvé" });
        res.status(200).json(rea);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
