'use client'


import { Flex, Stack } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { SUBSCRIBE } from "../../../../../types/subscribe"

export function HandleFirebase({ config }: { config: string }) {

    useShallowEffect(() => {
       
    }, [])
    const onClick = () => {

    }
    return <Stack>
        <Flex>
            <button onClick={onClick}>Click</button>
        </Flex>
    </Stack>
}