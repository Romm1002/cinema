"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
const filmSchema = new mongoose_1.default.Schema({
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
const filmModel = mongoose_1.default.model("films", filmSchema);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const films = yield filmModel.find();
        res.status(200).json(films);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const film = yield filmModel.findOne({ id: req.params.id });
        if (!film)
            return res.status(404).json({ message: "Film non trouvé" });
        res.status(200).json(film);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const film = new filmModel(req.body);
    try {
        const newFilm = yield film.save();
        res.status(201).json(newFilm);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const film = yield filmModel.findOneAndUpdate({ id: req.params.id }, req.body);
        if (!film)
            return res.status(404).json({ message: "Film non trouvé" });
        res.status(200).json(film);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const film = yield filmModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!film)
            return res.status(404).json({ message: "Film non trouvé" });
        res.status(200).json(film);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
