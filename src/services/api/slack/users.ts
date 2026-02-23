import type { Member, User } from "@/domain/slack/types";
import { SLACK_API_ENDPOINTS } from "@/domain/api/endpoints";
import { SLACK_API_HEADER } from "@/domain/slack/consts";
import { responseToJson } from "@/domain/api/utils";

export const fetchUsersFromSlackAPI = async (
  userIdList: string[],
): Promise<Member[]> => {
  return Promise.all(
    userIdList.map(async (userId) => {
      return fetch(`${SLACK_API_ENDPOINTS.USERS}?user=${userId}`, {
        headers: SLACK_API_HEADER,
      })
        .then(responseToJson)
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
    return users.filter((user) => user !== null) as Member[];
  });
};
