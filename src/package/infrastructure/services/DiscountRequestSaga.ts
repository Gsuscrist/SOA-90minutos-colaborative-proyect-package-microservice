import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";
import dotenv from "dotenv";

dotenv.config()

export class DiscountRequestSaga {
    private queueName: string = process.env.RABBIT_QUEUE_CHECK_USER_DISCOUNT_REQ || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_USER || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_CHECK_USER_DISCOUNT_REQ || 'default';

    async sendDiscountRequest(clientId: string): Promise<number> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);

            // Definir una promesa para esperar la respuesta del servidor RabbitMQ
            const responsePromise = new Promise<number>((resolve, reject) => {
                // Escuchar la respuesta del servidor RabbitMQ
                channel.consume(this.queueName, (msg) => {
                    if (msg) {
                        const response = JSON.parse(msg.content.toString());
                        const discount = response.discount; // Asumiendo que el descuento está en la respuesta JSON
                        resolve(discount);
                    } else {
                        reject(new Error('No message received from RabbitMQ'));
                    }
                }, { noAck: true });
            });

            // Publicar mensaje de solicitud de descuento
            channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify({ "clientId": clientId })));
            signale.info('Discount request sent for clientId:', clientId, 'to', this.routingKey);

            // Esperar la respuesta del servidor RabbitMQ
            const discount = await responsePromise;

            return discount;
        } catch (error) {
            signale.error('Error:', error);
            throw error; // Propagar el error para manejarlo en otro lugar si es necesario
        }
    }
}