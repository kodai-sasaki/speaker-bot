import { SLACK_API_ENDPOINTS } from "@/domain/api/endpoints";
import { SLACK_API_HEADER } from "@/domain/slack/consts";
import type { Message, Replies } from "@/domain/slack/types";

export const fetchRepliesFromSlackAPI = async (
  url: string,
): Promise<Message[]> => {
  if (typeof url !== "string") {
    throw new Error(`Invalid URL: ${url}`);
  }
  const pattern =
    /^https:\/\/(?<workspace>[a-z0-9\-]+)\.slack.com\/archives\/(?<channel>[CD][A-Z0-9]{8,10})\/p(?<tsBef>\d{10})\.?(?<tsAft>\d{6})$/;
  const match = url.match(pattern);
  if (match === null) {
    throw new Error(`Invalid URL: ${url}`);
  }
  const { channel, tsBef, tsAft } = match.groups as {
    channel: string;
    tsBef: string;
    tsAft: string;
  };
  return fetch(
    `${SLACK_API_ENDPOINTS.REPLIES}?channel=${channel}&ts=${tsBef}.${tsAft}`,
    {
      headers: SLACK_API_HEADER,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data: Replies) => {
      return data.messages;
    });
};
