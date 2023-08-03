import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../shared/model/dialog-data";
import {DialogActions} from "../../../../shared/model/dialog-actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-orders-crud',
  templateUrl: './orders-crud.component.html',
  styleUrls: ['./orders-crud.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class OrdersCrudComponent {

  // @ts-ignore
  form: FormGroup;

  status: string[] = [ 'Open', 'Close'];

  constructor(
    public dialogRef: MatDialogRef<OrdersCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) {}

  ngOnInit() {

    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, [Validators.required]),
      customer: new FormControl(null, [Validators.required]),
      status: new FormControl('Open', [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });

    if (this.dialogData != undefined && (this.dialogData.action == DialogActions.EDIT || this.dialogData.action == DialogActions.DELETE ) && this.dialogData.data) {
      if(this.dialogData.data.status == 1){
        this.form.patchValue({
          id: this.dialogData.data.id,
          name: this.dialogData.data.name,
          customer: this.dialogData.data.customer,
          status: 'Open',
          date: this.dialogData.data.date,
          price: this.dialogData.data.price
        });
      }else {
        this.form.patchValue({
          id: this.dialogData.data.id,
          name: this.dialogData.data.name,
          customer: this.dialogData.data.customer,
          status: 'Close',
          date: this.dialogData.data.date,
          price: this.dialogData.data.price
        });
      }
    }

  }

  add(): void {

      this.form.patchValue({
        status: true,
      });

    this.dialogRef.close({tableData: this.form?.value});
  }

  editDelete(): void {

    if(this.form.value.status == 'Open'){
      this.form.patchValue({
        status: true,
      });
    }else {
      this.form.patchValue({
        status: false,
      });
    }

      this.dialogRef.close({tableData: this.form?.value});
    }

  cancel(): void {
    this.dialogRef.close({action:DialogActions.CANCEL});
  }



}
