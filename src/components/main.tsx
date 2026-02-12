import type { Member, UserGroup } from "@/domain/slack/types";
import { Replies } from "./replies";

export const Main = () => {
  return (
    <main className="grow p-4">
      <h1 className="mb-4">Main</h1>
      <Replies />
    </main>
  );
};
