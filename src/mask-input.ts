import { Mask } from "./mask";

export class MaskInput {
  readonly items = new Map<HTMLInputElement, Mask>();

  constructor(target: HTMLInputElement, rawMask: string) {
    this.init(target, rawMask);
  }

  private init(input: HTMLInputElement, rawMask: string): void {
    let mask = new Mask(rawMask);
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

  private readonly beforeinputEvent = (e: Event | InputEvent) => {
    //debugger;
  };

  private readonly inputEvent = (e: Event | InputEvent): void => {
    let input = e.target as HTMLInputElement;
    let mask = this.items.get(input) as Mask;
    let inputValue = input.value;
    let cursorPosition = input.selectionStart;

    input.value = mask.masked(inputValue);
    input.selectionStart = cursorPosition;
    input.selectionEnd = cursorPosition;
  };
}
