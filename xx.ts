import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState as multiFileAuthState,
} from "@whiskeysockets/baileys";
import "colors";
import path from "path";
// import qr from "qrcode-terminal";
import prisma from "./src/lib/prisma";
import {eventServer} from 'wibu-event/server'

const authDir = path.join(process.cwd(), "auth");
const event = eventServer({ projectId: "wa" });

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
    }

    if (update.qr != undefined && update.qr != null) {
      console.log("QR UPDATE".yellow, update.qr);
      const qr = update.qr;
      event.set("qr", qr);
      //   await updateEvent("qr", qr);
    }

    if (update.connection) {
      console.log("con".cyan);
      const connection = update.connection;
      await updateEvent("connection", connection);
    }
    if (update.isNewLogin) {
      console.log("new".cyan);
    }
    if (update.isOnline) {
      console.log("online".cyan);
      const isOnline = update.isOnline;
      await updateEvent("isOnline", isOnline);
    }
    if (update.lastDisconnect) {
      console.log("dis".cyan);
      const lastDisconnect = update.lastDisconnect as any;
      await updateEvent("lastDisconnect", lastDisconnect);
    }
  });
}

startWa();

async function updateEvent(id: string, data: any) {
  await prisma.event.upsert({
    where: {
      id,
    },
    create: {
      id,
      data,
    },
    update: {
      data,
    },
  });
}
