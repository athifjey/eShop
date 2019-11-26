import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { DynamicPopupComponent } from '../dynamic-popup/dynamic-popup.component';
import { MatDialogRef, Sort } from '@angular/material';
import { CommonService } from '../../../core/services/common.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
export interface StateList {
  name: string,
  id: string
}


const STATE_DATA: StateList[] = [
  { 'name': 'Johor', 'id': '1' },
  { 'name': 'Kedah', 'id': '2' },
  { 'name': 'Kelantan', 'id': '3' },
  { 'name': 'Kuala Lumpur', 'id': '4' },
  { 'name': 'Labuan', 'id': '5' },
  { 'name': 'Malacca', 'id': '6' },
  { 'name': 'Negeri Sembilan', 'id': '7' },
  { 'name': 'Pahang', 'id': '8' },
  { 'name': 'Penang', 'id': '9' },
  { 'name': 'Perak', 'id': '10' },
  { 'name': 'Perlis', 'id': '11' },
  { 'name': 'Sabah', 'id': '12' },
  { 'name': 'Sarawak', 'id': '13' },
  { 'name': 'Selangor', 'id': '14' },
  { 'name': 'Terengganu', 'id': '15' }]

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent implements OnInit {

  orderDetailForm: FormGroup;
  @Input() formData: any;
  @Input() type: any;
  orderID: any;
  serviceNumber: any;
  stateData: any;
  orderStatus: any;
  remark: any;
  productName: any;
  segmentGroup: any;
  formType: boolean;
  stateList = STATE_DATA;

  constructor(private fb: FormBuilder,
    public api: ApiService,
    public common: CommonService,
    public dialogRef: MatDialogRef<DynamicPopupComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.formData) {
      this.orderID = this.formData.orderid;
      this.serviceNumber = this.formData.servicenumber;
      this.segmentGroup = this.formData.segmentgroup;
      this.productName = this.formData.productname;
      this.remark = this.formData.remark ? this.formData.remark : 'No remarks';
      this.orderStatus = this.formData.orderstatus;
      this.stateData = this.formData.state;
    }
    this.loadForm();
    if (this.type) {
      this.formType = this.type === 'edit' ? true : false;
    }


  }


  loadForm() {
    this.orderDetailForm = this.fb.group({
      orderid: [this.orderID, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      servicenumber: [this.serviceNumber, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      segmentgroup: [this.segmentGroup, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      productname: [this.productName, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      remark: [this.remark, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      orderstatus: [this.orderStatus, Validators.required],
      state: [this.stateData, Validators.required]
    });
  }

  onSubmit(data, type) {
    switch (type) {
      case 'edit': {
        this.api.putOrderByID(data.value.orderid, data.value).subscribe(value => {
          const config = new MatSnackBarConfig();
          config.panelClass = ['snack-bar-background'];
          config.duration = 5000;
          this._snackBar.open('Saved successfully', 'OK', config);
          this.dialogRef.close();
          this.common.refreshOrders(true);
        });
        break;
      }
      case 'add': {
        this.api.postOrder(data.value).subscribe(value => {
          const config = new MatSnackBarConfig();
          config.panelClass = ['snack-bar-background'];
          config.duration = 5000;
          this._snackBar.open('Record added successfully', 'OK', config);
          this.dialogRef.close();
          this.common.refreshOrders(true);
        });
        break;
      }

      case 'delete': {
        this.api.deleteOrder(data.value.orderid).subscribe(value => {
          console.log(value)
          const config = new MatSnackBarConfig();
          config.panelClass = ['snack-bar-background'];
          config.duration = 5000;
          this._snackBar.open('Record deleted successfully', 'OK', config);
          this.dialogRef.close();
          this.common.refreshOrders(true);
        });
        break;
      }
    }
  }
}



