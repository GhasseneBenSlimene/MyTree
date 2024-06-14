const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;

// connexion à la DB
connectDB();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);

// Middleware pour logger les requêtes reçues
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request received at ${new Date().toISOString()}`
  );
  next();
});

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());

// Routes authentification
app.use("/auth", require("./routes/authRoutes"));

// Routes gestion des personnes (le plus important)
app.use(
  "/people",
  require("./controllers/peopleController").verifySession,
  require("./routes/peopleRoutes")
);
app.use("/delete", require("./routes/deleteUserRoutes"));
app.use("/users", require("./routes/getAllUsersRoutes"));
app.use("/valid", require("./routes/validUserRoutes"));
app.use("/share", require("./routes/shareUserResRoutes"));

// Routes admin
app.use("/delete", require("./routes/deleteUserRoutes"));
app.use("/users", require("./routes/getAllUsersRoutes"));
app.use("/valid", require("./routes/validUserRoutes"));
app.use("/share", require("./routes/shareUserResRoutes"));

// Middleware qui permet de gérer les erreurs
app.use(require("./utils/errorHandler"));

// Lancer le serveur
app.listen(port, "0.0.0.0", () =>
  console.log("Le serveur a démarré au port " + port)
);
