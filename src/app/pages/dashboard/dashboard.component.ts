import { Component, OnInit } from '@angular/core';
import { DynamicPopupComponent } from '../../shared/components/dynamic-popup/dynamic-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addNewOrder(){
    const dialogRef = this.dialog.open(DynamicPopupComponent, { data: { popUp: '', type: 'add' } });
  }
}
