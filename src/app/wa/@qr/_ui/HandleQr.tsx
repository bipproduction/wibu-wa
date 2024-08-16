'use client'
import { Box, Button, Stack } from "@mantine/core"
import { useState } from "react"
import QRCode from "react-qr-code"
import { useEventClient } from "wibu-event/client"

export function HandleQr({ config }: { config: string }) {
    const [qrCode, setQrCode] = useState(null)
    const [val, setVal] = useEventClient()

    return <Stack>
        {JSON.stringify(val)}
        <Button onClick={() => {
            setVal({ id: "qr", val: "qr code" + Math.random() })
        }}>set</Button>
        {val?.val && <Box p={"sm"} bg={"white"}>
            <QRCode value={val?.val} />
        </Box>}
    </Stack>
}