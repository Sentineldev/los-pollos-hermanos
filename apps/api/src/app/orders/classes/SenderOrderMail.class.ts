import { SenderOrder } from "./SenderOrder.class";
import {Injectable} from "@nestjs/common";

import { InternalServerErrorException } from "@nestjs/common";
import { createTransport, Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Order } from "./Order.class";


@Injectable()
export class SenderOrderMail extends SenderOrder{



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
    private makeTemplate(orderData: Order): string{
        return `
        <div style=" border-radius:0.45rem;  background-color: #F2E205; font-family: sans-serif;" class="mail-body">
            <h1 style="padding:1rem; color:#021F59; font-family:sans-serif; border-bottom:3px solid #aaaa;">Nuevo Pedido</h1>
            <div style="padding:0 1rem;">
                <p style="font-size:1rem; font-weight:500;">Cliente: ${orderData.nombre}</p>
                <p style="font-size:1rem; font-weight:500;">Cedula: ${orderData.cedula}</p>
                <p style="font-size:1rem; font-weight:500;">Correo Electronico: ${orderData.correo_electronico}</p>
                <p style="font-size:1rem; font-weight:500;">Pedido: ${orderData.pedido}</p>
                <p style="font-size:1rem; font-weight:500;">Direccion: ${orderData.direccion}</p>
            </div>
            <div style="background-color:#05C7F2; margin:0; border-bottom-left-radius: 0.4rem; border-bottom-right-radius: 0.4rem;">
                <h3 style="text-align:center; font-size:1rem; padding:1rem;">Los Pollos Hermanos</h3>
            </div>
        </div>
        `
    }
    private makeTemplateCliente(orderData: Order): string{
        return `
        <div style=" border-radius:0.45rem;  background-color: #F2E205; font-family: sans-serif;" class="mail-body">
            <h1 style="padding:1rem; color:#021F59; font-family:sans-serif; border-bottom:3px solid #aaaa;">Hemos Recibido tu pedido, nos pondremos en contacto contigo pronto!</h1>
            <div style="padding:0 1rem;">
                <p style="font-size:1rem; font-weight:500;">Hola! revisa lso siguientes datos para que todo este en orden :)</p>
                <p style="font-size:1rem; font-weight:500;">Tu Nombre: ${orderData.nombre}</p>
                <p style="font-size:1rem; font-weight:500;">La Cedula: ${orderData.cedula}</p>
                <p style="font-size:1rem; font-weight:500;">El Pedido: ${orderData.pedido}</p>
                <p style="font-size:1rem; font-weight:500;">La Direccion: ${orderData.direccion}</p>
            </div>
            <div style="background-color:#05C7F2; margin:0; border-bottom-left-radius: 0.4rem; border-bottom-right-radius: 0.4rem;">
                <h3 style="text-align:center; font-size:1rem; padding:1rem;">Los Pollos Hermanos</h3>
            </div>
        </div>
        `
    }

    async enviar(orderData: Order){
        const transporter = await this.makeTransport();
        var correo = `${orderData.correo_electronico}`;

        await transporter.sendMail({
            from:orderData.nombre,
            to:'ulisesjhm1510@gmail.com',
            subject:`Pedido de: ${orderData.nombre}`,
            html: this.makeTemplate(orderData)
        })
        await transporter.sendMail({
            from:orderData.nombre,
            to:orderData.correo_electronico,    
            subject:`Pedido de: ${orderData.nombre}`,
            html: this.makeTemplateCliente(orderData)
        })

    }
}