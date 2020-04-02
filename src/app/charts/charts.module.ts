import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { HttpModule, JsonpModule } from '@angular/http';

import { ChartjsComponent } from './chartjs/chartjs.component';
import { BrowserModule } from '@angular/platform-browser';

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
    JsonpModule
  ]
})
export class ChartsDemoModule { }
