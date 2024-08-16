import yargs from "yargs";
const env: any = process.env;
import _ from "lodash";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({path: ".env"});

yargs()
  .command("env", "generate env key", (yargs) => yargs, fEnv)
  .recommendCommands()
  .demandCommand(1)
  .parse(process.argv.splice(2));

function fEnv() {
  const ky = _.keys(env).map((k) => `"${k}"`);
  fs.writeFileSync("types/env.ts", `export type ENV = ${ky.join("|")};`, "utf8");
  console.log("success!");
}
