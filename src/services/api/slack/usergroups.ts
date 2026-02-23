import { SLACK_API_ENDPOINTS } from "@/domain/api/endpoints";
import { responseToJson } from "@/domain/api/utils";
import { SLACK_API_HEADER } from "@/domain/slack/consts";
import type { UserGroup } from "@/domain/slack/types";

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
