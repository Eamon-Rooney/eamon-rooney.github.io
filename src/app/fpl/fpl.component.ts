import { Component, OnInit } from '@angular/core';
import { FplService } from './fpl.service';
import { standingsResults } from 'app/interfaces/standings-results';

@Component({
  selector: 'app-fpl',
  templateUrl: './fpl.component.html',
  styleUrls: ['./fpl.component.scss']
})
export class FplComponent implements OnInit {

  constructor(private _fplService: FplService) { }

  league: any;
  standings: standingsResults[] | any;
  p: number = 1;

  async ngOnInit() {

    (await this._fplService.getFplLeague())
    .subscribe(response => {
      this.league = response;
      console.log("LEAGUE", this.league);
      this.standings = this.league.standings.results;
      console.log("STANDINGS", this.standings);
    });

  }

  async updateLeague() {

    (await this._fplService.updateFplLeague(this.league.league.id))
    .subscribe(response => {
      this.league = response;
      console.log("UPDATELEAGUE", this.league);
      this.standings = this.league.standings.results;
      console.log("UPDATESTANDINGS", this.standings);
    });

  }
}

