import { tokens } from "./tokens";

export class Mask {
  private readonly memo = new Map();
  private rawMask = "";

  constructor(rawMask: string) {
    this.rawMask = rawMask;
  }

  masked(value: string): string {
    return this.process(value);
  }

  process(value: string): string {
    let result: string = "";

    for (let i = 0; i < this.rawMask.length; i++) {
      let valueChar = value[i] ? value[i] : "";
      let maskChar: string = this.rawMask[i];
      let maskPattern = tokens[maskChar] ? tokens[maskChar] : null;

      let match = valueChar.match(maskPattern);

      if (maskPattern === null) {
        valueChar = maskChar;
      } else {
        if (match !== null && match.length === 1) {
        } else {
          if (maskPattern) {
            valueChar = "_";
          }
        }
      }

      result += valueChar;
    }

    return result;
  }
}
