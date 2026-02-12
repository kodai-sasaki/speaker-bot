import { getUsers } from "@/services/users";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const users = params.get("users")?.split(",");
  if (!users) {
    return NextResponse.error();
  }
  return getUsers(users).then((users) => {
    return NextResponse.json(users);
  });
}
