import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { ModalsComponent } from './modals/modals.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TypographyComponent } from './typography/typography.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: 'accordions', component: AccordionsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'dropdowns', component: DropdownsComponent },
  { path: 'dropdowns', component: DropdownsComponent },
  { path: 'modals', component: ModalsComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  declarations: [AccordionsComponent, BadgesComponent, BreadcrumbsComponent, ButtonsComponent, DropdownsComponent, ModalsComponent, PaginationComponent, ProgressbarComponent, TabsComponent, TooltipsComponent, TypographyComponent, NotificationsComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})
export class BasicUiModule { }
