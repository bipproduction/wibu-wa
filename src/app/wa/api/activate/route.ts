import { eventServer } from "@/app/firebase/_lib/func/eventServer";
import { spawn } from "child_process";
import "colors";
import { NextRequest } from "next/server";
import path from "path";
const authDir = path.join(process.cwd(), "auth");
const serverEvent = eventServer({
  projectId: "wa",
  listSubscribe: ["test"] as const,
});

export async function GET(req: NextRequest) {
  const act = req.nextUrl.searchParams.get("act");
  if (!act) {
    return new Response("Missing act", { status: 400 });
  }

  const child = spawn("/bin/bash", ["-c", "npx tsx xx.ts"], );
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  return new Response("OK", { status: 200 });
}
