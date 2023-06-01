import { Mask } from "./mask";
import { parseInput } from "./parser";

export class MaskInput {
  readonly items = new Map<HTMLInputElement, Mask>();
  targetInput: HTMLInputElement;

  constructor(target: HTMLInputElement, options: MaskInputOptions) {
    this.targetInput = target;
    this.init(target, this.getMaskOpts(options));
  }

  private init(input: HTMLInputElement, options: MaskInputOptions): void {
    let mask = new Mask(parseInput(input, options));
    this.items.set(input, mask);

    input.addEventListener("input", this.inputEvent);
    input.addEventListener("beforeinput", this.beforeinputEvent);
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

  //needUpdateOptions(input: HTMLInputElement, opts: MaskInputOptions): boolean {
  //  const mask = this.items.get(input) as Mask;
  //  const maskNew = new Mask(parseInput(input, this.getMaskOpts(opts)));

  //  return JSON.stringify(mask.opts) !== JSON.stringify(maskNew.opts);
  //}

  private getMaskOpts(options: MaskInputOptions): MaskOptions {
    const { detailCallback, ...opts } = options;

    return opts;
  }

  private readonly beforeinputEvent = (e: Event | InputEvent) => {
    //debugger;
  };

  private readonly inputEvent = (e: Event | InputEvent): void => {
    let input = e.target as HTMLInputElement;
    let inputValue = input.value;
    let mask = this.items.get(input) as Mask;
    let maskValue = mask.mask(inputValue);
    let cursorPosition;

    input.value = maskValue;

    if (maskValue.indexOf("_") !== -1) {
      cursorPosition = maskValue.indexOf("_");

      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
    }
  };
}
