const { addPerson, getPersonById } = require("../utils/personUtils");
const { getUserById } = require("../utils/userUtils");
const jwt = require("jsonwebtoken");
const {
  handleAddRelation,
  handleAddExistingRelation,
  handleGetRelation,
  handleUpdatePerson,
  handleDeleteRelation,
  handleDeletePerson,
} = require("../handlers/peopleHandlers");

const test = (req, res, next) => {
  res.json("Le test de route 'peaple' fonctionne");
};

const verifySession = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Vous devez être connecté pour effectuer cette action");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Vous devez être connecté pour effectuer cette action");
      }
      req.userId = decoded.userId;
    });
    next();
  } catch (err) {
    next(err);
  }
};

const addRelation = async (req, res, next) => {
  console.log(req.body);
  try {
    const actualUser = await getUserById(req.userId);
    let personId = actualUser.person;
    personId = req.params.id ? req.params.id : personId;
    const personToAddData = req.body;
    const addedPersonId = await handleAddRelation(personId, personToAddData);
    res.json({
      message: "Relation ajoutée avec succès",
      personId: addedPersonId,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addRelationByEmail = async (req, res, next) => {
  try {
    const actualUser = await getUserById(req.userId);
    let personId = actualUser.person;
    personId = req.params.id ? req.params.id : personId;
    const personToAddData = req.body;
    const addedPersonId = await handleAddExistingRelation(
      personId,
      req.params.email,
      personToAddData
    );
    res.json({
      message: "Relation ajoutée avec succès",
      personId: addedPersonId,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getPerson = async (req, res, next) => {
  try {
    const personId = req.params.id;
    let person = await getPersonById(personId);
    if (!person) {
      throw new Error("Person not found");
    }

    person = person.toObject();
    delete person.__v;
    delete person.createdAt;
    delete person.updatedAt;

    if (!person) {
      throw new Error("Person not found");
    }
    return res.json(person);
  } catch (err) {
    next(err);
  }
};

const getRelationController = async (req, res, next) => {
  try {
    const actualUser = await getUserById(req.userId);
    let personId2 = actualUser.person;
    personId2 = req.params.id2 ? req.params.id2 : personId2;
    if (!(await getPersonById(personId2))) {
      throw new Error("Person ID2 not found");
    }
    let personId1 = req.params.id1;
    if (!(await getPersonById(personId1))) {
      throw new Error("Person ID1 not found");
    }
    const relation = await handleGetRelation(personId1, personId2);
    if (!relation) {
      throw new Error("Les deux personnes n'ont pas de relation");
    }
    res.json({
      message: "Relation récupérée avec succès",
      relation: {
        id1: personId1,
        id2: personId2,
        relation: relation,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateRelationController = async (req, res, next) => {
  try {
    const actualUser = await getUserById(req.userId);
    let personId = actualUser.person;
    personId = req.params.id ? req.params.id : personId;
    if (!(await getPersonById(personId))) {
      throw new Error("Person ID not found");
    }
    const personToUpdateData = req.body;
    const updatedPersonId = await handleUpdatePerson(
      personId,
      personToUpdateData
    );
    res.json({
      message: "Relation mise à jour avec succès",
      personId: updatedPersonId,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteRelationController = async (req, res, next) => {
  try {
    const actualUser = await getUserById(req.userId);
    let personId2 = actualUser.person;
    personId2 = req.params.id2 ? req.params.id2 : personId2;
    if (!(await getPersonById(personId2))) {
      throw new Error("Person ID2 not found");
    }
    let personId1 = req.params.id1;
    if (!(await getPersonById(personId1))) {
      throw new Error("Person ID1 not found");
    }
    const deletedPersonIds = await handleDeleteRelation(personId1, personId2);
    res.json({
      message: "Relation supprimée avec succès",
      id1: deletedPersonIds.personId1,
      id2: deletedPersonIds.personId2,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deletePersonController = async (req, res, next) => {
  try {
    const personId = req.params.id;
    if (personId == req.userId) {
      throw new Error("Vous ne pouvez pas supprimer votre propre personne");
    }
    const deletedPerson = await handleDeletePerson(personId);
    res.json({
      message: "Personne supprimée avec succès",
      personId: deletedPerson._id,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  test,
  verifySession,
  addPerson,
  addRelation,
  addRelationByEmail,
  getPerson,
  getRelationController,
  updateRelationController,
  deleteRelationController,
  deletePersonController,
};
