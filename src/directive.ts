import { Directive } from "vue";
import { MaskInput, MaskInputOptions } from "./mask-input";

const masks = new WeakMap<HTMLInputElement, any>();
//const checkValue = (input: HTMLInputElement): void => {
//  setTimeout(() => {
//    if (masks.get(input)?.needUpdateValue(input) === true) {
//      input.dispatchEvent(new CustomEvent("input"));
//    }
//  });
//};

export const vMyMask: Directive = (el: HTMLElement, binding) => {
  const input = el instanceof HTMLInputElement ? el : el.querySelector("input");
  //const opts: MaskInputOptions = { ...(binding.arg as any) } || {};

  const rawMask = binding.value;

  if (input === null) {
    console.warn("Masked-mask: not found input element");
    return;
  } else if (el.querySelectorAll("input").length > 1) {
    console.warn("Masked-mask: inside directive found more than one input");
  }

  //checkValue(input);

  const existed = masks.get(input);

  if (existed === undefined) {
    masks.set(input, new MaskInput(input, rawMask));
  }
};
