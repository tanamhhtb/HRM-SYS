/**
 * Sinh file wireframe draw.io (.drawio) cho toàn bộ màn HRM.
 *   node mockups/generate-drawio.js
 * Mỗi màn = 1 page trong file. Dữ liệu/enum khớp với hrm-mock-api.
 */
const fs = require('fs');
const path = require('path');

// ---------------- hạ tầng ----------------
let _uid = 0;
const nid = () => 'c' + ++_uid;
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '&#10;');

function rect(page, o) {
  const id = o.id || nid();
  page.cells.push(
    `<mxCell id="${id}" value="${esc(o.value || '')}" style="${o.style || ''}" vertex="1" parent="1">` +
      `<mxGeometry x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" as="geometry"/></mxCell>`
  );
  return id;
}

// ---------------- bảng màu / style ----------------
const C = {
  ink: '#1F2937', sub: '#6B7280', line: '#E5E7EB', soft: '#F3F4F6',
  blue: '#2563EB', blueSoft: '#DBEAFE', dark: '#111827', place: '#9CA3AF',
};
const S = {
  frame: `rounded=0;whiteSpace=wrap;html=1;fillColor=#F9FAFB;strokeColor=#D1D5DB;`,
  sidebar: `rounded=0;whiteSpace=wrap;html=1;fillColor=${C.dark};strokeColor=none;`,
  brand: `text;html=1;fontColor=#FFFFFF;fontStyle=1;fontSize=16;align=left;spacingLeft=18;verticalAlign=middle;`,
  nav: `rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=none;fontColor=#CBD5E1;align=left;spacingLeft=16;`,
  navOn: `rounded=1;whiteSpace=wrap;html=1;fillColor=${C.blue};strokeColor=none;fontColor=#FFFFFF;fontStyle=1;align=left;spacingLeft=16;`,
  topbar: `rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${C.line};`,
  title: `text;html=1;fontColor=${C.ink};fontStyle=1;fontSize=18;align=left;verticalAlign=middle;`,
  sub: `text;html=1;fontColor=${C.sub};fontSize=12;align=left;verticalAlign=middle;`,
  card: `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${C.line};`,
  label: `text;html=1;fontColor=#374151;fontStyle=1;fontSize=12;align=left;verticalAlign=middle;`,
  input: `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontColor=${C.place};align=left;spacingLeft=10;fontSize=12;verticalAlign=middle;`,
  inputVal: `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontColor=${C.ink};align=left;spacingLeft=10;fontSize=12;verticalAlign=middle;`,
  primary: `rounded=1;whiteSpace=wrap;html=1;fillColor=${C.blue};strokeColor=none;fontColor=#FFFFFF;fontStyle=1;fontSize=12;`,
  ghost: `rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontColor=#374151;fontSize=12;`,
  danger: `rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=none;fontColor=#FFFFFF;fontStyle=1;fontSize=12;`,
  th: `whiteSpace=wrap;html=1;fillColor=${C.soft};strokeColor=${C.line};fontStyle=1;fontColor=#374151;fontSize=11;align=left;spacingLeft=8;`,
  td: `whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${C.line};fontColor=#374151;fontSize=11;align=left;spacingLeft=8;`,
  tdAlt: `whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=${C.line};fontColor=#374151;fontSize=11;align=left;spacingLeft=8;`,
  avatar: `ellipse;whiteSpace=wrap;html=1;fillColor=${C.blueSoft};strokeColor=#93C5FD;fontColor=${C.blue};fontStyle=1;`,
  chip: `rounded=1;whiteSpace=wrap;html=1;fillColor=#EEF2FF;strokeColor=#C7D2FE;fontColor=#3730A3;fontSize=10;`,
  divider: `line;strokeColor=${C.line};html=1;`,
};
const BADGE = {
  green: `rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;fontColor=#166534;fontSize=10;`,
  amber: `rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FCD34D;fontColor=#92400E;fontSize=10;`,
  red: `rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#FCA5A5;fontColor=#991B1B;fontSize=10;`,
  gray: `rounded=1;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;fontColor=#4B5563;fontSize=10;`,
  blue: `rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;fontColor=#1E40AF;fontSize=10;`,
};

// ---------------- kích thước khung ----------------
const W = 1320, H = 860, SBW = 210, TBH = 56;
const CX = SBW + 24, CY = TBH + 28, CW = W - SBW - 48;

const NAV = [
  ['Tổng quan', 'dashboard'],
  ['Nhân viên', 'employee'],
  ['Phòng ban', 'department'],
  ['Chức danh', 'position'],
  ['Chấm công', 'attendance'],
  ['Nghỉ phép', 'leave'],
  ['Bảng lương', 'payroll'],
  ['Người dùng', 'user'],
  ['Vai trò & Quyền', 'role'],
];

// vẽ khung app (sidebar + topbar). trả về toạ độ vùng nội dung
function shell(page, active, title, subtitle) {
  rect(page, { x: 0, y: 0, w: W, h: H, style: S.frame });
  rect(page, { x: 0, y: 0, w: SBW, h: H, style: S.sidebar });
  rect(page, { x: 0, y: 0, w: SBW, h: TBH, value: 'HRM System', style: S.brand });
  let ny = TBH + 24;
  for (const [label, key] of NAV) {
    rect(page, { x: 12, y: ny, w: SBW - 24, h: 38, value: label, style: key === active ? S.navOn : S.nav });
    ny += 44;
  }
  rect(page, { x: SBW, y: 0, w: W - SBW, h: TBH, style: S.topbar });
  rect(page, { x: CX, y: 14, w: 600, h: 28, value: title, style: S.title });
  // avatar + tên ở góc phải topbar
  rect(page, { x: W - 220, y: 12, w: 32, h: 32, value: 'NA', style: S.avatar });
  rect(page, { x: W - 182, y: 12, w: 150, h: 32, value: 'Nguyễn Văn Anh ▾<br><span style=&quot;font-size:10px;color:#6B7280&quot;>ADMIN</span>', style: `text;html=1;align=left;verticalAlign=middle;fontColor=#374151;fontSize=12;` });
  if (subtitle) rect(page, { x: CX, y: TBH + 6, w: 700, h: 18, value: subtitle, style: S.sub });
  return { x: CX, y: subtitle ? TBH + 30 : CY };
}

function field(page, x, y, w, label, value, placeholder) {
  rect(page, { x, y, w, h: 18, value: label, style: S.label });
  rect(page, { x, y: y + 20, w, h: 34, value: value || placeholder || '', style: value ? S.inputVal : S.input });
  return y + 64;
}

function btn(page, x, y, w, label, kind) {
  rect(page, { x, y, w, h: 34, value: label, style: S[kind || 'ghost'] });
  return x + w + 10;
}

function badge(page, x, y, text, color, w) {
  rect(page, { x, y, w: w || 78, h: 20, value: text, style: BADGE[color] });
}

// bảng dữ liệu. cols:[{t,w,align?}], rows: mỗi ô = string | {badge,text}
function table(page, x, y, cols, rows, rowH = 34) {
  let cx = x;
  for (const c of cols) {
    rect(page, { x: cx, y, w: c.w, h: rowH, value: c.t, style: S.th });
    cx += c.w;
  }
  rows.forEach((r, ri) => {
    const ry = y + rowH * (ri + 1);
    let rx = x;
    r.forEach((val, ci) => {
      const c = cols[ci];
      const base = ri % 2 ? S.tdAlt : S.td;
      if (val && typeof val === 'object' && val.badge) {
        rect(page, { x: rx, y: ry, w: c.w, h: rowH, value: '', style: base });
        badge(page, rx + 8, ry + (rowH - 20) / 2, val.text, val.badge, val.w || 86);
      } else {
        rect(page, { x: rx, y: ry, w: c.w, h: rowH, value: val == null ? '' : val, style: base });
      }
      rx += c.w;
    });
  });
  return y + rowH * (rows.length + 1);
}

function pager(page, x, y, w, info) {
  rect(page, { x, y, w: w - 280, h: 30, value: info, style: S.sub });
  let bx = x + w - 270;
  for (const lb of ['‹', '1', '2', '3', '…', '20', '›']) {
    const on = lb === '1';
    rect(page, { x: bx, y, w: 32, h: 30, value: lb, style: on ? S.primary : S.ghost });
    bx += 36;
  }
}

// ====================================================================
//  CÁC MÀN
// ====================================================================
const pages = [];
const newPage = (name) => {
  const p = { name, cells: [] };
  pages.push(p);
  return p;
};

// 1) LOGIN ----------------------------------------------------------
(() => {
  const p = newPage('01 · Đăng nhập');
  rect(p, { x: 0, y: 0, w: W, h: H, style: `rounded=0;html=1;fillColor=#EEF2F7;strokeColor=#D1D5DB;` });
  const cw = 420, ch = 470, x = (W - cw) / 2, y = (H - ch) / 2;
  rect(p, { x, y, w: cw, h: ch, style: S.card });
  rect(p, { x: x + (cw - 64) / 2, y: y + 36, w: 64, h: 64, value: 'HRM', style: S.avatar });
  rect(p, { x, y: y + 110, w: cw, h: 26, value: 'Đăng nhập hệ thống', style: `text;html=1;fontStyle=1;fontSize=18;align=center;fontColor=${C.ink};` });
  rect(p, { x, y: y + 138, w: cw, h: 18, value: 'Quản lý nhân sự', style: `text;html=1;fontSize=12;align=center;fontColor=${C.sub};` });
  let fy = y + 176;
  fy = field(p, x + 40, fy, cw - 80, 'Tên đăng nhập', '', 'emp0002');
  fy = field(p, x + 40, fy, cw - 80, 'Mật khẩu', '', '••••••');
  rect(p, { x: x + 40, y: fy, w: 16, h: 16, value: '', style: S.ghost });
  rect(p, { x: x + 60, y: fy - 2, w: 160, h: 20, value: 'Ghi nhớ đăng nhập', style: S.sub });
  rect(p, { x: x + cw - 140, y: fy - 2, w: 100, h: 20, value: 'Quên mật khẩu?', style: `text;html=1;fontSize=12;align=right;fontColor=${C.blue};` });
  rect(p, { x: x + 40, y: fy + 28, w: cw - 80, h: 40, value: 'Đăng nhập', style: S.primary });
  rect(p, { x: x + 40, y: fy + 76, w: cw - 80, h: 18, value: 'Mặc định: username = mã NV (emp0002) · mật khẩu 123456', style: `text;html=1;fontSize=10;align=center;fontColor=${C.place};` });
  rect(p, { x: 0, y: H - 70, w: W, h: 20, value: 'POST /api/v1/auth/login  →  { accessToken, tokenType, expiresIn, user }', style: `text;html=1;fontSize=11;align=center;fontColor=${C.sub};` });
})();

// 2) DASHBOARD ------------------------------------------------------
(() => {
  const p = newPage('02 · Tổng quan');
  const o = shell(p, 'dashboard', 'Tổng quan', 'Cập nhật 17/06/2026');
  // 4 thẻ số liệu chính
  const cardW = (CW - 3 * 16) / 4, cy = o.y;
  const stats = [
    ['Tổng nhân viên', '200', 'ACTIVE 142 · PROBATION 18', C.blue],
    ['Đơn nghỉ chờ duyệt', '37', 'PENDING cần xử lý', '#D97706'],
    ['Chấm công hôm nay', '163/200', 'PRESENT · LATE 11 · ABSENT 9', '#059669'],
    ['Nghỉ phép hôm nay', '15', 'ON_LEAVE đã duyệt', '#7C3AED'],
  ];
  stats.forEach(([t, n, s, col], i) => {
    const x = o.x + i * (cardW + 16);
    rect(p, { x, y: cy, w: cardW, h: 110, style: S.card });
    rect(p, { x: x + 16, y: cy + 14, w: cardW - 32, h: 16, value: t, style: S.sub });
    rect(p, { x: x + 16, y: cy + 32, w: cardW - 32, h: 36, value: n, style: `text;html=1;fontStyle=1;fontSize=28;align=left;fontColor=${col};` });
    rect(p, { x: x + 16, y: cy + 74, w: cardW - 32, h: 20, value: s, style: `text;html=1;fontSize=10;align=left;fontColor=${C.sub};` });
  });
  // hàng dưới: NV theo trạng thái + đơn nghỉ PENDING
  const ry = cy + 130, leftW = CW * 0.42, rightW = CW - leftW - 16, rightX = o.x + leftW + 16;
  rect(p, { x: o.x, y: ry, w: leftW, h: 330, style: S.card });
  rect(p, { x: o.x + 16, y: ry + 14, w: leftW - 32, h: 20, value: 'Nhân viên theo trạng thái', style: S.label });
  const statusRows = [
    ['ACTIVE', '142', 'green'], ['PROBATION', '18', 'blue'],
    ['INACTIVE', '24', 'gray'], ['TERMINATED', '16', 'red'],
  ];
  statusRows.forEach((sr, i) => {
    const yy = ry + 48 + i * 56;
    badge(p, o.x + 16, yy + 4, sr[0], sr[2], 110);
    // thanh bar
    const barW = leftW - 220;
    rect(p, { x: o.x + 140, y: yy, w: barW, h: 26, style: `rounded=1;html=1;fillColor=#F3F4F6;strokeColor=none;` });
    const ratios = { ACTIVE: 1, PROBATION: 0.32, INACTIVE: 0.42, TERMINATED: 0.28 };
    rect(p, { x: o.x + 140, y: yy, w: Math.round(barW * ratios[sr[0]]), h: 26, style: `rounded=1;html=1;fillColor=${C.blue};strokeColor=none;` });
    rect(p, { x: o.x + leftW - 64, y: yy, w: 48, h: 26, value: sr[1], style: `text;html=1;fontStyle=1;fontSize=13;align=right;fontColor=${C.ink};verticalAlign=middle;` });
  });
  // panel phải: đơn nghỉ PENDING gần đây
  rect(p, { x: rightX, y: ry, w: rightW, h: 330, style: S.card });
  rect(p, { x: rightX + 16, y: ry + 14, w: rightW - 200, h: 20, value: 'Đơn nghỉ chờ duyệt (PENDING)', style: S.label });
  rect(p, { x: rightX + rightW - 110, y: ry + 12, w: 94, h: 24, value: 'Xem tất cả', style: S.ghost });
  table(p, rightX + 16, ry + 44, [
    { t: 'Nhân viên', w: (rightW - 32) * 0.28 },
    { t: 'Loại', w: (rightW - 32) * 0.16 },
    { t: 'Từ ngày', w: (rightW - 32) * 0.16 },
    { t: 'Số ngày', w: (rightW - 32) * 0.12 },
    { t: 'Trạng thái', w: (rightW - 32) * 0.28 },
  ], [
    ['Trần Thị Hà', { badge: 'blue', text: 'ANNUAL' }, '20/06', '3', { badge: 'amber', text: 'PENDING' }],
    ['Lê Văn Hùng', { badge: 'gray', text: 'SICK' }, '18/06', '2', { badge: 'amber', text: 'PENDING' }],
    ['Phạm Minh Tú', { badge: 'blue', text: 'ANNUAL' }, '22/06', '5', { badge: 'amber', text: 'PENDING' }],
    ['Vũ Ngọc Lan', { badge: 'gray', text: 'UNPAID' }, '25/06', '1', { badge: 'amber', text: 'PENDING' }],
    ['Đặng Quang Nam', { badge: 'blue', text: 'MARRIAGE' }, '01/07', '3', { badge: 'amber', text: 'PENDING' }],
  ], 30);
})();

// helper: list page chuẩn (filter + table + pager)
function listPage(name, active, title, sub, filters, actionLabel, cols, rows, pagerInfo) {
  const p = newPage(name);
  const o = shell(p, active, title, sub);
  // thanh filter
  rect(p, { x: o.x, y: o.y, w: CW, h: 64, style: S.card });
  let fx = o.x + 16;
  rect(p, { x: fx, y: o.y + 16, w: 240, h: 32, value: '🔎  Tìm kiếm (keyword)…', style: S.input });
  fx += 252;
  for (const f of filters) {
    rect(p, { x: fx, y: o.y + 16, w: 150, h: 32, value: f + '  ▾', style: S.input });
    fx += 162;
  }
  // nút bên phải
  rect(p, { x: o.x + CW - 240, y: o.y + 16, w: 100, h: 32, value: 'Bộ lọc', style: S.ghost });
  rect(p, { x: o.x + CW - 130, y: o.y + 16, w: 114, h: 32, value: '＋ ' + actionLabel, style: S.primary });
  // bảng
  const ty = o.y + 84;
  const end = table(p, o.x, ty, cols, rows);
  pager(p, o.x, end + 16, CW, pagerInfo);
  return p;
}

// 3) NHÂN VIÊN — DANH SÁCH -----------------------------------------
listPage('03 · Nhân viên — Danh sách', 'employee', 'Nhân viên', 'Quản lý hồ sơ nhân viên',
  ['Phòng ban', 'Chức danh', 'Trạng thái'], 'Thêm nhân viên',
  [
    { t: 'Mã NV', w: 90 }, { t: 'Họ tên', w: 200 }, { t: 'Email', w: 230 },
    { t: 'Phòng ban', w: 150 }, { t: 'Chức danh', w: 180 }, { t: 'Lương', w: 120 },
    { t: 'Trạng thái', w: 110 }, { t: 'Thao tác', w: CW - 90 - 200 - 230 - 150 - 180 - 120 - 110 },
  ],
  [
    ['EMP0001', 'Nguyễn Văn Anh', 'anh.nguyen1@company.vn', 'IT', 'Lập trình viên', '18.400.000', { badge: 'green', text: 'ACTIVE' }, '👁 ✎ 🗑'],
    ['EMP0002', 'Trần Thị Hà', 'ha.tran2@company.vn', 'Nhân sự', 'Chuyên viên Nhân sự', '15.200.000', { badge: 'green', text: 'ACTIVE' }, '👁 ✎ 🗑'],
    ['EMP0003', 'Lê Văn Hùng', 'hung.le3@company.vn', 'Kinh doanh', 'NV Kinh doanh', '13.900.000', { badge: 'blue', text: 'PROBATION' }, '👁 ✎ 🗑'],
    ['EMP0004', 'Phạm Minh Tú', 'tu.pham4@company.vn', 'IT', 'Kỹ sư DevOps', '24.100.000', { badge: 'green', text: 'ACTIVE' }, '👁 ✎ 🗑'],
    ['EMP0005', 'Vũ Ngọc Lan', 'lan.vu5@company.vn', 'Kế toán', 'Kế toán tổng hợp', '22.600.000', { badge: 'gray', text: 'INACTIVE' }, '👁 ✎ 🗑'],
    ['EMP0006', 'Đặng Quang Nam', 'nam.dang6@company.vn', 'Marketing', 'CV Marketing', '16.800.000', { badge: 'red', text: 'TERMINATED' }, '👁 ✎ 🗑'],
    ['EMP0007', 'Hoàng Thị Mai', 'mai.hoang7@company.vn', 'QA', 'Kỹ sư QA', '17.500.000', { badge: 'green', text: 'ACTIVE' }, '👁 ✎ 🗑'],
  ],
  'Hiển thị 1–10 trong 200 · size 10 · sort fullName,asc');

// 4) NHÂN VIÊN — TẠO / 5) SỬA  (dùng chung form)
function employeeForm(name, title, sub, mode) {
  const p = newPage(name);
  const o = shell(p, 'employee', title, sub);
  rect(p, { x: o.x, y: o.y, w: CW, h: 560, style: S.card });
  const colW = (CW - 64) / 2, gx = o.x + 24, gx2 = gx + colW + 16;
  let yL = o.y + 24, yR = o.y + 24;
  const val = (s) => (mode === 'edit' ? s : '');
  yL = field(p, gx, yL, colW, 'Mã nhân viên *', val('EMP0002'), 'EMP____');
  yR = field(p, gx2, yR, colW, 'Họ và tên *', val('Trần Thị Hà'), 'Nguyễn Văn A');
  yL = field(p, gx, yL, colW, 'Giới tính *', val('FEMALE'), 'MALE / FEMALE  ▾');
  yR = field(p, gx2, yR, colW, 'Ngày sinh *', val('1994-08-12'), 'yyyy-mm-dd');
  yL = field(p, gx, yL, colW, 'Email *', val('ha.tran2@company.vn'), 'name@company.vn');
  yR = field(p, gx2, yR, colW, 'Số điện thoại *', val('0987654321'), '09xxxxxxxx');
  yL = field(p, gx, yL, colW, 'Phòng ban *', val('Phòng Nhân sự'), 'Chọn phòng ban  ▾');
  yR = field(p, gx2, yR, colW, 'Chức danh *', val('Chuyên viên Nhân sự'), 'Chọn chức danh  ▾');
  yL = field(p, gx, yL, colW, 'Ngày vào làm *', val('2021-03-01'), 'yyyy-mm-dd');
  yR = field(p, gx2, yR, colW, 'Lương cơ bản *', val('15.200.000'), 'VND');
  yL = field(p, gx, yL, colW, 'Trạng thái *', val('ACTIVE'), 'ACTIVE / PROBATION / INACTIVE / TERMINATED  ▾');
  // nút lưu/huỷ
  const by = o.y + 500;
  rect(p, { x: o.x + CW - 230, y: by, w: 100, h: 38, value: 'Huỷ', style: S.ghost });
  rect(p, { x: o.x + CW - 120, y: by, w: 104, h: 38, value: mode === 'edit' ? 'Cập nhật' : 'Lưu', style: S.primary });
  rect(p, { x: o.x + 24, y: by + 8, w: 500, h: 20, value: mode === 'edit' ? 'PUT /api/v1/employees/{id}' : 'POST /api/v1/employees', style: S.sub });
  return p;
}
employeeForm('04 · Nhân viên — Tạo mới', 'Thêm nhân viên', 'Nhân viên › Tạo mới', 'create');
employeeForm('05 · Nhân viên — Chỉnh sửa', 'Chỉnh sửa nhân viên', 'Nhân viên › EMP0002', 'edit');

// 6) NHÂN VIÊN — CHI TIẾT ------------------------------------------
(() => {
  const p = newPage('06 · Nhân viên — Chi tiết');
  const o = shell(p, 'employee', 'Hồ sơ nhân viên', 'Nhân viên › EMP0002 · Trần Thị Hà');
  // cột trái: thẻ tóm tắt
  const leftW = 320, rightX = o.x + leftW + 16, rightW = CW - leftW - 16;
  rect(p, { x: o.x, y: o.y, w: leftW, h: 420, style: S.card });
  rect(p, { x: o.x + (leftW - 88) / 2, y: o.y + 28, w: 88, h: 88, value: 'TH', style: S.avatar });
  rect(p, { x: o.x, y: o.y + 124, w: leftW, h: 24, value: 'Trần Thị Hà', style: `text;html=1;fontStyle=1;fontSize=16;align=center;fontColor=${C.ink};` });
  rect(p, { x: o.x, y: o.y + 150, w: leftW, h: 18, value: 'EMP0002 · Chuyên viên Nhân sự', style: `text;html=1;fontSize=12;align=center;fontColor=${C.sub};` });
  badge(p, o.x + (leftW - 86) / 2, o.y + 176, 'ACTIVE', 'green', 86);
  const info = [['Phòng ban', 'Phòng Nhân sự'], ['Email', 'ha.tran2@company.vn'], ['Điện thoại', '0987 654 321'], ['Giới tính', 'Nữ · 12/08/1994'], ['Ngày vào làm', '01/03/2021'], ['Lương', '15.200.000 ₫']];
  info.forEach((r, i) => {
    const yy = o.y + 214 + i * 32;
    rect(p, { x: o.x + 20, y: yy, w: 120, h: 20, value: r[0], style: S.sub });
    rect(p, { x: o.x + 140, y: yy, w: leftW - 160, h: 20, value: r[1], style: `text;html=1;fontSize=12;align=left;fontColor=${C.ink};verticalAlign=middle;` });
  });
  rect(p, { x: o.x + 20, y: o.y + 420 - 50, w: (leftW - 50) / 2, h: 34, value: '✎ Sửa', style: S.ghost });
  rect(p, { x: o.x + 30 + (leftW - 50) / 2, y: o.y + 420 - 50, w: (leftW - 50) / 2, h: 34, value: '🗑 Xoá', style: S.danger });
  // cột phải: tabs + chấm công + nghỉ phép + lương gần nhất
  rect(p, { x: rightX, y: o.y, w: rightW, h: 420, style: S.card });
  let tx = rightX + 16;
  for (const t of ['Chấm công', 'Nghỉ phép', 'Bảng lương']) {
    const on = t === 'Chấm công';
    rect(p, { x: tx, y: o.y + 14, w: 110, h: 32, value: t, style: on ? S.primary : S.ghost });
    tx += 120;
  }
  table(p, rightX + 16, o.y + 60, [
    { t: 'Ngày', w: 120 }, { t: 'Check-in', w: 110 }, { t: 'Check-out', w: 110 },
    { t: 'Giờ công', w: 110 }, { t: 'Trạng thái', w: rightW - 32 - 450 }, { t: '', w: 0 + 0 + 0 },
  ].slice(0, 5), [
    ['16/06/2026', '08:05', '17:32', '8.5', { badge: 'green', text: 'PRESENT' }],
    ['15/06/2026', '09:12', '18:01', '7.8', { badge: 'amber', text: 'LATE' }],
    ['14/06/2026', '08:00', '16:10', '7.2', { badge: 'amber', text: 'EARLY_LEAVE' }],
    ['13/06/2026', '—', '—', '0', { badge: 'red', text: 'ABSENT' }],
    ['12/06/2026', '—', '—', '0', { badge: 'gray', text: 'ON_LEAVE' }],
  ], 32);
  rect(p, { x: rightX + 16, y: o.y + 420 - 40, w: 400, h: 20, value: 'GET /api/v1/employees/{id}', style: S.sub });
})();

// 7) NHÂN VIÊN — XÁC NHẬN XOÁ (modal) ------------------------------
(() => {
  const p = newPage('07 · Nhân viên — Xoá (xác nhận)');
  // nền là màn danh sách mờ
  const o = shell(p, 'employee', 'Nhân viên', 'Quản lý hồ sơ nhân viên');
  rect(p, { x: o.x, y: o.y, w: CW, h: 64, style: S.card });
  rect(p, { x: o.x, y: o.y + 84, w: CW, h: 300, style: S.card });
  rect(p, { x: o.x + 16, y: o.y + 100, w: CW - 32, h: 24, value: '…bảng danh sách nhân viên…', style: S.sub });
  // lớp phủ
  rect(p, { x: 0, y: 0, w: W, h: H, style: `html=1;fillColor=#111827;opacity=45;strokeColor=none;` });
  // hộp thoại
  const mw = 460, mh = 240, mx = (W - mw) / 2, my = (H - mh) / 2;
  rect(p, { x: mx, y: my, w: mw, h: mh, style: S.card });
  rect(p, { x: mx + (mw - 56) / 2, y: my + 24, w: 56, h: 56, value: '🗑', style: `ellipse;html=1;fillColor=#FEE2E2;strokeColor=#FCA5A5;fontSize=22;` });
  rect(p, { x: mx, y: my + 90, w: mw, h: 26, value: 'Xoá nhân viên?', style: `text;html=1;fontStyle=1;fontSize=16;align=center;fontColor=${C.ink};` });
  rect(p, { x: mx + 30, y: my + 118, w: mw - 60, h: 40, value: 'Bạn có chắc muốn xoá <b>EMP0002 · Trần Thị Hà</b>? Hành động này không thể hoàn tác.', style: `text;html=1;fontSize=12;align=center;fontColor=${C.sub};` });
  rect(p, { x: mx + 30, y: my + mh - 56, w: (mw - 76) / 2, h: 38, value: 'Huỷ', style: S.ghost });
  rect(p, { x: mx + 46 + (mw - 76) / 2, y: my + mh - 56, w: (mw - 76) / 2, h: 38, value: 'Xoá', style: S.danger });
  rect(p, { x: mx, y: my + mh + 8, w: mw, h: 18, value: 'DELETE /api/v1/employees/{id}', style: `text;html=1;fontSize=11;align=center;fontColor=#E5E7EB;` });
})();

// 8) PHÒNG BAN ------------------------------------------------------
listPage('08 · Phòng ban', 'department', 'Phòng ban', 'Danh mục phòng ban',
  ['Tìm theo mã/tên'], 'Thêm phòng ban',
  [
    { t: 'ID', w: 70 }, { t: 'Mã', w: 130 }, { t: 'Tên phòng ban', w: 280 },
    { t: 'Mô tả', w: CW - 70 - 130 - 280 - 110 - 140 }, { t: 'Số NV', w: 110 }, { t: 'Thao tác', w: 140 },
  ],
  [
    ['1', 'BOD', 'Ban Giám đốc', 'Phụ trách điều hành chung', '6', '✎ 🗑'],
    ['2', 'HR', 'Phòng Nhân sự', 'Tuyển dụng, C&B, đào tạo', '14', '✎ 🗑'],
    ['3', 'ACC', 'Phòng Kế toán', 'Kế toán – thuế', '11', '✎ 🗑'],
    ['5', 'IT', 'Phòng Công nghệ thông tin', 'Phát triển & vận hành hệ thống', '23', '✎ 🗑'],
    ['6', 'SALES', 'Phòng Kinh doanh', 'Bán hàng & phát triển thị trường', '28', '✎ 🗑'],
    ['7', 'MKT', 'Phòng Marketing', 'Thương hiệu & truyền thông', '12', '✎ 🗑'],
  ],
  'Hiển thị 1–10 trong 20 phòng ban');

// 9) CHỨC DANH ------------------------------------------------------
listPage('09 · Chức danh', 'position', 'Chức danh', 'Danh mục chức danh & cấp bậc',
  ['Cấp bậc (level)'], 'Thêm chức danh',
  [
    { t: 'ID', w: 70 }, { t: 'Mã', w: 130 }, { t: 'Tên chức danh', w: 360 },
    { t: 'Cấp bậc', w: 160 }, { t: 'Lương tham chiếu', w: CW - 70 - 130 - 360 - 160 - 140 }, { t: 'Thao tác', w: 140 },
  ],
  [
    ['1', 'POS01', 'Tổng Giám đốc', { badge: 'red', text: 'EXECUTIVE' }, '80.000.000', '✎ 🗑'],
    ['4', 'POS04', 'Giám đốc Nhân sự', { badge: 'amber', text: 'DIRECTOR' }, '55.000.000', '✎ 🗑'],
    ['9', 'POS09', 'Trưởng phòng Nhân sự', { badge: 'blue', text: 'MANAGER' }, '38.000.000', '✎ 🗑'],
    ['20', 'POS20', 'Trưởng nhóm Phát triển', { badge: 'blue', text: 'LEAD' }, '28.000.000', '✎ 🗑'],
    ['25', 'POS25', 'Lập trình viên cao cấp', { badge: 'green', text: 'SENIOR' }, '22.000.000', '✎ 🗑'],
    ['26', 'POS26', 'Lập trình viên', { badge: 'gray', text: 'JUNIOR' }, '14.000.000', '✎ 🗑'],
    ['49', 'POS49', 'Thực tập sinh', { badge: 'gray', text: 'INTERN' }, '6.000.000', '✎ 🗑'],
  ],
  'Hiển thị 1–10 trong 50 chức danh');

// 10) CHẤM CÔNG -----------------------------------------------------
listPage('10 · Chấm công', 'attendance', 'Chấm công', 'Bản ghi chấm công theo ngày',
  ['Nhân viên', 'Trạng thái', 'Khoảng ngày'], 'Thêm bản ghi',
  [
    { t: 'Mã NV', w: 90 }, { t: 'Nhân viên', w: 200 }, { t: 'Ngày công', w: 130 },
    { t: 'Check-in', w: 110 }, { t: 'Check-out', w: 110 }, { t: 'Giờ công', w: 110 },
    { t: 'Trạng thái', w: 130 }, { t: 'Thao tác', w: CW - 90 - 200 - 130 - 110 - 110 - 110 - 130 },
  ],
  [
    ['EMP0001', 'Nguyễn Văn Anh', '16/06/2026', '08:05', '17:32', '8.5', { badge: 'green', text: 'PRESENT' }, '✎ 🗑'],
    ['EMP0002', 'Trần Thị Hà', '16/06/2026', '09:12', '18:01', '7.8', { badge: 'amber', text: 'LATE' }, '✎ 🗑'],
    ['EMP0004', 'Phạm Minh Tú', '16/06/2026', '08:00', '16:10', '7.2', { badge: 'amber', text: 'EARLY_LEAVE' }, '✎ 🗑'],
    ['EMP0007', 'Hoàng Thị Mai', '16/06/2026', '—', '—', '0', { badge: 'red', text: 'ABSENT' }, '✎ 🗑'],
    ['EMP0011', 'Bùi Văn Sơn', '16/06/2026', '—', '—', '0', { badge: 'gray', text: 'ON_LEAVE' }, '✎ 🗑'],
    ['EMP0003', 'Lê Văn Hùng', '15/06/2026', '08:01', '17:45', '8.7', { badge: 'green', text: 'PRESENT' }, '✎ 🗑'],
  ],
  'Hiển thị 1–10 trong 1000 bản ghi · workDate,desc');

// 11) NGHỈ PHÉP -----------------------------------------------------
(() => {
  const p = listPage('11 · Nghỉ phép', 'leave', 'Nghỉ phép', 'Đơn nghỉ & duyệt đơn',
    ['Loại nghỉ', 'Trạng thái'], 'Tạo đơn nghỉ',
    [
      { t: 'Mã NV', w: 90 }, { t: 'Nhân viên', w: 180 }, { t: 'Loại', w: 120 },
      { t: 'Từ ngày', w: 110 }, { t: 'Đến ngày', w: 110 }, { t: 'Số ngày', w: 90 },
      { t: 'Lý do', w: 170 }, { t: 'Trạng thái', w: 120 }, { t: 'Duyệt', w: CW - 90 - 180 - 120 - 110 - 110 - 90 - 170 - 120 },
    ],
    [
      ['EMP0002', 'Trần Thị Hà', { badge: 'blue', text: 'ANNUAL' }, '20/06', '22/06', '3', 'Nghỉ phép năm', { badge: 'amber', text: 'PENDING' }, '✔ ✘'],
      ['EMP0003', 'Lê Văn Hùng', { badge: 'gray', text: 'SICK' }, '18/06', '19/06', '2', 'Khám bệnh', { badge: 'amber', text: 'PENDING' }, '✔ ✘'],
      ['EMP0004', 'Phạm Minh Tú', { badge: 'blue', text: 'ANNUAL' }, '10/06', '14/06', '5', 'Du lịch', { badge: 'green', text: 'APPROVED' }, '👁'],
      ['EMP0007', 'Hoàng Thị Mai', { badge: 'blue', text: 'MATERNITY' }, '01/05', '30/10', '180', 'Thai sản', { badge: 'green', text: 'APPROVED' }, '👁'],
      ['EMP0005', 'Vũ Ngọc Lan', { badge: 'gray', text: 'UNPAID' }, '02/06', '02/06', '1', 'Việc cá nhân', { badge: 'red', text: 'REJECTED' }, '👁'],
      ['EMP0006', 'Đặng Quang Nam', { badge: 'blue', text: 'MARRIAGE' }, '12/06', '14/06', '3', 'Việc gia đình', { badge: 'gray', text: 'CANCELLED' }, '👁'],
    ],
    'Hiển thị 1–10 trong 300 đơn · PENDING 37');
})();

// 12) BẢNG LƯƠNG ----------------------------------------------------
listPage('12 · Bảng lương', 'payroll', 'Bảng lương', 'Bảng lương theo kỳ',
  ['Kỳ lương (2026-06)', 'Trạng thái'], 'Tạo kỳ lương',
  [
    { t: 'Mã NV', w: 90 }, { t: 'Nhân viên', w: 170 }, { t: 'Kỳ', w: 90 },
    { t: 'Lương CB', w: 120 }, { t: 'Phụ cấp', w: 110 }, { t: 'Thưởng', w: 100 },
    { t: 'Khấu trừ', w: 110 }, { t: 'Thực lĩnh', w: 130 }, { t: 'Trạng thái', w: CW - 90 - 170 - 90 - 120 - 110 - 100 - 110 - 130 },
  ],
  [
    ['EMP0001', 'Nguyễn Văn Anh', '2026-06', '18.400.000', '1.840.000', '0', '2.546.000', '17.694.000', { badge: 'green', text: 'PAID' }],
    ['EMP0002', 'Trần Thị Hà', '2026-06', '15.200.000', '1.520.000', '1.200.000', '2.150.000', '15.770.000', { badge: 'green', text: 'PAID' }],
    ['EMP0004', 'Phạm Minh Tú', '2026-06', '24.100.000', '2.410.000', '0', '3.231.000', '23.279.000', { badge: 'blue', text: 'APPROVED' }],
    ['EMP0005', 'Vũ Ngọc Lan', '2026-06', '22.600.000', '2.260.000', '2.000.000', '3.183.000', '23.677.000', { badge: 'gray', text: 'DRAFT' }],
    ['EMP0007', 'Hoàng Thị Mai', '2026-06', '17.500.000', '1.750.000', '0', '2.422.000', '16.828.000', { badge: 'green', text: 'PAID' }],
  ],
  'Hiển thị 1–10 trong 1000 dòng · tổng thực lĩnh kỳ 2026-06: 3.84 tỷ');

// 13) NGƯỜI DÙNG ----------------------------------------------------
listPage('13 · Người dùng', 'user', 'Người dùng', 'Tài khoản đăng nhập',
  ['Vai trò', 'Trạng thái'], 'Thêm tài khoản',
  [
    { t: 'ID', w: 70 }, { t: 'Username', w: 150 }, { t: 'Nhân viên', w: 200 },
    { t: 'Email', w: 230 }, { t: 'Vai trò', w: 150 }, { t: 'Đăng nhập cuối', w: 160 },
    { t: 'Kích hoạt', w: 110 }, { t: 'Thao tác', w: CW - 70 - 150 - 200 - 230 - 150 - 160 - 110 },
  ],
  [
    ['1', 'emp0001', 'Nguyễn Văn Anh', 'anh.nguyen1@company.vn', { badge: 'red', text: 'ADMIN' }, '16/06 08:12', { badge: 'green', text: 'true' }, '✎ 🗑'],
    ['2', 'emp0002', 'Trần Thị Hà', 'ha.tran2@company.vn', { badge: 'blue', text: 'HR_STAFF' }, '15/06 17:40', { badge: 'green', text: 'true' }, '✎ 🗑'],
    ['3', 'emp0003', 'Lê Văn Hùng', 'hung.le3@company.vn', { badge: 'gray', text: 'EMPLOYEE' }, '12/06 09:05', { badge: 'green', text: 'true' }, '✎ 🗑'],
    ['5', 'emp0005', 'Vũ Ngọc Lan', 'lan.vu5@company.vn', { badge: 'amber', text: 'ACCOUNTANT' }, '—', { badge: 'gray', text: 'false' }, '✎ 🗑'],
    ['9', 'emp0009', 'Phan Văn Long', 'long.phan9@company.vn', { badge: 'blue', text: 'HR_MANAGER' }, '14/06 11:20', { badge: 'green', text: 'true' }, '✎ 🗑'],
  ],
  'Hiển thị 1–10 trong 200 tài khoản');

// 14) VAI TRÒ & QUYỀN (ma trận) ------------------------------------
(() => {
  const p = newPage('14 · Vai trò & Quyền');
  const o = shell(p, 'role', 'Vai trò & Quyền', 'Phân quyền theo module × hành động');
  // cột trái: danh sách role
  const leftW = 300, rightX = o.x + leftW + 16, rightW = CW - leftW - 16;
  rect(p, { x: o.x, y: o.y, w: leftW, h: 520, style: S.card });
  rect(p, { x: o.x + 16, y: o.y + 14, w: leftW - 110, h: 22, value: 'Vai trò (6)', style: S.label });
  rect(p, { x: o.x + leftW - 96, y: o.y + 12, w: 80, h: 26, value: '＋ Thêm', style: S.primary });
  const roles = [
    ['ADMIN', 'Toàn quyền · 32 quyền', 'red', true],
    ['HR_MANAGER', 'Nhân sự, chấm công, lương', 'amber', false],
    ['HR_STAFF', 'Nghiệp vụ NS cơ bản', 'blue', false],
    ['ACCOUNTANT', 'Bảng lương', 'green', false],
    ['MANAGER', 'Duyệt nghỉ, xem NS', 'blue', false],
    ['EMPLOYEE', 'Tự phục vụ', 'gray', false],
  ];
  roles.forEach((r, i) => {
    const yy = o.y + 50 + i * 70;
    rect(p, { x: o.x + 12, y: yy, w: leftW - 24, h: 60, style: r[3] ? `rounded=1;html=1;fillColor=#EFF6FF;strokeColor=${C.blue};` : S.card });
    badge(p, o.x + 24, yy + 12, r[0], r[2], 110);
    rect(p, { x: o.x + 24, y: yy + 34, w: leftW - 48, h: 18, value: r[1], style: S.sub });
  });
  // cột phải: ma trận quyền của ADMIN
  rect(p, { x: rightX, y: o.y, w: rightW, h: 520, style: S.card });
  rect(p, { x: rightX + 16, y: o.y + 14, w: rightW - 32, h: 22, value: 'Ma trận quyền · vai trò ADMIN', style: S.label });
  const acts = ['VIEW', 'CREATE', 'UPDATE', 'DELETE'];
  const mods = [['employee', 'Nhân viên'], ['department', 'Phòng ban'], ['position', 'Chức danh'], ['attendance', 'Chấm công'], ['leave', 'Nghỉ phép'], ['payroll', 'Bảng lương'], ['user', 'Người dùng'], ['role', 'Vai trò']];
  const mLabelW = 220, cellW = (rightW - 32 - mLabelW) / 4;
  const tx0 = rightX + 16, ty0 = o.y + 48;
  // header
  rect(p, { x: tx0, y: ty0, w: mLabelW, h: 34, value: 'Module', style: S.th });
  acts.forEach((a, i) => rect(p, { x: tx0 + mLabelW + i * cellW, y: ty0, w: cellW, h: 34, value: a, style: `${S.th}align=center;spacingLeft=0;` }));
  // rows: ADMIN có hết -> tất cả ✔
  mods.forEach((m, ri) => {
    const ry = ty0 + 34 * (ri + 1);
    rect(p, { x: tx0, y: ry, w: mLabelW, h: 34, value: m[1] + '  <span style=&quot;color:#9CA3AF&quot;>' + m[0] + '</span>', style: ri % 2 ? S.tdAlt : S.td });
    acts.forEach((a, ci) => {
      rect(p, { x: tx0 + mLabelW + ci * cellW, y: ry, w: cellW, h: 34, value: '☑', style: `whiteSpace=wrap;html=1;fillColor=${ri % 2 ? '#FAFAFA' : '#FFFFFF'};strokeColor=${C.line};align=center;fontColor=${C.blue};fontSize=14;` });
    });
  });
  rect(p, { x: rightX + rightW - 220, y: o.y + 520 - 50, w: 100, h: 36, value: 'Huỷ', style: S.ghost });
  rect(p, { x: rightX + rightW - 112, y: o.y + 520 - 50, w: 96, h: 36, value: 'Lưu quyền', style: S.primary });
})();

// 15) HỒ SƠ CÁ NHÂN (PROFILE) --------------------------------------
(() => {
  const p = newPage('15 · Hồ sơ cá nhân (Profile)');
  const o = shell(p, '', 'Hồ sơ của tôi', 'GET /api/v1/auth/profile');
  const leftW = 360, rightX = o.x + leftW + 16, rightW = CW - leftW - 16;
  // cột trái: thẻ cá nhân
  rect(p, { x: o.x, y: o.y, w: leftW, h: 440, style: S.card });
  rect(p, { x: o.x + (leftW - 96) / 2, y: o.y + 30, w: 96, h: 96, value: 'NA', style: S.avatar });
  rect(p, { x: o.x, y: o.y + 134, w: leftW, h: 24, value: 'Nguyễn Văn Anh', style: `text;html=1;fontStyle=1;fontSize=16;align=center;fontColor=${C.ink};` });
  rect(p, { x: o.x, y: o.y + 160, w: leftW, h: 18, value: 'EMP0001 · emp0001', style: `text;html=1;fontSize=12;align=center;fontColor=${C.sub};` });
  badge(p, o.x + (leftW - 90) / 2, o.y + 186, 'ADMIN', 'red', 90);
  const info = [['Phòng ban', 'Phòng CNTT'], ['Chức danh', 'Lập trình viên'], ['Email', 'anh.nguyen1@company.vn'], ['Điện thoại', '0912 345 678'], ['Đăng nhập cuối', '16/06/2026 08:12']];
  info.forEach((r, i) => {
    const yy = o.y + 224 + i * 32;
    rect(p, { x: o.x + 24, y: yy, w: 130, h: 20, value: r[0], style: S.sub });
    rect(p, { x: o.x + 150, y: yy, w: leftW - 174, h: 20, value: r[1], style: `text;html=1;fontSize=12;align=left;fontColor=${C.ink};verticalAlign=middle;` });
  });
  // cột phải: quyền + đổi mật khẩu
  rect(p, { x: rightX, y: o.y, w: rightW, h: 230, style: S.card });
  rect(p, { x: rightX + 16, y: o.y + 14, w: rightW - 32, h: 20, value: 'Quyền của tôi (permissions)', style: S.label });
  const perms = ['EMPLOYEE_VIEW', 'EMPLOYEE_CREATE', 'EMPLOYEE_UPDATE', 'EMPLOYEE_DELETE', 'ATTENDANCE_VIEW', 'LEAVE_VIEW', 'LEAVE_UPDATE', 'PAYROLL_VIEW', 'USER_VIEW', 'ROLE_VIEW', 'DEPARTMENT_VIEW', 'POSITION_VIEW'];
  let px = rightX + 16, py = o.y + 44;
  perms.forEach((pm) => {
    const w = 12 + pm.length * 6.4;
    if (px + w > rightX + rightW - 16) { px = rightX + 16; py += 30; }
    rect(p, { x: px, y: py, w, h: 24, value: pm, style: S.chip });
    px += w + 8;
  });
  rect(p, { x: rightX + 16, y: o.y + 196, w: rightW - 32, h: 18, value: '… và các quyền khác theo vai trò ADMIN (32 quyền)', style: S.sub });
  // đổi mật khẩu
  rect(p, { x: rightX, y: o.y + 246, w: rightW, h: 194, style: S.card });
  rect(p, { x: rightX + 16, y: o.y + 260, w: rightW - 32, h: 20, value: 'Đổi mật khẩu', style: S.label });
  field(p, rightX + 24, o.y + 286, (rightW - 64) / 2, 'Mật khẩu hiện tại', '', '••••••');
  field(p, rightX + 40 + (rightW - 64) / 2, o.y + 286, (rightW - 64) / 2, 'Mật khẩu mới', '', '••••••');
  rect(p, { x: rightX + rightW - 160, y: o.y + 246 + 194 - 50, w: 144, h: 36, value: 'Cập nhật mật khẩu', style: S.primary });
})();

// ====================================================================
//  XUẤT FILE .drawio
// ====================================================================
const diagrams = pages
  .map((p, i) => {
    const model =
      `<mxGraphModel dx="900" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${W}" pageHeight="${H}" math="0" shadow="0">` +
      `<root><mxCell id="0"/><mxCell id="1" parent="0"/>` +
      p.cells.join('') +
      `</root></mxGraphModel>`;
    return `<diagram id="pg${i + 1}" name="${esc(p.name)}">${model}</diagram>`;
  })
  .join('');

const xml = `<mxfile host="app.diagrams.net" type="device">${diagrams}</mxfile>`;
const out = path.join(__dirname, 'hrm-mock-ui.drawio');
fs.writeFileSync(out, xml, 'utf8');
console.log('Đã tạo', out);
console.log('Số trang:', pages.length);
pages.forEach((p) => console.log('  -', p.name));
