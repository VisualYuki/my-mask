import { describe, expect, test } from "vitest";
import { MaskInput } from "../src/mask-input";

import userEvent from "@testing-library/user-event";
const user = userEvent.setup();

describe("test init", () => {
  test("init and destroy", async () => {
    document.body.innerHTML = `<input id="input" data-mask="###-###">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input);

    expect(mask.items.has(input)).toBe(true);
    await user.type(input, "123-1");

    expect(input.value).toEqual("123-1__");

    mask.destroy();
  });

  test("with options", async () => {
    document.body.innerHTML = `<input id="input">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input, {
      mask: "ZZZ-ZZZ",
      tokens: { Z: /[a-zA-Z]/ },
    });

    await user.type(input, "123-1__");

    //await user.type(input, "123-1");
    expect(input.value).toEqual("___-___");
  });

  test("data attrs", async () => {
    document.body.innerHTML = `<input id="input" data-mask="###-###">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input);

    await user.type(input, "123");

    expect(input.value).toEqual("123-___");
  });

  test("mask event", async () => {
    document.body.innerHTML = `<input id="input" data-mask="###-###">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input);
    let details: any;

    input.addEventListener("mask", ((e: CustomEvent<MaskDetails>) => {
      details = e.detail;
    }) as EventListener);

    await user.type(input, "123");

    //expect(details.cursorPosition).toBe(4);
    //expect(details.mask).toBe("123-___");
    //expect(details.unmask).toBe("123");
    expect(details.isCompleted).toBe(false);
  });

  test("cursor position #-#--#", async () => {
    document.body.innerHTML = `<input id="input" data-mask="#-#--#">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input);

    await user.type(input, "123");

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(5);

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(2);

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(0);
  });

  test("cursor: for phone full {backspace}", async () => {
    // 0,2 == +7
    // 3,8 == (###)
    // 9, 12 == ###
    // 13, 15 == ##
    // 16, 18 == ##

    document.body.innerHTML = `<input id="input" data-mask="+7 (###) ### ##-##">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input);

    await user.type(input, "9635508754");

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(17);

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(16);

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(14);
    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(13);

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(11);
    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(10);
    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(9);

    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(6);
    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(5);
    await user.type(input, " {backspace}");
    expect(input.selectionStart).toBe(4);

    await user.type(input, " {backspace}{backspace}{backspace}{backspace}");
    expect(input.selectionStart).toBe(4);
  });

  test("cursor: for phone inner {backspace}", async () => {
    // 0,2 == +7
    // 3,8 == (###)
    // 9, 12 == ###
    // 13, 15 == ##
    // 16, 18 == ##

    document.body.innerHTML = `<input id="input" data-mask="+7 (###) ### ##-##">`;
    const input = <HTMLInputElement>document.getElementById("input");
    const mask = new MaskInput(input);

    await user.type(input, "9635508754");

    await user.type(input, "{backspace}", { initialSelectionStart: 9 });
    expect(input.selectionStart).toBe(6);
    expect(input.value).toBe("+7 (96_) 550 87-54");

    await user.type(input, "{backspace}", { initialSelectionStart: 6 });
    expect(input.selectionStart).toBe(5);
    expect(input.value).toBe("+7 (9__) 550 87-54");
  });
});
