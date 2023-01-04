import { Component, OnInit } from '@angular/core';
import { FplService } from './fpl.service';

@Component({
  selector: 'app-fpl',
  templateUrl: './fpl.component.html',
  styleUrls: ['./fpl.component.scss']
})
export class FplComponent implements OnInit {

  constructor(private _fplService: FplService) { }

  bootstrap: any;
  league: any;
  p: number = 1;

  async ngOnInit() {

    (await this._fplService.getFplLeague())
    .subscribe(response => {
      this.league = response;
      console.log("LEAGUE", response);
    });

    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      console.log("BOOTSTRAP", response);
    });
  }

  async updateLeague() {
    (await this._fplService.updateFplLeague(this.league.league.id))
    .subscribe(response => {
      this.league = response;
      console.log("UPDATELEAGUE", response);
    });
  }
}
