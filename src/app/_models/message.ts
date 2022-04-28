export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhtoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl: string;
    content: string;
    dateRead: Date;
    messageSent: Date;
}