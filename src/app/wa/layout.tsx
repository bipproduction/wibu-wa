import { Stack } from "@mantine/core";
import { ENV } from "../../../types/env";
import {EventProvider} from "wibu-event/client"
const { EVENT_SERVICE_ACCOUNT_CLIENT }: Record<ENV, string> = process.env as any

export default function Layout({ children, qr }: { children: React.ReactNode, qr: React.ReactNode }) {
    return <Stack>
        <EventProvider config={EVENT_SERVICE_ACCOUNT_CLIENT} projectId="wa" listSubscribe={["qr", "test", "test2"]}>
            {qr}
            {children}
        </EventProvider>
    </Stack>
}