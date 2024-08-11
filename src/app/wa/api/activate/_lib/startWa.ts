import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState as multiFileAuthState,
  WASocket,
} from "@whiskeysockets/baileys";
import "colors";
import path from "path";

const authDir = path.join(process.cwd(), "auth");

export async function startWa() {
  const { state, saveCreds } = await multiFileAuthState(authDir);
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    keepAliveIntervalMs: 5000,
  });
}
