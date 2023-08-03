import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrdersComponent} from "./component/orders.component";
import {AuthGuard} from "../../core/auth/auth.guard";
import {AuthRoleGuard} from "../../core/auth/auth-role.guard";
import {OrdersDetailComponent} from "./component/orders-detail/orders-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrdersComponent,
        canActivate: [AuthGuard, AuthRoleGuard],
        data: {expectedRoles: ["ADMIN", "USER"]}
      },
      {
        path: ':order_id',
        component: OrdersDetailComponent,
        canActivate: [AuthGuard, AuthRoleGuard],
        data: {expectedRoles: ["ADMIN", "USER"]}
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
