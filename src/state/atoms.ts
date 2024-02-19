import { atom } from "recoil";

export const UserCheckState = atom<boolean>({
  key: "UserCheck",
  default: false,
});

export const ModeToggleState = atom<boolean>({
  key: "ModeToggleState",
  default: true,
});

export const TypingKRState = atom<boolean>({
  key: "TypingKr",
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

export const TypingTimeState = atom<number>({
  key: "TypingTime",
  default: 0,
});

export const TypingProgressState = atom<number>({
  key: "TypingProgress",
  default: 0,
});

export const TypingAccuracyState = atom<number>({
  key: "TypingAccuracy",
  default: 0,
});

export const TypingAccuracyArrState = atom<number[]>({
  key: "TypingAccuracyArr",
  default: [],
});

export const TypingTimeArrState = atom<number[]>({
  key: "TypingTimeArr",
  default: [],
});

export const TypingCpmState = atom<number>({
  key: "TypingCpm",
  default: 0,
});

export const TypingCpmArrState = atom<number[]>({
  key: "TypingCpmArr",
  default: [],
});

export const TypingSpeedState = atom<number>({
  key: "TypingSpeed",
  default: 0,
});

export const TypingincorrectArrState = atom<number[]>({
  key: "TypingincorrectArr",
  default: [],
});
