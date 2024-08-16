
import { SUBSCRIBE } from "./types/subscribe";
import { Button } from "@mantine/core";


type DATA = {
  list<T>(): string
  Provider: <T extends readonly string[]>({ children, subscribes }: { children: React.ReactNode, subscribes: T }) => JSX.Element
}

class Data {
  declare nama: string[];
  Provider<T extends readonly string[]>({ children, subscribes }: { children: React.ReactNode, subscribes: T }) {

    return <>{children}</>
  }

}


const DD = new Data()

function Ini() {
  return <DD.Provider subscribes={["qr"]}>
    <div />
    <Button></Button>
  </DD.Provider>
}