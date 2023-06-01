import { tokens } from "./tokens";

interface locMaskOptions extends MaskOptions {
  tokens: MaskToken;
}

export class Mask {
  private options: locMaskOptions = {
    mask: "",
    placeholder: true,
    tokens: {},
  };

  constructor(options: MaskOptions) {
    this.options = { ...this.options, ...options };

    if (options.tokens) {
      this.options.tokens = { ...options.tokens, ...tokens };
    } else {
      this.options.tokens = tokens;
    }
  }

  mask(value: string): string {
    return this.process(value).mask;
  }

  unmask(value: string): string {
    return this.process(value).unmask;
  }

  isCompleted(value: string): boolean {
    return this.process(value).isCompleted;
  }

  getCursorPosition(value: string): number {
    return this.process(value).cursorPosition;
  }

  process(value: string): maskDetails {
    let result: maskDetails = {
      mask: "",
      unmask: "",
      isCompleted: true,
      cursorPosition: 0,
    };

    if (!this.options.mask) {
      result.isCompleted = false;
      result.mask = value;
      result.unmask = value;
      return result;
    }

    let offset = 0;

    for (let i = 0; i < this.options.mask.length; i++) {
      let valueChar = value[offset] ? value[offset] : "";
      let maskChar: string = this.options.mask[i];
      let maskRegexp = this.options.tokens[maskChar]
        ? this.options.tokens[maskChar]
        : null;

      if (
        valueChar === "" &&
        this.options.placeholder === false &&
        maskRegexp
      ) {
        break;
      }

      if (valueChar === maskChar) {
        offset++;
      }

      if (maskRegexp === null) {
        valueChar = maskChar;
      } else {
        let match = valueChar.match(maskRegexp);
        offset++;

        while (match === null && offset <= value.length) {
          valueChar = value[offset] ? value[offset] : "";
          match = valueChar.match(maskRegexp);

          offset++;
        }

        if (offset > value.length && this.options.placeholder === false) {
          break;
        }

        if (match === null) {
          result.isCompleted = false;
          if (this.options.placeholder === true) {
            valueChar = "_";
          }
        } else {
          result.unmask += valueChar;
        }
      }

      result.mask += valueChar;
    }

    return result;
  }
}
