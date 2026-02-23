import { ANONYMOUS_MEMBER } from "@/domain/slack/consts";
import type { Member } from "@/domain/slack/types";
import { isUserMessage } from "@/domain/slack/utils";
import { formatMessage } from "@/domain/slack/utils";
import { useMembersStore } from "@/store/useMembersStore";
import { useUserGroupsStore } from "@/store/useUserGroupsStore";
import { clsx } from "clsx";
import Image from "next/image";
import { useReplies, useVoiceBlob } from "./script";

export const Replies = () => {
  const { members, addMembers } = useMembersStore();
  const { userGroups } = useUserGroupsStore();
  const { messages, url, setUrl, fetchReplies } = useReplies({
    members,
    addMembers,
  });
  const {
    isLoadedTsList,
    activeMessageTs,
    audioUrl,
    audioRef,
    onEnded,
    onClickMessage,
  } = useVoiceBlob({
    members,
    userGroups,
    messages,
    speed: 1.5,
  });

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
        <audio ref={audioRef} src={audioUrl} onEnded={onEnded} />
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
            <MessageItem
              key={message.ts}
              textMessage={formatMessage(message, members, userGroups)}
              member={member}
              isActive={activeMessageTs === message.ts}
              isLoading={!isLoadedTsList.includes(message.ts)}
              onClickMessage={onClickMessage(message.ts)}
            />
          ))}
      </div>
    </div>
  );
};

const MessageItem = ({
  textMessage,
  member,
  isActive,
  isLoading,
  onClickMessage,
}: {
  textMessage: string;
  member: Member;
  isActive: boolean;
  isLoading: boolean;
  onClickMessage: () => Promise<void>;
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex justify-between w-full px-8 py-2 rounded-lg text-left hover:bg-primary",
        isActive && "bg-primary",
      )}
      onClick={onClickMessage}
    >
      <div className="chat chat-start grow-1">
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
          <div>{textMessage}</div>
        </div>
      </div>
      <div className="w-10 shrink-0 self-end">
        {isLoading && <span className="loading loading-md" />}
      </div>
    </button>
  );
};
