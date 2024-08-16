
import { Box, Flex, Title } from "@mantine/core";
import { ENV } from "../../../../types/env";
import { HandleQr } from "./_ui/HandleQr";

const { EVENT_SERVICE_ACCOUNT_CLIENT }: Record<ENV, string> = process.env as any

export default async function Page() {

    return <Box>
        <Title order={3}> QR</Title>
        <Flex>
            handle
            <HandleQr config={EVENT_SERVICE_ACCOUNT_CLIENT} />
        </Flex>
    </Box>

}