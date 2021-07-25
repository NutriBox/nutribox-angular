import { AgendaComponent } from './agenda.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '' , component: AgendaComponent }
];

export const AgendaRoutesModule = RouterModule.forChild(routes);
