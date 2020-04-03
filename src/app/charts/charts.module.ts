import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


const routes: Routes = [
  { path: 'chartjs', component: ChartjsComponent },
]

@NgModule({
  declarations: [ChartjsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot()
  ]
})
export class ChartsDemoModule { }
