import { Performer } from '../performer/performer';
import { Collector } from './collector';
import { CollectorAlbum } from '../collectoralbum/collectoralbum';

export class CollectorDetail extends Collector {
  constructor(
    id: number,
    name: string,
    telephone: string,
    email: string,
    public favoritePerformers?: Performer[],
    public comments?: Comment[],
    public collectorAlbums?: CollectorAlbum[]
  ) {
    super(id, name, telephone, email);
  }
}
