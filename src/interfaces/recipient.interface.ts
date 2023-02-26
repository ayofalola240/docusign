export interface RecipientsInfo {
  email: string;
  name: string;
  recipientId: string;
  routingOrder: string;
  signHereTabs: {
    documentId: string;
    pageNumber: string;
    xPosition: string;
    yPosition: string;
  }[];
}
