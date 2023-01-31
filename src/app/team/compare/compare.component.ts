import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompareState } from 'app/State/compareReducer';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {
  elements!: any;
  league!: any;

  constructor(private store: Store<{ compareState: CompareState }>) {
  }

  ngOnInit() {
    this.store.select('compareState').subscribe(compareState => {
      this.elements = compareState.elements;
      this.league = compareState.teams;
      console.log("this.elements", this.elements);
      console.log("this.league", this.league);
      console.log("this.store", this.store);
    });
  }

}
