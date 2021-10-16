import { PrizeDetail } from "../prize/prize-detail";

export class PerformerPrize{

  constructor(
    public id: number,
    public prize: PrizeDetail,
    public premiationDate: Date) {
  }
 }
