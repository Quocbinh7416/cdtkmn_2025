const FS = require("fs");
const PATH = require("path");

var Thu_muc_Du_lieu= "./Du_lieu"
var Thu_muc_HTML=PATH.join(Thu_muc_Du_lieu,"HTML")
var Thu_muc_Rap = PATH.join(Thu_muc_Du_lieu, "Rap");

class XL_GIAO_DIEN {
    // Xử lý Lưu trữ 
    static Doc_Khung_HTML(){
        var Chuoi_HTML=""
        var Duong_dan=PATH.join(Thu_muc_HTML,"Khung.html")
        Chuoi_HTML=FS.readFileSync(Duong_dan,"utf-8")
        return Chuoi_HTML
    }

    static Tao_Chuoi_Trang_Giao_dien() {
        const Danh_sach_Trang = [
            { Ma_so: "KHACH", Ten: "Khách", Mau: "btn-success" }, // Xanh
            { Ma_so: "BAN_VE", Ten: "Bán vé", Mau: "btn-warning" }, // Vang
            { Ma_so: "QUAN_LY", Ten: "Quản lý", Mau: "btn-danger" } // Do
        ];

        let Chuoi_HTML = `<div class='d-flex justify-content-center mt-5'>`;
        Danh_sach_Trang.forEach(Module => {
            Chuoi_HTML += `
                <form action='/${Module.Ma_so}' method='get' class='mx-2'>
                    <button type='submit' class='btn ${Module.Mau}'>
                        ${Module.Ten}
                    </button>
                </form>
            `;
        });
        Chuoi_HTML += `</div>`;
        const Danh_sach_Rap = this.Doc_Thong_tin_Rap();
        
        Chuoi_HTML += `<div class='container mt-5'>`;
        Chuoi_HTML += `<div class='row'>`;
        Danh_sach_Rap.forEach(Rap => {
            Chuoi_HTML += `
                <div class='col-md-4'>
                    <div class='card mb-4' style="border: 1px solid #007bff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <div class='card-body' style="background-color: #f8f9fa; padding: 20px;">
                            <h5 class='card-title' style="color: #007bff; font-weight: bold;">${Rap.ten_rap}</h5>
                            <p class='card-text' style="margin-bottom: 10px;"><strong>Địa chỉ:</strong> ${Rap.dia_chi}</p>
                            <p class='card-text' style="margin-bottom: 0;"><strong>Số phòng chiếu:</strong> ${Rap.danh_sach_phong.length}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        Chuoi_HTML += `</div>`;
        Chuoi_HTML += `</div>`;
        return Chuoi_HTML;
    }

    static Doc_Thong_tin_Rap() {
        var Danh_sach_Rap = [];
        var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Rap);
        Danh_sach_Ten_Tap_tin.forEach((Ten_Tap_tin) => {
          var Duong_dan = PATH.join(Thu_muc_Rap, Ten_Tap_tin);
          var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
          var Rap = JSON.parse(Chuoi_JSON);
          Danh_sach_Rap.push(Rap);
        });
        return Danh_sach_Rap;
    }
}

module.exports = XL_GIAO_DIEN;