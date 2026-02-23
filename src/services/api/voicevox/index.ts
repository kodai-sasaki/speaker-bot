import { VOICEVOX_API_ENDPOINTS } from "@/domain/api/endpoints";
import {
  addQueryParams,
  responseToBlob,
  responseToJson,
} from "@/domain/api/utils";

export const generateVoice = async (
  text: string,
  speakerId: number,
  speed?: number,
) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    addQueryParams(VOICEVOX_API_ENDPOINTS.AUDIO_QUERY, {
      speaker: speakerId.toString(),
      text,
    }),
    fetchOptions,
  )
    .then(responseToJson)
    .then((query) => {
      return fetch(
        addQueryParams(VOICEVOX_API_ENDPOINTS.SYNTHESIS, {
          speaker: speakerId.toString(),
        }),
        {
          ...fetchOptions,
          body: JSON.stringify({ ...query, speedScale: speed || 1 }),
        },
      );
    })
    .then(responseToBlob);
};
