import { isUserMessage } from "@/domain/slack/utils";
import { formatMessage } from "@/domain/slack/utils";
import { clsx } from "clsx";
import Image from "next/image";
import { useReplies } from "./script";
import { useUserGroupsStore } from "@/store/useUserGroupsStore";
import { useMembersStore } from "@/store/useMembersStore";
import type { Message, Member } from "@/domain/slack/types";
import { ANONYMOUS_MEMBER } from "@/domain/slack/consts";

export const Replies = () => {
  const { messages, url, setUrl, fetchReplies, members } = useReplies();

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
          onClick={fetchReplies}
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
          .map(({ message, member }) => (
            <MessageItem key={message.ts} message={message} member={member} />
          ))}
      </div>
    </div>
  );
};

const MessageItem = ({
  message,
  member,
}: {
  message: Message;
  member: Member;
}) => {
  const { members } = useMembersStore();
  const { userGroups } = useUserGroupsStore();

  return (
    <button
      type="button"
      key={message.ts}
      className="block w-full px-8 py-2 rounded-lg text-left hover:bg-primary"
      onClick={async () => {}}
    >
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-white">
            <Image
              src={member.avatarUrl}
              alt={member.name}
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="chat-header">{member.displayName}</div>
        <div className={clsx("chat-bubble whitespace-pre-wrap break-words")}>
          <div>{formatMessage(message, members, userGroups)}</div>
        </div>
      </div>
    </button>
  );
};
