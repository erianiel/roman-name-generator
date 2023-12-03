import db from "./db";

export const GENDER = {
  MALE: "male",
  FEMALE: "female",
};

export const STATUS = {
  CITIZEN: "citizen",
  LIBERTUS: "libertus",
  SLAVE: "slave",
};

const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Generate a realistic ancient Roman fullname
 *
 * @param {String} gender Accepted values: `male` or `female`
 * @param {String} status Accepted values: `citizien`, `libertus` or `slave`
 * @returns {String | Error}
 */
export const generateFullName = function (gender, status) {
  if (gender !== GENDER.MALE && gender !== GENDER.FEMALE) {
    throw new Error("You must pass a valid gender");
  }

  if (
    status !== STATUS.CITIZEN &&
    status !== STATUS.LIBERTUS &&
    status !== STATUS.SLAVE
  ) {
    throw new Error("You must pass a valid status");
  }

  const { praenomen, nomen, cognomen } = db.male.citizen;

  const maleFirstName = getRandomItem(praenomen);
  const maleSecondName = getRandomItem(nomen);
  const thirdName = getRandomItem(cognomen);

  const femaleSecondName = `${maleSecondName.slice(0, -2)}a`;
  const femaleThirdName = getRandomItem(db.female.citizen.cognomen);

  const slaveName = (gender) => getRandomItem(db[gender].slave);

  let fullName = "";

  if (gender === GENDER.MALE) {
    if (status === STATUS.CITIZEN)
      fullName = `${maleFirstName} ${maleSecondName} ${thirdName}`;
    if (status === STATUS.LIBERTUS)
      fullName = `${maleFirstName} ${maleSecondName} ${slaveName(gender)}`;
  }

  if (gender === GENDER.FEMALE) {
    if (status === STATUS.CITIZEN)
      fullName = `${femaleSecondName} ${femaleThirdName}`;
    if (status === STATUS.LIBERTUS)
      fullName = `${femaleSecondName} ${slaveName(gender)}`;
  }

  if (status === STATUS.SLAVE) {
    fullName = slaveName(gender);
  }

  return fullName;
};
