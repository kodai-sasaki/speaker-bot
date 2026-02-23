import { addQueryParams, responseToJson } from "@/domain/api/utils";
import { DEFAULT_USER_SPEAKER_ID } from "@/domain/slack/consts";
import type { Member, Message, UserGroup } from "@/domain/slack/types";
import { formatMessage, getMemberFromMessage } from "@/domain/slack/utils";
import { generateVoice } from "@/services/api/voicevox";
import { getUnregisteredMembers } from "@/services/users";
import { useEffect, useRef, useState } from "react";

export const useReplies = ({
  members,
  addMembers,
}: { members: Member[]; addMembers: (members: Member[]) => void }) => {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
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

export const useVoiceBlob = ({
  members,
  userGroups,
  messages,
  speed,
}: {
  members: Member[];
  userGroups: UserGroup[];
  messages: Message[];
  speed: number;
}) => {
  const [blobList, setBlobList] = useState<
    { ts: string; blob: Promise<Blob> }[]
  >([]);

  const [isLoadedTsList, setIsLoadedTsList] = useState<string[]>(
    messages.map((message) => message.ts),
  );
  const [activeMessageTs, setActiveMessageTs] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const blobList = messages.map((message) => {
      const text = formatMessage(message, members, userGroups);
      const member = getMemberFromMessage(message, members);
      return {
        ts: message.ts,
        blob: generateVoice(
          text,
          member.speakerId || DEFAULT_USER_SPEAKER_ID,
          speed,
        ).then((blob) => {
          setIsLoadedTsList((prev) => prev.concat(message.ts));
          return blob;
        }),
      };
    });
    setBlobList(blobList);
  }, [messages, speed, members, userGroups]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!audioUrl) {
      audioRef.current?.pause();
      audioRef.current?.load();
      return;
    }
    audioRef.current?.play().catch((e) => {
      console.error("Audio playback failed:", e);
    });
  }, [audioUrl]);

  const onEnded = async () => {
    if (!activeMessageTs) return;
    const activeIndex = blobList.findIndex(
      (blob) => blob.ts === activeMessageTs,
    );
    if (activeIndex === -1 || activeIndex === blobList.length - 1) {
      setActiveMessageTs(null);
      setAudioUrl(undefined);
      return;
    }
    const nextBlob = blobList[activeIndex + 1];
    setActiveMessageTs(nextBlob.ts);
    const audioBlob = await nextBlob.blob;
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
  };

  const onClickMessage = (ts: string) => async () => {
    const index = blobList.findIndex((blob) => blob.ts === ts);
    if (index === -1) {
      console.error("Blob not found for ts:", ts);
      return;
    }
    if (activeMessageTs === ts) {
      // すでに再生中のメッセージがクリックされた場合は再生を停止する
      setActiveMessageTs(null);
      setAudioUrl(undefined);
      return;
    }
    setActiveMessageTs(ts);
    const audioBlob = await blobList[index].blob;
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
  };

  return {
    blobList,
    isLoadedTsList,
    activeMessageTs,
    audioUrl,
    audioRef,
    onEnded,
    onClickMessage,
  };
};
