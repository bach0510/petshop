import { Moment } from 'moment';
export class PayoffDto {
  Id: number;
  PayoffId: number;
  UserId: number;
  Type: number;
  Price: number;
  PayoffTime: Moment;
  PayoffName: string;
}
