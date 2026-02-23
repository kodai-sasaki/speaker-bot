import type { Speaker } from "@/domain/speaker/types";
import type { FC } from "react";

import { MemberList } from "./member";
import { SampleVoiceNav } from "./sample-voice";
import { ThemeSwitcher } from "./theme-switcher";
import { UserGroupList } from "./usergroup";

type Props = {
  speakers?: Speaker[];
};

export const Nav: FC<Props> = () => {
  return (
    <nav className="border-base-200 border-r-2 h-screen min-w-60 overflow-y-scroll pr-2">
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
        <li>
          <details>
            <summary>COLOR THEME</summary>
            <ThemeSwitcher />
          </details>
        </li>
      </ul>
    </nav>
  );
};
