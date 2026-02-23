import { ANONYMOUS_MEMBER } from "./consts";
import type {
  BotMessage,
  CodeElement,
  Member,
  Message,
  UserGroup,
  UserMessage,
} from "./types";

export const isUserMessage = (message: Message): message is UserMessage => {
  return (message as UserMessage).user !== undefined;
};

export const isBotMessage = (message: Message): message is BotMessage => {
  return !isUserMessage(message);
};

export const formatMessage = (
  message: Message,
  members: Member[],
  userGroups: UserGroup[],
): string => {
  const formatElement = (element: CodeElement): string => {
    switch (element.type) {
      case "emoji":
        // return `<:${element.name}:>`;
        return "";
      case "text":
        return element.text;
      case "user": {
        const member = members.find((member) => {
          return member.id === element.user_id;
        });
        return member?.name ? `<@${member.name}>` : "Anonymous";
      }
      case "usergroup": {
        const handle = userGroups.find((userGroup) => {
          return userGroup.id === element.usergroup_id;
        })?.handle;
        return handle ? `<@${handle}>` : "<@unknown group>";
      }
      case "link":
        return "<url>";
      case "rich_text_list":
      case "rich_text_section":
        return element.elements.map(formatElement).filter(Boolean).join(" ");
    }
  };
  return !message.blocks
    ? message.text
    : message.blocks
        .map((block) => {
          return block.elements.map(formatElement).filter(Boolean).join("\n");
        })
        .filter(Boolean)
        .join("\n");
};

export const getMemberFromMessage = (
  message: Message,
  members: Member[],
): Member => {
  const id = isUserMessage(message) ? message.user : message.bot_id;
  return members.find((member) => member.id === id) || ANONYMOUS_MEMBER;
};
