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
        <style>
            *{
                margin:0;
                padding:0;
            }
            html{
                font-family: sans-serif;
            }
            body{
                margin: 0.5rem;

            }
            .card{
                width: 400px;
                box-shadow: 0px 0px 2px rgba(0,0,0,0.5);
                border-radius: 1rem;
                background-color: #ffd701;
            }
            .card-logo{
                display: flex;
                justify-content: center;
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
                background-color: #ffd701;
            }
            .card-head{
                background-color: #ffd701;
                padding: 0.5rem 1rem;
            }
            .card-title{
                font-size: 1.4rem;
            }
            .card-body{
                display: flex;
                flex-direction: column;
            }
            .card-body-section{
                padding: 0.5rem 1rem;
        
            }
            .tag-container{
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .tag-title{
                font-size: 1rem;
            }
            .tag-text{
                font-size: 0.8rem;
            }   
            
        
        </style>
        <body>
            
            <div class="card">
                <div class="card-logo">
                    <img src="https://i.pinimg.com/originals/66/be/9c/66be9cd6d577011b040bab27112bfb59.jpg" width="100" height="100">
                </div>
                <div class="card-head">
                    <h1 class="card-title">Muchas Gracias por realizar el pedido, para confirmarlo porfavor responder a este correo</h1>
                </div>
                <div class="card-body">
                    <div class="card-body-section">
                        <div class="tag-container">
                            <h2 class="tag-title">Nombre:</h2>
                            <p class="tag-text">${orderData.nombre}</p>
                        </div>
                    </div>
                    <div class="card-body-section">
                        <div class="tag-container">
                            <h2 class="tag-title">Cedula:</h2>
                            <p class="tag-text">${orderData.cedula}</p>
                        </div>
                    </div>
                    <div class="card-body-section">
                        <div class="tag-container">
                            <h2 class="tag-title">Direccion:</h2>
                            <p class="tag-text">${orderData.direccion}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="card-body-section">
                        <h2 class="tag-title">Descripcion del Pedido</h2>
                        <p class="tag-text">${orderData.pedido}</p>
                    </div>
                </div>
                <div class="card-foot"></div>
            </div>
        
        </body>
        `
    }

    async enviar(orderData: Order){
        const transporter = await this.makeTransport();

        await transporter.sendMail({
            from:orderData.nombre,
            to:'jesusfiguera20@gmail.com',
            subject:`Pedido de: ${orderData.nombre}`,
            html: this.makeTemplate(orderData)
        })
    }
}