import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MusicianModule } from './musician/musician.module';
import { HttpClientModule } from '@angular/common/http';
import { CollectorModule } from './collector/collector.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlbumModule } from './album/album.module';
import { ToastrModule } from 'ngx-toastr';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MusicianModule,
        HttpClientModule,
        CollectorModule,
        HttpClientTestingModule,
        AlbumModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'VynilTrade'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('VynilTrade');
  });
});
