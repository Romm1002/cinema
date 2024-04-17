import express, { Express } from "express";
import filmRoutes from "./routes/filmRoute";
import realisateurRoutes from "./routes/realisateurRoute";
import seanceRoutes from "./routes/seanceRoute";
import mongoose from "mongoose";

const uri =
    "mongodb+srv://exemple:1234@cluster0.2xiainv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (e) {
        console.error(e);
    }
}
run().catch(console.dir);

const app: Express = express();

const PORT = 3002;

app.use(express.json());
app.use("/api/films", filmRoutes);
app.use("/api/realisateurs", realisateurRoutes);
app.use("/api/seances", seanceRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
