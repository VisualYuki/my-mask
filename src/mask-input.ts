import { Mask } from "./mask";
import { tokens } from "./tokens";

export class MaskInput {
  readonly items = new Map<HTMLInputElement, Mask>();
  targetInput: HTMLInputElement;
  options: locMaskInputOptions;
  lastInputValue: string = "";

  constructor(target: HTMLInputElement, partOptions: MaskInputOptions = {}) {
    // this.init(target, this.getMaskOpts(options));
    this.targetInput = target;
    this.options = this.getOptions(partOptions);

    let mask = new Mask(this.options);
    this.items.set(target, mask);

    target.addEventListener("input", this.inputEvent);
    target.addEventListener("beforeinput", this.beforeinputEvent);

    if (target.value) {
      target.value = mask.mask(target.value);
    }
  }

  private getOptions(partOptions: MaskInputOptions): locMaskInputOptions {
    let options: locMaskInputOptions = { mask: "", tokens: {} };

    if (this.targetInput.dataset.mask) {
      options.mask = this.targetInput.dataset.mask;
    } else if (partOptions.mask) {
      options.mask = partOptions.mask;
    } else {
      options.mask = "";
    }

    if (this.targetInput.dataset.tokens != null) {
      options.tokens = {
        ...tokens,
        ...JSON.parse(this.targetInput.dataset.tokens),
      };
    } else if (partOptions.tokens) {
      options.tokens = { ...partOptions.tokens, ...tokens };
    } else {
      options.tokens = tokens;
    }

    return options;
  }

  destroy(): void {
    for (const input of this.items.keys()) {
      input.removeEventListener("input", this.inputEvent);
      input.removeEventListener("beforeinput", this.beforeinputEvent);
    }
    this.items.clear();
  }

  needUpdateValue(): boolean {
    const value = this.targetInput.dataset.maskaValue;

    return value !== this.targetInput.value;

    //return (
    //  (value == null && input.value !== "") ||
    //  (value != null && value !== input.value)
    //);
  }

  //needUpdateOptions(input: HTMLInputElement, opts: locMaskInputOptions): boolean {
  //  const mask = this.items.get(input) as Mask;
  //  const maskNew = new Mask(parseInput(input, this.getMaskOpts(opts)));

  //  return JSON.stringify(mask.opts) !== JSON.stringify(maskNew.opts);
  //}

  //private getMaskOpts(options: MaskInputOptions): locMaskOptions {
  //  const { detailCallback, ...opts } = options;

  //  return opts;
  //}

  private readonly beforeinputEvent = (e: Event | InputEvent) => {
    //e.target.value = "1212";
    //slice от num1 (включительно) до num2 (не включительно)
    (e.target as HTMLInputElement).selectionStart;
    (e.target as HTMLInputElement).selectionEnd;
    //debugger;
    if ("inputType" in e) {
      if (e.inputType.includes("delete")) {
        this.lastInputValue = e.target.value;
        //let currentPosition: number =
        //  ((e.target as HTMLInputElement).selectionStart as number) - 1;
        //let currentSymbol = this.options.mask[currentPosition];
        //let currentToken = this.options.tokens[currentSymbol];
        //while (currentToken !== null && currentPosition < 0) {
        //  currentPosition--;
        //  currentSymbol = this.options.mask[currentPosition];
        //  currentToken = this.options.tokens[currentSymbol];
        //}
        //(e.target as HTMLInputElement).selectionStart = currentPosition;
        //debugger;
      }
      //else {
      //  debugger;
      //  (e.target as HTMLInputElement).selectionStart = 4;

      //  (e.target as HTMLInputElement).selectionEnd = 5;
      //}
    }

    //return false;
  };

  private readonly inputEvent = (e: Event | InputEvent): void => {
    debugger;
    let input = e.target as HTMLInputElement;
    let inputValue = this.lastInputValue;
    let inputKey = e.data;
    let cursorPosition = input.selectionStart ? input.selectionStart : 0;

    if ("inputType" in e && e.inputType.includes("delete")) {
      let maskChar = this.options.mask[cursorPosition];
      let maskRegexp = this.options.tokens[maskChar];

      while (cursorPosition > 0) {
        if (!maskRegexp) {
          cursorPosition--;
          maskChar = this.options.mask[cursorPosition];
          maskRegexp = this.options.tokens[maskChar];
        } else {
          //inputValue[cursorPosition] = "_";
          break;
        }
      }

      if (cursorPosition >= 0) {
        inputValue =
          inputValue.slice(0, cursorPosition) +
          "_" +
          inputValue.slice(cursorPosition, inputValue.length);
      }

      input.value = inputValue;
    }

    if (inputKey) {
      inputValue = inputValue.replace("_", "");
    }

    let mask = this.items.get(input) as Mask;
    let maskProcess = mask.process(inputValue);
    let maskValue = maskProcess.mask;

    input.value = maskValue;

    //maskProcess = mask.process(inputValue);
    //input.value = maskProcess.mask;

    //if ("inputType" in e) {
    //if (e.inputType.includes("delete")) {
    //  //cursorPosition = cursorPosition - 1;
    //} else

    if (maskValue.indexOf("_") !== -1) {
      cursorPosition = maskValue.indexOf("_");
    } else {
      cursorPosition = inputValue.length;
    }
    // }

    //if (maskValue.indexOf("_") < cursorPosition) {
    //  cursorPosition--;
    //}

    //while (
    //  inputValue[cursorPosition] ===
    //  this.options.tokens[inputValue[cursorPosition]]
    //) {
    //  cursorPosition++;
    //}

    input.selectionStart = cursorPosition;
    input.selectionEnd = cursorPosition;

    input.dispatchEvent(
      new CustomEvent<MaskDetails>("mask", {
        detail: { ...maskProcess, cursorPosition: cursorPosition },
      })
    );
    //input.dispatchEvent(new CustomEvent<MaskDetails>("input", { detail }));
  };
}
