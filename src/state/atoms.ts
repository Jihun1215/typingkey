import { atom } from "recoil";

export const ModeToggleState = atom<boolean>({
  key: "ModeToggleState",
  default: true,
});

export const TextValueState = atom<string>({
  key: "TextValue",
  default: "",
});

export const TypingCountState = atom<number>({
  key: "TypingCount",
  default: 0,
});

export const TypingWrongCountState = atom<number>({
  key: "TypingWrongCount",
  default: 0,
});

export const AlertModalState = atom<boolean>({
  key: "AlertModal",
  default: false,
});

export const TypingTickState = atom<number>({
  key: "TypingTick",
  default: 0,
});

export const TypingTimeState = atom<number>({
  key: "TypingTime",
  default: 0,
});

export const TypingProgressState = atom<number>({
  key: "TypingProgress",
  default: 0,
});
