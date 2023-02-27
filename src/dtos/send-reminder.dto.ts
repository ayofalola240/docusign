import { IsArray, IsString } from 'class-validator';

export class SendReminderDto {
  @IsString()
  readonly envelopeId: string;

  @IsArray()
  readonly recipientIds: string[];
}
