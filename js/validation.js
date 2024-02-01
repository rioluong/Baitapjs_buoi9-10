function isInputValid(value, minLength, maxLength, regex, errorMessage) {
  if (
    value.trim() === "" ||
    !regex.test(value) ||
    value.length < minLength ||
    value.length > maxLength
  ) {
    alert(errorMessage);
    return false;
  }
  return true;
}

function validateInput() {
  const taiKhoan = tknvInput.value;
  const hoTen = nameInput.value;
  const email = emailInput.value;
  const matKhau = passwordInput.value;
  const ngayLam = ngaylamInput.value;
  const luongCoBan = luongCBInput.value;
  const chucVu = chucvuSelect.value;
  const gioLamTrongThang = gioLamInput.value;

  if (taiKhoan.length < 4 || taiKhoan.length > 6 || taiKhoan.trim() === "") {
    alert("Tài khoản phải có từ 4 đến 6 ký số và không được để trống");
    return false;
  }

  if (
    !isInputValid(
      hoTen,
      1,
      Infinity,
      /^[a-zA-Z]+$/,
      "Tên nhân viên phải là chữ và không được để trống"
    )
  ) {
    return false;
  }

  if (
    !isInputValid(
      email,
      1,
      Infinity,
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email phải đúng định dạng và không được để trống"
    )
  ) {
    return false;
  }

  if (
    !isInputValid(
      matKhau,
      6,
      10,
      /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/,
      "Mật khẩu phải từ 6-10 ký tự, bao gồm ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt, và không được để trống"
    )
  ) {
    return false;
  }

  if (
    !isInputValid(
      ngayLam,
      1,
      Infinity,
      /\d{2}\/\d{2}\/\d{4}/,
      "Ngày làm không được để trống và phải có định dạng mm/dd/yyyy"
    )
  ) {
    return false;
  }

  if (
    !isInputValid(
      luongCoBan,
      1,
      Infinity,
      /^(1000000|20000000|[1-9]\d{6,7})$/,
      "Lương cơ bản phải từ 1,000,000 đến 20,000,000 và không được để trống"
    )
  ) {
    return false;
  }

  if (!["Sếp", "Trưởng phòng", "Nhân viên"].includes(chucVu)) {
    alert("Vui lòng chọn chức vụ hợp lệ");
    return false;
  }

  if (
    !isInputValid(
      gioLamTrongThang,
      1,
      Infinity,
      /^(80|200|\d{2,3})$/,
      "Số giờ làm trong tháng phải từ 80 đến 200 và không được để trống"
    )
  ) {
    return false;
  }

  return true;
}
