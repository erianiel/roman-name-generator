import { afterEach, expect, test, vi } from "vitest";
import { ANY, GENDER, STATUS, generateFullName, generatePerson } from "./main";

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

test("name generator", () => {
  expect(generateFullName(GENDER.MALE, STATUS.CITIZEN)).toBe(
    "Gaius Milonius Nasica"
  );
  expect(generateFullName(GENDER.FEMALE, STATUS.CITIZEN)).toBe(
    "Milonia Agrippa"
  );
  expect(generateFullName(GENDER.MALE, STATUS.LIBERTUS)).toBe(
    "Gaius Milonius Aegypta"
  );
  expect(generateFullName(GENDER.FEMALE, STATUS.LIBERTUS)).toBe(
    "Milonia Prepontis"
  );
  expect(generateFullName(GENDER.MALE, STATUS.SLAVE)).toBe("Aegypta");
  expect(generateFullName(GENDER.FEMALE, STATUS.SLAVE)).toBe("Prepontis");
  expect(generateFullName(ANY, STATUS.SLAVE)).toBeTruthy(
    Boolean("Aegypta" || "Prepontis")
  );
  expect(generateFullName(GENDER.FEMALE, ANY)).toBeTruthy(
    Boolean("Prepontis" || "Milonia Agrippa" || "Milonia Prepontis")
  );
  expect(() => generateFullName("whatever", STATUS.SLAVE)).toThrow();
  expect(() => generateFullName(GENDER.MALE, "whatever")).toThrow();
});

test("person generator", () => {
  vi.spyOn(global.Math, "random").mockReturnValue(0.5);
  expect(generatePerson()).toStrictEqual({
    fullName: "Milonia Prepontis",
    gender: GENDER.FEMALE,
    status: STATUS.LIBERTUS,
  });
});
