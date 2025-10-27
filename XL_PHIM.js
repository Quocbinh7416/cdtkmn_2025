const { log } = require("console");
const FS = require("fs");
const PATH = require("path");

var Thu_muc_Du_lieu = "./Du_lieu";
var Thu_muc_Phim = PATH.join(Thu_muc_Du_lieu, "Phim");

class XL_PHIM {
    static Doc_Danh_sach_Phim() {
        var Danh_sach = [];
        var Danh_sach_Ten_Tap_tin = FS.readdirSync(Thu_muc_Phim);
        Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin => {
            var Duong_dan = PATH.join(Thu_muc_Phim, Ten_Tap_tin);
            var Chuoi_JSON = FS.readFileSync(Duong_dan, "utf-8");
            var Phim = JSON.parse(Chuoi_JSON);
            Danh_sach.push(Phim);
        });
        return Danh_sach;
    }

    static Tra_cuu_Phim(Danh_sach_Phim, Chuoi_Tra_cuu) {
        if (!Chuoi_Tra_cuu) return Danh_sach_Phim;
        
        const removeAccents = (str) => {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        };
        
        Chuoi_Tra_cuu = removeAccents(Chuoi_Tra_cuu.toLowerCase());
        return Danh_sach_Phim.filter(Phim => 
            removeAccents(Phim.Ten_phim.toLowerCase()).includes(Chuoi_Tra_cuu) || 
            removeAccents(Phim.Mo_ta.toLowerCase()).includes(Chuoi_Tra_cuu)
        );
    }

    static Them_Phim(Phim_Moi) {
        try {
            var Ten_Tap_tin = `${Phim_Moi.Ten.replace(/\s+/g, "_")}.json`;
            var Duong_dan = PATH.join(Thu_muc_Phim, Ten_Tap_tin);
            var Chuoi_JSON = JSON.stringify(Phim_Moi, null, 4);
            FS.writeFileSync(Duong_dan, Chuoi_JSON);
            return true;
        } catch (error) {
            console.error("Lỗi khi thêm phim:", error);
            return false;
        }
    }
}

module.exports = XL_PHIM;