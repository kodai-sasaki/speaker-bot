import { fetchRepliesFromSlackAPI } from "@/services/api/slack/replies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const url = params.get("url");
  if (url === null) {
    return NextResponse.error();
  }
  return fetchRepliesFromSlackAPI(url).then((data) => {
    data.map((message) => {
      return message;
    });
    return NextResponse.json(data);
  });
}
