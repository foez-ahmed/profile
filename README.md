# Foez Ahmed &mdash; RTL Design & Verification Portfolio

A responsive, high-performance single-page engineering portfolio designed for **Foez Ahmed** (Lead RTL Design & Verification Engineer / Founder & Maintainer). Built with a clean, dark-mode semiconductor aesthetic, interactive silicon trace background, Apple-style cursor spotlight illumination, and an in-browser AMBA AXI4 protocol waveform simulator.

Optimized for instant deployment to **GitHub Pages** with zero build steps or heavy framework dependencies.

---

## 🌟 Highlights & Features

- **Semiconductor Engineering Aesthetic:** Charcoal/deep slate substrate (`#070a12`, `#0d1220`) accented with electric cyan (`#00f2fe`), cobalt blue (`#38bdf8`), and amber silicon (`#f59e0b`).
- **Interactive Silicon Trace Background:** Cycle-simulated electron pulse routing and via pads rendered on an HTML5 Canvas that react to cursor movement.
- **Apple/Antigravity Reactive Spotlight:** Glassmorphism cards with dynamic radial light cones tracking mouse position (`--mouse-x`, `--mouse-y`).
- **Interactive AMBA AXI4 Waveform Simulator:** Live cycle-accurate bus handshake visualizer in the browser. Users can send 4-beat AXI4 write bursts (`AWVALID`/`AWREADY`, `WVALID`/`WREADY`, `WDATA`, `BVALID`), step the clock single-cycle, or assert reset.
- **Deep-Dive Architecture Modals:** Click any featured project card to open comprehensive architectural specifications, interconnect details, and verification flows.
- **Embedded Curriculum Vitae & Print-to-PDF:** One-click modal displaying Foez's complete CV extracted directly from his resume, with dedicated `@media print` styling for generating clean 1-page/2-page PDFs.
- **Blazing Fast & Zero Dependencies:** Semantic HTML5, pure CSS3 (Flexbox & CSS Grid), and lightweight vanilla JavaScript.

---

## 📂 File Structure

```text
├── index.html        # Main semantic markup and structured content
├── styles.css        # Modular CSS with variables, glassmorphism, responsive breakpoints & print styles
├── script.js         # Canvas engine, waveform simulator, spotlight effects & modal controllers
├── Foez_Ahmed_CV.docx# Source resume
└── README.md         # Deployment and customization guide
```

---

## 🚀 How to Deploy on GitHub Pages

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Add responsive semiconductor portfolio"
   git push origin main
   ```
2. Navigate to your repository on GitHub:
   - Go to **Settings** &rarr; **Pages** (under the "Code and automation" sidebar).
   - Under **Build and deployment** &rarr; **Source**, select `Deploy from a branch`.
   - Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
3. Within 1–2 minutes, your portfolio will be live at:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```

---

## 🛠️ Local Preview

To test locally without installing any tools:

- **Python (built-in):**
  ```bash
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your web browser.

---

## 🔗 Customizing Links & Profiles

All links are pre-configured with Foez's details. If you ever need to change your profiles:
- **Email:** `foez.official@gmail.com` (search in `index.html` and `script.js`)
- **Phone:** `+880 1746-468041`
- **GitHub:** `https://github.com/foez-ahmed`
- **LinkedIn:** `https://linkedin.com/in/foez-ahmed-84636b137`
- **ADN Profile:** `https://adnsemicon.com/people/foez-ahmed.html`
- **Squared Studio:** `https://squared-studio.cc/people/foez-ahmed.html`

