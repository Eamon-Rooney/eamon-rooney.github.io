import { Component, OnInit } from '@angular/core';
import { FplService } from './fpl.service';
import { LeagueStandings, Result } from 'app/interfaces/standings';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bootstrap, Event, EventList, Teams } from 'app/interfaces/bootstrap';
import { FixturesList } from 'app/interfaces/fixtures';
import { TeamComponent } from 'app/team/team.component';
import { addLeagueTeams } from 'app/State/compareActions';
import { Store } from '@ngrx/store';
import { CompareState } from 'app/State/compareReducer';
import { Router } from '@angular/router';

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
  fixturesDGWTeamsFilter!: any;
  fituresDGWMatchesFilter!: any;
  doubleGameweekEventID!: Event | any;
  doubleGWTeams!: number[];
  allTeams!: number[];
  doubleGWTeam!: number;
  doubleGameWeekMap!: any;

  constructor(private _fplService: FplService,
    private router: Router,
    private store: Store<{ compareState: CompareState }>,
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
      this.store.dispatch(addLeagueTeams(this.standings));
    }, error => {
      this.standingsErrors = error;
    },);


    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      this.events = this.bootstrap.events;
      this.teams = this.bootstrap.teams;

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
    this.doubleGameweekEventID = this.events.filter((a: { id: number; }) => a.id > this.gameweekID);

    this.updateDoubleGameweek();

  }

  async updateDoubleGameweek() {

    this.allTeams = [];
    this.doubleGWTeams = [];

    (await this._fplService.getFixtures(this.fixtureDGW))
    .subscribe((response) => {
      this.fixtures = response;

      this.fixturesDGWTeamsFilter = this.fixtures.forEach((teamsFixture) => {
        this.allTeams.push(teamsFixture.team_a, teamsFixture.team_h);
        this.doubleGWTeams = this.allTeams.filter((e: any, i: any, a: string | any[]) => a.indexOf(e) !== i);
      });

      this.fituresDGWMatchesFilter = this.fixtures.filter(fixture =>
          this.doubleGWTeams.includes(fixture.team_h) ||
          this.doubleGWTeams.includes(fixture.team_a));

      this.doubleGameWeekMap = this.doubleGWTeams.map((teamID: any) => {
        const vsTeams = new Array;
        for (let fixture of this.fituresDGWMatchesFilter) {

          if (fixture.team_h === teamID) {
            vsTeams.push(fixture.team_a);
          }
          if (fixture.team_a === teamID) {
            vsTeams.push(fixture.team_h);
          }
        }
        return {
          dgwTeam: teamID,
          vsTeams: vsTeams
        }
      });

    });

  }

  updateTeamNameStorage(teamName: string, teamID: number) {
    sessionStorage.setItem('TeamName', JSON.stringify(teamName));
    sessionStorage.setItem('TeamID', JSON.stringify(teamID));
  }

  navigateToTeam(user: any) {
    this.updateTeamNameStorage(user.entry_name, user.entry);
    this.router.navigate(['/team', user.entry]);
  }

  onOutletLoaded(component: TeamComponent) {
    if (component instanceof TeamComponent) {
      const sessionTeamName: any = sessionStorage.getItem('TeamName');
      const sessionTeamID: any = sessionStorage.getItem('TeamID');
      component.teamName = JSON.parse(sessionTeamName);
      component.teamID = JSON.parse(sessionTeamID);
    }
  }
}

