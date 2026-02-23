export const SLACK_API_HEADER = {
  // XXX: credentials are exposed in the client side
  Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
  "Content-Type": "application/x-www-form-urlencoded",
} as const;

export const DEFAULT_BOT_AVATAR_URL = "/robot-solid.svg";
export const DEFAULT_BOT_SPEAKER_ID = 89;
