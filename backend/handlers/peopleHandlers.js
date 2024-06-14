const {
  addPerson,
  getPersonByEmail,
  getPersonById,
  updatePerson,
} = require("../utils/personUtils");
const mongoose = require("mongoose");
const { deleteFile, dir } = require("../utils/imageUtils");

const handleAddRelation = async (personId, personToAddData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, relation, dateUnion, dateSeparation } = personToAddData;
    if (!email) {
      throw new Error("l'email est obligatoire");
    }
    if (await getPersonByEmail(email)) {
      throw new Error("La personne existe déjà");
    }
    let actualPerson = await getPersonById(personId);
    if (!actualPerson) {
      throw new Error("Person not found");
    }

    let addedPerson;
    if (relation === "pere") {
      if (actualPerson.parents && actualPerson.parents.pere) {
        throw new Error("La personne a déjà un père");
      }
      addedPerson = await addPerson({
        ...personToAddData,
        enfants: [{ idEnfant: actualPerson._id }],
      });
      actualPerson.parents.pere = addedPerson._id;
      actualPerson.markModified("parents.pere");
    } else if (relation === "mere") {
      if (actualPerson.parents && actualPerson.parents.mere) {
        throw new Error("La personne a déjà une mère");
      }
      addedPerson = await addPerson({
        ...personToAddData,
        enfants: [{ idEnfant: actualPerson._id }],
      });
      actualPerson.parents.mere = addedPerson._id;
      actualPerson.markModified("parents.mere");
    } else if (relation === "conjoint") {
      addedPerson = await addPerson(personToAddData);
      actualPerson.conjoints.push({
        idConjoint: addedPerson._id,
        dateUnion,
        dateSeparation,
      });
      addedPerson.conjoints.push({
        idConjoint: actualPerson._id,
        dateUnion,
        dateSeparation,
      });
      actualPerson.markModified("conjoints");
    } else if (relation === "enfant") {
      addedPerson = await addPerson(personToAddData);
      actualPerson.enfants.push({
        idEnfant: addedPerson._id,
      });
      if (actualPerson.sexe === "Homme") {
        addedPerson.parents.pere = actualPerson._id;
      } else {
        addedPerson.parents.mere = actualPerson._id;
      }
      actualPerson.markModified("enfants");
    } else {
      throw new Error("Relation non valide");
    }

    await actualPerson.save();

    if (relation === "conjoint" || relation === "enfant") {
      await addedPerson.save();
    }
    await session.commitTransaction();
    return addedPerson._id;
  } catch (err) {
    console.error("Transaction error in addRelation:", err);
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    session.endSession();
  }
};

const handleAddExistingRelation = async (
  personId,
  personToAddMail,
  personToAddData
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { relation, dateUnion, dateSeparation } = personToAddData;
    if (!relation) {
      throw new Error("Relation field is required");
    }
    let actualPerson = await getPersonById(personId);
    if (!actualPerson) {
      throw new Error("Person not found");
    }
    let addedPerson = await getPersonByEmail(personToAddMail);
    if (!addedPerson) {
      throw new Error("Person to add not found");
    }
    if (relation === "pere") {
      if (actualPerson.parents && actualPerson.parents.pere) {
        throw new Error("La personne a déjà un père");
      }
      addedPerson = await updatePerson(addedPerson._id, {
        enfants: [
          ...(addedPerson.enfants || []),
          { idEnfant: actualPerson._id },
        ],
      });
      actualPerson.parents.pere = addedPerson._id;
      actualPerson.markModified("parents.pere");
      addedPerson.markModified("enfants");
    } else if (relation === "mere") {
      if (actualPerson.parents && actualPerson.parents.mere) {
        throw new Error("La personne a déjà une mère");
      }
      addedPerson = await updatePerson(addedPerson._id, {
        enfants: [
          ...(addedPerson.enfants || []),
          { idEnfant: actualPerson._id },
        ],
      });
      actualPerson.parents.mere = addedPerson._id;
      actualPerson.markModified("parents.mere");
      addedPerson.markModified("enfants");
    } else if (relation === "conjoint") {
      actualPerson.conjoints.push({
        idConjoint: addedPerson._id,
        dateUnion,
        dateSeparation,
      });
      addedPerson.conjoints.push({
        idConjoint: actualPerson._id,
        dateUnion,
        dateSeparation,
      });
      actualPerson.markModified("conjoints");
      addedPerson.markModified("conjoints");
    } else if (relation === "enfant") {
      actualPerson.enfants.push({
        idEnfant: addedPerson._id,
      });
      if (actualPerson.sexe === "Homme") {
        if (addedPerson.parents && addedPerson.parents.pere) {
          throw new Error("La personne a déjà un père");
        }
        addedPerson.parents.pere = actualPerson._id;
      } else {
        if (addedPerson.parents && addedPerson.parents.mere) {
          throw new Error("La personne a déjà un mère");
        }
        addedPerson.parents.mere = actualPerson._id;
      }
      actualPerson.markModified("enfants");
      addedPerson.markModified("parents");
    } else {
      throw new Error("Relation non valide");
    }

    await actualPerson.save();
    await addedPerson.save();
    await session.commitTransaction();
    return addedPerson._id;
  } catch (err) {
    console.error("Transaction error in addRelation:", err);
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    session.endSession();
  }
};

const handleGetRelation = async (personId1, personId2) => {
  let relation;
  let person2 = await getPersonById(personId2);
  let child = person2.enfants.some((enfant) => enfant.idEnfant == personId1);
  if (child) {
    relation = "enfant";
    return relation;
  }
  let spouse = person2.conjoints.some(
    (conjoint) => conjoint.idConjoint == personId1
  );
  if (spouse) {
    relation = "conjoint";
    return relation;
  }
  let pere = person2.parents.pere == personId1;
  if (pere) {
    relation = "pere";
    return relation;
  }
  let mere = person2.parents.mere == personId1;
  if (mere) {
    relation = "mere";
    return relation;
  }
  return null;
};

const handleUpdatePerson = async (personId, personToUpdateData) => {
  const person = await getPersonById(personId);
  if (person.photo && personToUpdateData.photo) {
    deleteFile(`${dir}/${person.photo}`);
  }
  const updatedPerson = await updatePerson(personId, personToUpdateData);
  return updatedPerson._id;
};

const handleDeleteRelation = async (personId1, personId2) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let person1 = await getPersonById(personId1);
    let person2 = await getPersonById(personId2);

    let relation = await handleGetRelation(personId1, personId2);
    if (!relation) {
      throw new Error("Les deux personnes n'ont pas de relation");
    }

    switch (relation) {
      case "pere":
        await person2.updateOne(
          { $unset: { "parents.pere": "" } },
          { session }
        );
        person1.enfants = person1.enfants.filter(
          (enfant) => enfant.idEnfant.toString() !== personId2
        );
        person1.markModified("enfants");
        break;
      case "mere":
        await person2.updateOne(
          { $unset: { "parents.mere": "" } },
          { session }
        );
        person1.enfants = person1.enfants.filter(
          (enfant) => enfant.idEnfant.toString() !== personId2
        );
        person1.markModified("enfants");
        break;
      case "conjoint":
        person1.conjoints = person1.conjoints.filter(
          (conjoint) => conjoint.idConjoint.toString() !== personId2
        );
        person2.conjoints = person2.conjoints.filter(
          (conjoint) => conjoint.idConjoint.toString() !== personId1
        );
        person1.markModified("conjoints");
        person2.markModified("conjoints");
        break;
      case "enfant":
        person2.enfants = person2.enfants.filter(
          (enfant) => enfant.idEnfant.toString() !== personId1
        );
        person1.updateOne(
          {
            $unset: {
              [`parents.${person1.sexe === "Homme" ? "pere" : "mere"}`]: "",
            },
          },
          { session }
        );
        person2.markModified("enfants");
        break;
      default:
        throw new Error("Relation non valide");
    }

    await person1.save({ session });
    await person2.save({ session });

    await session.commitTransaction();
    return { personId1, personId2 };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const handleDeletePerson = async (personId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let person = await getPersonById(personId);
    if (!person) {
      throw new Error("Person not found");
    }

    if (person.parents.pere) {
      let father = await getPersonById(person.parents.pere);
      father.enfants = father.enfants.filter(
        (enfant) => enfant.idEnfant.toString() !== personId
      );
      father.markModified("enfants");
      await father.save({ session });
    }
    if (person.parents.mere) {
      let mother = await getPersonById(person.parents.mere);
      mother.enfants = mother.enfants.filter(
        (enfant) => enfant.idEnfant.toString() !== personId
      );
      mother.markModified("enfants");
      await mother.save({ session });
    }
    for (let child of person.enfants) {
      let enfant = await getPersonById(child.idEnfant);
      enfant.parents = {
        pere:
          enfant.parents.pere && enfant.parents.pere.toString() === personId
            ? null
            : enfant.parents.pere,
        mere:
          enfant.parents.mere && enfant.parents.mere.toString() === personId
            ? null
            : enfant.parents.mere,
      };
      enfant.markModified("parents");
      await enfant.save({ session });
    }
    for (let conjoint of person.conjoints) {
      let partner = await getPersonById(conjoint.idConjoint);
      partner.conjoints = partner.conjoints.filter(
        (conjoint) => conjoint.idConjoint.toString() !== personId
      );
      partner.markModified("conjoints");
      await partner.save({ session });
    }

    const photo = person.photo;
    await person.deleteOne({ session });
    deleteFile(`${dir}/${photo}`);

    await session.commitTransaction();
    return person;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

module.exports = {
  handleAddRelation,
  handleAddExistingRelation,
  handleGetRelation,
  handleUpdatePerson,
  handleDeleteRelation,
  handleDeletePerson,
};
