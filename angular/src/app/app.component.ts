import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PaginationParamsModel } from './_components/shared/common/models/base.model';
import { AuthenticationService } from './_services/authentication.service';
import { ceil } from 'lodash';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { NhanVien } from './_models/nhan-vien';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [ // <-- add your animations here
  //   trigger('routeAnimations', [
  //     transition('* <=> *', [
  //       // Set a default  style for enter and leave
  //       query(':enter, :leave', [
  //         style({
  //           position: 'absolute',
  //           left:  '260px' ,
  //           right: '0px' ,
  //           width: 'auto',
  //           opacity: 0,
  //           transform: 'scale(110%) translateY(100%)',
  //         }),
  //       ],{ optional: true }),
  //       // Animate the new page in
  //       query(':enter', [
  //         animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
  //       ],{ optional: true })
  //     ]),
  //   ])
  // ]
})
export class AppComponent {
  checkMenu: boolean = true;


  columnDefs;
  rowData;
  currentUser: NhanVien;
  defaultColDef;
  paginationParams: PaginationParamsModel;
  params: any;
  pagedRowData: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.columnDefs = [
      { field: 'make' },
      { field: 'model' },
      { field: 'price' },
    ];

    this.defaultColDef = {
      flex: 1,
      resizable: true,
      suppressMenu: true,
      menuTabs: [],
      tooltipValueGetter: (t: any) => t.value,
      textFormatter: function (r) {
        if (r == null) return null;
        return r.toLowerCase();
      },
    };

    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  changeMenu(event) {
    this.checkMenu = event;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
  }

  callBackEvent(event) {
    console.log(this.paginationParams);
    this.params = event;
    this.pagedRowData =
      this.rowData.length > 0
        ? this.rowData.slice(
            (this.paginationParams.pageNum - 1) *
              this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
        : [];

    console.log(this.pagedRowData);
    this.paginationParams.totalCount = this.rowData.length;
    this.paginationParams.totalPage = ceil(
      this.rowData.length / this.paginationParams.pageSize
    );
    this.paginationParams.pageNum = 1;
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;

    this.pagedRowData = this.rowData
      ? this.rowData.slice(
          this.paginationParams.skipCount,
          this.paginationParams.pageNum * this.paginationParams.pageSize
        )
      : [];
    this.params.api.setRowData(this.pagedRowData);
  }

  prepareRoute(outlet) {
    return outlet.activatedRouteData.state ;
  }
}
