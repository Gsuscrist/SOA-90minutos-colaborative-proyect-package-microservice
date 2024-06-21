import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class PaymentPackageNotificationProducer {
    private queueName: string = process.env.RABBIT_QUEUE_PAYMENT_PACKAGE_RECEIVE_NOTIFICATION || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_PAYMENT || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_PAYMENT_PACKAGE_RECEIVE_NOTIFICATION || 'default';

    async sendPaymentPackageNotification(data: any): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            const message = JSON.stringify(data);
            channel.sendToQueue(this.queueName, Buffer.from(message));
            signale.info('Message sent to', this.queueName, ':', message);
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
