import db from "./db";

export const ANY = "any";

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
 * @param {String} gender Accepted values: `male`, `female`, `any`
 * @param {String} status Accepted values: `citizien`, `libertus`, `slave` or `any`
 * @returns { Object { `fullname`: String, `gender`: String, `status`: String } | Error}
 */
export const generateFullName = function (gender, status) {
  let selectedGender = gender;
  let selectedStatus = status;

  if (
    selectedGender !== GENDER.MALE &&
    selectedGender !== GENDER.FEMALE &&
    selectedGender !== ANY
  ) {
    throw new Error("You must pass a valid gender");
  }

  if (
    selectedStatus !== STATUS.CITIZEN &&
    selectedStatus !== STATUS.LIBERTUS &&
    selectedStatus !== STATUS.SLAVE &&
    selectedStatus !== ANY
  ) {
    throw new Error("You must pass a valid status");
  }

  if (selectedStatus === ANY) {
    selectedStatus = getRandomItem(Object.values(STATUS));
  }

  if (selectedGender === ANY) {
    selectedGender = getRandomItem(Object.values(GENDER));
  }

  const { praenomen, nomen, cognomen } = db.male.citizen;

  const maleFirstName = getRandomItem(praenomen);
  const maleSecondName = getRandomItem(nomen);
  const thirdName = getRandomItem(cognomen);

  const femaleSecondName = `${maleSecondName.slice(0, -2)}a`;
  const femaleThirdName = getRandomItem(db.female.citizen.cognomen);

  const slaveName = (selectedGender) => getRandomItem(db[selectedGender].slave);

  let fullName = "";

  if (selectedGender === GENDER.MALE) {
    if (selectedStatus === STATUS.CITIZEN)
      fullName = `${maleFirstName} ${maleSecondName} ${thirdName}`;
    if (selectedStatus === STATUS.LIBERTUS)
      fullName = `${maleFirstName} ${maleSecondName} ${slaveName(
        selectedGender
      )}`;
  }

  if (selectedGender === GENDER.FEMALE) {
    if (selectedStatus === STATUS.CITIZEN)
      fullName = `${femaleSecondName} ${femaleThirdName}`;
    if (selectedStatus === STATUS.LIBERTUS)
      fullName = `${femaleSecondName} ${slaveName(selectedGender)}`;
  }

  if (selectedStatus === STATUS.SLAVE) {
    fullName = slaveName(selectedGender);
  }

  return {
    fullName,
    gender,
    status,
  };
};

/**
 * Generate a realistic random ancient Roman fullname
 *
 * @returns {Object}
 */
export const generateRandomFullName = () => {
  const gender = getRandomItem(Object.values(GENDER));
  const status = getRandomItem(Object.values(STATUS));

  return generateFullName(gender, status);
};
