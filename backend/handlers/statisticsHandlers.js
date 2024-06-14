const Person = require("../models/Person");

//moyenne d'age
const ageAverage = async () => {
  try {
  } catch (err) {
    throw new Error(err);
  }
};

//pourcentage homme et femme
const genderPercentage = async () => {
  try {
    const personsNb = await Person.countDocuments();
    const menNb = await Person.countDocuments({ sexe: "Homme" });
    const menPercentage = (menNb / personsNb) * 100;
    const womenPercentage = 100 - menPercentage;
    return { menPercentage, womenPercentage };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { ageAverage, genderPercentage };
