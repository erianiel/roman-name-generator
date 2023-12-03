import { expect, test, vi } from "vitest";
import { generateFullName, GENDER, STATUS } from "./main";

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
  expect(() => generateFullName("whatever", STATUS.SLAVE)).toThrow();
  expect(() => generateFullName(GENDER.MALE, "whatever")).toThrow();
});
