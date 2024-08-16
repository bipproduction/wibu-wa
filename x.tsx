import { eventServer } from 'wibu-event/server'

const event = eventServer({ projectId: "wa" })

event.onChange("qr", (val) => {
    console.log(val)
})

function setQr() {
    event.set("qr", "qr code")
}