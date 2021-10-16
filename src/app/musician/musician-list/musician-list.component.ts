import { Component, OnInit } from '@angular/core';
import { MusicianService } from '../musician.service';
import { Musician } from '../musician';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-musician-list',
  templateUrl: './musician-list.component.html',
  styleUrls: ['./musician-list.component.css']
})
export class MusicianListComponent implements OnInit {

  musicians: Musician[] = [];
  filteredMusicians: Musician[] = [];

  selectedMusician: Musician;
  selected = false;

  constructor(private musicianService: MusicianService) {
  }

  getMusicians(): void {
    this.musicianService.getMusicians()
      .subscribe(musicians => {
        this.musicians = musicians;
        this.filteredMusicians = musicians;
      });
  }

  ngOnInit() {
    this.getMusicians();
  }

  filterMusicians(text: string){
    text = text == null ? "" : text.trim().toLowerCase();
    if(text == ""){
      this.filteredMusicians = this.musicians;
    }else{
      this.filteredMusicians = this.musicians.filter(m => m.name.toLowerCase().match(text));
    }
  }

  onSelectedMusician(m: Musician): void {
    this.musicianService.getMusicianDetail(m.id)
      .subscribe(musician => {
        if(musician !== null){
          this.selectedMusician = musician;
          this.selected = true;
        }
      });
  }

  unselectMusician(selected: boolean){
    this.selected = selected;
  }
}
