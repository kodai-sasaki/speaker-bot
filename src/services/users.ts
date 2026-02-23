import type { BotMessage, Member, Message } from "@/domain/slack/types";
import {
  DEFAULT_BOT_AVATAR_URL,
  DEFAULT_BOT_SPEAKER_ID,
} from "@/domain/slack/consts";
import { isBotMessage, isUserMessage } from "@/domain/slack/utils";
import { responseToJson, addQueryParams } from "@/domain/api/utils";

export const fetchUsers = async (userIdList: string[]): Promise<Member[]> => {
  return fetch(
    addQueryParams(`${location.protocol}//${location.host}/api/slack/users`, {
      users: userIdList.join(","),
    }),
  )
    .then(responseToJson)
    .then((data: Member[]) => {
      return data;
    });
};

export const getUnregisteredMembers = async (
  messages: Message[],
  members: Member[],
): Promise<Member[]> => {
  const unregisteredBots = getUnregisteredBots(messages, members);
  const unregisteredUsers = await getUnregisteredUsers(messages, members);
  return [...unregisteredBots, ...unregisteredUsers];
};

const getUnregisteredBots = (
  messages: Message[],
  members: Member[],
): Member[] => {
  return messages
    .filter(isBotMessage)
    .filter((message) => !members.some((m) => m.id === message.bot_id))
    .reduce((acc: Member[], message: BotMessage): Member[] => {
      if (acc.some((m) => m.id === message.bot_id)) {
        return acc;
      }
      acc.push({
        id: message.bot_id,
        name: message.username,
        displayName: message.username,
        avatarUrl: DEFAULT_BOT_AVATAR_URL,
        speakerId: DEFAULT_BOT_SPEAKER_ID,
        isBot: true,
      });
      return acc;
    }, []);
};

const getUnregisteredUsers = async (
  messages: Message[],
  members: Member[],
): Promise<Member[]> => {
  const unregisteredUserIdList = [
    ...new Set(
      messages
        .filter(isUserMessage)
        .filter((message) => !members.some((m) => m.id === message.user))
        .map((message) => message.user),
    ),
  ];
  if (unregisteredUserIdList.length === 0) {
    return [];
  }
  return await fetch(
    addQueryParams(`${location.protocol}//${location.host}/api/slack/users`, {
      users: unregisteredUserIdList.join(","),
    }),
  ).then(responseToJson);
};
