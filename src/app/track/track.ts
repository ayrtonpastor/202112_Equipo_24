import { AlbumDetail } from '../album/albumdetail';

export class Track {
  constructor(
    public id: number,
    public name: string,
    public duration: string,
    public album: AlbumDetail
  ) {}
}
