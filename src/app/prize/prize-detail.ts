import { Prize } from "./prize";


export class PrizeDetail extends Prize {

  constructor(
    public id: number,
    organization: string,
    name: string,
    description: string,
  ) {
    super(id, organization, name, description);
  }
 }
