import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';

import { AccordionsComponent } from "./ui-elements/accordions/accordions.component";
import { AlertsComponent } from "./ui-elements/alerts/alerts.component";
import { BadgesComponent } from "./ui-elements/badges/badges.component";
import { BreadcrumbsComponent } from "./ui-elements/breadcrumbs/breadcrumbs.component";
import { ButtonsComponent } from "./ui-elements/buttons/buttons.component";
import { CarouselComponent } from "./ui-elements/carousel/carousel.component";
import { DropdownComponent } from "./ui-elements/dropdown/dropdown.component";
import { PaginationComponent } from "./ui-elements/pagination/pagination.component";
import { ProgressbarComponent } from "./ui-elements/progressbar/progressbar.component";
import { TablesComponent } from "./ui-elements/tables/tables.component";
import { TabsComponent } from "./ui-elements/tabs/tabs.component";
import { TooltipsComponent } from "./ui-elements/tooltips/tooltips.component";
import { TypographyComponent } from "./ui-elements/typography/typography.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    TabsComponent,
    AccordionsComponent,
    AlertsComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CarouselComponent,
    DropdownComponent,
    PaginationComponent,
    ProgressbarComponent,
    TablesComponent,
    TooltipsComponent,
    TypographyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
