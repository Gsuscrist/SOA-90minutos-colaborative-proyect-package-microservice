import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class GetAllPackageCommentRequestSaga {
    private queueName: string = process.env.RABBIT_QUEUE_GET_ALL_PACKAGE_COMMENT_REQ_ADMINISTRATION || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_ADMINISTRATION || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_GET_ALL_PACKAGE_COMMENT_REQ_ADMINISTRATION || 'default';

    async listenForGetAllPackageCommentRequests(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, (msg: any) => {  // added :any here
                if (msg) {
                    signale.info('GetAllPackageComment request received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                    // TODO: Procesar la solicitud
                    signale.info('Processed GetAllPackageComment request:', content);
                    // Simulando una respuesta para propósitos de ejemplo
                    const responseMessage = { message: 'Response to GetAllPackageComment request' };
                    const responseExchange = process.env.RABBIT_EXCHANGE_ADMINISTRATION || 'default';
                    const responseRoutingKey = process.env.RABBIT_ROUTING_KEY_GET_ALL_PACKAGE_COMMENT_RES_ADMINISTRATION || 'default';
                    channel.publish(responseExchange, responseRoutingKey, Buffer.from(JSON.stringify(responseMessage)));
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
