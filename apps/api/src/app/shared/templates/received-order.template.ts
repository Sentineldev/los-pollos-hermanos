import { Order } from "../classes/Order.class";

export function receivedOrderTemplate(order: Order): string{


    const order_dishes = order.getDishes().map(dish => {
        
        const aux = dish.getDish();
        return `${aux.name}: ${aux.price}$ - x${dish.getCount()}\n`;
    })

    return `
    <div style=" border-radius:0.45rem;  background-color: #F2E205; font-family: sans-serif;" class="mail-body">
        <h1 style="padding:1rem; color:#021F59; font-family:sans-serif; border-bottom:3px solid #aaaa;">Nuevo Pedido</h1>
        <div style="padding:0 1rem;">
            <p style="font-size:1rem; font-weight:500;">Cliente: ${order.getName()}</p>
            <p style="font-size:1rem; font-weight:500;">Cedula: ${order.getClientId()}</p>
            <p style="font-size:1rem; font-weight:500;">Correo Electronico: ${order.getEmail()}</p>
            <p style="font-size:1rem; font-weight:500;">Direccion: ${order.getAddress()}</p>
            <p style="font-size:1rem; font-weight:500;">Total a cancelar: ${order.getBill()}$</p>
            <p style="font-size:1rem; font-weight:500;">Pedido</p>
            <pre style="font-size:1rem; font-weight:700;">${order_dishes.join("")}</pre>
        </div>
        <div style="background-color:#05C7F2; margin:0; border-bottom-left-radius: 0.4rem; border-bottom-right-radius: 0.4rem;">
            <h3 style="text-align:center; font-size:1rem; padding:1rem;">Los Pollos Hermanos</h3>
        </div>
    </div>
    `
}


export function  orderConfirmationTemplate(order: Order): string{


    const order_dishes = order.getDishes().map(dish => {
        
        const aux = dish.getDish();
        return `${aux.name}: ${aux.price}$ - x${dish.getCount()}\n`;
    })
    return `
    <div style=" border-radius:0.45rem;  background-color: #F2E205; font-family: sans-serif;" class="mail-body">
        <h1 style="padding:1rem; color:#021F59; font-family:sans-serif; border-bottom:3px solid #aaaa;">Hemos Recibido tu pedido, nos pondremos en contacto contigo pronto!</h1>
        <div style="padding:0 1rem;">
            <p style="font-size:1rem; font-weight:500;">Hola! revisa los siguientes datos para que todo este en orden :)</p>
            <p style="font-size:1rem; font-weight:500;">Tu Nombre: ${order.getName()}</p>
            <p style="font-size:1rem; font-weight:500;">La Cedula: ${order.getClientId()}</p>
            <p style="font-size:1rem; font-weight:500;">Direccion: ${order.getAddress()}</p>
            <p style="font-size:1rem; font-weight:500;">Total a cancelar: ${order.getBill()}$</p>
            <p style="font-size:1rem; font-weight:500;">Pedido</p>
            <pre style="font-size:1rem; font-weight:700;">${order_dishes.join("")}</pre>
        </div>
        <div style="background-color:#05C7F2; margin:0; border-bottom-left-radius: 0.4rem; border-bottom-right-radius: 0.4rem;">
            <h3 style="text-align:center; font-size:1rem; padding:1rem;">Los Pollos Hermanos</h3>
        </div>
    </div>
    `
}