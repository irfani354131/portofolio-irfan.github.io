/* =====================================================================
   IRFANI FRIDANA — FUTURISTIC OS PORTFOLIO · interaction engine
   Pure vanilla JS · no external dependencies
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MOBILE = window.matchMedia("(max-width: 900px)").matches;
  const rand = (a, b) => a + Math.random() * (b - a);

  /* =================================================================
     1. BOOT SEQUENCE
     ================================================================= */
  function boot() {
    const screen = $("#boot");
    if (!screen) return ready();
    const logEl = $(".boot-log"), bar = $(".boot-bar i");
    const lines = [
      "> initializing kernel <b>irfanOS v4.8</b> ...",
      "> mounting /dev/skills ... <b>ok</b>",
      "> loading neural assistant ... <b>ok</b>",
      "> establishing network mesh ... <b>ok</b>",
      "> compiling portfolio modules ... <b>ok</b>",
      "> booting holographic interface ... <b>ready</b>",
    ];
    let i = 0, prog = 0;
    const tick = () => {
      if (i < lines.length) {
        logEl.innerHTML += lines[i] + "<br>";
        i++;
        prog = (i / lines.length) * 100;
        bar.style.width = prog + "%";
        setTimeout(tick, REDUCED ? 60 : rand(220, 420));
      } else {
        setTimeout(() => { screen.classList.add("done"); ready(); }, 450);
      }
    };
    setTimeout(tick, 300);
  }

  function ready() {
    document.body.classList.add("loaded");
    revealOnScroll();
    typeRole();
    runTerminal();
    runPipeline();
    runAssistant();
  }

  /* =================================================================
     2. CUSTOM CURSOR
     ================================================================= */
  function cursor() {
    if (MOBILE) return;
    const dot = $(".cursor-dot"), ring = $(".cursor-ring");
    let rx = 0, ry = 0, dx = 0, dy = 0;
    window.addEventListener("mousemove", (e) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      document.documentElement.style.setProperty("--mx", (e.clientX / innerWidth) * 100 + "%");
      document.documentElement.style.setProperty("--my", (e.clientY / innerHeight) * 100 + "%");
    });
    const loop = () => {
      rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a,button,.port-card,.btn,.ai-core,.planet,input,[data-hot]"))
        ring.classList.add("hot");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a,button,.port-card,.btn,.ai-core,.planet,input,[data-hot]"))
        ring.classList.remove("hot");
    });
  }

  /* =================================================================
     3. MATRIX CODE RAIN
     ================================================================= */
  function matrix() {
    const cv = $("#matrix-canvas"); if (!cv || REDUCED || MOBILE) return;
    const ctx = cv.getContext("2d");
    let cols, drops, fontSize = 14;
    const glyphs = "01ｱｲｳｴｵｶｷｸ<>{}[]/\\=+*アイウ01ABCDEF".split("");
    const resize = () => {
      cv.width = innerWidth; cv.height = innerHeight;
      cols = Math.floor(cv.width / fontSize);
      drops = Array(cols).fill(0).map(() => rand(0, cv.height / fontSize));
    };
    resize(); addEventListener("resize", resize);
    let last = 0;
    const draw = (t) => {
      if (t - last > 55) {
        last = t;
        ctx.fillStyle = "rgba(4,6,13,0.12)";
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < cols; i++) {
          ctx.fillStyle = Math.random() > 0.97 ? "#7c5cff" : "#00e5ff";
          ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > cv.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* =================================================================
     4. PARTICLE NETWORK
     ================================================================= */
  function network() {
    const cv = $("#net-canvas"); if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, parts, mouse = { x: -999, y: -999 };
    const COUNT = MOBILE ? 38 : 86, LINK = MOBILE ? 110 : 150;
    const resize = () => {
      w = cv.width = innerWidth; h = cv.height = innerHeight;
      parts = Array(COUNT).fill(0).map(() => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: rand(-0.4, 0.4), vy: rand(-0.4, 0.4), r: rand(1, 2.4),
      }));
    };
    resize(); addEventListener("resize", resize);
    if (!MOBILE) addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    let lastT = 0; const minDelta = MOBILE ? 33 : 0; // ~30fps cap on mobile
    const draw = (now) => {
      requestAnimationFrame(draw);
      if (now - lastT < minDelta) return;
      lastT = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dmx = mouse.x - p.x, dmy = mouse.y - p.y;
        const dm = Math.hypot(dmx, dmy);
        if (dm < 130) { p.x -= dmx / dm * 0.6; p.y -= dmy / dm * 0.6; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = "rgba(0,229,255,0.7)"; ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / LINK) * 0.28})`;
            ctx.lineWidth = 1; ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
    };
    requestAnimationFrame(draw);
  }

  /* =================================================================
     5. 3D INTERACTIVE GLOBE  (Earth + network arcs)
     ================================================================= */
  function globe() {
    const cv = $("#globe-canvas"); if (!cv) return;
    const ctx = cv.getContext("2d");
    let size, R, cx, cy, DPR = Math.min(devicePixelRatio || 1, 2);
    const N = MOBILE ? 340 : 760;
    const pts = [], cities = [], arcs = [];
    // fibonacci sphere
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({ x: Math.sin(phi) * Math.cos(theta), y: Math.sin(phi) * Math.sin(theta), z: Math.cos(phi) });
    }
    // city nodes for arcs
    for (let i = 0; i < 9; i++) {
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      cities.push({ x: Math.sin(phi) * Math.cos(theta), y: Math.sin(phi) * Math.sin(theta), z: Math.cos(phi) });
    }
    for (let i = 0; i < 7; i++) arcs.push({ a: (Math.random() * cities.length) | 0, b: (Math.random() * cities.length) | 0, t: Math.random() });

    let rotY = 0, rotX = -0.35, dragV = 0.0025, dragging = false, lastX, lastY, velX = 0.0025, velY = 0;
    const resize = () => {
      size = cv.clientWidth; cv.width = size * DPR; cv.height = size * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      R = size * 0.38; cx = size / 2; cy = size / 2;
    };
    resize(); addEventListener("resize", resize);

    const proj = (p) => {
      // rotate Y then X
      let x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
      let z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
      let y = p.y * Math.cos(rotX) - z * Math.sin(rotX);
      z = p.y * Math.sin(rotX) + z * Math.cos(rotX);
      return { x: cx + x * R, y: cy + y * R, z };
    };

    if (!MOBILE) {
      cv.addEventListener("mousedown", (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
      addEventListener("mouseup", () => dragging = false);
      addEventListener("mousemove", (e) => {
        if (!dragging) return;
        velY = (e.clientX - lastX) * 0.006; velX = (e.clientY - lastY) * 0.006;
        rotY += velY; rotX += velX;
        rotX = Math.max(-1.2, Math.min(1.2, rotX));
        lastX = e.clientX; lastY = e.clientY;
      });
    }

    // pause rendering when the hero (globe) is scrolled out of view
    let visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0.02 }).observe(cv);
    }
    let lastT = 0; const minDelta = MOBILE ? 33 : 0; // ~30fps cap on mobile
    const draw = (now) => {
      requestAnimationFrame(draw);
      if (!visible) return;
      if (now - lastT < minDelta) return;
      lastT = now;
      ctx.clearRect(0, 0, size, size);
      if (!dragging) { rotY += velY * 0.96 + 0.0016; velY *= 0.95; }
      // glow halo
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.5);
      g.addColorStop(0, "rgba(0,229,255,0.12)"); g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
      // dots
      const proj_pts = pts.map(proj);
      for (const p of proj_pts) {
        const front = p.z < 0;
        const op = front ? 0.85 : 0.18;
        const r = front ? 1.5 : 1.0;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
        ctx.fillStyle = `rgba(0,229,255,${op})`; ctx.fill();
      }
      // arcs
      arcs.forEach((arc) => {
        const A = proj(cities[arc.a]), B = proj(cities[arc.b]);
        if (A.z > 0.3 && B.z > 0.3) return;
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
        const lift = Math.hypot(A.x - B.x, A.y - B.y) * 0.3;
        const ctrlx = mx + (mx - cx) * 0.3, ctrly = my + (my - cy) * 0.3 - lift;
        ctx.beginPath(); ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(ctrlx, ctrly, B.x, B.y);
        ctx.strokeStyle = "rgba(124,92,255,0.5)"; ctx.lineWidth = 1; ctx.stroke();
        // travelling pulse
        arc.t += 0.006; if (arc.t > 1) arc.t = 0;
        const t = arc.t, it = 1 - t;
        const px = it * it * A.x + 2 * it * t * ctrlx + t * t * B.x;
        const py = it * it * A.y + 2 * it * t * ctrly + t * t * B.y;
        ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7);
        ctx.fillStyle = "#00e5ff"; ctx.shadowColor = "#00e5ff"; ctx.shadowBlur = 10;
        ctx.fill(); ctx.shadowBlur = 0;
      });
      // city markers
      cities.forEach((c) => {
        const p = proj(c); if (p.z > 0.2) return;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, 7);
        ctx.fillStyle = "#ff2bd6"; ctx.shadowColor = "#ff2bd6"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
      });
    };
    requestAnimationFrame(draw);
  }

  /* =================================================================
     6. TYPED HERO ROLE
     ================================================================= */
  function typeRole() {
    const el = $(".typed"); if (!el) return;
    const items = (el.dataset.items || "").split(",").map(s => s.trim());
    let ii = 0, ci = 0, del = false;
    const tick = () => {
      const word = items[ii];
      el.textContent = word.slice(0, ci);
      if (!del && ci < word.length) { ci++; setTimeout(tick, 85); }
      else if (!del) { del = true; setTimeout(tick, 1600); }
      else if (del && ci > 0) { ci--; setTimeout(tick, 40); }
      else { del = false; ii = (ii + 1) % items.length; setTimeout(tick, 300); }
    };
    tick();
  }

  /* =================================================================
     7. LIVE CODING TERMINAL
     ================================================================= */
  function runTerminal() {
    const body = $(".term-body"); if (!body) return;
    const lines = [
      { c: "pr", t: "irfani@os:~$ " }, { c: "", t: "deploy --project enterprise-erp\n" },
      { c: "cm", t: "// initializing build pipeline\n" },
      { c: "kw", t: "const " }, { c: "fn", t: "stack " }, { c: "", t: "= [" },
      { c: "st", t: '"Odoo"' }, { c: "", t: ", " }, { c: "st", t: '"Laravel"' }, { c: "", t: ", " },
      { c: "st", t: '"React"' }, { c: "", t: ", " }, { c: "st", t: '"Flutter"' }, { c: "", t: "];\n" },
      { c: "kw", t: "async function " }, { c: "fn", t: "build" }, { c: "", t: "() {\n" },
      { c: "", t: "  await " }, { c: "fn", t: "compile" }, { c: "", t: "(modules);\n" },
      { c: "", t: "  await " }, { c: "fn", t: "runTests" }, { c: "", t: "();  " }, { c: "cm", t: "// 248 passed\n" },
      { c: "", t: "  return " }, { c: "st", t: '"✓ shipped to production"' }, { c: "", t: ";\n}\n" },
      { c: "pr", t: "irfani@os:~$ " }, { c: "fn", t: "build()" }, { c: "", t: "\n" },
      { c: "kw", t: "» " }, { c: "st", t: "✓ shipped to production" }, { c: "", t: "\n" },
    ];
    let li = 0, chi = 0;
    const cursor = document.createElement("span"); cursor.className = "term-cursor";
    const speed = REDUCED ? 4 : 16;
    const step = () => {
      if (li >= lines.length) {
        setTimeout(() => { body.innerHTML = ""; li = 0; chi = 0; step(); }, 4200);
        return;
      }
      const cur = lines[li];
      let span = body.querySelector(".ln-active");
      if (!span) { span = document.createElement("span"); span.className = "ln ln-active " + cur.c; body.appendChild(span); }
      if (chi < cur.t.length) {
        span.textContent += cur.t[chi]; chi++;
        body.appendChild(cursor);
        body.scrollTop = body.scrollHeight;
        setTimeout(step, cur.t[chi - 1] === "\n" ? speed * 4 : speed);
      } else {
        span.classList.remove("ln-active"); li++; chi = 0; setTimeout(step, speed);
      }
    };
    step();
  }

  /* =================================================================
     8. DEPLOYMENT PIPELINE
     ================================================================= */
  function runPipeline() {
    const stages = $$(".pstage"); if (!stages.length) return;
    let cur = 0;
    const cycle = () => {
      stages.forEach((s, i) => {
        s.classList.toggle("active", i === cur);
        s.classList.toggle("done", i < cur);
      });
      cur++;
      if (cur > stages.length) {
        setTimeout(() => { stages.forEach(s => s.classList.remove("active", "done")); cur = 0; cycle(); }, 1400);
        return;
      }
      setTimeout(cycle, 1100);
    };
    cycle();
  }

  /* =================================================================
     9. AI HOLOGRAM ASSISTANT
     ================================================================= */
  function runAssistant() {
    const bubble = $(".ai-bubble"), core = $(".ai-core"); if (!bubble) return;
    const msgs = [
      "Halo 👋 Saya <b>NOVA</b>, asisten OS Irfani. Geser bola dunia di atas untuk berinteraksi.",
      "Irfani membangun solusi <b>ERP & web enterprise</b> end-to-end.",
      "Pengalaman <b>2+ tahun</b> di web, mobile & otomasi proses bisnis.",
      "Lihat <b>11 proyek</b> live di bawah — semua sudah production.",
      "Butuh developer? Scroll ke bagian <b>Kontak</b>. 🚀",
    ];
    let i = 0;
    const show = () => {
      bubble.innerHTML = msgs[i];
      bubble.classList.add("show");
      i = (i + 1) % msgs.length;
      setTimeout(() => bubble.classList.remove("show"), 5200);
    };
    setTimeout(show, 2600);
    setInterval(show, 9000);
    core.addEventListener("click", () => {
      $("#contact").scrollIntoView({ behavior: "smooth" });
    });
  }

  /* =================================================================
     10. LIVE DASHBOARD (gauges + sparklines + counters)
     ================================================================= */
  function dashboard() {
    // animated gauges
    $$(".gauge").forEach((g) => {
      const cv = g.querySelector("canvas"); if (!cv) return;
      const ctx = cv.getContext("2d");
      const DPR = Math.min(devicePixelRatio || 1, 2);
      const valEl = g.parentElement.querySelector(".gv");
      const base = +g.dataset.base || 50, color = g.dataset.color || "#00e5ff";
      cv.width = 110 * DPR; cv.height = 110 * DPR; ctx.scale(DPR, DPR);
      let val = base;
      const draw = () => {
        if (!REDUCED) val += rand(-4, 4); val = Math.max(8, Math.min(96, val));
        ctx.clearRect(0, 0, 110, 110);
        const cx = 55, cy = 55, r = 44;
        ctx.lineWidth = 8; ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(cx, cy, r, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.stroke();
        const end = 0.75 * Math.PI + (val / 100) * 1.5 * Math.PI;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0.75 * Math.PI, end);
        ctx.strokeStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0;
        if (valEl) valEl.textContent = Math.round(val);
      };
      draw(); if (!REDUCED) setInterval(draw, 900);
    });

    // sparklines
    $$(".spark").forEach((cv) => {
      const ctx = cv.getContext("2d");
      const DPR = Math.min(devicePixelRatio || 1, 2);
      const W = cv.clientWidth || 200, H = 46;
      cv.width = W * DPR; cv.height = H * DPR; ctx.scale(DPR, DPR);
      const color = cv.dataset.color || "#4dffb8";
      let data = Array(40).fill(0).map(() => rand(0.2, 0.8));
      const draw = () => {
        if (!REDUCED) { data.push(rand(0.15, 0.9)); data.shift(); }
        ctx.clearRect(0, 0, W, H);
        ctx.beginPath();
        data.forEach((d, i) => {
          const x = (i / (data.length - 1)) * W, y = H - d * H;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.stroke();
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        ctx.fillStyle = hexA(color, 0.18); ctx.fill();
      };
      draw(); if (!REDUCED) setInterval(draw, 700);
    });
  }
  const hexA = (hex, a) => {
    if (hex[0] !== "#") return hex;
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };

  /* =================================================================
     11. COUNT-UP STATS
     ================================================================= */
  function counters() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target, target = +el.dataset.count, dur = 1400;
        let t0;
        const run = (t) => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run); obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach((el) => obs.observe(el));
  }

  /* =================================================================
     12. GITHUB CONTRIBUTION GRAPH
     ================================================================= */
  function ghGraph() {
    const grid = $(".gh-grid"); if (!grid) return;
    const WEEKS = 53, total = WEEKS * 7;
    let count = 0;
    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div");
      cell.className = "gh-cell";
      const r = Math.random();
      let lvl = 0;
      if (r > 0.55) lvl = 1; if (r > 0.72) lvl = 2; if (r > 0.85) lvl = 3; if (r > 0.94) lvl = 4;
      cell.dataset.lvl = lvl;
      grid.appendChild(cell);
      if (lvl > 0) count++;
    }
    const cells = $$(".gh-cell", grid);
    const obs = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      cells.forEach((c, i) => {
        setTimeout(() => { if (+c.dataset.lvl) c.classList.add("l" + c.dataset.lvl); }, REDUCED ? 0 : i * 2.2);
      });
      obs.disconnect();
    }, { threshold: 0.2 });
    obs.observe(grid);
    const cEl = $("#gh-count"); if (cEl) cEl.dataset.count = 800 + count;
  }

  /* =================================================================
     13. SKILL BARS (animate on reveal)
     ================================================================= */
  function skillBars() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.style.width = en.target.dataset.pct + "%";
        obs.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    $$(".sb-fill").forEach((el) => obs.observe(el));
  }

  /* =================================================================
     14. SCROLL REVEAL + SCROLLSPY
     ================================================================= */
  function revealOnScroll() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((el) => obs.observe(el));
  }
  function scrollSpy() {
    const links = $$("#topnav a"), sections = links.map(l => $(l.getAttribute("href"))).filter(Boolean);
    const onScroll = () => {
      let cur = sections[0];
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= 120) cur = s; });
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + (cur && cur.id)));
      $(".back-to-top").classList.toggle("show", scrollY > 600);
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* =================================================================
     15. FLOATING BINARY / TECH GLYPHS
     ================================================================= */
  function floaters() {
    if (REDUCED) return;
    const box = $(".floaters"); if (!box) return;
    const items = ["01001", "</>", "{ }", "10110", "fn()", "#!/", "async", "01", "ERP", "</>", "11010", "λ"];
    for (let i = 0; i < (MOBILE ? 8 : 16); i++) {
      const s = document.createElement("span");
      s.textContent = items[(Math.random() * items.length) | 0];
      s.style.left = rand(0, 100) + "%";
      s.style.top = rand(20, 100) + "%";
      s.style.fontSize = rand(11, 20) + "px";
      s.style.animationDuration = rand(14, 30) + "s";
      s.style.animationDelay = -rand(0, 20) + "s";
      box.appendChild(s);
    }
  }

  /* =================================================================
     16. LIGHTBOX
     ================================================================= */
  function lightbox() {
    const lb = $("#lightbox"), img = lb && lb.querySelector("img"); if (!lb) return;
    $$("[data-lightbox]").forEach((a) => {
      a.addEventListener("click", (e) => { e.preventDefault(); img.src = a.getAttribute("href"); lb.classList.add("open"); });
    });
    const close = () => lb.classList.remove("open");
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-close")) close(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* =================================================================
     17. NAV / CLOCK / MISC
     ================================================================= */
  function topbar() {
    const burger = $(".tb-burger"), nav = $("#topnav");
    if (burger) burger.addEventListener("click", () => nav.classList.toggle("open"));
    $$("#topnav a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
    const clock = $("#tb-clock");
    if (clock) {
      const tick = () => {
        const d = new Date();
        clock.textContent = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      };
      tick(); setInterval(tick, 1000);
    }
    const bt = $(".back-to-top");
    if (bt) bt.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* =================================================================
     18. AGE
     ================================================================= */
  function age() {
    const el = $("#umur"); if (!el) return;
    const born = new Date(1998, 9, 2), now = new Date();
    let a = now.getFullYear() - born.getFullYear();
    if (now.getMonth() < born.getMonth() || (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())) a--;
    el.textContent = a + " tahun";
  }

  /* =================================================================
     INIT
     ================================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    cursor(); matrix(); network(); globe();
    dashboard(); counters(); ghGraph(); skillBars();
    scrollSpy(); floaters(); lightbox(); topbar(); age();
    boot();
  });
})();
