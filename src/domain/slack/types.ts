export type UserId = string;
export type Emoji = string;
export type TS = string;
export type ThreadTS = string;
export type File = object; // TODO: define file type

export type CodeElement =
  | {
      type: "user";
      user_id: UserId;
    }
  | {
      type: "usergroup";
      usergroup_id: string;
    }
  | {
      type: "text";
      text: string;
      style?: {
        bold?: boolean;
        italic?: boolean;
        strike?: boolean;
        code?: boolean;
      };
    }
  | {
      type: "emoji";
      name: Emoji;
      unicode: string;
    }
  | {
      type: "link";
      url: string;
      text: string;
    }
  | {
      type: "rich_text_list";
      elements: CodeElement[];
      style?: "ordered" | "bullet";
      indent: number;
      border: number;
    }
  | {
      type: "rich_text_section";
      elements: CodeElement[];
    };

export type Reaction = {
  name: Emoji;
  users: UserId[];
  count: number;
};

export type CodeBlock = {
  type: "rich_text";
  block_id: string;
  elements: CodeElement[];
};

export type BaseMessage = {
  type: "message";
  text: string;
  ts: TS;
  thread_ts: ThreadTS;
  files?: File[];
  reactions?: Reaction[];
} & Partial<{
  // reply
  reply_count: number;
  reply_users_count: number;
  latest_reply: string;
  reply_users: UserId[];
  parent_user_id: UserId;
}> & {
    // edited
    edited: {
      user: UserId;
      ts: TS;
    };
  } & ( // blocks
    | {
        is_blocked: false;
      }
    | {
        is_blocked: true;
        blocks: CodeBlock[];
      }
  );

export type UserMessage = BaseMessage & {
  user: UserId;
  client_msg_id: string;
  team: string;
};

export type BotMessage = BaseMessage & {
  subtype: "bot_message";
  username: string;
  bot_id: string;
  app_id: string;
};

export type Message = UserMessage | BotMessage;

export type Replies = {
  ok: boolean;
  messages: Message[];
} & {
  has_more: false;
};

export type User = {
  id: UserId;
  term_id: string;
  name: string;
  deleted: boolean;
  real_name: string;
  color: string;
  tz: string;
  tz_label: string;
  tz_offset: number;
  profile: {
    title: string;
    phone: string;
    skype: string;
    real_name: string;
    real_name_normalized: string;
    display_name: string;
    display_name_normalized: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
  };
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_bot: boolean;
  is_app_user: boolean;
  updated: number;
  is_email_confirmed: boolean;
  who_can_share_contact_card: string;
  enterprise_user: object;
};

export type Member = {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string;
  speakerId: number | null;
  isBot: boolean;
};

export type UserGroup = {
  id: string;
  handle: string;
};
