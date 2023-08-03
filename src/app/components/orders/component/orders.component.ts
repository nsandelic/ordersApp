import {Component, Injectable, ViewChild} from '@angular/core';
import {Order} from "../model/order";
import {Router} from "@angular/router";
import {OrdersService} from "../service/orders.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ordersTableColumnsConfig} from "../orders-table.config";
import {
  faPlus, faPen, faMinusCircle, faSquareCheck, faTrashCan, faClipboard, faPrint
} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {OrdersCrudComponent} from "./orders-crud/orders-crud.component";
import {DialogActions} from "../../../shared/model/dialog-actions";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class OrdersComponent {

  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  filterForm: FormGroup;
  ordersList: Order[] | undefined;

  columns = ordersTableColumnsConfig;
  displayedColumns: any;
  // @ts-ignore
  dataSource: MatTableDataSource<Order>;

  faPlus = faPlus;
  faPen = faPen;
  faMinusCircle = faMinusCircle;
  faSquareCheck = faSquareCheck;
  faTrashCan = faTrashCan;
  faClipboard = faClipboard;
  faPrint = faPrint;



  dialogActionAdd = DialogActions.ADD;

  constructor(private router: Router,
              private orderService: OrdersService,
              private dialog: MatDialog) {}

  ngOnInit(): void {

    console.log("Order Component Init")

    this.getOrders();
    this.displayedColumns = this.columns.map(c => c.columnDef);

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      customer: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });
    this.filterForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      status: new FormControl('3')
    });

  }


  getOrders() {
    this.ordersList = this.orderService.getOrders();
    this.dataSource = new MatTableDataSource(this.ordersList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log("Order list: ")
    console.log(this.ordersList)
  }

  openDialog(dialogAction: string, row:any): void {

    var tableData = {
      width: '800px',
      disableClose: true,
      data:{
        action: dialogAction,
        data: row
      }
    }

    if(dialogAction == DialogActions.DELETE)
      tableData.width = '400px';

    this.dialog.open(OrdersCrudComponent, tableData).afterClosed().subscribe((result: any) => {

      if(tableData.data.action == DialogActions.ADD) {
        if(result.action == DialogActions.CANCEL){
          console.log("Adding new order canceled");
        } else {
          this.orderService.addOrder(result.tableData);
          this.getOrders();
          this.router.navigate(['orders', result.tableData.id]);
          console.log("New order is added");
        }
      } else if(tableData.data.action == DialogActions.EDIT) {
        if(result.action == DialogActions.CANCEL){
          console.log("Updating order canceled");
        } else {
          this.orderService.updateOrder(result.tableData);
          this.getOrders();
          console.log("Order Updated");
        }
      } else if(tableData.data.action == DialogActions.DELETE) {
        if(result.action == DialogActions.CANCEL){
          console.log("Deleting order canceled");
        } else {
          this.orderService.deleteOrder(result.tableData.id);
          this.getOrders();
          console.log("Order deleted");
        }
      }

    });
  }

  applyFilter() {
    // @ts-ignore
    const idValue = this.filterForm.get('id').value;
    // @ts-ignore
    const nameValue = this.filterForm.get('name').value.toLowerCase();
    // @ts-ignore
    var statusValue = this.filterForm.get('status').value;
    if(statusValue == '1')
      statusValue = true;
    if(statusValue == '0')
      statusValue = false;

    // Filter the data based on search and status
    const filteredData = this.orderService.getOrders().filter(order => {

      const nameMatch = order.name.toLowerCase().includes(nameValue);
      const idMatch = order.id.toString().includes(idValue);
      if(statusValue != '3'){
        const statusMatch = order.status === statusValue;
        return nameMatch && statusMatch && idMatch ;
      }
      return nameMatch && idMatch ;
    });

    this.dataSource.data = filteredData;
    console.log(this.dataSource.data.length)
  }

  openDetails(userId: number) {
      this.router.navigate(['orders', userId]);
  }

  printOrders(): void {
    const printContents = document.getElementById('orders-table')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }

    this.reloadPage();
  }


  reloadPage(): void {
    window.location.reload();
  }

}
