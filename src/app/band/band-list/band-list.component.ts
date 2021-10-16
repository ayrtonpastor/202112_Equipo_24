import { Component, OnInit } from '@angular/core';
import { BandService } from '../band.service';
import { BandDetail } from '../band-detail';

@Component({
  selector: 'app-musician-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent implements OnInit {

  bands: BandDetail[] = [];
  filteredBands: BandDetail[] = [];

  selectedBand: BandDetail;
  selected = false;

  constructor(private bandService: BandService) {
  }

  getBands(): void {
    this.bandService.getBands()
      .subscribe(musicians => {
        this.bands = musicians;
        this.filteredBands = musicians;
      });
  }

  ngOnInit() {
    this.getBands();
  }

  filterBands(text: string){
    text = text == null ? "" : text.trim().toLowerCase();
    if(text == ""){
      this.filteredBands = this.bands;
    }else{
      this.filteredBands = this.bands.filter(m => m.name.toLowerCase().match(text));
    }
  }

  onSelectedBand(m: BandDetail): void {
    this.bandService.getBandDetail(m.id)
      .subscribe(band => {
        if(band !== null){
          this.selectedBand = band;
          this.selected = true;
        }
      });
  }

  unselectBand(selected: boolean){
    this.selected = selected;
  }
}
