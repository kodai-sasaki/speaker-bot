import type { FC } from "react";
import type { Speaker } from "@/domain/speaker/types";

import { SampleVoiceNav } from "./sample-voice";
import { UserGroupList } from "./usergroup";
import { MemberList } from "./member";

type Props = {
  speakers?: Speaker[];
};

export const Nav: FC<Props> = () => {
  return (
    <nav className="border-base-200 border-r-2 h-screen min-w-60 rounded-box overflow-y-scroll pr-2">
      <ul className="menu">
        <li className="menu-title">MENU</li>
        <li>
          <SampleVoiceNav />
        </li>
        <li>
          <details>
            <summary>MEMBERS</summary>
            <MemberList />
          </details>
        </li>
        <li>
          <details>
            <summary>USER GROUPS</summary>
            <UserGroupList />
          </details>
        </li>
      </ul>
    </nav>
  );
};
