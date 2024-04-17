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
const seanceSchema = new mongoose_1.default.Schema({
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
const seanceModel = mongoose_1.default.model("seances", seanceSchema);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seance = yield seanceModel.find();
        res.status(200).json(seance);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seance = yield seanceModel.findOne({ id: req.params.id });
        if (!seance)
            return res.status(404).json({ message: "Séance non trouvé" });
        res.status(200).json(seance);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seance = new seanceModel(req.body);
    try {
        const newSeance = yield seance.save();
        res.status(201).json(newSeance);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seance = yield seanceModel.findOneAndUpdate({ id: req.params.id }, req.body);
        if (!seance)
            return res.status(404).json({ message: "Séance non trouvé" });
        res.status(200).json(seance);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seance = yield seanceModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!seance)
            return res.status(404).json({ message: "Séance non trouvé" });
        res.status(200).json(seance);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
