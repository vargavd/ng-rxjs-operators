import { Routes } from '@angular/router';

// PAGES
import { MapComponent } from './pages/map/map.component';
import { FilterComponent } from './pages/filter/filter.component';
import { TapComponent } from './pages/tap/tap.component';
import { ConcatMapComponent } from './pages/concat-map/concat-map.component';
import { SwitchMapComponent } from './pages/switch-map/switch-map.component';


export const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'tap', component: TapComponent },
  { path: 'concat-map', component: ConcatMapComponent },
  { path: 'switch-map', component: SwitchMapComponent }
];
