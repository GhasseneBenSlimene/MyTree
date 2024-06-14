const Person = require("../models/Person");

const addPerson = async (data) => {
  try {
    if (!data.nom || !data.prenom || !data.sexe || !data.email) {
      console.error("erreur addPerson: Information manquante");
      return null;
    }
    const person = await Person.create(data);
    return person;
  } catch (err) {
    throw err;
  }
};

const updatePerson = async (personId, data) => {
  try {
    const options = { new: true, runValidators: true, useFindAndModify: false };
    const fetchedPerson = await Person.findByIdAndUpdate(
      personId,
      data,
      options
    );
    return fetchedPerson;
  } catch (err) {
    throw new Error(err);
  }
};

const getPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    return person;
  } catch (err) {
    throw new Error(err);
  }
};

const getPersonByEmail = async (personEmail) => {
  try {
    const person = await Person.findOne({ email: personEmail });
    if (!person) {
      return null;
    }
    return person;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addPerson,
  getPersonById,
  updatePerson,
  getPersonByEmail,
};
