import { useState, useEffect } from "react";

const SUPABASE_URL = "https://ynlqhohqyhvlshdqadgn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlubHFob2hxeWh2bHNoZHFhZGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDk1NTYsImV4cCI6MjA5NTM4NTU1Nn0.wCLLS8LXmmUngNK5hkq7fUk4mzyer7eMQwuj9BynkBw";

const HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": "Bearer " + SUPABASE_KEY,
  "Prefer": "return=representation"
};

async function dbGet(table) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + table + "?order=id.asc", { headers: HEADERS });
  return res.json();
}
async function dbInsert(table, data) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + table, { method: "POST", headers: HEADERS, body: JSON.stringify(data) });
  return res.json();
}
async function dbUpdate(table, id, data) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + table + "?id=eq." + id, { method: "PATCH", headers: HEADERS, body: JSON.stringify(data) });
  return res.json();
}
async function dbDelete(table, id) {
  await fetch(SUPABASE_URL + "/rest/v1/" + table + "?id=eq." + id, { method: "DELETE", headers: HEADERS });
}

const USUARIO = "solcrisal";
const PASSWORD = "Solcrisal2026";
const categorias = ["Piezas", "Tuberias", "Otros"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
 body { background: #0f1117; overflow-x: hidden; }
html { overflow-x: hidden; }
* { max-width: 100vw; }
.tab-btn { padding: 10px 12px; font-size: 11px; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #1a1d27; }
  ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 3px; }
  input, select { outline: none; }
  .tab-btn { background: none; border: none; cursor: pointer; font-family: DM Mono, monospace; font-size: 13px; padding: 10px 20px; color: #666; letter-spacing: 0.05em; transition: all 0.2s; border-bottom: 2px solid transparent; }
  .tab-btn.active { color: #FFD700; border-bottom: 2px solid #FFD700; }
  .tab-btn:hover { color: #e8e8e0; }
  .card { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 12px; padding: 24px; }
  .btn { border: none; border-radius: 8px; cursor: pointer; font-family: DM Mono, monospace; font-size: 13px; font-weight: 500; padding: 10px 20px; transition: all 0.2s; }
  .btn-primary { background: #FFD700; color: #1a1a5e; font-weight: 700; }
  .btn-primary:hover { background: #e6c200; }
  .btn-secondary { background: #2a2d3a; color: #e8e8e0; border: 1px solid #3a3d4a; }
  .btn-secondary:hover { background: #3a3d4a; }
  .btn-danger { background: transparent; color: #ff4444; border: 1px solid #ff4444; }
  .btn-danger:hover { background: #ff4444; color: #fff; }
  .input { background: #0f1117; border: 1px solid #2a2d3a; border-radius: 8px; color: #e8e8e0; font-family: DM Mono, monospace; font-size: 13px; padding: 10px 14px; width: 100%; transition: border 0.2s; }
  .input:focus { border-color: #FFD700; }
  .badge { border-radius: 6px; font-size: 11px; font-weight: 500; padding: 3px 10px; letter-spacing: 0.05em; }
  .badge-ok { background: #1a3a2a; color: #4ecb71; }
  .badge-warn { background: #3a2a1a; color: #ff9c35; }
  .badge-danger { background: #3a1a1a; color: #ff5555; }
  .badge-cat { background: #1a2a3a; color: #5599ff; }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
  .modal { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 16px; padding: 32px; width: 480px; max-width: 95vw; max-height: 90vh; overflow-y: auto; }
  .label { color: #888; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; display: block; }
  .alert-pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
  .shake { animation: shake 0.4s ease; }
  tr { border-bottom: 1px solid #1e2130; }
  tr:hover { background: #1e2130; }
  td, th { padding: 12px 16px; text-align: left; }
  th { color: #555; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 400; }
`;

function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    if (user.trim() === USUARIO && pass === PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  }

  return (
    <div style={{ background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "DM Mono, monospace" }}>
      <style>{css}</style>
      <div style={{ width: 360, padding: 40, background: "#1a1d27", borderRadius: 16, border: "1px solid #2a2d3a" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ background: "#1a1a5e", borderRadius: 10, padding: "10px 20px", display: "inline-block", marginBottom: 16 }}>
            <span style={{ color: "#FFD700", fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "0.05em" }}>SOLCRISAL</span>
          </div>
          <div style={{ color: "#555", fontSize: 12, letterSpacing: "0.1em" }}>CONTROL DE INVENTARIO</div>
        </div>
        <div className={error ? "shake" : ""}>
          <div style={{ marginBottom: 16 }}>
            <label className="label">Usuario</label>
            <input className="input" type="text" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label className="label">Contraseña</label>
            <input className="input" type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          {error && (
            <div style={{ background: "#3a1a1a", border: "1px solid #ff5555", borderRadius: 8, padding: "10px 14px", color: "#ff5555", fontSize: 13, marginBottom: 16, textAlign: "center" }}>
              Usuario o contraseña incorrectos
            </div>
          )}
          <button className="btn btn-primary" style={{ width: "100%", padding: 12, fontSize: 14 }} onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  return <StockApp />;
}

function StockApp() {
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Todas");
  const [modal, setModal] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [editUsuario, setEditUsuario] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [moveSearch, setMoveSearch] = useState("");
  const [moveData, setMoveData] = useState({ productoId: "", tipo: "entrada", cantidad: 1, usuario: "", nota: "" });
  const [newProduct, setNewProduct] = useState({ nombre: "", categoria: "Piezas", codigo: "", stock: 0, minimo: 1, precio: 0, ubicacion: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const [prods, movs, emps] = await Promise.all([
      dbGet("productos"),
      dbGet("movimientos"),
      dbGet("empleados")
    ]);
    setProducts(Array.isArray(prods) ? prods : []);
    setMovements(Array.isArray(movs) ? movs : []);
    const names = Array.isArray(emps) ? emps.map(e => e.nombre) : [];
    setUsuarios(names);
    if (names.length > 0) setMoveData(d => ({ ...d, usuario: names[0] }));
    setLoading(false);
  }

  function showNotif(msg, type = "success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }

  const alertProducts = products.filter(p => p.stock <= p.minimo);
  const filteredProducts = products.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) || p.codigo.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Todas" || p.categoria === filterCat;
    return matchSearch && matchCat;
  });

  async function handleAddProduct() {
    if (!newProduct.nombre || !newProduct.codigo) return;
    const data = { ...newProduct, stock: Number(newProduct.stock), minimo: Number(newProduct.minimo), precio: Number(newProduct.precio) };
    const res = await dbInsert("productos", data);
    if (Array.isArray(res) && res[0]) {
      setProducts(prev => [...prev, res[0]]);
      showNotif("Producto agregado");
    } else {
      showNotif("Error al agregar producto", "error");
    }
    setModal(null);
    setNewProduct({ nombre: "", categoria: "Piezas", codigo: "", stock: 0, minimo: 1, precio: 0, ubicacion: "" });
  }

  async function handleEditProduct() {
    const data = { nombre: editProduct.nombre, categoria: editProduct.categoria, codigo: editProduct.codigo, stock: Number(editProduct.stock), minimo: Number(editProduct.minimo), precio: Number(editProduct.precio), ubicacion: editProduct.ubicacion };
    await dbUpdate("productos", editProduct.id, data);
    setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...editProduct, ...data } : p));
    setModal(null);
    showNotif("Producto actualizado");
  }

  async function handleDeleteProduct(id) {
    await dbDelete("productos", id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showNotif("Producto eliminado", "error");
  }

  async function handleMove() {
    if (!moveData.productoId || moveData.cantidad < 1) return;
    const pid = Number(moveData.productoId);
    const qty = Number(moveData.cantidad);
    const prod = products.find(p => p.id === pid);
    if (!prod) return;
    const newStock = moveData.tipo === "entrada" ? prod.stock + qty : Math.max(0, prod.stock - qty);
    await dbUpdate("productos", pid, { stock: newStock });
    setProducts(prev => prev.map(p => p.id === pid ? { ...p, stock: newStock } : p));
    const movData = { fecha: new Date().toISOString().slice(0, 10), tipo: moveData.tipo, producto_id: pid, cantidad: qty, usuario: moveData.usuario, nota: moveData.nota };
    const res = await dbInsert("movimientos", movData);
    if (Array.isArray(res) && res[0]) setMovements(prev => [res[0], ...prev]);
    setModal(null);
    setMoveSearch("");
    setMoveData({ productoId: "", tipo: "entrada", cantidad: 1, usuario: usuarios[0] || "", nota: "" });
    showNotif(moveData.tipo === "entrada" ? "Entrada registrada" : "Salida registrada");
  }

  async function handleAddUsuario() {
    const nombre = nuevoUsuario.trim();
    if (!nombre || usuarios.includes(nombre)) return;
    const res = await dbInsert("empleados", { nombre });
    if (Array.isArray(res) && res[0]) {
      setUsuarios(prev => [...prev, nombre]);
      showNotif("Empleado agregado");
    }
    setNuevoUsuario("");
  }

  async function handleEditUsuario() {
    const { original, nuevo, id } = editUsuario;
    const nuevoNombre = nuevo.trim();
    if (!nuevoNombre) return;
    await dbUpdate("empleados", id, { nombre: nuevoNombre });
    setUsuarios(prev => prev.map(u => u === original ? nuevoNombre : u));
    setMovements(prev => prev.map(m => m.usuario === original ? { ...m, usuario: nuevoNombre } : m));
    setEditUsuario(null);
    showNotif("Empleado actualizado");
  }

  async function handleDeleteUsuario(id, nombre) {
    await dbDelete("empleados", id);
    setUsuarios(prev => prev.filter(u => u !== nombre));
    showNotif("Empleado eliminado", "error");
  }

  const totalValue = products.reduce((acc, p) => acc + p.stock * p.precio, 0);

  if (loading) return (
    <div style={{ background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "DM Mono, monospace", color: "#FFD700" }}>
      <style>{css}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{ background: "#1a1a5e", borderRadius: 10, padding: "10px 20px", marginBottom: 20 }}>
          <span style={{ color: "#FFD700", fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800 }}>SOLCRISAL</span>
        </div>
        <div style={{ color: "#555" }}>Cargando datos...</div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "DM Mono, monospace", background: "#0f1117", minHeight: "100vh", color: "#e8e8e0" }}>
      <style>{css}</style>

      {notification && (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 200, background: notification.type === "error" ? "#3a1a1a" : "#1a3a2a", border: "1px solid " + (notification.type === "error" ? "#ff5555" : "#4ecb71"), borderRadius: 10, padding: "12px 20px", color: notification.type === "error" ? "#ff5555" : "#4ecb71", fontSize: 13 }}>
          {notification.type === "error" ? "✗" : "✓"} {notification.msg}
        </div>
      )}

      <div style={{ borderBottom: "1px solid #1e2130", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, paddingBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "#1a1a5e", borderRadius: 8, padding: "6px 16px" }}>
              <span style={{ color: "#FFD700", fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "0.05em" }}>SOLCRISAL</span>
            </div>
            <div style={{ color: "#555", fontSize: 11, letterSpacing: "0.1em" }}>CONTROL DE INVENTARIO</div>
          </div>
          {alertProducts.length > 0 && (
            <div className="alert-pulse" style={{ background: "#3a1a1a", border: "1px solid #ff5555", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#ff5555", cursor: "pointer" }} onClick={() => setTab("alertas")}>
              ⚠ {alertProducts.length} alerta{alertProducts.length > 1 ? "s" : ""} de stock
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["dashboard","▣ Dashboard"],["productos","▤ Productos"],["movimientos","⇅ Movimientos"],["alertas","⚠ Alertas"],["empleados","👤 Empleados"]].map(([key, label]) => (
            <button key={key} className={"tab-btn" + (tab === key ? " active" : "")} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: 1100, margin: "0 auto" }}>

        {tab === "dashboard" && (
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Resumen General</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Productos", value: products.length, icon: "▤", color: "#5599ff" },
                { label: "Alertas Activas", value: alertProducts.length, icon: "⚠", color: "#ff5555" },
                { label: "Empleados", value: usuarios.length, icon: "👤", color: "#FFD700" },
                { label: "Valor Total", value: "$" + totalValue.toLocaleString("es-AR"), icon: "$", color: "#4ecb71", big: true },
              ].map((s, i) => (
                <div key={i} className="card">
                  <div style={{ color: s.color, fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: s.color, fontSize: s.big ? 22 : 36 }}>{s.value}</div>
                  <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {alertProducts.length > 0 && (
              <div className="card" style={{ borderColor: "#3a1a1a", marginBottom: 24 }}>
                <div style={{ color: "#ff5555", fontWeight: 500, marginBottom: 16, fontSize: 13 }}>⚠ PRODUCTOS CON STOCK CRITICO</div>
                {alertProducts.map(p => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #2a1a1a" }}>
                    <div>
                      <span style={{ color: "#e8e8e0" }}>{p.nombre}</span>
                      <span style={{ color: "#555", fontSize: 12, marginLeft: 12 }}>{p.codigo}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ color: "#ff5555", fontFamily: "Syne, sans-serif", fontWeight: 800 }}>{p.stock}</span>
                      <span style={{ color: "#555", fontSize: 12 }}>/ min {p.minimo}</span>
                      <button className="btn btn-primary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => { const prod = products.find(x => x.id === p.id); setMoveSearch(prod ? prod.codigo : ""); setMoveData(d => ({ ...d, productoId: p.id, tipo: "entrada" })); setModal("move"); }}>+ Reponer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="card">
              <div style={{ color: "#888", fontSize: 12, letterSpacing: "0.1em", marginBottom: 16 }}>ULTIMOS MOVIMIENTOS</div>
              {movements.slice(0, 5).map(m => {
                const prod = products.find(p => p.id === m.producto_id);
                return (
                  <div key={m.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e2130" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ color: m.tipo === "entrada" ? "#4ecb71" : "#ff9c35", fontSize: 16 }}>{m.tipo === "entrada" ? "↑" : "↓"}</span>
                      <div>
                        <div style={{ fontSize: 13 }}>{prod ? prod.nombre : "—"}</div>
                        <div style={{ color: "#555", fontSize: 11 }}>{m.fecha} · {m.usuario}</div>
                      </div>
                    </div>
                    <div style={{ color: m.tipo === "entrada" ? "#4ecb71" : "#ff9c35", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
                      {m.tipo === "entrada" ? "+" : "-"}{m.cantidad}
                    </div>
                  </div>
                );
              })}
              {movements.length === 0 && <div style={{ color: "#444", fontSize: 13 }}>Sin movimientos aun</div>}
            </div>
          </div>
        )}

        {tab === "productos" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800 }}>Productos</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary" onClick={() => { setMoveData({ productoId: "", tipo: "entrada", cantidad: 1, usuario: usuarios[0] || "", nota: "" }); setMoveSearch(""); setModal("move"); }}>⇅ Registrar Movimiento</button>
                <button className="btn btn-primary" onClick={() => setModal("add-product")}>+ Nuevo Producto</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <input className="input" placeholder="Buscar por nombre o codigo..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 320 }} />
              <select className="input" value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ maxWidth: 160 }}>
                <option>Todas</option>
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#13151e" }}>
                  <tr>{["Codigo","Producto","Categoria","Ubicacion","Stock","Min.","Precio","Estado",""].map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => {
                    const status = p.stock === 0 ? "sin-stock" : p.stock <= p.minimo ? "critico" : "ok";
                    return (
                      <tr key={p.id}>
                        <td style={{ color: "#555", fontSize: 12 }}>{p.codigo}</td>
                        <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                        <td><span className="badge badge-cat">{p.categoria}</span></td>
                        <td style={{ color: "#888", fontSize: 12 }}>{p.ubicacion}</td>
                        <td style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: status === "ok" ? "#e8e8e0" : status === "critico" ? "#ff9c35" : "#ff5555", fontSize: 18 }}>{p.stock}</td>
                        <td style={{ color: "#555" }}>{p.minimo}</td>
                        <td style={{ color: "#888" }}>${Number(p.precio).toLocaleString("es-AR")}</td>
                        <td><span className={"badge " + (status === "ok" ? "badge-ok" : status === "critico" ? "badge-warn" : "badge-danger")}>{status === "ok" ? "OK" : status === "critico" ? "CRITICO" : "SIN STOCK"}</span></td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="btn btn-secondary" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => { setEditProduct({ ...p }); setModal("edit"); }}>✎</button>
                            <button className="btn btn-danger" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => handleDeleteProduct(p.id)}>✕</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredProducts.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#444" }}>No se encontraron productos</div>}
            </div>
          </div>
        )}

        {tab === "movimientos" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800 }}>Movimientos</div>
              <button className="btn btn-primary" onClick={() => { setMoveData({ productoId: "", tipo: "entrada", cantidad: 1, usuario: usuarios[0] || "", nota: "" }); setMoveSearch(""); setModal("move"); }}>+ Registrar</button>
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#13151e" }}>
                  <tr>{["Fecha","Tipo","Producto","Cantidad","Usuario","Nota"].map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {movements.map(m => {
                    const prod = products.find(p => p.id === m.producto_id);
                    return (
                      <tr key={m.id}>
                        <td style={{ color: "#555", fontSize: 12 }}>{m.fecha}</td>
                        <td><span className={"badge " + (m.tipo === "entrada" ? "badge-ok" : "badge-warn")}>{m.tipo === "entrada" ? "↑ ENTRADA" : "↓ SALIDA"}</span></td>
                        <td>{prod ? prod.nombre : "—"}</td>
                        <td style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, color: m.tipo === "entrada" ? "#4ecb71" : "#ff9c35" }}>{m.tipo === "entrada" ? "+" : "-"}{m.cantidad}</td>
                        <td style={{ color: "#888" }}>{m.usuario}</td>
                        <td style={{ color: "#555", fontSize: 12 }}>{m.nota}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {movements.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#444" }}>Sin movimientos aun</div>}
            </div>
          </div>
        )}

        {tab === "alertas" && (
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Alertas de Stock Minimo</div>
            {alertProducts.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                <div style={{ color: "#4ecb71", fontSize: 16 }}>Todos los productos tienen stock suficiente</div>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {alertProducts.map(p => (
                  <div key={p.id} className="card" style={{ borderColor: p.stock === 0 ? "#ff4444" : "#ff9c35", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18 }}>{p.nombre}</span>
                        <span className="badge badge-cat">{p.categoria}</span>
                      </div>
                      <div style={{ color: "#555", fontSize: 12 }}>{p.codigo} · {p.ubicacion}</div>
                      <div style={{ marginTop: 10, display: "flex", gap: 24 }}>
                        <div><span className="label">Stock actual</span><span style={{ color: p.stock === 0 ? "#ff4444" : "#ff9c35", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24 }}>{p.stock}</span></div>
                        <div><span className="label">Minimo</span><span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#888" }}>{p.minimo}</span></div>
                        <div><span className="label">Faltan</span><span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#ff9c35" }}>{Math.max(0, p.minimo - p.stock)}</span></div>
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => { const prod = products.find(x => x.id === p.id); setMoveSearch(prod ? prod.codigo : ""); setMoveData(d => ({ ...d, productoId: p.id, tipo: "entrada" })); setModal("move"); }}>+ Reponer</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "empleados" && (
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Empleados</div>
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ color: "#888", fontSize: 12, letterSpacing: "0.1em", marginBottom: 16 }}>AGREGAR NUEVO EMPLEADO</div>
              <div style={{ display: "flex", gap: 12 }}>
                <input className="input" placeholder="Nombre del empleado..." value={nuevoUsuario} onChange={e => setNuevoUsuario(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddUsuario()} style={{ maxWidth: 320 }} />
                <button className="btn btn-primary" onClick={handleAddUsuario}>+ Agregar</button>
              </div>
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#13151e" }}>
                  <tr>{["#","Nombre","Movimientos",""].map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {usuarios.map((u, i) => {
                    const emp = Array.isArray(loading) ? null : null;
                    const movCount = movements.filter(m => m.usuario === u).length;
                    return (
                      <tr key={u}>
                        <td style={{ color: "#555", fontSize: 12, width: 40 }}>{i + 1}</td>
                        <td>
                          {editUsuario && editUsuario.original === u ? (
                            <div style={{ display: "flex", gap: 8 }}>
                              <input className="input" value={editUsuario.nuevo} onChange={e => setEditUsuario(ev => ({ ...ev, nuevo: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleEditUsuario()} style={{ maxWidth: 200 }} autoFocus />
                              <button className="btn btn-primary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={handleEditUsuario}>Guardar</button>
                              <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => setEditUsuario(null)}>Cancelar</button>
                            </div>
                          ) : (
                            <span style={{ fontWeight: 500 }}>👤 {u}</span>
                          )}
                        </td>
                        <td><span style={{ color: movCount > 0 ? "#4ecb71" : "#555", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{movCount}</span><span style={{ color: "#555", fontSize: 12, marginLeft: 6 }}>{movCount === 1 ? "movimiento" : "movimientos"}</span></td>
                        <td>
                          {!(editUsuario && editUsuario.original === u) && (
                            <div style={{ display: "flex", gap: 6 }}>
                              <button className="btn btn-secondary" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => setEditUsuario({ original: u, nuevo: u })}>✎ Editar</button>
                              <button className="btn btn-danger" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => handleDeleteUsuario(null, u)}>✕ Borrar</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {usuarios.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "#444" }}>No hay empleados</div>}
            </div>
          </div>
        )}
      </div>

      {modal === "add-product" && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Nuevo Producto</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["nombre","Nombre","text"],["codigo","Codigo","text"],["ubicacion","Ubicacion","text"],["precio","Precio","number"],["stock","Stock inicial","number"],["minimo","Stock minimo","number"]].map(([key, label, type]) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input className="input" type={type} value={newProduct[key]} onChange={e => setNewProduct(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="label">Categoria</label>
                <select className="input" value={newProduct.categoria} onChange={e => setNewProduct(p => ({ ...p, categoria: e.target.value }))}>
                  {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleAddProduct}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {modal === "edit" && editProduct && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Editar Producto</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["nombre","Nombre","text"],["codigo","Codigo","text"],["ubicacion","Ubicacion","text"],["precio","Precio","number"],["stock","Stock actual","number"],["minimo","Stock minimo","number"]].map(([key, label, type]) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input className="input" type={type} value={editProduct[key]} onChange={e => setEditProduct(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="label">Categoria</label>
                <select className="input" value={editProduct.categoria} onChange={e => setEditProduct(p => ({ ...p, categoria: e.target.value }))}>
                  {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleEditProduct}>Actualizar</button>
            </div>
          </div>
        </div>
      )}

      {modal === "move" && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Registrar Movimiento</div>
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label className="label">Tipo</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["entrada","salida"].map(t => (
                    <button key={t} className="btn" style={{ flex: 1, background: moveData.tipo === t ? (t === "entrada" ? "#1a3a2a" : "#3a2a1a") : "#13151e", border: "1px solid " + (moveData.tipo === t ? (t === "entrada" ? "#4ecb71" : "#ff9c35") : "#2a2d3a"), color: moveData.tipo === t ? (t === "entrada" ? "#4ecb71" : "#ff9c35") : "#555" }} onClick={() => setMoveData(d => ({ ...d, tipo: t }))}>
                      {t === "entrada" ? "↑ ENTRADA" : "↓ SALIDA"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Producto — buscá por nombre o código</label>
                <input className="input" placeholder="Escribi el codigo (ej: PIE-001) o el nombre..." value={moveSearch} onChange={e => {
                  const val = e.target.value;
                  setMoveSearch(val);
                  const match = products.find(p => p.codigo.toLowerCase() === val.trim().toLowerCase());
                  if (match) setMoveData(d => ({ ...d, productoId: match.id }));
                  else setMoveData(d => ({ ...d, productoId: "" }));
                }} />
                {moveSearch.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    {(() => {
                      const exact = products.find(p => p.codigo.toLowerCase() === moveSearch.trim().toLowerCase());
                      if (exact) return (
                        <div style={{ background: "#1a3a2a", border: "1px solid #4ecb71", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#4ecb71" }}>
                          ✓ {exact.nombre} — stock actual: {exact.stock}
                        </div>
                      );
                      const filtered = products.filter(p => p.nombre.toLowerCase().includes(moveSearch.toLowerCase()) || p.codigo.toLowerCase().includes(moveSearch.toLowerCase()));
                      if (filtered.length === 0) return <div style={{ color: "#555", fontSize: 12, padding: "6px 0" }}>Sin resultados</div>;
                      return (
                        <div style={{ background: "#13151e", border: "1px solid #2a2d3a", borderRadius: 8, overflow: "hidden" }}>
                          {filtered.map(p => (
                            <div key={p.id} onClick={() => { setMoveData(d => ({ ...d, productoId: p.id })); setMoveSearch(p.codigo); }}
                              style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #1e2130", fontSize: 13, display: "flex", justifyContent: "space-between", background: moveData.productoId === p.id ? "#1a2a3a" : "transparent" }}>
                              <span><span style={{ color: "#FFD700", marginRight: 10 }}>{p.codigo}</span>{p.nombre}</span>
                              <span style={{ color: "#555" }}>stock: {p.stock}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              <div>
                <label className="label">Cantidad</label>
                <input className="input" type="number" min={1} value={moveData.cantidad} onChange={e => setMoveData(d => ({ ...d, cantidad: e.target.value }))} />
              </div>
              <div>
                <label className="label">Usuario</label>
                <select className="input" value={moveData.usuario} onChange={e => setMoveData(d => ({ ...d, usuario: e.target.value }))}>
                  {usuarios.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Nota (opcional)</label>
                <input className="input" placeholder="Ej: Compra proveedor, uso taller..." value={moveData.nota} onChange={e => setMoveData(d => ({ ...d, nota: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleMove}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
