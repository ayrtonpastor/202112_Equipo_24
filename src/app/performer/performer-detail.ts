import { Performer } from "./performer";
import { PerformerPrize } from "./performer-prize";
import { Album } from "../album/album";

export class PerformerDetail extends Performer{

 constructor(
   public id: number,
   name: string,
   image: string,
   description: string,
   albums: Album[],
   performerPrizes: PerformerPrize[]
 ) {
   super(id, name, image, description, albums, performerPrizes);
 }
}
