import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../shared/module/material.module";
import {OrdersComponent} from "./component/orders.component";
import {OrdersRoutingModule} from "./orders-routing.module";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { OrdersCrudComponent } from './component/orders-crud/orders-crud.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OrdersDetailComponent } from './component/orders-detail/orders-detail.component';





@NgModule({
  declarations: [
    OrdersComponent,
    OrdersCrudComponent,
    OrdersDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OrdersRoutingModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})
export class OrdersModule { }
