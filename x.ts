import { eventServer } from "@/app/firebase/_lib/func/eventServer";

const a = eventServer({ projectId: "wa", listSubscribe: ["test"] as const });
a.onChange({ subscribe: "test", event: () => {} });
