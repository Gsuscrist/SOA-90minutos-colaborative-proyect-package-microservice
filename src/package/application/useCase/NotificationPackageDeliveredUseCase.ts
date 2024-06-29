import { PaymentPackageNotificationSaga } from '../../infrastructure/services/PaymentPackageNotificationSaga';
import { NotificationResponse } from '../dtos/response/NotificationResponse';

export class NotificationPackageDeliveredUseCase {
  constructor(readonly queue: PaymentPackageNotificationSaga) {}

  async execute(NotificationResponse : NotificationResponse) {
    if (!NotificationResponse) {
      throw new Error('NotificationResponse not found');
    }
    await this.queue.sendPaymentPackageNotification(NotificationResponse);
    }
}