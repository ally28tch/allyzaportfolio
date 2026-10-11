/* ==========================================================================
   ADMIN — API
   ========================================================================== */
const API = "php/admin_api.php";
const POLL_MS = 15000;

function parseJSON(text){
  try{ return JSON.parse(text); }catch(err){ /* try to skip stray output */ }
  const i = text.indexOf("{"), j = text.lastIndexOf("}");
  if (i !== -1 && j > i){
    try{ return JSON.parse(text.slice(i, j + 1)); }catch(err){ /* not JSON */ }
  }
  return null;
}

function serverProblem(status, url){
  const where = " [" + status + " · " + new URL(url, location.href).href + "]";
  if (status === 404) return "The server could not find the PHP files (404). Put the whole site folder, including the php folder, inside xampp/htdocs and open this page at http://localhost/allyza/admin." + (location.pathname.toLowerCase().endsWith(".htm") ? "htm" : "html") + "." + where;
  if (status === 405) return "The server refused the request (405). Open this page through XAMPP Apache at http://localhost/allyza/admin." + (location.pathname.toLowerCase().endsWith(".htm") ? "htm" : "html") + ", not Live Server." + where;
  return "PHP did not return a valid answer (status " + status + "). Open http://localhost/allyza/php/check.php to see what is wrong." + where;
}

async function api(action, { method = "GET", params = {}, body = null } = {}){
  if (location.protocol === "file:"){
    return { success: false, message: "This page was opened as a file. Start Apache in XAMPP and open http://localhost/allyza/admin." + (location.pathname.toLowerCase().endsWith(".htm") ? "htm" : "html") + " instead." };
  }
  const qs = new URLSearchParams({ action, ...params }).toString();
  let res;
  try{
    res = await fetch(`${API}?${qs}`, {
      method,
      headers: { "X-Requested-With": "fetch", ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin"
    });
  }catch(err){
    return { success: false, message: "Could not reach the server at " + new URL(API, location.href).href + ". Start Apache and MySQL in the XAMPP Control Panel and open this page through http://localhost/." };
  }
  const json = parseJSON(await res.text());
  if (res.status === 401 && action !== "login" && action !== "me"){
    showLogin();
    return { success: false, message: "Please log in." };
  }
  if (json && typeof json.success === "boolean"){
    if (!json.success && !json.message) json.message = serverProblem(res.status, API);
    return json;
  }
  return { success: false, message: serverProblem(res.status, API) };
}

/* ==========================================================================
   ADMIN — HELPERS
   ========================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(v){
  const d = document.createElement("div");
  d.textContent = String(v ?? "");
  return d.innerHTML;
}
function peso(n){
  return "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(s){
  const d = new Date(String(s).replace(" ", "T"));
  if (isNaN(d)) return s;
  return d.toLocaleString("en-PH", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}
const ORDER_LABEL = { new: "New", processing: "Processing", completed: "Completed", cancelled: "Cancelled" };
const PAY_LABEL = { pending: "Payment pending", paid: "Paid" };
const METHOD_LABEL = { GCash: "GCash", Maya: "Maya", COD: "Cash on Delivery" };

function typePills(o){
  return `${+o.has_physical ? '<span class="pill pill-physical">Physical</span>' : ""}${+o.has_digital ? '<span class="pill pill-digital">Digital</span>' : ""}`;
}

let noticeTimer = null;
function showNotice(text){
  const el = $("#notice");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { el.hidden = true; }, 8000);
}

/* ==========================================================================
   ADMIN — LOGIN / VIEWS
   ========================================================================== */
const loginView = $("#loginView");
const appView = $("#appView");
let pollTimer = null;

function showLogin(){
  clearInterval(pollTimer);
  appView.hidden = true;
  loginView.hidden = false;
  document.title = "Admin — @ally's creates";
}

async function showApp(){
  loginView.hidden = true;
  appView.hidden = false;
  await refreshAll();
  clearInterval(pollTimer);
  pollTimer = setInterval(poll, POLL_MS);
}

$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#loginError");
  const btn = $("#loginBtn");
  err.hidden = true;
  btn.disabled = true;
  const r = await api("login", { method: "POST", body: { username: $("#loginUser").value.trim(), password: $("#loginPass").value } });
  btn.disabled = false;
  if (!r.success){
    err.textContent = r.message;
    err.hidden = false;
    return;
  }
  $("#loginPass").value = "";
  showApp();
});

$("#logoutBtn").addEventListener("click", async () => {
  await api("logout", { method: "POST", body: {} });
  showLogin();
});

/* ==========================================================================
   ADMIN — TABS
   ========================================================================== */
let currentTab = "dashboard";

function goTab(name){
  currentTab = name;
  $$(".adm-tab").forEach(t => t.classList.toggle("is-active", t.dataset.tab === name));
  $$(".tab").forEach(t => { t.hidden = t.id !== "tab-" + name; });
  if (name === "dashboard") loadDashboard();
  if (name === "orders") loadOrders();
  if (name === "messages") loadMessages();
  if (name === "products") loadProducts();
}
$$(".adm-tab").forEach(t => t.addEventListener("click", () => goTab(t.dataset.tab)));
$$("[data-goto]").forEach(b => b.addEventListener("click", () => goTab(b.dataset.goto)));

/* ==========================================================================
   ADMIN — DASHBOARD
   ========================================================================== */
let lastStats = null;
let orderStatus = "";

function applyBadges(s){
  const bo = $("#badgeOrders"), bm = $("#badgeMessages");
  bo.textContent = s.orders_new; bo.hidden = !+s.orders_new;
  bm.textContent = s.unread_messages; bm.hidden = !+s.unread_messages;
  const su = $("#segUnread");
  su.textContent = s.unread_messages; su.hidden = !+s.unread_messages;
  const alerts = (+s.orders_new) + (+s.unread_messages);
  document.title = (alerts ? `(${alerts}) ` : "") + "Admin — @ally's creates";
  renderStatusSeg(s);
}

function renderAttention(s){
  const el = $("#attention");
  const n = +s.orders_new, m = +s.unread_messages;
  el.hidden = false;
  el.classList.toggle("is-clear", !n && !m);
  if (!n && !m){
    el.textContent = "You're all caught up. No new orders or messages.";
    el.onclick = null;
    return;
  }
  const parts = [];
  if (n) parts.push(`${n} new order${n === 1 ? "" : "s"}`);
  if (m) parts.push(`${m} unread message${m === 1 ? "" : "s"}`);
  el.innerHTML = `<span class="dot"></span><span>You have ${parts.join(" and ")}</span><span class="attn-go">View</span>`;
  el.onclick = () => { if (n){ orderStatus = "new"; goTab("orders"); } else goTab("messages"); };
}

function renderStats(s){
  const by = s.by_status || {};
  const cards = [
    { label: "New orders", value: by.new ?? 0, go: () => { orderStatus = "new"; goTab("orders"); }, alert: +s.orders_new > 0 },
    { label: "Processing", value: by.processing ?? 0, go: () => { orderStatus = "processing"; goTab("orders"); } },
    { label: "Unread messages", value: s.unread_messages, go: () => goTab("messages"), alert: +s.unread_messages > 0 },
    { label: "Total orders", value: s.orders_total, go: () => { orderStatus = ""; goTab("orders"); } },
    { label: "Sales", value: peso(s.sales_total), sub: `${peso(s.sales_paid)} marked paid` }
  ];
  const grid = $("#statGrid");
  grid.innerHTML = cards.map((c, i) => `
    <${c.go ? "button type=\"button\"" : "div"} class="stat${c.alert ? " is-alert" : ""}" data-stat="${i}">
      <span class="stat-label">${esc(c.label)}</span>
      <span class="stat-value">${esc(c.value)}</span>
      ${c.sub ? `<span class="stat-sub">${esc(c.sub)}</span>` : ""}
    </${c.go ? "button" : "div"}>
  `).join("");
  $$("[data-stat]", grid).forEach(el => {
    const c = cards[el.dataset.stat];
    if (c.go) el.addEventListener("click", c.go);
  });
  renderAttention(s);
}

async function loadDashboard(){
  const [s, o, m] = await Promise.all([
    api("stats"),
    api("orders", { params: { active: "1", limit: 6 } }),
    api("messages", { params: { filter: "all" } })
  ]);
  if (s.success){ lastStats = s.stats; renderStats(s.stats); applyBadges(s.stats); }
  else showNotice(s.message);

  const dd = $("#dashOrders");
  if (o.success){
    dd.innerHTML = o.orders.length ? o.orders.map(x => `
      <button type="button" class="mini${+x.is_seen ? "" : " is-unread"}" data-order="${x.id}">
        <span class="mini-top"><span>${esc(x.order_code)} · ${esc(x.customer_name)}</span><span>${peso(x.total)}</span></span>
        <span class="mini-sub">${esc(x.items || "")}</span>
        <span class="pill-row">${typePills(x)}<span class="pill pill-${x.order_status}">${ORDER_LABEL[x.order_status]}</span><span class="pill pill-${x.payment_status}">${PAY_LABEL[x.payment_status]}</span></span>
      </button>`).join("") : `<p class="empty">No orders waiting.</p>`;
    $$("[data-order]", dd).forEach(b => b.addEventListener("click", () => openOrder(b.dataset.order)));
  }

  const dm = $("#dashMessages");
  if (m.success){
    const rows = m.messages.slice(0, 5);
    dm.innerHTML = rows.length ? rows.map(x => `
      <button type="button" class="mini${+x.is_read ? "" : " is-unread"}" data-goto-msg="${x.id}">
        <span class="mini-top"><span>${esc(x.name)}</span><span>${esc(fmtDate(x.created_at))}</span></span>
        <span class="mini-sub">${esc(x.message.slice(0, 90))}${x.message.length > 90 ? "…" : ""}</span>
      </button>`).join("") : `<p class="empty">No messages yet.</p>`;
    $$("[data-goto-msg]", dm).forEach(b => b.addEventListener("click", () => goTab("messages")));
  }
}

/* ==========================================================================
   ADMIN — ORDERS
   ========================================================================== */
let searchTimer = null;

function renderStatusSeg(s){
  const by = (s && s.by_status) || {};
  const items = [
    ["", "All", s ? s.orders_total : 0],
    ["new", "New", by.new ?? 0],
    ["processing", "Processing", by.processing ?? 0],
    ["completed", "Completed", by.completed ?? 0],
    ["cancelled", "Cancelled", by.cancelled ?? 0]
  ];
  $("#statusSeg").innerHTML = items.map(([v, label, n]) =>
    `<button type="button" class="seg-btn${orderStatus === v ? " is-active" : ""}" data-status="${v}">${label} <span class="seg-count">${n}</span></button>`
  ).join("");
  $$("[data-status]", $("#statusSeg")).forEach(b => b.addEventListener("click", () => {
    orderStatus = b.dataset.status;
    loadOrders();
  }));
}

function currentOrderParams(){
  const p = {};
  if (orderStatus) p.status = orderStatus;
  if ($("#fType").value) p.type = $("#fType").value;
  if ($("#fSearch").value.trim()) p.q = $("#fSearch").value.trim();
  return p;
}

async function loadOrders(){
  if (lastStats) renderStatusSeg(lastStats);
  const r = await api("orders", { params: currentOrderParams() });
  if (!r.success){ showNotice(r.message); return; }
  $("#ordersEmpty").hidden = r.orders.length > 0;
  $("#ordersBody").innerHTML = r.orders.map(o => `
    <tr data-order="${o.id}" class="${+o.is_seen ? "" : "is-new"}">
      <td><span class="cell-code">${esc(o.order_code)}${+o.is_seen ? "" : '<span class="new-tag">NEW</span>'}</span><span class="cell-sub">${esc(fmtDate(o.created_at))}</span></td>
      <td>${esc(o.customer_name)}<span class="cell-sub">${esc(o.contact_number)}</span></td>
      <td class="cell-items">${esc(o.items || "")}<span class="pill-row">${typePills(o)}</span></td>
      <td class="cell-total">${peso(o.total)}</td>
      <td>${esc(METHOD_LABEL[o.payment_method])}<span class="pill-row"><span class="pill pill-${o.payment_status}">${PAY_LABEL[o.payment_status]}</span></span></td>
      <td><span class="pill pill-${o.order_status}">${ORDER_LABEL[o.order_status]}</span></td>
    </tr>`).join("");
  $$("#ordersBody tr").forEach(tr => tr.addEventListener("click", () => openOrder(tr.dataset.order)));
}

$("#fType").addEventListener("change", loadOrders);
$("#fSearch").addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(loadOrders, 300); });

/* Order detail */
const orderOverlay = $("#orderOverlay");

async function openOrder(id){
  const r = await api("order", { params: { id } });
  if (!r.success){ showNotice(r.message); return; }
  const o = r.order;
  const digital = +o.has_digital === 1;

  const mailSubject = encodeURIComponent(`Your order ${o.order_code} — @ally's creates`);
  const mailBody = encodeURIComponent(`Hi ${o.customer_name},\n\nThank you for your order ${o.order_code}! Your file is attached to this email.\n\nPlease let me know if you have any questions.\n\n— Ally`);

  $("#orderBody").innerHTML = `
    <h2 id="orderTitle">${esc(o.order_code)}</h2>
    <p class="modal-sub">${esc(fmtDate(o.created_at))} <span class="pill-row" style="display:inline-flex;margin:0 0 0 .4rem">${typePills(o)}</span></p>

    ${digital ? `
      <div class="callout">
        <p><strong>Digital order.</strong> Check the ${esc(METHOD_LABEL[o.payment_method])} payment (reference <strong>${esc(o.payment_reference || "—")}</strong>), then send the PDF to the customer and mark the order as Completed.</p>
        <a class="btn btn-primary btn-sm" href="mailto:${esc(o.email)}?subject=${mailSubject}&body=${mailBody}">Email the customer</a>
      </div>` : ""}

    <dl class="kv">
      <dt>Customer</dt><dd>${esc(o.customer_name)}</dd>
      <dt>Email</dt><dd><a href="mailto:${esc(o.email)}">${esc(o.email)}</a></dd>
      <dt>Contact number</dt><dd>${esc(o.contact_number)}</dd>
      ${o.address ? `<dt>Address</dt><dd>${esc(o.address)}</dd>` : ""}
      ${o.notes ? `<dt>Customer notes</dt><dd>${esc(o.notes)}</dd>` : ""}
      <dt>Payment</dt><dd>${esc(METHOD_LABEL[o.payment_method])}${o.payment_reference ? " · Ref " + esc(o.payment_reference) : ""}</dd>
    </dl>

    <table class="items-table">
      <thead><tr><th>Item</th><th>Design</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr></thead>
      <tbody>
        ${r.items.map(i => `<tr>
          <td>${esc(i.product_name)}</td>
          <td>${i.design ? "Design " + esc(i.design) : "—"}</td>
          <td>${peso(i.unit_price)}</td>
          <td>${esc(i.quantity)}</td>
          <td>${peso(i.unit_price * i.quantity)}</td>
        </tr>`).join("")}
        <tr class="items-total"><td colspan="4">Total</td><td>${peso(o.total)}</td></tr>
      </tbody>
    </table>

    <div class="form-grid">
      <div class="field">
        <label for="oStatus">Order status</label>
        <select id="oStatus">
          ${["new", "processing", "completed", "cancelled"].map(s => `<option value="${s}"${o.order_status === s ? " selected" : ""}>${ORDER_LABEL[s]}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="oPay">Payment status</label>
        <select id="oPay">
          ${["pending", "paid"].map(s => `<option value="${s}"${o.payment_status === s ? " selected" : ""}>${s === "paid" ? "Paid" : "Pending"}</option>`).join("")}
        </select>
      </div>
    </div>
    <div class="field">
      <label for="oNotes">Private notes (only you can see these)</label>
      <textarea id="oNotes" rows="3">${esc(o.admin_notes || "")}</textarea>
    </div>

    <div class="modal-actions">
      <button type="button" class="btn btn-primary" id="oSave">Save Changes</button>
      <button type="button" class="btn btn-ghost" id="oPaid">Mark Paid</button>
      <button type="button" class="btn btn-ghost" id="oDone">Mark Completed</button>
      <span class="save-note" id="oSaved" hidden>Saved ✓</span>
    </div>`;

  const save = async (patch = {}) => {
    if (patch.order_status) $("#oStatus").value = patch.order_status;
    if (patch.payment_status) $("#oPay").value = patch.payment_status;
    const res = await api("order_update", { method: "POST", body: {
      id: o.id, order_status: $("#oStatus").value, payment_status: $("#oPay").value, admin_notes: $("#oNotes").value
    } });
    if (!res.success){ showNotice(res.message); return; }
    const note = $("#oSaved");
    note.hidden = false;
    setTimeout(() => { note.hidden = true; }, 1800);
    refreshAll();
  };
  $("#oSave").addEventListener("click", () => save());
  $("#oPaid").addEventListener("click", () => save({ payment_status: "paid" }));
  $("#oDone").addEventListener("click", () => save({ order_status: "completed", payment_status: o.payment_method === "COD" ? $("#oPay").value : "paid" }));

  orderOverlay.hidden = false;
  $(".modal", orderOverlay).scrollTop = 0;
  refreshAll();
}

$$("[data-close]").forEach(b => b.addEventListener("click", () => { orderOverlay.hidden = true; }));
orderOverlay.addEventListener("click", (e) => { if (e.target === orderOverlay) orderOverlay.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") orderOverlay.hidden = true; });

/* ==========================================================================
   ADMIN — PRODUCTS
   ========================================================================== */
async function loadProducts(){
  const r = await api("products");
  if (!r.success){ showNotice(r.message); return; }
  const rows = r.products;
  $("#productsBody").innerHTML = ["physical", "digital"].map(type => {
    const list = rows.filter(p => p.type === type);
    if (!list.length) return "";
    return `<tr class="group-row"><td colspan="5">${type === "physical" ? "Physical products" : "Digital products"}</td></tr>` + list.map(p => {
      const digital = p.stock === null;
      const n = digital ? null : +p.stock;
      const out = +p.sold_out === 1 || (!digital && n <= 0);
      const stockCell = digital
        ? `<span class="cell-sub">Unlimited (digital)</span>`
        : `<span class="stock-num${n <= 0 ? " is-out" : n <= 20 ? " is-low" : ""}">${n.toLocaleString("en-PH")} pcs</span>${n <= 0 ? '<span class="pill pill-cancelled">Out of stock</span>' : n <= 20 ? '<span class="pill pill-pending">Low</span>' : ""}`;
      const changeCell = digital ? `<span class="cell-sub">—</span>` : `
        <div class="stock-edit">
          <input type="number" min="0" step="1" inputmode="numeric" placeholder="Qty" aria-label="Stock quantity for ${esc(p.name)}" data-qty>
          <button type="button" class="btn btn-primary btn-sm" data-add>Add</button>
          <button type="button" class="btn btn-ghost btn-sm" data-set>Set total</button>
        </div>`;
      return `<tr data-product="${p.id}">
        <td><span class="cell-code">${esc(p.name)}</span>${+p.designs ? `<span class="cell-sub">${esc(p.designs)} designs</span>` : ""}</td>
        <td class="cell-total">${peso(p.price)}</td>
        <td>${stockCell}</td>
        <td>${changeCell}</td>
        <td><label class="switch"><input type="checkbox" data-soldout ${+p.sold_out === 1 ? "checked" : ""}><span class="switch-ui"></span><span class="switch-text">${out ? "Sold out" : "On sale"}</span></label></td>
      </tr>`;
    }).join("");
  }).join("");

  $$("#productsBody tr[data-product]").forEach(tr => {
    const id = tr.dataset.product;
    const send = async (body) => {
      const res = await api("product_update", { method: "POST", body: { id, ...body } });
      if (!res.success){ showNotice(res.message); return; }
      loadProducts();
    };
    const qty = $("[data-qty]", tr);
    if (qty){
      $("[data-add]", tr).addEventListener("click", () => {
        if (!(+qty.value >= 1)){ showNotice("Type how many pieces to add first."); qty.focus(); return; }
        send({ stock_add: +qty.value });
      });
      $("[data-set]", tr).addEventListener("click", () => {
        if (qty.value === "" || +qty.value < 0){ showNotice("Type the new total stock first."); qty.focus(); return; }
        send({ stock_set: +qty.value });
      });
    }
    $("[data-soldout]", tr).addEventListener("change", (e) => send({ sold_out: e.target.checked ? 1 : 0 }));
  });
}

/* ==========================================================================
   ADMIN — MESSAGES
   ========================================================================== */
let msgFilter = "all";
const openMsgs = new Set();

async function loadMessages(){
  const r = await api("messages", { params: { filter: msgFilter } });
  if (!r.success) return;
  $("#msgEmpty").hidden = r.messages.length > 0;
  $("#msgEmpty").textContent = msgFilter === "unread" ? "No unread messages." : "No messages yet.";

  $("#msgList").innerHTML = r.messages.map(m => {
    const unread = !+m.is_read;
    const open = openMsgs.has(String(m.id));
    const subject = encodeURIComponent("Re: your message — @ally's creates");
    return `
      <article class="msg${unread ? " is-unread" : ""}${open ? " is-open" : ""}" data-id="${m.id}">
        <button type="button" class="msg-head" data-toggle>
          <span class="msg-who">${esc(m.name)} <span class="msg-meta">· ${esc(m.email)}</span></span>
          <span class="msg-meta">${esc(fmtDate(m.created_at))}</span>
          <span class="msg-preview">${esc(m.message)}</span>
        </button>
        <div class="msg-body" ${open ? "" : "hidden"}>
          <p class="msg-text">${esc(m.message)}</p>
          <div class="msg-actions">
            <a class="btn btn-primary btn-sm" href="mailto:${esc(m.email)}?subject=${subject}">Reply by email</a>
            <button type="button" class="btn btn-ghost btn-sm" data-read>${unread ? "Mark as read" : "Mark as unread"}</button>
            <button type="button" class="btn btn-ghost btn-sm" data-delete>Delete</button>
          </div>
        </div>
      </article>`;
  }).join("");

  $$(".msg", $("#msgList")).forEach(card => {
    const id = card.dataset.id;
    $("[data-toggle]", card).addEventListener("click", async () => {
      const nowOpen = $(".msg-body", card).hidden;
      $(".msg-body", card).hidden = !nowOpen;
      card.classList.toggle("is-open", nowOpen);
      if (nowOpen){
        openMsgs.add(id);
        if (card.classList.contains("is-unread")){
          card.classList.remove("is-unread");
          await api("message_update", { method: "POST", body: { id, is_read: 1 } });
          $("[data-read]", card).textContent = "Mark as unread";
          refreshStats();
        }
      } else {
        openMsgs.delete(id);
      }
    });
    $("[data-read]", card).addEventListener("click", async () => {
      const makeRead = card.classList.contains("is-unread");
      await api("message_update", { method: "POST", body: { id, is_read: makeRead ? 1 : 0 } });
      card.classList.toggle("is-unread", !makeRead);
      $("[data-read]", card).textContent = makeRead ? "Mark as unread" : "Mark as read";
      refreshStats();
    });
    $("[data-delete]", card).addEventListener("click", async () => {
      if (!confirm("Delete this message? This cannot be undone.")) return;
      await api("message_delete", { method: "POST", body: { id } });
      openMsgs.delete(id);
      loadMessages();
      refreshStats();
    });
  });
}

$$("[data-mfilter]").forEach(b => b.addEventListener("click", () => {
  msgFilter = b.dataset.mfilter;
  $$("[data-mfilter]").forEach(x => x.classList.toggle("is-active", x === b));
  loadMessages();
}));

/* ==========================================================================
   ADMIN — REFRESH / NOTIFICATIONS
   ========================================================================== */
async function refreshStats(){
  const s = await api("stats");
  if (!s.success) return null;
  applyBadges(s.stats);
  lastStats = s.stats;
  if (currentTab === "dashboard") renderStats(s.stats);
  return s.stats;
}

async function refreshAll(){
  const s = await refreshStats();
  if (s) lastStats = s;
  if (currentTab === "dashboard") loadDashboard();
  if (currentTab === "orders") loadOrders();
  if (currentTab === "messages") loadMessages();
  if (currentTab === "products") loadProducts();
}

async function poll(){
  const prev = lastStats;
  const s = await refreshStats();
  if (!s) return;
  if (prev && (+s.latest_order_id !== +prev.latest_order_id || +s.unread_messages !== +prev.unread_messages)){
    if (currentTab === "orders") loadOrders();
    if (currentTab === "messages") loadMessages();
    if (currentTab === "dashboard") loadDashboard();
  }
  lastStats = s;
}

$("#refreshBtn").addEventListener("click", refreshAll);

/* ==========================================================================
   INIT
   ========================================================================== */
(async function init(){
  const ext = location.pathname.toLowerCase().endsWith(".htm") ? "htm" : "html";
  $("#viewSite").href = "index." + ext;
  const me = await api("me");
  if (me.success && me.logged_in){ showApp(); return; }
  showLogin();
  if (!me.success){
    const err = $("#loginError");
    err.textContent = me.message;
    err.hidden = false;
  }
})();
