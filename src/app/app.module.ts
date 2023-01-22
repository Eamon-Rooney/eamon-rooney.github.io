import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormRecord, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FplComponent } from './fpl/fpl.component';
import { TeamComponent } from './team/team.component';
import { CardComponent } from './card/card.component';
import { CompareComponent } from './team/compare/compare.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './State/compareReducer';


@NgModule({
  declarations: [
    AppComponent,
    FplComponent,
    TeamComponent,
    CardComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ players: reducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
