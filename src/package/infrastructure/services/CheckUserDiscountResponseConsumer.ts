import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class CheckUserDiscountResponseConsumer {
    private queueNameRes: string = process.env.RABBIT_QUEUE_CHECK_USER_DISCOUNT_RES || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_USER_DISCOUNT || 'default';
    private routingKeyRes: string = process.env.RABBIT_ROUTING_KEY_CHECK_USER_DISCOUNT_RES || 'default';

    async listenForCheckUserDiscountResponses(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueNameRes, this.exchangeName, this.routingKeyRes);
            channel.consume(this.queueNameRes, (msg:any) => {
                if (msg) {
                    signale.info('CheckUserDiscount response received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                    // TODO: Procesar la respuesta de descuento de usuario
                    signale.info('Processed CheckUserDiscount response:', content);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
