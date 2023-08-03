import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/component/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**',
    redirectTo: 'orders'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
