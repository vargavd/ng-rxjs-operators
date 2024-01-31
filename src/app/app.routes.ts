import { Routes } from '@angular/router';

// PAGES
import { MapComponent } from './pages/map/map.component';
import { FilterComponent } from './pages/filter/filter.component';


export const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'filter', component: FilterComponent }
];
