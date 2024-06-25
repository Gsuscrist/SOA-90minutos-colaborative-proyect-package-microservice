import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";
import dotenv from "dotenv";

dotenv.config()

export class DiscountRequestSaga {
    private queueName: string = process.env.RABBIT_QUEUE_CHECK_USER_DISCOUNT_REQ || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_USER||'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_CHECK_USER_DISCOUNT_REQ || 'default';


    async sendDiscountRequest(clientId: string): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify({ "clientId": clientId })));
            signale.info('Discount request sent for clientId:', clientId, 'to', this.routingKey);
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
