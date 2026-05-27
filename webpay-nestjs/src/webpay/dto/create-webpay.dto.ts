import { IsNumber, Min } from 'class-validator';

export class CreateWebpayDto {
  @IsNumber()
  @Min(1)
  amount: number;
}
