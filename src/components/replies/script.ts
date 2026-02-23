import { useState } from "react";
import { useMembersStore } from "@/store/useMembersStore";
import { useUserGroupsStore } from "@/store/useUserGroupsStore";
import type { Message } from "@/domain/slack/types";
import { getUnregisteredMembers } from "@/services/users";
import { responseToJson, addQueryParams } from "@/domain/api/utils";

export const useMessages = () => {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { members, addMembers } = useMembersStore();
  const { userGroups } = useUserGroupsStore();

  const handle = async () => {
    const apiPath = `${location.protocol}//${location.host}/api/slack/replies`;
    fetch(addQueryParams(apiPath, { url }))
      .then(responseToJson)
      .then(async (messages: Message[]) => {
        setMessages(messages);
        const unregisteredMembers = await getUnregisteredMembers(
          messages,
          members,
        );
        if (unregisteredMembers.length > 0) {
          addMembers(unregisteredMembers);
        }
      })
      .catch((e) => {
        console.error("error", e);
      });
  };

  return {
    messages,
    url,
    setUrl,
    handle,
    members,
    userGroups,
  };
};
