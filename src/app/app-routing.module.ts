import { RegisterComponent } from './core/authentication/components/register/register.component';
import { HomeComponent } from './core/authentication/components/home/home.component';
import { LoginComponent } from './core/authentication/components/login/login.component';


import { MaterialModule } from './shared/material-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').
          then(m => m.DashboardModule)
      },

      {
        path: 'convidado',
        loadChildren: () => import('./modules/convidado/convidado.module').
          then(m => m.ConvidadoModule)
      },

      {
        path: 'especialidade',
        loadChildren: () => import('./modules/especialidade/especialidade.module').
          then(m => m.EspecialidadeModule)
      },

      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]


  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MaterialModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
