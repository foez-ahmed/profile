/**
 * FOEZ AHMED - LEAD RTL DESIGN & VERIFICATION PORTFOLIO
 * Interactive Silicon Engine & Reactive UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiliconCanvas();
  initSpotlightCards();
  initSkillFilters();
  initModals();
  initContactAndCopy();
  initNavigation();
});

/* ==========================================================================
   1. SILICON CANVAS: PCB & METAL TRACE EMITTER (Interactive Background)
   ========================================================================== */
function initSiliconCanvas() {
  const canvas = document.getElementById('silicon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initTraces();
  });

  const mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Generate trace network
  const traces = [];
  const traceCount = Math.floor(Math.min(width, height) / 35);

  class TraceNode {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.length = 80 + Math.random() * 140;
      // Traces route at 0, 45, or 90 degree semiconductor angles
      const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI];
      this.angle = angles[Math.floor(Math.random() * angles.length)];
      this.speed = 0.5 + Math.random() * 1.2;
      this.progress = Math.random();
      this.color = Math.random() > 0.3 ? 'rgba(0, 242, 254, ' : 'rgba(56, 189, 248, ';
      this.viaRadius = 1.5 + Math.random() * 2;
    }

    update() {
      this.progress += 0.005 * this.speed;
      if (this.progress > 1) {
        this.progress = 0;
      }
    }

    draw() {
      const endX = this.x + Math.cos(this.angle) * this.length;
      const endY = this.y + Math.sin(this.angle) * this.length;

      // Draw static subtle trace line
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw via pads at ends
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.viaRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.fill();

      // Calculate electron pulse along trace
      const currentX = this.x + Math.cos(this.angle) * (this.length * this.progress);
      const currentY = this.y + Math.sin(this.angle) * (this.length * this.progress);

      // Distance to mouse for reactivity
      const dist = Math.hypot(mouse.x - currentX, mouse.y - currentY);
      const mouseInfluence = Math.max(0, 1 - dist / 220);

      const pulseAlpha = 0.15 + mouseInfluence * 0.7;
      const pulseSize = 2 + mouseInfluence * 3;

      ctx.beginPath();
      ctx.arc(currentX, currentY, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${pulseAlpha})`;
      ctx.shadowBlur = 8 * mouseInfluence;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initTraces() {
    traces.length = 0;
    for (let i = 0; i < traceCount; i++) {
      traces.push(new TraceNode());
    }
  }

  initTraces();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle IC grid alignment
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    const startX = 0;
    const startY = 0;

    for (let x = startX; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = startY; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    traces.forEach((trace) => {
      trace.update();
      trace.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. REACTIVE SPOTLIGHT CARDS (Apple/Antigravity Cursor Illumination)
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. SKILL CATEGORY FILTERING
   ========================================================================== */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   4. PROJECT DETAILS MODAL & DATA
   ========================================================================== */
const projectDetails = {
  'rv64-soc': {
    title: 'Quad-Core RV64GV SoC Architecture & Tape-Out',
    badge: '12nm TSMC Tape-Out • 1.5 GHz',
    tags: ['RISC-V', '12nm ASIC', 'AMBA AXI4', 'L1/L2 Caches', 'Assembly/C Testing'],
    content: `
      <h4>Architecture Specification & Leadership</h4>
      <p>Served as the Technical Lead for the architecture and system-level verification of a 4× RV64GV multi-core SoC taped out at TSMC 12nm, targeting a 1.5 GHz operational clock frequency. Led a cross-functional team of 30+ engineers (10–12 RTL design, 16–20 verification, ~5 firmware engineers) working with a California-based fabless semiconductor client.</p>
      
      <h4>Hierarchical Interconnect Partitioning</h4>
      <p>Co-proposed and architected the strategic partitioning of the AXI fabric into two separate, optimized routing sub-networks:</p>
      <ul>
        <li><strong>Low-Latency High-Bandwidth Compute Fabric:</strong> Dedicated to core L1 caches, shared 2MB L2 cache, and DDR controllers with concurrent out-of-order transaction pipelining.</li>
        <li><strong>System Peripheral Network:</strong> Isolated low-frequency traffic (UART, SPI, I2C, I2S) preventing head-of-line blocking on compute streams.</li>
      </ul>
      <p>Resolved AXI ID-width compounding across hierarchical crossbars by specifying precision ID-width converters and revalidating transaction determinism.</p>

      <h4>Verification Methodology & Coverage</h4>
      <p>Designed a rigorous multi-tier testing pipeline combining assembly instructions and C execution benchmarks:</p>
      <ul>
        <li><strong>Per-Core ISA Functional:</strong> ~100% functional coverage on all supported RV64GV extensions.</li>
        <li><strong>Interconnect & Routing:</strong> ~95% functional coverage verifying simultaneous multi-master contention.</li>
        <li><strong>Stress & Benchmarks:</strong> Floating-point matrix multiplication and cache eviction stress under maximum memory traffic.</li>
      </ul>
    `
  },
  'axi-vip': {
    title: 'Class-Based AMBA AXI4 Master & Slave VIP',
    badge: 'Verification IP • SystemVerilog',
    tags: ['SystemVerilog', 'SVA Assertions', 'VIP', 'Functional Coverage', 'QoS'],
    content: `
      <h4>Protocol Compliance Engine</h4>
      <p>Designed and verified an enterprise-grade, class-based SystemVerilog AMBA AXI4 Master and Slave Verification IP (VIP) capable of protocol compliance checking for multi-gigahertz SoC interconnects.</p>

      <h4>Key Architectural Capabilities</h4>
      <ul>
        <li><strong>Concurrent Bidirectional Transactions:</strong> Simultaneous independent read (AR/R) and write (AW/W/B) channel scheduling.</li>
        <li><strong>Full Burst Support:</strong> FIXED, INCR, and WRAP burst modes with arbitrary beat lengths (up to 256 beats) and byte strobes.</li>
        <li><strong>Exclusive Access & QoS:</strong> Support for locked/exclusive read-modify-write memory primitives and Quality-of-Service transaction priority ordering.</li>
        <li><strong>SystemVerilog Assertions (SVA):</strong> Hundreds of formal assertions validating handshakes (e.g. VALID before READY stability, zero-cycle stall behaviors).</li>
      </ul>

      <h4>Portability & UVM Compatibility</h4>
      <p>Engineered using clean driver/monitor/sequencer interface abstractions, enabling drop-in adoption both in standalone testbenches and full UVM regression suites across numerous commercial tape-outs.</p>
    `
  },
  'coherent-cache': {
    title: 'Custom Directory-Based Coherent Cache Protocol',
    badge: 'Cache Subsystem • Memory Hierarchy',
    tags: ['Cache Coherence', 'Directory Protocol', 'SRAM Blocks', 'Formal Verification'],
    content: `
      <h4>Protocol Definition & Microarchitecture</h4>
      <p>Owned the specification, microarchitecture, and verification of a proprietary directory-based cache coherence protocol designed for multi-core RISC-V compute nodes.</p>

      <h4>Hardware Design Highlights</h4>
      <ul>
        <li><strong>Associativity:</strong> 4-way set associative private L1 caches featuring foundry dual-port memory macros.</li>
        <li><strong>Logical Ownership Tracking:</strong> A centralized hardware directory tracking sharing vectors and exclusive dirty ownership without physical address partitioning.</li>
        <li><strong>Eviction & Write-Back:</strong> Atomic write-back channels ensuring consistency under heavy simultaneous bus snooping.</li>
      </ul>

      <h4>Verification Architecture</h4>
      <p>Built a dedicated multi-node testbench simulating race conditions, false sharing, dirty line invalidation collisions, and memory ordering guarantees under randomized stress workloads.</p>
    `
  },
  'squared-studio': {
    title: 'Squared Studio Open Hardware Library & Educational Platform',
    badge: 'Founder & Maintainer • Open Source',
    tags: ['Open Source', 'SystemVerilog', 'RISC-V ALU', 'Community Mentorship'],
    content: `
      <h4>Open Silicon Initiative</h4>
      <p>Founded and maintained <strong>Squared Studio</strong> (squared-studio.cc), an open-source hardware initiative dedicated to democratizing advanced digital design and RTL verification methodologies.</p>

      <h4>Open-Source Repositories & Modules</h4>
      <ul>
        <li><strong>squared-studio/common:</strong> A curated library of production-quality SystemVerilog design primitives, including parameterized synchronous/asynchronous FIFOs, round-robin arbiters, and clock domain crossing (CDC) synchronizers.</li>
        <li><strong>RISC-V Computational IP:</strong> Parameterized RV32/RV64 arithmetic logic units (ALU) organized cleanly by opcode decode slices, designed for synthesis compatibility.</li>
        <li><strong>Community Mentorship:</strong> Guiding hundreds of hardware engineering students and engineers through RTL code reviews, verification challenges, and modern open-source toolchains (Icarus Verilog, Verilator, GTKWave).</li>
      </ul>
      <p>Visit: <a href="https://squared-studio.cc" target="_blank" style="color:var(--primary-cyan)">squared-studio.cc</a> and <a href="https://github.com/foez-ahmed" target="_blank" style="color:var(--primary-cyan)">github.com/foez-ahmed</a></p>
    `
  },
  'ddr-controller': {
    title: 'Custom High-Bandwidth DDR Controller Microarchitecture',
    badge: 'ADN Semiconductors • Technical Lead',
    tags: ['DDR Subsystem', 'AXI Integration', 'Command Queue', 'Technical Direction'],
    content: `
      <h4>High-Performance Memory Controller Subsystem</h4>
      <p>Leading the architectural definition and AXI interconnect integration for a custom high-throughput DDR memory controller at <strong>ADN Semiconductors</strong>, providing technical leadership to a ~50-engineer organization.</p>

      <h4>Microarchitectural Innovations</h4>
      <ul>
        <li><strong>Out-of-Order Command Scheduling:</strong> Bank-conflict reduction algorithms maximizing row-buffer hits and reducing read/write turnaround stalls.</li>
        <li><strong>High-Speed AXI Interconnect Interface:</strong> Native 64-bit and 128-bit AXI4 slave ports with intelligent burst slicing and pipelined response generators.</li>
        <li><strong>Power & Refresh Management:</strong> Dynamic auto-refresh interleaving preserving low-latency access for real-time compute bursts.</li>
      </ul>
    `
  },
  'fpga-emulation': {
    title: 'Multi-FPGA Partitioning & Host Co-Emulation Framework',
    badge: 'Multi-FPGA • Hardware Emulation',
    tags: ['Xilinx Vivado', 'Host Shared Memory', 'FPGA Emulation', 'Pre-Silicon Validation'],
    content: `
      <h4>Over-Capacity SoC Emulation</h4>
      <p>Engineered an advanced multi-FPGA emulation framework for high-complexity SoC designs that exceeded the logic gate capacity of a single monolithic FPGA device.</p>

      <h4>Technical Implementation</h4>
      <ul>
        <li><strong>Partitioning:</strong> Segmented CPU compute clusters and memory controllers across dual high-density Xilinx Virtex UltraScale+ FPGA boards.</li>
        <li><strong>Virtual Inter-FPGA Communication:</strong> Developed a cycle-synchronized transport layer operating over shared host workstation memory, eliminating hardware cable pin bottlenecks.</li>
        <li><strong>Zero-Deadlock Validation:</strong> Executed bootrom and Linux kernel boot sequences in pre-silicon emulation, identifying subtle clock-domain race conditions prior to mask fabrication.</li>
      </ul>
    `
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  const data = projectDetails[projectId];
  if (!modal || !content || !data) return;

  const tagsHtml = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

  content.innerHTML = `
    <div class="card-chip-badge cyan">${data.badge}</div>
    <h2 style="font-size:1.75rem; margin-bottom:0.75rem; padding-right:2rem;">${data.title}</h2>
    <div class="card-tags" style="margin-bottom:1.5rem;">${tagsHtml}</div>
    <div style="font-size:0.96rem; line-height:1.7; color:var(--text-muted);">
      ${data.content}
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function initModals() {
  const projectModal = document.getElementById('project-modal');
  const projectCloseBtn = document.getElementById('modal-close');

  function closeProjectModal() {
    if (projectModal) projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (projectCloseBtn) projectCloseBtn.addEventListener('click', closeProjectModal);

  // Close when clicking modal backdrop
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

/* ==========================================================================
   6. CONTACT FORM, COPY EMAIL, AND TOASTS
   ========================================================================== */
function initContactAndCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'foez.official@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Direct: foez.official@gmail.com');
      });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const topic = document.getElementById('form-topic').value;
      const msg = document.getElementById('form-message').value;

      const subject = encodeURIComponent(`[Inquiry - ${topic.toUpperCase()}] From ${name}`);
      const body = encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${msg}`);

      showToast('Opening your default mail client with transmission payload...');
      setTimeout(() => {
        window.location.href = `mailto:foez.official@gmail.com?subject=${subject}&body=${body}`;
      }, 700);
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   7. NAVIGATION & SCROLL OBSERVER
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

