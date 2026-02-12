import { getUserGroups } from "@/services/usergroups";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return getUserGroups().then((data) => {
    return NextResponse.json(data);
  });
}
