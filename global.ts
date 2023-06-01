type MaskType = string;

interface MaskOptions {
  mask?: MaskType;
  tokens?: MaskToken;
  placeholder?: boolean;
  //tokensReplace?: boolean;
  //eager?: boolean;
  //reversed?: boolean;
}

interface MaskInputOptions extends MaskOptions {
  detailCallback?: (detail: maskDetails) => void;
}

interface maskDetails {
  mask: string;
  unmask: string;
  isCompleted: boolean;
}

//interface MaskToken {
//  pattern: RegExp;
//  //multiple?: boolean;
//  //optional?: boolean;
//  //repeated?: boolean;
//  //transform?: (char: string) => string;
//}

type MaskToken = Record<string, RegExp>;
