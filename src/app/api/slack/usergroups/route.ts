import { fetchUserGroupsFromSlackAPI } from "@/services/api/slack/usergroups";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return fetchUserGroupsFromSlackAPI().then((data) => {
    return NextResponse.json(data);
  });
}
