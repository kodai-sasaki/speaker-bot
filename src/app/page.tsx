"use client";

import type { Member, UserGroup } from "@/domain/slack/types";
import { Main } from "@/components/main";
import { Nav } from "@/components/nav";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { VOICEVOX_API_ENDPOINTS } from "@/domain/api/endpoints";
import type { Speaker } from "@/domain/speaker/types";
import useSWR from "swr";

export default function Home() {
  const { data: speakers } = useSWR<Speaker[]>(
    VOICEVOX_API_ENDPOINTS.SPEAKERS,
    async (url: string) => {
      return fetch(url).then((res) => res.json());
    },
  );
  return (
    <div className="flex justify-between">
      <Nav speakers={speakers} />
      <Main />
    </div>
  );
}
