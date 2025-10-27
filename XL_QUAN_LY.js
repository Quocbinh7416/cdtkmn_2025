const FS = require("fs");
const PATH = require("path");
const XL_SUAT_CHIEU = require("./XL_SUAT_CHIEU.js");

var Thu_muc_Du_lieu = "./Du_lieu";
var Thu_muc_Ve = PATH.join(Thu_muc_Du_lieu, "Ve");

class XL_QUAN_LY {
  static Doc_Thong_ke_Ve() {
    try {
      if (!FS.existsSync(Thu_muc_Ve)) {
        return [];
      }
      
      var Danh_sach_Ve = [];
      var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Ve);
      
      Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin => {
        if (Ten_Tap_tin.endsWith('.json')) {
          var Duong_dan = PATH.join(Thu_muc_Ve, Ten_Tap_tin);
          var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
          var Ve = JSON.parse(Chuoi_JSON);
          Danh_sach_Ve.push(Ve);
        }
      });
      
      return Danh_sach_Ve;
    } catch (error) {
      return [];
    }
  }

  static Tao_Thong_ke_Theo_Suat_chieu() {
    var Danh_sach_Ve = this.Doc_Thong_ke_Ve();
    var Thong_ke = {};
    
    Danh_sach_Ve.forEach(Ve => {
      var Suat_chieu_ID = Ve.suat_chieu_id;
      if (!Thong_ke[Suat_chieu_ID]) {
        Thong_ke[Suat_chieu_ID] = 0;
      }
      Thong_ke[Suat_chieu_ID]++;
    });
    
    return Thong_ke;
  }

  static Doc_Danh_sach_Suat_chieu() {
    return XL_SUAT_CHIEU.Doc_Danh_sach_Suat_chieu();
  }

  static Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Suat_chieu(Chuoi_Tra_cuu = "") {
    var Chuoi_HTML = `<div style="background-color:gray;margin:10px">
                           <div class="btn">
                               <form action='/QUAN_LY' method='get'>
                                    <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                         autocomplete='off' placeholder='Tìm kiếm suất chiếu...' />
                                    <button type='submit' class='btn btn-primary'>Tìm kiếm</button>
                              </form>
                          </div>
                     </div>`;
    return Chuoi_HTML;
  }

  static Tao_Chuoi_HTML_DanhSachSuatChieu(DanhSachSuatChieu, Chuoi_Tra_cuu = "") {
    let Chuoi_HTML = `<div class='container mt-5'>`;
    Chuoi_HTML += `<h2 class='text-center mb-4'>Danh Sách Suất Chiếu - Quản Lý</h2>`;
    Chuoi_HTML += this.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Suat_chieu(Chuoi_Tra_cuu);
    
    Chuoi_HTML += `<table class='table table-striped table-hover'>
                     <thead class='table-dark'>
                       <tr>
                         <th>Tên Phim</th>
                         <th>Phòng</th>
                         <th>Ngày Chiếu</th>
                         <th>Giờ Chiếu</th>
                         <th>Giá Vé</th>
                         <th>Vé</th>
                       </tr>
                     </thead>
                     <tbody>`;
    
    DanhSachSuatChieu.forEach((SuatChieu) => {
      Chuoi_HTML += `<tr>
                       <td style='font-weight: bold;'>${SuatChieu.phim.ten_phim}</td>
                       <td>${SuatChieu.ten_phong || SuatChieu.phong_chieu_id}</td>
                       <td>${SuatChieu.ngay_chieu || 'Chưa xác định'}</td>
                       <td>${SuatChieu.thoi_gian || 'Chưa xác định'}</td>
                       <td style='color: #27ae60; font-weight: 600;'>${SuatChieu.gia_ve} VND</td>
                       <td style='color: #3498db; font-weight: 600;'>${SuatChieu.so_ve_da_ban || 0}/${SuatChieu.tong_so_ve || 0}</td>
                     </tr>`;
    });
    
    Chuoi_HTML += `</tbody></table></div><div style='margin-bottom: 100px;'></div>`;
    return Chuoi_HTML;
  }

  static Tao_Chuoi_HTML_Thong_ke() {
    var Thong_ke = this.Tao_Thong_ke_Theo_Suat_chieu();
    var DanhSachSuatChieu = this.Doc_Danh_sach_Suat_chieu();
    
    let Chuoi_HTML = `<div class='container mt-5'>`;
    Chuoi_HTML += `<h2 class='text-center mb-4'>Thống Kê Theo Suất Chiếu</h2>`;
    
    Chuoi_HTML += `<table class='table table-striped table-hover'>
                     <thead class='table-dark'>
                       <tr>
                         <th>Tên Phim</th>
                         <th>Ngày Chiếu</th>
                         <th>Giờ Chiếu</th>
                         <th>Số Vé Đã Bán</th>
                       </tr>
                     </thead>
                     <tbody>`;
    
    Object.entries(Thong_ke).forEach(([Suat_chieu_ID, So_ve]) => {
      var SuatChieu = DanhSachSuatChieu.find(sc => sc._id === Suat_chieu_ID);
      if (SuatChieu) {
        Chuoi_HTML += `<tr>
                         <td style='font-weight: bold;'>${SuatChieu.phim.ten_phim}</td>
                         <td>${SuatChieu.ngay_chieu || 'Chưa xác định'}</td>
                         <td>${SuatChieu.thoi_gian || 'Chưa xác định'}</td>
                         <td style='color: #27ae60; font-weight: 600;'>${So_ve}</td>
                       </tr>`;
      }
    });
    
    Chuoi_HTML += `</tbody></table></div>`;
    return Chuoi_HTML;
  }

  static Tao_Thong_ke_Theo_Phim() {
    var Danh_sach_Ve = this.Doc_Thong_ke_Ve();
    var DanhSachSuatChieu = this.Doc_Danh_sach_Suat_chieu();
    var Thong_ke_Phim = {};
    
    Danh_sach_Ve.forEach(Ve => {
      var SuatChieu = DanhSachSuatChieu.find(sc => sc._id === Ve.suat_chieu_id);
      if (SuatChieu) {
        var Ten_phim = SuatChieu.phim.ten_phim;
        if (!Thong_ke_Phim[Ten_phim]) {
          Thong_ke_Phim[Ten_phim] = 0;
        }
        Thong_ke_Phim[Ten_phim]++;
      }
    });
    
    return Thong_ke_Phim;
  }

  static Tao_Chuoi_HTML_Thong_ke_Phim() {
    var Thong_ke_Phim = this.Tao_Thong_ke_Theo_Phim();
    var Tong_ve_ban = Object.values(Thong_ke_Phim).reduce((sum, count) => sum + count, 0);
    
    let Chuoi_HTML = `<div class='container mt-5'>`;
    Chuoi_HTML += `<h2 class='text-center mb-4'>Thống Kê Theo Phim</h2>`;
    
    Chuoi_HTML += `<table class='table table-striped table-hover'>
                     <thead class='table-dark'>
                       <tr>
                         <th>Tên Phim</th>
                         <th>Tổng Vé Đã Bán</th>
                       </tr>
                     </thead>
                     <tbody>`;
    
    Object.entries(Thong_ke_Phim).forEach(([Ten_phim, So_ve]) => {
      Chuoi_HTML += `<tr>
                       <td style='font-weight: bold;'>${Ten_phim}</td>
                       <td style='color: #27ae60; font-weight: 600;'>${So_ve}</td>
                     </tr>`;
    });
    
    Chuoi_HTML += `</tbody></table></div>`;
    return Chuoi_HTML;
  }

  static Tao_Chuoi_HTML_Tong_ket() {
    var Danh_sach_Ve = this.Doc_Thong_ke_Ve();
    var Tong_ve_ban = Danh_sach_Ve.length;
    
    let Chuoi_HTML = `<div class='container mt-5'>`;
    Chuoi_HTML += `<div class='alert alert-success text-center mb-4'><h2>Tổng số vé đã bán: ${Tong_ve_ban}</h2></div>`;
    Chuoi_HTML += `</div>`;
    return Chuoi_HTML;
  }

  static Tra_cuu_Suat_chieu(Danh_sach_Suat_chieu, Chuoi_Tra_cuu) {
    return XL_SUAT_CHIEU.Tra_cuu_Suat_chieu(Danh_sach_Suat_chieu, Chuoi_Tra_cuu);
  }

  static Tao_Chuoi_HTML_Ket_hop(Chuoi_Tra_cuu = "") {
    var DanhSachSuatChieu = this.Doc_Danh_sach_Suat_chieu();
    if (Chuoi_Tra_cuu) {
      DanhSachSuatChieu = this.Tra_cuu_Suat_chieu(DanhSachSuatChieu, Chuoi_Tra_cuu);
    }
    
    var Chuoi_HTML = this.Tao_Chuoi_HTML_Tong_ket();
    Chuoi_HTML += this.Tao_Chuoi_HTML_Thong_ke_Phim();
    Chuoi_HTML += this.Tao_Chuoi_HTML_Thong_ke();
    Chuoi_HTML += this.Tao_Chuoi_HTML_DanhSachSuatChieu(DanhSachSuatChieu, Chuoi_Tra_cuu);
    return Chuoi_HTML;
  }
}

module.exports = XL_QUAN_LY;