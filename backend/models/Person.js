const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    sexe: { type: String, required: true, enum: ["Homme", "Femme"] },
    photo: String,
    dateNaissance: Date,
    dateDeces: Date,
    professions: String,
    adresse: String,
    tel: String,
    informationsComplementaires: mongoose.Schema.Types.Mixed,
    parents: {
      pere: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
      mere: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
    },
    conjoints: [
      new mongoose.Schema(
        {
          idConjoint: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
          dateUnion: Date,
          dateSeparation: Date,
        },
        { _id: false }
      ),
    ],
    enfants: [
      new mongoose.Schema(
        {
          idEnfant: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
