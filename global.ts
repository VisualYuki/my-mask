type MaskType = string;

interface MaskOptions {
  mask?: MaskType;
  tokens?: MaskToken;
  //placeholder?: boolean;
  //tokensReplace?: boolean;
  //eager?: boolean;
  //reversed?: boolean;
}

interface locMaskOptions {
  mask: MaskType;
  tokens: MaskToken;
  //placeholder: boolean;
}

interface locMaskInputOptions extends locMaskOptions {
  detailCallback?: (detail: MaskDetails) => void;
}

interface MaskInputOptions extends MaskOptions {
  detailCallback?: (detail: MaskDetails) => void;
}

interface MaskDetails {
  mask: string;
  unmask: string;
  isCompleted: boolean;
  cursorPosition: number;
}

//interface MaskToken {
//  pattern: RegExp;
//  //multiple?: boolean;
//  //optional?: boolean;
//  //repeated?: boolean;
//  //transform?: (char: string) => string;
//}

type MaskToken = Record<string, RegExp>;
