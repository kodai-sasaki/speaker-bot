import type { Member } from "@/domain/slack/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MembersStore = {
  members: Member[];
  addMembers: (members: Member[]) => void;
};

export const useMembersStore = create(
  persist<MembersStore>(
    (set) => ({
      members: [],
      addMembers: (members: Member[]) =>
        set((state: { members: Member[] }) => ({
          members: [...state.members, ...members],
        })),
    }),
    {
      name: "members",
    },
  ),
);
