import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicPopupComponent } from '../dynamic-popup/dynamic-popup.component';
import { MatDialog, Sort } from '@angular/material';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from '../../../core/services/common.service';

export interface PeriodicElement {
  orderid: string;
  servicenumber: number;
  segmentgroup: string;
  productname: string;
  orderstatus: string;
}
export interface DialogData { }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { orderid: '1-687689', servicenumber: 9374658749, segmentgroup: 'Consumer', productname: 'Homeline', orderstatus: 'Processing' },
//   { orderid: '1-885776', servicenumber: 9920192747, segmentgroup: 'Business', productname: 'Streamyx', orderstatus: 'Processing' },
//   { orderid: '1-664775', servicenumber: 7584949303, segmentgroup: 'SME', productname: 'Lifeline', orderstatus: 'Completed' },
//   { orderid: '1-657483', servicenumber: 8384756372, segmentgroup: 'Consumer', productname: 'Homeline', orderstatus: 'Processing' },
// ];


@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderTableComponent implements OnInit {
  displayedColumns: string[] = ['orderid', 'servicenumber', 'segmentgroup', 'productname', 'orderstatus'];
  // dataSource = ELEMENT_DATA;
  dataSource: any;
  newVal: any;
  rawData: any;
  sortedData: any;

  constructor(public dialog: MatDialog,
    public api: ApiService,
    public common: CommonService) { 
      // this.sortedData = this.dataSource.slice();
    }

  ngOnInit() {
    this.callService();
    this.common.getRefreshOrders().subscribe(value => {
      if (value) {
        this.callService();
      }
    })
  }

  callService() {
    this.api.getOrders().subscribe(value => {
      this.dataSource = value['orders'];
    });
  }

  showOrderDetail(data) {
    const dialogRef = this.dialog.open(DynamicPopupComponent, { data: { popUp: data, type: 'edit' } });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'orderid': return compare(a.orderid, b.orderid, isAsc);
        case 'servicenumber': return compare(a.servicenumber, b.servicenumber, isAsc);
        case 'segmentgroup': return compare(a.segmentgroup, b.segmentgroup, isAsc);
        case 'productname': return compare(a.productname, b.productname, isAsc);
        case 'orderstatus': return compare(a.orderstatus, b.orderstatus, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






