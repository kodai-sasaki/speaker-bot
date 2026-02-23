import { addQueryParams, responseToJson } from "@/domain/api/utils";
import type { Message } from "@/domain/slack/types";
import { getUnregisteredMembers } from "@/services/users";
import { useMembersStore } from "@/store/useMembersStore";
import { useState } from "react";

export const useReplies = () => {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { members, addMembers } = useMembersStore();

  const fetchReplies = async () => {
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
    fetchReplies,
    members,
  };
};
