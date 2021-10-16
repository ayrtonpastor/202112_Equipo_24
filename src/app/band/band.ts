import { Performer } from "../performer/performer";
import { Album } from "../album/album";
import { PerformerPrize } from "../performer/performer-prize";

export class Band extends Performer{

 constructor(
   public id: number,
   name: string,
   image: string,
   description: string,
   albums: Album[],
   performerPrizes: PerformerPrize[],
   public creationDate: Date
 ) {
   super(id, name, image, description, albums, performerPrizes);
 }
}
