import { Band } from "./band";
import { Musician } from "../musician/musician";
import { PerformerPrize } from "../performer/performer-prize";
import { Album } from "../album/album";

export class BandDetail extends Band{

 constructor(
   public id: number,
   name: string,
   image: string,
   description: string,
   albums: Album[],
   performerPrizes: PerformerPrize[],
   creationDate: Date,
   public musicians: Musician[]
 ) {
   super(id, name, image, description, albums, performerPrizes, creationDate);
 }
}
