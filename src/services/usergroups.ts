import type { UserGroup } from "@/domain/slack/types";
import { SLACK_API_ENDPOINTS } from "@/domain/api/endpoints";
import { SLACK_API_HEADER } from "@/domain/slack/api";

export const getUserGroups = async () => {
  return fetch(`${SLACK_API_ENDPOINTS.USERGROUPS}`, {
    headers: SLACK_API_HEADER,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    })
    .then(
      (data: {
        ok: boolean;
        usergroups: UserGroup[];
      }) => {
        return data.usergroups.map((usergroup) => {
          return {
            id: usergroup.id,
            handle: usergroup.handle,
          };
        });
      },
    );
};
