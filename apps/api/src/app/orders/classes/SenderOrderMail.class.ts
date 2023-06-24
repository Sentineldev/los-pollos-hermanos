import { SenderOrder } from "./SenderOrder.class";
import {Injectable} from "@nestjs/common";

import { InternalServerErrorException } from "@nestjs/common";
import { createTransport, Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Order } from "./Order.class";

import { buildClientConfirmationTemplate,buildClientOrderTemplate } from "../templates/email-template";


@Injectable()
export class SenderOrderMail implements SenderOrder{


    private correo_predeterminado = "jesusfiguera20@gmail.com";
    private async makeTransport(){

        const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure: true,
            auth: {
                user:'secretfriend202212@gmail.com',
                pass:"ekshkcoyaswjaley"
            }
        })
        const verification: boolean = await transporter.verify();

        if(!verification){ throw new InternalServerErrorException('Error en la verificacion del correo master.') }

        return transporter
    }

    async enviar(orderData: Order){
        const transporter = await this.makeTransport();

        await transporter.sendMail({
            from:orderData.nombre,
            to:this.correo_predeterminado,
            subject:`Pedido de: ${orderData.nombre}`,
            html: buildClientOrderTemplate(orderData)
        })
        await transporter.sendMail({
            from:orderData.nombre,
            to:orderData.correo_electronico,
            subject:`Pedido de: ${orderData.nombre}`,
            html: buildClientConfirmationTemplate(orderData)
        })

    }
}
