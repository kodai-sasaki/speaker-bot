import type { Member } from "./types";

export const SLACK_API_HEADER = {
  // XXX: credentials are exposed in the client side
  Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
  "Content-Type": "application/x-www-form-urlencoded",
} as const;

export const DEFAULT_BOT_AVATAR_URL = "/robot-solid.svg";
export const DEFAULT_BOT_SPEAKER_ID = 89;

export const ANONYMOUS_MEMBER: Member = {
  id: "",
  name: "Anonymous",
  displayName: "Anonymous",
  avatarUrl: "/circle-user-solid.svg",
  speakerId: null,
  isBot: false,
};
