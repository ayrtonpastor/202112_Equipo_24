import { Album } from "../album/album";
import { Collector } from "../collector/collector";
import { ALBUM_STATUS } from "../albumstatus/albumstatus.enum";
import { CollectorDetail } from "../collector/collector-detail";

export class CollectorAlbum {
  constructor(
    public id: number,
    public price: number,
    public status: ALBUM_STATUS,
    public album: Album,
    public collector: CollectorDetail
  )
  {
  }
}
