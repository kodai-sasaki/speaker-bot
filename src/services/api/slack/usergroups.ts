import type { UserGroup } from "@/domain/slack/types";
import { SLACK_API_ENDPOINTS } from "@/domain/api/endpoints";
import { SLACK_API_HEADER } from "@/domain/slack/consts";
import { responseToJson } from "@/domain/api/utils";

export const fetchUserGroupsFromSlackAPI = async () => {
  return fetch(`${SLACK_API_ENDPOINTS.USERGROUPS}`, {
    headers: SLACK_API_HEADER,
  })
    .then(responseToJson)
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
