'use client'

import { Flex, Stack } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useEventClient } from "../func/eventClient"


export function HandleFirebase({ config }: { config: string }) {
    const [onUpdate, setUpdate, onChange] = useEventClient({ config, projectId: "wa", listSubscribe: ["test"] as const })

    useShallowEffect(() => {
        onChange("test", () => {
            console.log("data")
        })
    }, [onUpdate])
    const onClick = () => {
        setUpdate("test")
    }
    return <Stack>
        <Flex>
            <button onClick={onClick}>Click</button>
        </Flex>
    </Stack>
}