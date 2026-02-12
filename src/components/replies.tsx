import type { Message, Member, UserGroup } from "@/domain/slack/types";
import { isUserMessage } from "@/domain/slack/utils";
import { addQueryParams } from "@/services/url";
import { formatMessage } from "@/domain/slack/utils";
import { useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";
import { useMembersStore } from "@/store/useMembersStore";
import { useUserGroupsStore } from "@/store/useUserGroupsStore";

const DEFAULT_BOT_AVATAR_URL = "/robot-solid.svg";
const DEFAULT_BOT_SPEAKER_ID = 89;
const ANONYMOUS_MEMBER = {
  id: "",
  name: "Anonymous",
  displayName: "Anonymous",
  avatarUrl: "/circle-user-solid.svg",
  speakerId: null,
};

export const Replies = () => {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { members, addMembers } = useMembersStore();
  const { userGroups } = useUserGroupsStore();

  return (
    <div>
      <div className="flex">
        <input
          type="url"
          className="input w-[600px] input-primary"
          placeholder="slack link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            const apiPath = `${location.protocol}//${location.host}/api/slack/replies`;
            fetch(addQueryParams(apiPath, { url }))
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`Failed to fetch: ${res.statusText}`);
                }
                return res.json();
              })
              .then(async (data: Message[]) => {
                setMessages(data);
                const unregisteredBots = [
                  ...new Set(
                    data.map((message) => {
                      if (isUserMessage(message)) {
                        return null;
                      }
                      return message;
                    }),
                  ),
                ]
                  .filter((id) => id !== null)
                  .map((message) => {
                    return {
                      id: message.bot_id,
                      name: message.username,
                      displayName: message.username,
                      avatarUrl: DEFAULT_BOT_AVATAR_URL,
                      speakerId: DEFAULT_BOT_SPEAKER_ID,
                    };
                  });
                const unregisteredUserIdList = [
                  ...new Set(
                    data
                      .map((message) => {
                        if (!isUserMessage(message)) {
                          return null;
                        }
                        return message.user;
                      })
                      .filter((id) => id !== null),
                  ),
                ].filter((userId) => !members.some((m) => m.id === userId));
                const unregisteredUsers =
                  unregisteredUserIdList.length > 0
                    ? await fetch(
                        addQueryParams(
                          `${location.protocol}//${location.host}/api/slack/users`,
                          { users: unregisteredUserIdList.join(",") },
                        ),
                      )
                        .then((res) => {
                          if (!res.ok) {
                            throw new Error(
                              `Failed to fetch: ${res.statusText}`,
                            );
                          }
                          return res.json();
                        })
                        .then((data: Member[]) => {
                          return data;
                        })
                    : [];
                addMembers([...unregisteredBots, ...unregisteredUsers]);
              })
              .catch((e) => {
                console.error("error", e);
              });
          }}
        >
          submit
        </button>
      </div>
      <div className="pt-4">
        {messages
          .map((message) => {
            const member = members.find(
              (m) =>
                m.id ===
                (isUserMessage(message) ? message.user : message.bot_id),
            );
            return {
              message,
              member: member || ANONYMOUS_MEMBER,
            };
          })
          .map((params) => {
            const { message, member } = params || {};
            return (
              <button
                type="button"
                key={message.ts}
                className="block w-full px-8 py-2 rounded-lg text-left hover:bg-primary"
              >
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full bg-white">
                      <Image
                        src={member.avatarUrl}
                        alt={member?.name || "Anonymous"}
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {member?.displayName || "Anonymous"}
                  </div>
                  <div
                    className={clsx(
                      "chat-bubble whitespace-pre-wrap break-words",
                    )}
                  >
                    <div>{formatMessage(message, members, userGroups)}</div>
                  </div>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};
