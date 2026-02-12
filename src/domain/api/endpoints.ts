export const VOICEVOX_API_BASEURL =
  process.env.NEXT_PUBLIC_VOICEVOX_API_BASEURL;

export const VOICEVOX_API_ENDPOINTS = {
  SPEAKERS: `${VOICEVOX_API_BASEURL}/speakers`,
  SYNTHESIS: `${VOICEVOX_API_BASEURL}/synthesis`,
  AUDIO_QUERY: `${VOICEVOX_API_BASEURL}/audio_query`,
} as const;

export const SLACK_API_BASEURL = "https://slack.com/api";

export const SLACK_API_ENDPOINTS = {
  REPLIES: `${SLACK_API_BASEURL}/conversations.replies`,
  USERS: `${SLACK_API_BASEURL}/users.info`,
  USERGROUPS: `${SLACK_API_BASEURL}/usergroups.list`,
} as const;
