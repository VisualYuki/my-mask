import { Directive, DirectiveBinding } from "vue";
import { MaskInput } from "./mask-input";

const masks = new WeakMap<HTMLInputElement, MaskInput>();

export const vMyMask: Directive<HTMLElement, MaskDetails | undefined> = (
  el: HTMLElement,
  binding: DirectiveBinding<MaskDetails | undefined>
) => {
  const targetInput =
    el instanceof HTMLInputElement ? el : el.querySelector("input");
  //const options: MaskInputOptions = { ...(binding.value || {}) }; // get plugin options via vue directive values.
  const options: MaskInputOptions = {};

  // check errors
  if (targetInput === null) {
    console.error("my-mask: not found input element");
    return;
  } else if (el.querySelectorAll("input").length > 1) {
    console.warn("my-mask: inside directive found more than one input");
  }

  // set callback to update user variables in component.
  if (binding.value !== undefined) {
    const binded: MaskDetails = binding.value;

    const detailCallback = (detail: MaskDetails): void => {
      binded.mask = detail.mask;
      binded.unmask = detail.unmask;
      binded.isCompleted = detail.isCompleted;
    };

    options.detailCallback = detailCallback;
  }

  const existed = masks.get(targetInput);

  if (existed === undefined) {
    masks.set(targetInput, new MaskInput(targetInput, options));
  }

  //if (existed != null) {
  //  if (!existed.needUpdateOptions(targetInput, options)) {
  //    return;
  //  }

  //  existed.destroy();
  //}
};

//const checkValue = (input: HTMLInputElement): void => {
//  setTimeout(() => {
//    if (masks.get(input)?.needUpdateValue(input) === true) {
//      input.dispatchEvent(new CustomEvent("input"));
//    }
//  });
//};
//checkValue(input);
