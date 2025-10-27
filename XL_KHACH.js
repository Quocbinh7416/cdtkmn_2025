class XL_KHACH {
    static Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Phim(Chuoi_Tra_cuu="") {
        var Chuoi_HTML = `<div style="background-color:gray;margin:10px">
                           <div class="btn">
                               <form action='/KHACH' method='get'>
                                    <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                         autocomplete='off' placeholder='Tìm kiếm phim...' />
                                    <button type='submit' class='btn btn-primary'>Tìm kiếm</button>
                              </form>
                          </div>
                     </div>`
        return Chuoi_HTML
    }

    static Tao_Chuoi_HTML_DanhSachPhim(DanhSachPhim) {
        let Chuoi_HTML = `<div class='container mt-5'>`;
        Chuoi_HTML += `<h2 class='text-center mb-4'>Danh Sách Phim</h2>`;
        Chuoi_HTML += `<div class='row'>`;

        DanhSachPhim.forEach(Phim => {
            Chuoi_HTML += `
                <div class='col-md-4 mb-4'>
                    <div class='card shadow-sm border-0' style='transition: transform 0.3s; border-radius: 10px;'>
                        <img src='${Phim.Hinh_anh}' class='card-img-top' alt='${Phim.Ten_phim}' style='height: 300px; object-fit: cover; border-radius: 10px 10px 0 0;'>
                        <div class='card-body' style='padding: 20px;'>
                            <h5 class='card-title' style='color: #2c3e50; font-weight: bold;'>${Phim.Ten_phim}</h5>
                            <p class='card-text' style='color: #7f8c8d; font-size: 14px;'>${Phim.Mo_ta}</p>
                            <p class='card-text' style='color: #e74c3c; font-weight: 600;'>${Phim.Thoi_luong} phút</p>
                        </div>
                    </div>
                </div>
            `;
        });

        Chuoi_HTML += `</div></div><div style='margin-bottom: 100px;'></div>`;
        return Chuoi_HTML;
    }
}

module.exports = XL_KHACH;