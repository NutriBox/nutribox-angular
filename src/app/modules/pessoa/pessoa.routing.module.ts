import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { DelComponent } from './components/del/del.component';
import { EditComponent } from './components/edit/edit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: '', component: ListComponent },
  { path: 'list', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'del/:id', component: DelComponent }

];

export const PessoaRoutesModule = RouterModule.forChild(routes);
