import { fetchUsersFromSlackAPI } from "@/services/api/slack/users";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const users = params.get("users")?.split(",");
  if (!users) {
    return NextResponse.error();
  }
  return fetchUsersFromSlackAPI(users).then((users) => {
    return NextResponse.json(users);
  });
}
