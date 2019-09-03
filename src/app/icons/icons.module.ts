import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MdiComponent } from './mdi/mdi.component';

const routes : Routes = [
  { path: 'mdi', component: MdiComponent }
]

@NgModule({
  declarations: [MdiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class IconsModule { }
