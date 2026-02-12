import type { UserGroup } from "@/domain/slack/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserGroupsStore = {
  userGroups: UserGroup[];
  addUserGroups: (userGroups: UserGroup[]) => void;
};

export const useUserGroupsStore = create(
  persist<UserGroupsStore>(
    (set) => ({
      userGroups: [],
      addUserGroups: (userGroups: UserGroup[]) =>
        set((state: { userGroups: UserGroup[] }) => ({
          userGroups: [...state.userGroups, ...userGroups],
        })),
    }),
    {
      name: "userGroups",
    },
  ),
);
