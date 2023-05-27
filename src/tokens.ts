export type MaskTokens = Record<string, any>;

export const tokens: MaskTokens = {
  "#": /[0-9]/,
  "@": /[a-zA-Z]/,
  "*": /[a-zA-Z0-9]/,
};
