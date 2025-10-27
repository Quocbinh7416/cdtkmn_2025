const FS = require("fs");
const PATH = require("path");

var Thu_muc_Du_lieu = "./Du_lieu";
var Thu_muc_Suat_chieu = PATH.join(Thu_muc_Du_lieu, "Suat_chieu");
var Thu_muc_Ca_chieu = PATH.join(Thu_muc_Du_lieu, "Ca_chieu");
var Thu_muc_Phong_chieu = PATH.join(Thu_muc_Du_lieu, "Phong_chieu");
var Thu_muc_Ve = PATH.join(Thu_muc_Du_lieu, "Ve");

class XL_SUAT_CHIEU {
  static Doc_Danh_sach_Suat_chieu() {
    var Danh_sach = [];
    var Danh_sach_Ca_chieu = this.Doc_Danh_sach_Ca_chieu();
    var Danh_sach_Phong_chieu = this.Doc_Danh_sach_Phong_chieu();
    
    var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Suat_chieu);
    Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin => {
      var Duong_dan = PATH.join(Thu_muc_Suat_chieu, Ten_Tap_tin);
      var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
      var Suat_chieu = JSON.parse(Chuoi_JSON);
      
      var Ca_chieu = Danh_sach_Ca_chieu.find(cc => cc.loai === Suat_chieu.ca_chieu);
      if (Ca_chieu) {
        Suat_chieu.thoi_gian = Ca_chieu.thoi_gian;
      }
      
      var Phong_chieu = Danh_sach_Phong_chieu.find(pc => pc._id === Suat_chieu.phong_chieu_id);
      if (Phong_chieu) {
        Suat_chieu.ten_phong = Phong_chieu.ten_phong;
        Suat_chieu.tong_so_ve = Phong_chieu.so_ghe || 0;
      }
      
      Suat_chieu.so_ve_da_ban = this.Dem_Ve_Da_Ban(Suat_chieu._id);
      Danh_sach.push(Suat_chieu);
    });
    
    Danh_sach.sort((a, b) => {
      if (a.ngay_chieu !== b.ngay_chieu) {
        return new Date(a.ngay_chieu) - new Date(b.ngay_chieu);
      }
      return a.ca_chieu - b.ca_chieu;
    });
    
    return Danh_sach;
  }

  static Doc_Danh_sach_Phong_chieu() {
    var Danh_sach = [];
    var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Phong_chieu);
    Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin => {
      var Duong_dan = PATH.join(Thu_muc_Phong_chieu, Ten_Tap_tin);
      var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
      var Phong_chieu = JSON.parse(Chuoi_JSON);
      Danh_sach.push(Phong_chieu);
    });
    return Danh_sach;
  }

  static Doc_Danh_sach_Ca_chieu() {
    var Danh_sach = [];
    var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Ca_chieu);
    Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin => {
      var Duong_dan = PATH.join(Thu_muc_Ca_chieu, Ten_Tap_tin);
      var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
      var Ca_chieu = JSON.parse(Chuoi_JSON);
      Danh_sach.push(Ca_chieu);
    });
    return Danh_sach;
  }

  static Dem_Ve_Da_Ban(Suat_chieu_ID) {
    try {
      if (!FS.existsSync(Thu_muc_Ve)) {
        return 0;
      }
      
      var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Ve);
      var So_ve_da_ban = 0;
      
      Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin => {
        if (Ten_Tap_tin.startsWith(`ve_${Suat_chieu_ID}_`) && Ten_Tap_tin.endsWith('.json')) {
          So_ve_da_ban++;
        }
      });
      
      return So_ve_da_ban;
    } catch (error) {
      return 0;
    }
  }

  static Tra_cuu_Suat_chieu(Danh_sach_Suat_chieu, Chuoi_Tra_cuu) {
    if (!Chuoi_Tra_cuu) return Danh_sach_Suat_chieu;
    
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    
    Chuoi_Tra_cuu = removeAccents(Chuoi_Tra_cuu.toLowerCase());
    return Danh_sach_Suat_chieu.filter(Suat_chieu => 
      removeAccents(Suat_chieu.phim.ten_phim.toLowerCase()).includes(Chuoi_Tra_cuu) || 
      removeAccents((Suat_chieu.ten_phong || '').toLowerCase()).includes(Chuoi_Tra_cuu) ||
      Suat_chieu.ngay_chieu.includes(Chuoi_Tra_cuu)
    );
  }
}

module.exports = XL_SUAT_CHIEU;