import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class GetAllPackageRatingRequestSaga {
    private queueName: string = process.env.RABBIT_QUEUE_GET_ALL_PACKAGE_RATING_REQ_ADMINISTRATION || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_ADMINISTRATION || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_GET_ALL_PACKAGE_RATING_REQ_ADMINISTRATION || 'default';

    async listenForGetAllPackageRatingRequests(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, (msg: any) => {
                if (msg) {
                    signale.info('GetAllPackageRating request received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                    // TODO: Procesar la solicitud para obtener todas las calificaciones de paquetes
                    signale.info('Processed GetAllPackageRating request:', content);
                    // Ejemplo de enviar una respuesta de confirmación
                    const responseMessage = { message: 'Response to GetAllPackageRating request' };
                    const responseExchange = process.env.RABBIT_EXCHANGE_ADMINISTRATION || 'default';
                    const responseRoutingKey = process.env.RABBIT_ROUTING_KEY_GET_ALL_PACKAGE_RATING_REQ_ADMINISTRATION || 'default';
                    channel.publish(responseExchange, responseRoutingKey, Buffer.from(JSON.stringify(responseMessage)));
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
