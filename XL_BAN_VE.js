const { log } = require("console");
const FS = require("fs");
const PATH = require("path");
const XL_SUAT_CHIEU = require("./XL_SUAT_CHIEU.js");

var Thu_muc_Du_lieu = "./Du_lieu";
var Thu_muc_Nhan_vien_Ban_Ve = PATH.join(Thu_muc_Du_lieu, "Nhan_vien", "Nhan_vien_Ban_ve");

class XL_BAN_VE {
  static Doc_Danh_sach_Suat_chieu() {
    return XL_SUAT_CHIEU.Doc_Danh_sach_Suat_chieu();
  }

  static Tra_cuu_Suat_chieu(Danh_sach_Suat_chieu, Chuoi_Tra_cuu) {
    return XL_SUAT_CHIEU.Tra_cuu_Suat_chieu(Danh_sach_Suat_chieu, Chuoi_Tra_cuu);
  }

  static Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Suat_chieu(Chuoi_Tra_cuu = "") {
    var Chuoi_HTML = `<div style="background-color:gray;margin:10px">
                           <div class="btn">
                               <form action='/BAN_VE' method='get'>
                                    <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                         autocomplete='off' placeholder='Tìm kiếm suất chiếu...' />
                                    <button type='submit' class='btn btn-primary'>Tìm kiếm</button>
                              </form>
                          </div>
                     </div>`;
    return Chuoi_HTML;
  }

  static Ban_Ve(Suat_chieu_ID) {
    try {
      
      var Thu_muc_Ve = PATH.join(Thu_muc_Du_lieu, "Ve");
      if (!FS.existsSync(Thu_muc_Ve)) {
        FS.mkdirSync(Thu_muc_Ve, { recursive: true });
      }
      var Ve = {
        _id: `ve_${Suat_chieu_ID}_${Date.now()}`,
        suat_chieu_id: Suat_chieu_ID,
        ngay_mua: new Date().toISOString().split('T')[0],
        thoi_gian_mua: new Date().toLocaleTimeString('vi-VN')
      };
      
      var Ten_Tap_tin = `${Ve._id}.json`;
      var Duong_dan = PATH.join(Thu_muc_Ve, Ten_Tap_tin);
      var Chuoi_JSON = JSON.stringify(Ve, null, 2);
      FS.writeFileSync(Duong_dan, Chuoi_JSON);
      
      return true;
    } catch (error) {
      console.error("Lỗi khi tạo vé:", error);
      return false;
    }
  }

  static Tao_Chuoi_HTML_DanhSachSuatChieu(
    DanhSachSuatChieu,
    Ma_so_NV = "NVBV_1"
  ) {
    let Ten_NV = "Nhân viên";
    try {
      const Duong_dan = PATH.join(Thu_muc_Nhan_vien_Ban_Ve, `${Ma_so_NV}.json`);
      const Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
      const Nhan_vien = JSON.parse(Chuoi_JSON);
      Ten_NV = Nhan_vien.Ho_ten;
    } catch (error) {
      Ten_NV = "Nhân viên";
    }

    let Chuoi_HTML = `<div class='container mt-5'>`;
    Chuoi_HTML += `<div class='alert alert-info text-center mb-4'><h4>Chào Nhân viên <span style='color: red; font-weight: bold;'>${Ten_NV}</span></h4></div>`;
    Chuoi_HTML += `<h2 class='text-center mb-4'>Danh Sách Suất Chiếu</h2>`;
    Chuoi_HTML += `<div class='row'>`;

    Chuoi_HTML += `<table class='table table-striped table-hover'>
                     <thead class='table-dark'>
                       <tr>
                         <th>Tên Phim</th>
                         <th>Phòng</th>
                         <th>Ngày Chiếu</th>
                         <th>Giờ Chiếu</th>
                         <th>Giá Vé</th>
                         <th>Vé</th>
                         <th>Hành Động</th>
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
                       <td><form method='post' action='/BAN_VE' style='display:inline;'><input type='hidden' name='suat_chieu_id' value='${SuatChieu._id}'><button type='submit' class='btn btn-success btn-sm'>Bán Vé</button></form></td>
                     </tr>`;
    });
    
    Chuoi_HTML += `</tbody></table>`;

    Chuoi_HTML += `</div></div>`;
    return Chuoi_HTML;
  }
}

module.exports = XL_BAN_VE;