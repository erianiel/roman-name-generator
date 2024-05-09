import { afterEach, expect, test, vi } from "vitest";
import {
  ANY,
  GENDER,
  STATUS,
  generateFullName,
  generateRandomFullName,
} from "./main";

vi.mock("./db", () => ({
  default: {
    male: {
      citizen: {
        praenomen: ["Gaius"],
        nomen: ["Milonius"],
        cognomen: ["Nasica"],
      },
      slave: ["Aegypta"],
    },
    female: { citizen: { cognomen: ["Agrippa"] }, slave: ["Prepontis"] },
  },
}));

afterEach(() => {
  vi.restoreAllMocks();
});

const DATA = {
  maleCitizen: {
    fullName: "Gaius Milonius Nasica",
    gender: GENDER.MALE,
    status: STATUS.CITIZEN,
  },
  femaleCitizen: {
    fullName: "Milonia Agrippa",
    gender: GENDER.FEMALE,
    status: STATUS.CITIZEN,
  },
  maleLibertus: {
    fullName: "Gaius Milonius Aegypta",
    gender: GENDER.MALE,
    status: STATUS.LIBERTUS,
  },
  femaleLibertus: {
    fullName: "Milonia Prepontis",
    gender: GENDER.FEMALE,
    status: STATUS.LIBERTUS,
  },
  maleSlave: {
    fullName: "Aegypta",
    gender: GENDER.MALE,
    status: STATUS.SLAVE,
  },
  femaleSlave: {
    fullName: "Prepontis",
    gender: GENDER.FEMALE,
    status: STATUS.SLAVE,
  },
};

test("name generator", () => {
  expect(generateFullName(GENDER.MALE, STATUS.CITIZEN)).toStrictEqual(
    DATA.maleCitizen
  );
  expect(generateFullName(GENDER.FEMALE, STATUS.CITIZEN)).toStrictEqual(
    DATA.femaleCitizen
  );
  expect(generateFullName(GENDER.MALE, STATUS.LIBERTUS)).toStrictEqual(
    DATA.maleLibertus
  );
  expect(generateFullName(GENDER.FEMALE, STATUS.LIBERTUS)).toStrictEqual(
    DATA.femaleLibertus
  );
  expect(generateFullName(GENDER.MALE, STATUS.SLAVE)).toStrictEqual(
    DATA.maleSlave
  );
  expect(generateFullName(GENDER.FEMALE, STATUS.SLAVE)).toStrictEqual(
    DATA.femaleSlave
  );

  expect(generateFullName(ANY, STATUS.SLAVE)).toBeTruthy(
    Boolean(DATA.maleSlave || DATA.femaleSlave)
  );
  expect(generateFullName(GENDER.FEMALE, ANY)).toBeTruthy(
    Boolean(DATA.femaleCitizen || DATA.femaleLibertus || DATA.femaleSlave)
  );
  expect(() => generateFullName("whatever", STATUS.SLAVE)).toThrow();
  expect(() => generateFullName(GENDER.MALE, "whatever")).toThrow();
});

test("person generator", () => {
  vi.spyOn(global.Math, "random").mockReturnValue(0.5);
  expect(generateRandomFullName()).toStrictEqual(DATA.femaleLibertus);
});
