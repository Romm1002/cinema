import { Router, Request, Response } from "express";
import Film from "../models/Film";
import mongoose from "mongoose";

const router = Router();

const filmSchema = new mongoose.Schema({
    id: Number,
    title: String,
    releaseYear: Number,
    genre: String,
    directors: {
        name: String, 
        birthDate: Date,
        biography: String,
    },
});

const filmModel = mongoose.model<Film>("films", filmSchema);

router.get("/", async (req: Request, res: Response) => {
    try {
        const films = await filmModel.find();
        res.status(200).json(films);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const film = await filmModel.findOne({ id: req.params.id });
        if (!film)
            return res.status(404).json({ message: "Film non trouvé" });
        res.status(200).json(film);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    const film = new filmModel(req.body);
    try {
        const newFilm = await film.save();
        res.status(201).json(newFilm);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const film = await filmModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
        );
        if (!film)
            return res.status(404).json({ message: "Film non trouvé" });
        res.status(200).json(film);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const film = await filmModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!film)
            return res.status(404).json({ message: "Film non trouvé" });
        res.status(200).json(film);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
