import { SLACK_API_ENDPOINTS } from "@/domain/api/endpoints";
import { SLACK_API_HEADER } from "@/domain/slack/api";
import type { User } from "@/domain/slack/types";

export const getUsers = async (userIdList: string[]) => {
  return Promise.all(
    userIdList.map(async (userId) => {
      return fetch(`${SLACK_API_ENDPOINTS.USERS}?user=${userId}`, {
        headers: SLACK_API_HEADER,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data: { ok: boolean; user: User }) => {
          return {
            id: data.user.id,
            name: data.user.name,
            displayName: data.user.real_name,
            avatarUrl: data.user.profile.image_48,
            speakerId: null,
          };
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    }),
  ).then((users) => {
    return users.filter((user) => user !== null);
  });
};
