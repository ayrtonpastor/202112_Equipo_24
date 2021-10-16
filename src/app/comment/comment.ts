import { AlbumDetail } from '../album/albumdetail';
import { CollectorDetail } from '../collector/collector-detail';

export class Comment {
  constructor(
    public description: string,
    public rating: number,
    public collector: CollectorDetail,
    public id?: number,
    public album?: AlbumDetail,
  ) {}
}
