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
const express_1 = __importDefault(require("express"));
const filmRoute_1 = __importDefault(require("./routes/filmRoute"));
const realisateurRoute_1 = __importDefault(require("./routes/realisateurRoute"));
const seanceRoute_1 = __importDefault(require("./routes/seanceRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://exemple:1234@cluster0.2xiainv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            yield mongoose_1.default.connect(uri);
            yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (e) {
            console.error(e);
        }
    });
}
run().catch(console.dir);
const app = (0, express_1.default)();
const PORT = 3002;
app.use(express_1.default.json());
app.use("/api/films", filmRoute_1.default);
app.use("/api/realisateurs", realisateurRoute_1.default);
app.use("/api/seances", seanceRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
