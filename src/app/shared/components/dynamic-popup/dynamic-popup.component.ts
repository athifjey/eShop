import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DialogData } from '../order-table/order-table.component';
import { Title } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'omni-dynamic-popup',
  templateUrl: './dynamic-popup.component.html',
  styleUrls: ['./dynamic-popup.component.css']
})

export class DynamicPopupComponent implements OnInit {
  formData: any;
  type: any;

  constructor(
    public dialogRef: MatDialogRef<DynamicPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
  }


  ngOnInit() {
    if (this.data) {
      this.formData = this.data['popUp'];
      this.type = this.data['type']
      console.log(this.type);
    }
  }

}
