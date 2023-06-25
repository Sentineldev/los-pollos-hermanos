
import { Order } from "../Order.class"
import { SenderOrderMail } from "./SenderOrderMail.class"




describe("Test the sender order mail",() => {

    it("Should return nothing",async () => {
        
        const sender = new SenderOrderMail();
        const client_name = "Jesus Figuera"
        const client_id = "29.660.012"
        const client_email = "jesusfiguera20@gmail.com"
        const client_address = "La Asuncion"
        const mock_order = new Order(client_name,client_id,client_email,client_address);


        expect(await sender.sendOrder(mock_order)).toBe(void 0);

    })
})