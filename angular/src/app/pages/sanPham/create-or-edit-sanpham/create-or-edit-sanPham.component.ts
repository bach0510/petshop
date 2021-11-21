import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetSanPhamInput } from 'src/app/_models/GetSanPhamInput';
import { sanPham } from 'src/app/_models/sanPham';
import { sanPhamService } from 'src/app/_services/sanPham.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-sanPham',
  templateUrl: './create-or-edit-sanPham.component.html',
  styleUrls: ['./create-or-edit-sanPham.component.scss']
})
export class CreateOrEditSanPhamComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('imgContainer') imgContainer: { nativeElement: { getBoundingClientRect: () => { (): any; new(): any; height: number; width: number; }; }; } | undefined;
  @Output('modalSave') modalSave = new EventEmitter();
  url: SafeResourceUrl | any | undefined;
  @Input() SanPhamList = [];

  sanPham: sanPham = new sanPham();
  masp;
  loaiID;
  tenSP;
  gia;
  soLuong;
  isNew;

  constructor(private _sanPhamService: sanPhamService) { }

  ngOnInit() {
    this.modal.hide();
  }

  hide(){
    this.modal.hide();
  }

  show(event?) {
    

    this.sanPham = new sanPham
    this.isNew = true;
    if (event.masp != undefined) {
      this.sanPham = event;
      this.isNew = false;
    }

    // tự động cộng và gen mã sản phẩm
    var sanPhamInput = new GetSanPhamInput();
    sanPhamInput.Value =  1;
    sanPhamInput.Filter =  '';
    this._sanPhamService.getSanPham(sanPhamInput).subscribe(r => {
      var code = [];
      r.forEach(e => {
        // cắt SP lấy số đằng sau rồi đưa vào mảng
        code.push(parseInt(e.masp.toString().substr(e.masp.length - 3)))
      })
      // check nếu là add mới thì gen code ko thì thôi
      if(this.isNew == true){
        // cộng max của mã lên 1 trong database sau đó chuyển về string và cộng vs loại đầu ví dụ SP thì cộng "SP" (TC thì công "TC")
        this.sanPham.masp = "SP" + (Math.max(...code) + 1).toString();
      }
    }); 
    
    this.modal.show();
  }


  createOrEdit() {
    if (!this.checkValidate()) return;
    this.modalSave.emit(this.sanPham);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.sanPham?.tenSP || this.sanPham?.tenSP === '') {
      alertify.error('Tên sản phẩm không được trống');
      return false;
    }
    if (!this.sanPham?.loaiID || this.sanPham?.loaiID === '') {
      alertify.error('sản phẩm này cho laoi thú cưng nào?');
      return false;
    }
    if (!this.sanPham?.gia || this.sanPham?.gia === undefined) {
      alertify.error('giá sản phẩm không được trống');
      return false;
    }
    if (!this.sanPham?.soLuong || this.sanPham?.soLuong === undefined) {
      alertify.error('số lượng sản phẩm không được trống');
      return false;
    }

    return true;
  }
}
