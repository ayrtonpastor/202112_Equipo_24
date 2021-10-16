import { Performer } from "../performer/performer";
import { Album } from "../album/album";
import { PerformerPrize } from "../performer/performer-prize";

export class Musician extends Performer{

 constructor(
   public id: number,
   name: string,
   image: string,
   description: string,
   albums: Album[],
   performerPrizes: PerformerPrize[],
   public birthDate: Date
 ) {
   super(id, name, image, description, albums, performerPrizes);
 }
}
