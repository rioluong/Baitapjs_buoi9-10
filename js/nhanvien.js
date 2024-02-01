function getElement(name) {
  return document.getElementById(name);
}

function clearForm() {
  const form = document.querySelector("#myModal form");
  form.reset();
}

function createTableCell(value) {
  return `<td>${value}</td>`;
}

function createNhanVien() {
  return {
    taiKhoan: tknvInput.value,
    hoTen: nameInput.value,
    email: emailInput.value,
    matKhau: passwordInput.value,
    ngayLam: ngaylamInput.value,
    luongCoBan: luongCBInput.value,
    chucVu: chucvuSelect.value,
    gioLamTrongThang: gioLamInput.value,
  };
}

function tinhTongLuong(chucVu, luongCoBan) {
  let tongLuong = 0;
  switch (chucVu) {
    case "Sếp":
      tongLuong = luongCoBan * 3;
      break;
    case "Trưởng phòng":
      tongLuong = luongCoBan * 2;
      break;
    case "Nhân viên":
      tongLuong = luongCoBan * 1;
      break;
    default:
      tongLuong = 0;
  }
  return tongLuong;
}

function xepLoai(gioLamTrongThang) {
  if (gioLamTrongThang >= 192) {
    return "Nhân viên xuất sắc";
  } else if (gioLamTrongThang >= 176) {
    return "Nhân viên giỏi";
  } else if (gioLamTrongThang >= 160) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
}

function mappingNhanVienToTable(nhanVien) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    ${createTableCell(nhanVien.taiKhoan)}
    ${createTableCell(nhanVien.hoTen)}
    ${createTableCell(nhanVien.email)}
    ${createTableCell(nhanVien.ngayLam)}
    ${createTableCell(nhanVien.chucVu)}
    ${createTableCell(tinhTongLuong(nhanVien.chucVu, nhanVien.luongCoBan))}
    ${createTableCell(xepLoai(nhanVien.gioLamTrongThang))}
    <td>
      <button class="btn btn-warning btn-sm btnUpdate" data-taikhoan="${
        nhanVien.taiKhoan
      }" data-toggle="modal" data-target="#myModal" onclick="showModalUpdate(event)">Cập nhật</button>
      <button class="btn btn-danger btn-sm btnXoa" data-taikhoan="${
        nhanVien.taiKhoan
      }">Xoá</button>
    </td>
  `;

  tbody.appendChild(tr);
}

function getNhanVienList() {
  return JSON.parse(localStorage.getItem("nhanVienList")) || [];
}

function hienThiDanhSachNhanVien(nhanVienList) {
  tbody.innerHTML = "";

  for (const nhanVien of nhanVienList) {
    mappingNhanVienToTable(nhanVien);
  }
}

function getNhanVienById(taiKhoan) {
  const nhanVienList = getNhanVienList();

  for (const element of nhanVienList) {
    if (element.taiKhoan === taiKhoan) {
      return element;
    }
  }

  return null;
}

// ------------------------------------------------------

const tknvInput = getElement("tknv");
const nameInput = getElement("name");
const emailInput = getElement("email");
const passwordInput = getElement("password");
const ngaylamInput = getElement("datepicker");
const luongCBInput = getElement("luongCB");
const chucvuSelect = getElement("chucvu");
const gioLamInput = getElement("gioLam");
const btnThemNV = getElement("btnThemNV");
const btnThem = getElement("btnThem");

const btnCapNhat = getElement("btnCapNhat");
const tbody = document.querySelector("tbody");

const btnTimNV = getElement("btnTimNV");

const modalForm = getElement("myModal");

let selectedNhanVienId = null;
let isUpdating = false;

// ------------------------------------------------------

function addNhanVienToTable(nhanVien) {
  mappingNhanVienToTable(nhanVien);

  const nhanVienList = getNhanVienList();

  nhanVienList.push({
    ...nhanVien,
    loaiNhanVien: xepLoai(nhanVien.gioLamTrongThang),
    tongLuong: tinhTongLuong(nhanVien.chucVu, nhanVien.luongCoBan),
  });
  localStorage.setItem("nhanVienList", JSON.stringify(nhanVienList));
}

// ---------------------------SEARCH---------------------------
if (btnTimNV) {
  btnTimNV.addEventListener("click", function () {
    const searchValue = document
      .getElementById("searchName")
      .value.toLowerCase();

    const nhanVienList = getNhanVienList();

    const filteredNhanVienList = nhanVienList.filter((nhanVien) => {
      const loaiNhanVien = nhanVien.loaiNhanVien?.toLowerCase();
      return loaiNhanVien?.includes(searchValue);
    });

    hienThiDanhSachNhanVien(filteredNhanVienList);
  });
}

// ---------------------------UPDATE---------------------------

function updateNhanVienById(taiKhoan, updatedNhanVien) {
  const nhanVienList = getNhanVienList();

  for (let i = 0; i < nhanVienList.length; i++) {
    if (nhanVienList[i].taiKhoan === taiKhoan) {
      nhanVienList[i] = updatedNhanVien;
      break;
    }
  }

  // Lưu danh sách nhân viên đã được cập nhật vào LocalStorage
  localStorage.setItem("nhanVienList", JSON.stringify(nhanVienList));
}

function showModalUpdate(event) {
  const taiKhoan = event.target.getAttribute("data-taikhoan");

  if (taiKhoan) {
    const nhanVien = getNhanVienById(taiKhoan);

    if (nhanVien) {
      tknvInput.value = nhanVien.taiKhoan;
      tknvInput.readOnly = true;

      nameInput.value = nhanVien.hoTen;
      emailInput.value = nhanVien.email;
      passwordInput.value = nhanVien.matKhau;
      ngaylamInput.value = nhanVien.ngayLam;
      luongCBInput.value = nhanVien.luongCoBan;
      chucvuSelect.value = nhanVien.chucVu;
      gioLamInput.value = nhanVien.gioLamTrongThang;

      selectedNhanVienId = nhanVien.taiKhoan;
      btnThemNV.style.display = "none";
      btnCapNhat.style.display = "block";
    }
  }
}

btnCapNhat.addEventListener("click", function () {
  if (validateInput()) {
    const updatedNhanVien = createNhanVien();
    updateNhanVienById(selectedNhanVienId, updatedNhanVien);

    const nhanVienList = getNhanVienList();
    hienThiDanhSachNhanVien(nhanVienList);
  }
});

// ---------------------------CREATE---------------------------

btnThem.addEventListener("click", function () {
  btnThemNV.style.display = "block";
  btnCapNhat.style.display = "none";
  tknvInput.readOnly = false;
});

btnThemNV.addEventListener("click", function () {
  if (validateInput()) {
    const nhanVien = createNhanVien();
    addNhanVienToTable(nhanVien);
    clearForm();
  }
});

// ---------------------------DELETE---------------------------
function xoaNhanVien(taiKhoan) {
  const nhanVienList = getNhanVienList();
  const updatedNhanVienList = nhanVienList.filter(
    (nhanVien) => nhanVien.taiKhoan !== taiKhoan
  );

  localStorage.setItem("nhanVienList", JSON.stringify(updatedNhanVienList));

  hienThiDanhSachNhanVien(updatedNhanVienList);
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btnXoa")) {
    const taiKhoan = event.target.getAttribute("data-taikhoan");

    const confirmation = confirm("Bạn có chắc chắn muốn xoá không?");

    if (confirmation) {
      xoaNhanVien(taiKhoan);
    }
  }
});

// ---------------------------SHOW---------------------------
const nhanVienList = getNhanVienList();
hienThiDanhSachNhanVien(nhanVienList);

// Add ajax get event hide modal
$("#myModal").on("hide.bs.modal", function () {
  clearForm();
});
