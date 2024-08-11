import { Stack } from "@mantine/core";
import { HandleFirebase } from "./_lib/ui/HandleFirebase";

const config = process.env.EVENT_SERVICE_ACCOUNT_CLIENT!

export default function Page() {
    
    return <Stack>
        <HandleFirebase config={config} />
    </Stack>
}