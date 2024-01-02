import { atom } from "recoil";

export const ModeToggleState = atom<boolean>({
  key: "ModeToggleState",
  default: true,
});

export const TextValueState = atom<string>({
  key: "TextValue",
  default: "",
});
