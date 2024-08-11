import { Boom } from "@hapi/boom";
import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState as multiFileAuthState
} from "@whiskeysockets/baileys";
import "colors";
import path from "path";
import qr from 'qrcode-terminal';

const authDir = path.join(process.cwd(), "auth");

export async function startWa() {
  const { state, saveCreds } = await multiFileAuthState(authDir);
  const sock = makeWASocket({
    auth: state,
    keepAliveIntervalMs: 5000,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update as any;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        return await startWa();
      }
    } else if (connection === "open") {
      console.log("opened connection".green);
      // wa = sock as any
    }

    if (update.qr != undefined && update.qr != null) {
      console.log("QR UPDATE".yellow, update.qr);
      qr.generate(update.qr, { small: true });
      // io.emit('qr', update.qr)
    }

    if (update.connection) {
      // io.emit("con", update.connection)
      console.log("con".cyan);
    }
    if (update.isNewLogin) {
      // io.emit("new", update.isNewLogin)
      console.log("new".cyan);
    }
    if (update.isOnline) {
      // io.emit("online", update.isOnline)
      console.log("online".cyan);
    }
    if (update.lastDisconnect) {
      // io.emit("dis", update.lastDisconnect)
      console.log("dis".cyan);
    }
  });
}

startWa();
