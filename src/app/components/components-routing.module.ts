import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonCountComponent } from './person-count/person-count.component';
import { VehicleCountComponent } from './vehicle-count/vehicle-count.component';
import { LuggageCountComponent } from './luggage-count/luggage-count.component';

const routes: Routes = [
  {
    path: '', component: SidebarComponent, // Assuming SidebarComponent is the wrapper
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'person', component: PersonCountComponent },
      {path: 'vehicle', component: VehicleCountComponent},
      {path: 'luggage', component: LuggageCountComponent} 
      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
