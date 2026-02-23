"use client";

import { useUserGroupsStore } from "@/store/useUserGroupsStore";
import { useState } from "react";

export const UserGroupList = () => {
  const [isLoadingUserGroup, setIsLoadingUserGroup] = useState<boolean>(false);
  const { userGroups, addUserGroups } = useUserGroupsStore();

  return (
    <ul>
      <li className="mb-4">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => {
            console.log(userGroups);
            if (isLoadingUserGroup) {
              return;
            }
            setIsLoadingUserGroup(true);
            fetch("/api/slack/usergroups")
              .then((data) => {
                return data.json();
              })
              .then((data) => {
                addUserGroups(data);
              })
              .finally(() => {
                setIsLoadingUserGroup(false);
              });
          }}
        >
          {isLoadingUserGroup ? (
            <span className="loading loading-sm" />
          ) : (
            "sync"
          )}
        </button>
      </li>
      {userGroups.length === 0 ? (
        <>no data</>
      ) : (
        <>{userGroups.length} user groups</>
      )}
    </ul>
  );
};
