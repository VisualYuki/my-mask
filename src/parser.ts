import { tokens } from "./tokens";

export const parseInput = (
  input: HTMLInputElement,
  defaults: MaskOptions = { tokens: {} }
): locMaskInputOptions => {
  const opts = { ...defaults };

  if (input.dataset.mask != null && input.dataset.mask !== "") {
    opts.mask = parseMask(input.dataset.mask);
  } else {
    opts.mask = "";
  }

  if (input.dataset.tokens != null) {
    opts.tokens = { ...tokens, ...JSON.parse(input.dataset.tokens) };
  }

  return opts;
  //  if (input.dataset.maskaEager != null) {
  //    opts.eager = parseOpts(input.dataset.maskaEager);
  //  }
  //  if (input.dataset.maskaReversed != null) {
  //    opts.reversed = parseOpts(input.dataset.maskaReversed);
  //  }
  //  if (input.dataset.maskaTokensReplace != null) {
  //    opts.tokensReplace = parseOpts(input.dataset.maskaTokensReplace);
  //  }
};

const parseMask = (value: string): MaskType =>
  value.startsWith("[") && value.endsWith("]") ? parseJson(value) : value;

const parseJson = (value: string): any =>
  JSON.parse(value.replaceAll("'", '"'));

//const parseTokens = (value: string): MaskTokens => {
//if (value.startsWith("{") && value.endsWith("}")) {
//return parseJson(value);
//}

//  const tokens: MaskTokens = {};
//  value.split("|").forEach((token) => {
//    const parts = token.split(":");
//    tokens[parts[0]] = {
//      pattern: new RegExp(parts[1]),
//      optional: parts[2] === "optional",
//      multiple: parts[2] === "multiple",
//      repeated: parts[2] === "repeated",
//    };
//  });

//return tokens;
//};
