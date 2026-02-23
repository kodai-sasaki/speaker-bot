"use client";

import { useMembersStore } from "@/store/useMembersStore";

export const MemberList = () => {
  const { members } = useMembersStore();

  return (
    <ul>
      {!members ? (
        <li>no members</li>
      ) : (
        members.map((member) => {
          return <li key={member.id}>{member.name}</li>;
        })
      )}
    </ul>
  );
};
