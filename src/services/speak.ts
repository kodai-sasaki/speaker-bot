import { VOICEVOX_API_ENDPOINTS } from "@/domain/api/endpoints";
import { addQueryParams } from "./url";

export const speak = async (
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
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    })
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
    .then(async (response) => {
      if (response.ok) return response.blob();
      throw new Error(`Fetch Error: ${response.status}`);
    });
};
