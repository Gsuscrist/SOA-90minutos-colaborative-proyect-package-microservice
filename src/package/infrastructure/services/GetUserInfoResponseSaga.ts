import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";
import { NotificationResponse } from "../../application/dtos/response/NotificationResponse";
import { NotificationPackageDeliveredUseCase } from "../../application/useCase/NotificationPackageDeliveredUseCase";

export class GetUserInfoResponseSaga {
    private queueName: string = process.env.RABBIT_QUEUE_GET_USER_INFO_RES || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_USER || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_GET_USER_INFO_RES || 'default';
    private useCase: NotificationPackageDeliveredUseCase;

    constructor(useCase: NotificationPackageDeliveredUseCase){
        this.useCase = useCase;
    }
    
    async execute(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, (msg:any) => {
                if (msg) {
                    signale.info('User Info response received:', msg.content.toString());
                    const content: NotificationResponse = JSON.parse(msg.content.toString()) as NotificationResponse;
                    this.useCase.execute(content);
                    signale.info('Processed user Info response:', content);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
