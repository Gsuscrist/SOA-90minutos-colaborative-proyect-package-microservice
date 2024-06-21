import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class CheckUserDiscountRequestProducer {
    private queueNameReq: string = process.env.RABBIT_QUEUE_CHECK_USER_DISCOUNT_REQ || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_USER_DISCOUNT || 'default';
    private routingKeyReq: string = process.env.RABBIT_ROUTING_KEY_CHECK_USER_DISCOUNT_REQ || 'default';

    async sendCheckUserDiscountRequest(data: any): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueNameReq, this.exchangeName, this.routingKeyReq);
            const message = JSON.stringify(data);
            channel.sendToQueue(this.queueNameReq, Buffer.from(message));
            signale.info('CheckUserDiscount request sent to', this.queueNameReq, ':', message);
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
