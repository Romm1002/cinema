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
const reaSchema = new mongoose_1.default.Schema({
    id: Number,
    name: String,
    birthDate: Date,
    biography: String
});
const reaModel = mongoose_1.default.model("realisateurs", reaSchema);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reas = yield reaModel.find();
        res.status(200).json(reas);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rea = yield reaModel.findOne({ id: req.params.id });
        if (!rea)
            return res.status(404).json({ message: "Réalisateur non trouvé" });
        res.status(200).json(rea);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rea = new reaModel(req.body);
    try {
        const newRea = yield rea.save();
        res.status(201).json(newRea);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rea = yield reaModel.findOneAndUpdate({ id: req.params.id }, req.body);
        if (!rea)
            return res.status(404).json({ message: "Réalisateur non trouvé" });
        res.status(200).json(rea);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rea = yield reaModel.findOneAndDelete({
            id: req.params.id,
        });
        if (!rea)
            return res.status(404).json({ message: "Réalisateur non trouvé" });
        res.status(200).json(rea);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
