import { Component, OnInit } from '@angular/core';
import { FplService } from './fpl.service';
import { LeagueStandings, Result } from 'app/interfaces/standings';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bootstrap, Event, EventList, Teams } from 'app/interfaces/bootstrap';
import { Fixtures, FixturesList } from 'app/interfaces/fixtures';

@Component({
  selector: 'app-fpl',
  templateUrl: './fpl.component.html',
  styleUrls: ['./fpl.component.scss']
})
export class FplComponent implements OnInit {

  leagueForm!: FormGroup;
  standingsErrors: any;
  corsAnywhereURL: string = "https://cors-anywhere.herokuapp.com";
  league!: LeagueStandings;
  standings!: Result[];
  p: number = 1;

  bootstrap!: Bootstrap;
  events!: Event | any;
  teams!: Teams | any;
  gameweek!: EventList;
  gameweekID!: number;

  toogleDGWs: string = "Show";
  fixtureDGW!: number;
  fixtures!: FixturesList;
  hasMultiple: any;
  fixturesUniqueGWFilter!: any;
  fixturesUniqueGWFilterIDs!: Set<number>;
  fixturesDGWFilter!: any;

  constructor(private _fplService: FplService,
    formBuilder: FormBuilder) {
      this.leagueForm = formBuilder.group({
        leagueID: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      });
  }

  async ngOnInit() {

    (await this._fplService.getFplLeague())
    .subscribe(response => {
      this.league = response;
      this.standings = this.league.standings.results;
    }, error => {
      this.standingsErrors = error;
    },);


    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      this.events = this.bootstrap.events;
      this.teams = this.bootstrap.teams;
      console.log("TEAMS", this.teams);

      this.gameweek = this.events.filter((a: { [x: string]: boolean; }) => a['is_current'] === true);
      this.gameweekID = this.gameweek[0].id;
      sessionStorage.setItem('GameWeekID', JSON.stringify(this.gameweekID));
    });

  }

  async updateLeague() {

    (await this._fplService.updateFplLeague(this.league.league.id))
    .subscribe(response => {
      this.league = response;
      this.standings = this.league?.standings?.results;
    });

  }

  async toggleDoubleGws() {

    this.fixtureDGW = this.gameweekID + 1;
    this.toogleDGWs = this.toogleDGWs === "Show" ? "Hide" : "Show";

    (await this._fplService.getFixtures(this.fixtureDGW))
    .subscribe((response) => {
      this.fixtures = response;
      console.log("FIXTURES", this.fixtures);

      this.fixturesUniqueGWFilter = this.fixtures.filter((set => f =>
        (!set.has(f.team_a) && !set.has(f.team_h)) && set.add(f.team_a || f.team_h))
        (new Set));
      console.log("FIXTURESUNIQUEGWFILTER", this.fixturesUniqueGWFilter);

      this.fixturesUniqueGWFilterIDs = new Set(this.fixturesUniqueGWFilter.map((FUIDs: { id: number; }) => FUIDs.id));
      console.log("FIXTURESUNIQUEGWFILTERIDS", this.fixturesUniqueGWFilterIDs);

      this.fixturesDGWFilter = this.fixtures.filter((FDIDs: { id: number; }) => !this.fixturesUniqueGWFilterIDs.has(FDIDs.id));
      console.log("FIXTURESDUPLICATEGWFILTER", this.fixturesDGWFilter);
    });

  }

}

