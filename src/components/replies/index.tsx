import { isUserMessage } from "@/domain/slack/utils";
import { formatMessage } from "@/domain/slack/utils";
import { clsx } from "clsx";
import Image from "next/image";
import { useMessages } from "./script";

const ANONYMOUS_MEMBER = {
  id: "",
  name: "Anonymous",
  displayName: "Anonymous",
  avatarUrl: "/circle-user-solid.svg",
  speakerId: null,
};

export const Replies = () => {
  const { messages, url, setUrl, handle, members, userGroups } = useMessages();

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
        <button type="button" className="btn btn-primary" onClick={handle}>
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
