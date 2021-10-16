import { GENRE } from "../genre/genre.enum";
import { RECORD_LABEL } from "../recordlabel/recordlabel.enum";

export class Album {
  constructor(
    public id: number,
    public name: string,
    public cover: string,
    public releaseDate: Date,
    public description: string,
    public genre: GENRE,
    public recordLabel: RECORD_LABEL
  ) {}
}
