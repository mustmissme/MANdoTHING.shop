// src/App.jsx

import React, { useEffect, useState, useRef } from "react";
import "./App.css";

/* ---------------- GOOGLE SHEET ---------------- */
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/17rLLHvwZzcWo9LoUGNSB3Xxxz8mA1MHQwH5WyoYA3jE/edit?gid=0#gid=0";

// BASE BRANDS + หมวดหลักสำหรับแท็บหน้า BRANDS
const BASE_BRANDS = [
  { slug: "crying-center", name: "CRYING CENTER", logo: "/brands/crying-center.png", category: "CLOTHING" },
  { slug: "apee", name: "APEE", logo: "/brands/apee.png", category: "CLOTHING" },
  { slug: "owox", name: "OWOX", logo: "/brands/owox.png", category: "CLOTHING" },
  { slug: "achork", name: "ACHORK", logo: "/brands/achork.png", category: "CLOTHING" },
  { slug: "black-bb", name: "BLACK BB", logo: "/brands/black-bb.png", category: "CLOTHING" },
  { slug: "fanptntox", name: "FANPTNTOX", logo: "/brands/fanptntox.png", category: "CLOTHING" },
  { slug: "dnd4des", name: "DND4DES", logo: "/brands/dnd4des.png", category: "CLOTHING" },
  { slug: "startexceedend", name: "STARTEXCEEDEND", logo: "/brands/STARTEXCEEDEND.png", category: "CLOTHING" },
  { slug: "0123start", name: "0123START", logo: "/brands/0123start.png", category: "CLOTHING" },
  { slug: "yadcrew", name: "YADCREW", logo: "/brands/yadcrew.png", category: "CLOTHING" },
  { slug: "pickleclub", name: "PICKLECLUB", logo: "/brands/pickleclub.png", category: "CLOTHING" },
  { slug: "oisis", name: "OISIS", logo: "/brands/oisis.png", category: "CLOTHING" },
  { slug: "tired-studio", name: "TIRED STUDIO", logo: "/brands/tired-studio.png", category: "CLOTHING" },
  { slug: "blacklists", name: "BLACKLISTS", logo: "/brands/blacklists.png", category: "CLOTHING" },
  { slug: "whoosis", name: "WHOOSIS", logo: "/brands/whoosis.png", category: "CLOTHING" },
  // SHOES
  { slug: "adidas", name: "ADIDAS", logo: "/brands/adidas.png", category: "SHOES" },
  { slug: "puma", name: "PUMA", logo: "/brands/puma.png", category: "SHOES" },
  { slug: "jeep", name: "JEEP", logo: "/brands/jeep.png", category: "SHOES" },
  { slug: "cat&sofa", name: "CAT&SOFA", logo: "/brands/cat&sofa.png", category: "SHOES" },
  { slug: "devo-life", name: "DEVO LIFE", logo: "/brands/devo-life.png", category: "SHOES" },
  { slug: "nstcu", name: "NSTCU", logo: "/brands/nstcu.png", category: "SHOES" },
  { slug: "killwinner", name: "KILLWINNER", logo: "/brands/killwinner.png", category: "SHOES" },
  // BAG / ACCESSORIES / OTHER
  { slug: "lee", name: "LEE", logo: "/brands/lee.png", category: "BAG" },
  { slug: "Mewtation151", name: "MEWTATION151", logo: "/brands/Mewtation151.png", category: "BAG" },
  { slug: "jandress", name: "JANDRESS", logo: "/brands/jandress.png", category: "BAG" },
  { slug: "ecoday", name: "ECODAY", logo: "/brands/ecoday.png", category: "BAG" },
  { slug: "muva", name: "MUVA", logo: "/brands/muva.png", category: "BAG" },
  { slug: "smosmos", name: "SMOSMOS", logo: "/brands/smosmos.png", category: "BAG" },
  { slug: "oogreenapple", name: "OOGREENAPPLE", logo: "/brands/oogreenapple.png", category: "BAG" },
  { slug: "lunier", name: "LUNIER", logo: "/brands/lunier.png", category: "BAG" },
  { slug: "2801project", name: "2801PROJECT", logo: "/brands/2801project.png", category: "BAG" },
  { slug: "6crayon", name: "6CRAYON", logo: "/brands/6crayon.png", category: "ACCESSORIES" },
  { slug: "sanb-studio", name: "SANB STUDIO", logo: "/brands/sanb-studio.png", category: "ACCESSORIES" },
  { slug: "tipseven", name: "TIPSEVEN", logo: "/brands/tipseven.png", category: "ACCESSORIES" },
  { slug: "dickies", name: "DICKIES", logo: "/brands/dickies.png", category: "ACCESSORIES" },
  { slug: "monchhichi", name: "MONCHHICHI", logo: "/brands/monchhichi.png", category: "ACCESSORIES" },
  { slug: "chichaboom", name: "CHICHABOOM", logo: "/brands/chichaboom.png", category: "ACCESSORIES" },
  { slug: "onionion", name: "ONIONION", logo: "/brands/onionion.png", category: "ACCESSORIES" },
  { slug: "sorgenti", name: "SORGENTI", logo: "/brands/sorgenti.png", category: "ACCESSORIES" },
  { slug: "marsh&mellow", name: "MARSH&MELLOW", logo: "/brands/marsh&mellow.png", category: "ACCESSORIES" },
  { slug: "tidecolor", name: "TIDECOLOR", logo: "/brands/tidecolor.png", category: "ACCESSORIES" },
  { slug: "dar1ng", name: "Dar1ng", logo: "/brands/dar1ng.png", category: "ACCESSORIES" },
  { slug: "8lome studio", name: "8LOME STUDIO", logo: "/brands/8lome studio.png", category: "ACCESSORIES" },
  { slug: "martube", name: "MARTUBE", logo: "/brands/martube.png", category: "OTHER" },
  { slug: "jueves", name: "JUEVES", logo: "/brands/jueves.png", category: "OTHER" },
  { slug: "casebang", name: "CASEBANG", logo: "/brands/casebang.png", category: "OTHER" },
  { slug: "rolincube", name: "ROLINCUBE", logo: "/brands/rolincube.png", category: "OTHER" },
  { slug: "eat-noodle", name: "EAT NOODLE", logo: "/brands/eat-noodle.jpg", category: "OTHER" },
  { slug: "oops-day", name: "OOPS-DAY", logo: "/brands/oops-day.png", category: "OTHER" },
  { slug: "conamor", name: "CONAMOR", logo: "/brands/conamor.png", category: "OTHER" },
];

// CONTACT
const CONTACT_LINKS = {
  instagram:
    "https://www.instagram.com/mandothing/",
  tiktok: "www.tiktok.com/@mandothing.preorder",
  shopee: "https://s.shopee.co.th/40ZSIbpu8v",
  line: "https://lin.ee/wY3IAXL",
};

// ตัด <br> ใน details
function parseDetails(raw) {
  if (!raw) return [];
  return raw
    .split(/<br\s*\/?>/i)
    .map((s) => s.replace(/&nbsp;/gi, " ").replace(/<\/?b>/gi, "").trim())
    .filter(Boolean);
}

/* ---------------- MAIN APP ---------------- */
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("home"); // 'home' | 'brands' | 'brand' | 'stock'
  const [activeBrandSlug, setActiveBrandSlug] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const jsonText = text.substring(
          text.indexOf("{"),
          text.lastIndexOf("}") + 1
        );
        const gviz = JSON.parse(jsonText);
        const rows = gviz.table?.rows || [];
        const brandsMap = {};
        BASE_BRANDS.forEach((b) => {
          brandsMap[b.slug] = {
            slug: b.slug,
            name: b.name,
            logo: b.logo,
            brand_category: b.category || "OTHER",
            line_link: CONTACT_LINKS.line,
            categories: {
              HOODIE: [], SWEATER: [], TOPS: [], BOTTOMS: [], JEANS: [],
              BAG: [], SHOES: [], ACCESSORIES: [], OTHER: [],
            },
          };
        });
        rows.forEach((row) => {
          const c = row.c || [];
          const brandSlug = (c[0]?.v || "").trim();
          const brandName = (c[1]?.v || "").trim();
          const categoryRaw = (c[2]?.v || "").trim();
          const sku = (c[3]?.v || "").trim();
          const name = (c[4]?.v || "").trim();
          const price = Number(c[5]?.v || 0);
          const detailsRaw = (c[6]?.v || "").trim();
          const imagesRaw = (c[7]?.v || "").trim();
          const orderLinkRaw = (c[8]?.v || "").trim();
          const inStock = Number(c[9]?.v || 0);
          const bestSeller = Number(c[10]?.v || 0);
          if (!brandSlug || brandSlug === "brand_slug") return;
          if (!sku || !name) return;
          if (!brandsMap[brandSlug]) {
            brandsMap[brandSlug] = {
              slug: brandSlug,
              name: brandName || brandSlug,
              logo: `/brands/${brandSlug}.png`,
              brand_category: "OTHER",
              line_link: CONTACT_LINKS.line,
              categories: {
                HOODIE: [], SWEATER: [], TOPS: [], BOTTOMS: [], JEANS: [],
                BAG: [], SHOES: [], ACCESSORIES: [], OTHER: [],
              },
            };
          }
          const categoryUpper = (categoryRaw || "TOPS").toUpperCase();
          const catKey = brandsMap[brandSlug].categories[categoryUpper]
            ? categoryUpper
            : "OTHER";
          const categoryLower = categoryUpper.toLowerCase();
          let images = [];
          if (imagesRaw) {
            images = imagesRaw
              .split(/\s*,\s*/)
              .map((u) => u.trim())
              .filter(Boolean)
              .map((u) => {
                if (/^https?:\/\//i.test(u)) return u;
                if (u.startsWith("/")) return u;
                return `/products-black-bb/${brandSlug}/${categoryLower}/${u}`;
              });
          }
          brandsMap[brandSlug].categories[catKey].push({
            brand_slug: brandSlug,
            sku,
            name,
            price,
            details: parseDetails(detailsRaw),
            images,
            order_link: orderLinkRaw || CONTACT_LINKS.line,
            in_stock: inStock,
            best_seller: bestSeller,
          });
        });
        setData({ brands: Object.values(brandsMap) });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("โหลดข้อมูลไม่สำเร็จ");
        setLoading(false);
      });
  }, []);

  const brands = data?.brands || [];
  const activeBrand =
    view === "brand" ? brands.find((b) => b.slug === activeBrandSlug) : null;

  const handleBrandClick = (slug) => {
    setActiveBrandSlug(slug);
    setView("brand");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allProducts = brands.flatMap((brand) =>
    Object.values(brand.categories).flat().map((p) => ({
      ...p,
      brand_slug: brand.slug,
    }))
  );

  const bestSellers = allProducts.filter((p) => p.best_seller === 1);

  return (
    <div className="app">
      <Header
        onHome={() => { setView("home"); setActiveBrandSlug(null); }}
        onBrands={() => { setView("brands"); setActiveBrandSlug(null); }}
        onStock={() => { setView("stock"); setActiveBrandSlug(null); }}
        currentView={view}
      />
      <main className="page">
        {loading && <p className="status-text">LOADING…</p>}
        {error && !loading && (
          <p className="status-text status-error">{error}</p>
        )}
        {!loading && !error && (
          <>
            {view === "home" && (
              <HomeSection
                onShopNow={() => setView("brands")}
                brands={brands}
                bestSellers={bestSellers}
                allProducts={allProducts}
                onSelectBrand={handleBrandClick}
              />
            )}
            {view === "brands" && (
              <BrandsGrid brands={brands} onSelectBrand={handleBrandClick} />
            )}
            {view === "brand" && activeBrand && <BrandPage brand={activeBrand} />}
            {view === "stock" && <StockPage brands={brands} />}
          </>
        )}
      </main>
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Header({ onHome, onBrands, onStock, currentView }) {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-top-logo" onClick={onHome}>
            <span className="wordmark">
              MAN<span className="wordmark-accent">do</span>THING
            </span>
          </div>
          <div className="header-top-social">
            <a href={CONTACT_LINKS.instagram} className="social-circle" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href={CONTACT_LINKS.tiktok} className="social-circle" target="_blank" rel="noreferrer" aria-label="TikTok">TT</a>
            <a href={CONTACT_LINKS.shopee} className="social-circle" target="_blank" rel="noreferrer" aria-label="Shopee">SP</a>
          </div>
        </div>
      </div>
      <div className="header-navbar">
        <nav className="header-nav-inner">
          <button type="button" className={`nav-item ${currentView === "home" ? "nav-item--active" : ""}`} onClick={onHome}>HOME</button>
          <button type="button" className={`nav-item ${currentView === "brands" || currentView === "brand" ? "nav-item--active" : ""}`} onClick={onBrands}>BRANDS</button>
          <button type="button" className={`nav-item ${currentView === "stock" ? "nav-item--active" : ""}`} onClick={onStock}>IN-STOCK</button>
        </nav>
      </div>
    </header>
  );
}

/* ---------- HOMEPAGE ---------- */
function HomeSection({ onShopNow, brands, bestSellers, allProducts, onSelectBrand }) {
  return (
    <>
      <section className="home-section">
        <div className="hero-card">
          <div className="hero-overlay">
            <p className="hero-kicker">MEN&apos;S PRE-ORDER STORE</p>
            <h1 className="hero-headline">
              MAN<span className="wordmark-accent">do</span>THING
            </h1>
            <p className="hero-sub">Streetwear &amp; essentials for men &mdash; curated overseas brands, shipped worldwide.</p>
            <button type="button" className="primary-btn" onClick={onShopNow}>SHOP ALL BRANDS</button>
          </div>
        </div>
        <p className="home-intro">
          MANdoTHING &bull; Pre-order store for overseas men&apos;s brands &middot; Worldwide shipping ✈ &middot; Based in Bangkok, Thailand
        </p>
      </section>

      {bestSellers.length > 0 && (
        <section className="home-products">
          <h2 className="section-title">BEST SELLERS</h2>
          <div className="products-grid">
            {bestSellers.map((p) => (
              <ProductCard key={p.sku} product={p} onClick={() => onSelectBrand(p.brand_slug)} />
            ))}
          </div>
        </section>
      )}

      <section className="home-products">
        <h2 className="section-title">ALL PRODUCTS</h2>
        <div className="products-grid">
          {allProducts.map((p) => (
            <ProductCard key={p.sku} product={p} onClick={() => onSelectBrand(p.brand_slug)} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- BRANDS GRID ---------- */
function BrandsGrid({ brands, onSelectBrand }) {
  const [brandCategory, setBrandCategory] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const categoryTabs = ["ALL", "CLOTHING", "SHOES", "BAG", "ACCESSORIES", "OTHER"];
  const brandFiltered = brands.filter((b) => {
    const matchCategory = brandCategory === "ALL" || b.brand_category === brandCategory;
    const text = (b.name || "").toLowerCase();
    return matchCategory && text.includes(searchText.toLowerCase());
  });
  return (
    <section className="brands-page">
      <h1 className="section-title">PRE-ORDER BRANDS</h1>
      <input className="search-input brand-search-input" placeholder="Search brands…" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <div className="brand-categories">
        {categoryTabs.map((cat) => (
          <button key={cat} type="button" className={`brand-cat-btn ${brandCategory === cat ? "brand-cat-btn--active" : ""}`} onClick={() => setBrandCategory(cat)}>{cat}</button>
        ))}
      </div>
      <div className="brands-grid">
        {brandFiltered.map((brand) => (
          <button key={brand.slug} type="button" className="brand-card" onClick={() => onSelectBrand(brand.slug)}>
            <div className="brand-card-inner">
              <div className="brand-logo-frame">
                <img src={brand.logo} alt={brand.name} className="brand-logo" onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <span className="brand-name">{brand.name}</span>
            </div>
          </button>
        ))}
        {brandFiltered.length === 0 && <p className="status-text">No brands found</p>}
      </div>
    </section>
  );
}

/* ---------- BRAND PAGE ---------- */
function BrandPage({ brand }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const categoriesOrder = ["ALL", "HOODIE", "SWEATER", "TOPS", "BOTTOMS", "JEANS", "BAG", "SHOES", "ACCESSORIES", "OTHER"];
  const allProducts = Object.entries(brand.categories).flatMap(([cat, list]) =>
    list.map((p) => ({ ...p, _category: cat, _brand: brand.slug }))
  );
  const productsFiltered = allProducts.filter((p) => {
    const matchCategory = activeCategory === "ALL" || p._category === activeCategory;
    const text = `${p.name} ${(p.details || []).join(" ")}`.toLowerCase();
    return matchCategory && text.includes(search.toLowerCase());
  });
  return (
    <section className="brand-page">
      <div className="brand-header">
        <img src={brand.logo} alt={brand.name} className="brand-logo-big" onError={(e) => { e.target.style.display = "none"; }} />
        <h1 className="brand-title">{brand.name}</h1>
        <a className="brand-line-link" href={brand.line_link} target="_blank" rel="noreferrer">ORDER VIA LINE</a>
      </div>
      <div className="brand-layout">
        <aside className="sidebar">
          {categoriesOrder.map((cat) => (
            <button key={cat} className={`sidebar-item ${activeCategory === cat ? "is-active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </aside>
        <div className="brand-content">
          <input className="search-input" placeholder="Search within this brand…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="products-grid">
            {productsFiltered.map((p) => (<ProductCard key={p.sku} product={p} />))}
            {productsFiltered.length === 0 && <p className="status-text">No products in this category</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- IN-STOCK PAGE ---------- */
function StockPage({ brands }) {
  const [search, setSearch] = useState("");
  const allProducts = brands.flatMap((brand) =>
    Object.entries(brand.categories).flatMap(([cat, list]) =>
      list.map((p) => ({ ...p, _brand: brand.slug, _category: cat }))
    )
  );
  const stockProducts = allProducts.filter((p) => Number(p.in_stock) > 0);
  const filtered = stockProducts.filter((p) => {
    const text = `${p.name} ${(p.details || []).join(" ")} ${p._brand}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });
  return (
    <section className="stock-page">
      <h1 className="section-title">IN-STOCK</h1>
      <p className="section-subtitle">All ready-to-ship products</p>
      <div className="brand-search-wrapper">
        <input className="search-input brand-search-input" placeholder="Search in-stock items…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {filtered.length === 0 ? (
        <p className="status-text">ยังไม่มีสินค้าพร้อมส่ง (ใส่ค่า 1 ในคอลัมน์ INSTOCK)</p>
      ) : (
        <div className="products-grid">
          {filtered.map((p) => (<ProductCard key={`${p.sku}-stock`} product={p} />))}
        </div>
      )}
    </section>
  );
}

/* ---------- PRODUCT CARD ---------- */
function ProductCard({ product, onClick }) {
  const images = product.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const stripRef = useRef(null);
  const handleScroll = () => {
    if (!stripRef.current) return;
    const { scrollLeft, clientWidth } = stripRef.current;
    if (!clientWidth) return;
    setCurrentIndex(Math.round(scrollLeft / clientWidth));
  };
  return (
    <article className="product-card" onClick={onClick}>
      <div className="carousel-container">
        {images.length > 0 ? (
          <>
            <div className="carousel-strip" ref={stripRef} onScroll={handleScroll}>
              {images.map((src, i) => (
                <img key={i} src={src} alt={product.name} className="carousel-image" />
              ))}
            </div>
            {images.length > 1 && (
              <div className="carousel-dots">
                {images.map((_, i) => (
                  <span key={i} className={`dot ${i === currentIndex ? "active" : ""}`} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="product-image placeholder">NO IMAGE</div>
        )}
      </div>
      <div className="product-body">
        {product._brand && <p className="product-brand">{product._brand}</p>}
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">฿{product.price?.toLocaleString("th-TH")}</p>
        <ul className="product-details">
          {product.details?.map((d, i) => (<li key={i}>{d}</li>))}
        </ul>
        <a className="primary-btn full-width" href={product.order_link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>ORDER VIA LINE</a>
      </div>
    </article>
  );
}

/* ---------- CONTACT SECTION ---------- */
function ContactSection() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">CONTACT</h2>
      <div className="contact-links">
        <a href={CONTACT_LINKS.instagram} target="_blank" rel="noreferrer" className="contact-link"><span>Instagram : mandothing</span></a>
        <a href={CONTACT_LINKS.line} target="_blank" rel="noreferrer" className="contact-link"><span>LINE : @mandothing</span></a>
        <a href={CONTACT_LINKS.tiktok} target="_blank" rel="noreferrer" className="contact-link"><span>TikTok : mandothing.preorder</span></a>
        <a href={CONTACT_LINKS.shopee} target="_blank" rel="noreferrer" className="contact-link"><span>Shopee : mustmissme</span></a>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 MANdoTHING · Men&apos;s pre-order store for imported overseas brands</p>
    </footer>
  );
}

export default App;



