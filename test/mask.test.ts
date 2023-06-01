import { expect, test } from "vitest";
import { Mask } from "../src/mask";

test("undefiend mask", () => {
  let mask = new Mask({
    mask: null,
  });

  expect(mask.mask("123-123")).toBe("123-123");
  expect(mask.mask("-123")).toBe("-123");
});

test("with placeholder", () => {
  let mask = new Mask({
    mask: "###-###",
    placeholder: true,
  });

  expect(mask.mask("123-")).toBe("123-___");
  expect(mask.mask("123-12")).toBe("123-12_");
});

test("without placeholder", () => {
  let mask = new Mask({
    mask: "###-###",
    placeholder: false,
  });

  expect(mask.mask("123-")).toBe("123-");
  expect(mask.mask("123-12")).toBe("123-12");
});

test("with tokenks", () => {
  let mask = new Mask({
    mask: "ЯЯЯ",
    tokens: {
      Я: /[а-яА-Я]/,
    },
  });

  expect(mask.mask("а1бв12")).toBe("абв");
});

test("empty string mask", () => {
  let mask = new Mask({
    mask: "",
  });

  expect(mask.mask("1a")).toBe("1a");
});

test("#.# mask", () => {
  let mask = new Mask({
    mask: "#.#",
  });

  expect(mask.mask("1")).toBe("1._");
  expect(mask.mask("1.")).toBe("1._");
  expect(mask.mask("12")).toBe("1.2");
  expect(mask.mask("123")).toBe("1.2");
  expect(mask.mask("a123")).toBe("1.2");
  expect(mask.unmask("a123")).toBe("12");
});

test("#.# is completed", () => {
  let mask = new Mask({
    mask: "#.#",
  });

  expect(mask.isCompleted("1.d")).toBe(false);
  expect(mask.isCompleted("f")).toBe(false);
  expect(mask.isCompleted("1.2")).toBe(true);
  expect(mask.isCompleted("12")).toBe(true);
});

test("#.# mask without placeholder", () => {
  let mask = new Mask({
    mask: "#.#",
    placeholder: false,
  });

  expect(mask.mask("1")).toBe("1.");
  expect(mask.mask("1.")).toBe("1.");
  expect(mask.mask("12")).toBe("1.2");
  expect(mask.mask("123")).toBe("1.2");
  expect(mask.mask("a123")).toBe("1.2");
  expect(mask.unmask("a123")).toBe("12");
});

test("(#) mask", () => {
  const mask = new Mask({ mask: "(#)" });

  expect(mask.mask("1")).toBe("(1)");
  expect(mask.mask("(1")).toBe("(1)");
  expect(mask.mask("1 ")).toBe("(1)");
  expect(mask.mask("12")).toBe("(1)");
  expect(mask.mask("a12")).toBe("(1)");

  expect(mask.unmask("a123")).toBe("1");
});

test("#-#-.# mask", () => {
  const mask = new Mask({ mask: "#-#-.#" });

  expect(mask.mask("1")).toBe("1-_-._");
  expect(mask.mask("12")).toBe("1-2-._");
  expect(mask.mask("123")).toBe("1-2-.3");
  expect(mask.mask("a1234")).toBe("1-2-.3");
  expect(mask.mask("&&&")).toBe("_-_-._");

  expect(mask.unmask("a1234")).toBe("123");
});

test("**.## mask", () => {
  const mask = new Mask({ mask: "**.##" });

  expect(mask.mask("d1")).toBe("d1.__");
  expect(mask.mask("d")).toBe("d_.__");
});

test("**.## mask without placeholder", () => {
  const mask = new Mask({ mask: "**.##", placeholder: false });

  expect(mask.mask("d1")).toBe("d1.");
  expect(mask.mask("d")).toBe("d");
  expect(mask.unmask("d2.__")).toBe("d2");
});

test("#-#--# mask without placeholder", () => {
  const mask = new Mask({ mask: "#-#--#", placeholder: false });

  expect(mask.mask("aadgf1x__--1")).toBe("1-1--");
  expect(mask.mask("aa1dgf1xcv")).toBe("1-1--");
  expect(mask.mask("aa1xcv")).toBe("1-");
  expect(mask.mask("12")).toBe("1-2--");
  expect(mask.mask("123")).toBe("1-2--3");
  expect(mask.mask("a1234")).toBe("1-2--3");

  expect(mask.unmask("a1234")).toBe("123");
});

test("0#.# mask", () => {
  const mask = new Mask({ mask: "0#.#" });

  expect(mask.mask("1")).toBe("01._");
  expect(mask.mask("01")).toBe("01._");
  expect(mask.mask("12")).toBe("01.2");
  expect(mask.mask("1.2")).toBe("01.2");
  expect(mask.mask("01.2")).toBe("01.2");
  expect(mask.mask("123")).toBe("01.2");
  expect(mask.mask("a123")).toBe("01.2");

  expect(mask.unmask("a123")).toBe("12");
});

test("#2 ## mask", () => {
  const mask = new Mask({ mask: "#2 ##" });

  expect(mask.mask("1")).toBe("12 __");
  expect(mask.mask("12")).toBe("12 __");
  expect(mask.mask("12 ")).toBe("12 __");
  expect(mask.mask("13")).toBe("12 3_");
  expect(mask.mask("123")).toBe("12 3_");
  expect(mask.mask("134")).toBe("12 34");
  expect(mask.mask("1234")).toBe("12 34");
  expect(mask.mask("1345")).toBe("12 34");
  expect(mask.mask("12345")).toBe("12 34");
  expect(mask.mask("a1")).toBe("12 __");
  expect(mask.mask("a13")).toBe("12 3_");

  expect(mask.unmask("12345")).toBe("134");
});

test("+1 (###) ###-##-## mask", () => {
  const mask = new Mask({ mask: "+1 (###) ###-##-##" });

  expect(mask.mask("999")).toBe("+1 (999) ___-__-__");
  expect(mask.mask("999123")).toBe("+1 (999) 123-__-__");
  expect(mask.mask("19991234567")).toBe("+1 (999) 123-45-67");
  expect(mask.mask("+19991234567")).toBe("+1 (999) 123-45-67");
  expect(mask.mask("9991234567")).toBe("+1 (999) 123-45-67");
  expect(mask.mask("a9991234567")).toBe("+1 (999) 123-45-67");

  expect(mask.unmask("+19991234567")).toBe("9991234567");
});

test("##.##.#### mask", () => {
  const mask = new Mask({ mask: "##.##.####" });

  expect(mask.mask("")).toBe("__.__.____");
  expect(mask.mask("12f122df01sdf8")).toBe("12.12.2018");
  expect(mask.mask("dgf12rfd#*gf34gfd5678")).toBe("12.34.5678");
});
