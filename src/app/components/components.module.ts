import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonCountComponent } from './person-count/person-count.component';
import { VehicleCountComponent } from './vehicle-count/vehicle-count.component';
import { LuggageCountComponent } from './luggage-count/luggage-count.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { NgxImageZoomModule } from 'ngx-image-zoom';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    PersonCountComponent,
    VehicleCountComponent,
    LuggageCountComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxImageZoomModule
  ]
})
export class ComponentsModule { }
