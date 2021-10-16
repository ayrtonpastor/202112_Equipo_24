import { PerformerPrize } from "./performer-prize";
import { Album } from "../album/album";

export class Performer{
  constructor(public id: number,
              public name: string,
              public image: string,
              public description: string,
              public albums: Album[],
              public performerPrizes: PerformerPrize[]){
  }
}
