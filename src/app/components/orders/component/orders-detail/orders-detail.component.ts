import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "../../service/orders.service";
import {Order} from "../../model/order";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogActions} from "../../../../shared/model/dialog-actions";
import {OrdersCrudComponent} from "../orders-crud/orders-crud.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class OrdersDetailComponent implements OnInit {

  order: Order | undefined;
  editMode: boolean = false;
  // @ts-ignore
  form: FormGroup;
  status: string[] = [ 'Open', 'Close'];
  orderID: number = 0;


  constructor(private route: ActivatedRoute, private ordersService: OrdersService, private router: Router,private orderService: OrdersService,private dialog: MatDialog) { }

  ngOnInit(): void {
    // @ts-ignore
    this.orderID = +this.route.snapshot.paramMap.get('order_id');
    this.order = this.ordersService.getOrders().find(order => order.id === this.orderID);

    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, [Validators.required]),
      customer: new FormControl(null, [Validators.required]),
      status: new FormControl('Open', [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });

  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  onEdit() {
    if( this.order?.status == true){
      this.form.patchValue({
        id:  this.order.id,
        name:  this.order.name,
        customer:  this.order.customer,
        status: 'Open',
        date:  this.order.date,
        price:  this.order.price
      });
    }else {
      this.form.patchValue({
        id:  this.order?.id,
        name:  this.order?.name,
        customer:  this.order?.customer,
        status: 'Close',
        date:  this.order?.date,
        price:  this.order?.price
      });
    }
    this.editMode = true;
  }
  onOverview() {
    this.editMode = false;
  }

  closeOrder(){

    var deleteOrder: Order;

    if (this.order) {
      deleteOrder = this.order;
      deleteOrder.status = false;
      this.orderService.updateOrder(deleteOrder);
    }
  }

  deleteOrder(): void {

    var tableData = {
      width: '400px',
      disableClose: true,
      data:{
        action: DialogActions.DELETE,
        data: this.order
      }
    }

    this.dialog.open(OrdersCrudComponent, tableData).afterClosed().subscribe((result: any) => {

      if(tableData.data.action == DialogActions.DELETE) {
        if(result.action == DialogActions.CANCEL){
          console.log("Deleting order canceled");
        } else {
          this.orderService.deleteOrder(this.orderID);
          this.router.navigate(['orders']);
        }
      }

    });
  }

  updateOrder(){

    if(this.form.value.status == 'Open'){
      this.form.patchValue({
        status: true,
      });
    }else {
      this.form.patchValue({
        status: false,
      });
    }

    var updateOrder: Order = this.form.value;
    this.orderService.updateOrder(updateOrder);
    this.reloadPage();

  }


  reloadPage(): void {
    window.location.reload();
  }

}
