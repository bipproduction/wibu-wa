import { spawn } from "child_process";
import "colors";
import { NextRequest } from "next/server";
import path from "path";
const authDir = path.join(process.cwd(), "auth");

export async function GET(req: NextRequest) {
  const act = req.nextUrl.searchParams.get("act");
  if (!act) {
    return new Response("Missing act", { status: 400 });
  }

  console.log("coba act", act);
  const child = spawn("/bin/bash", ["-c", "npx tsx xx.ts"]);
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  return new Response("OK", { status: 200 });
}
