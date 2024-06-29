export class NotificationResponse {
  constructor(
    readonly packageID: string, 
    readonly email: string, 
    readonly nombre: string, 
    readonly status: string) {}
}