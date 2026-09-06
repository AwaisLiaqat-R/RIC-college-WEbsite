/* ==========================================================================
   Riphah International College (Intermediate / HSSC Division)
   Application Logic, Calculator Engine & Interactive Controllers
   ========================================================================== */

const INTERMEDIATE_PROGRAMS = [
  {
    id: 'fsc-med',
    title: 'F.Sc. Pre-Medical',
    gradeBadge: '11th & 12th Grade',
    category: 'fsc',
    categoryName: 'Medical Stream',
    icon: 'fa-user-md',
    duration: '2 Years (HSSC Level)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Islamiat / Pak Studies'],
    desc: 'Intensive preparation for Board examinations (FBISE/BISE) coupled with comprehensive MDCAT medical college entry test coaching.',
    career: 'Direct pathways to MBBS, BDS, Pharm-D, Biotechnology, DPT, and Allied Health Sciences.'
  },
  {
    id: 'fsc-eng',
    title: 'F.Sc. Pre-Engineering',
    gradeBadge: '11th & 12th Grade',
    category: 'fsc',
    categoryName: 'Engineering Stream',
    icon: 'fa-atom',
    duration: '2 Years (HSSC Level)',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Urdu', 'Islamiat / Pak Studies'],
    desc: 'Strong foundation in advanced calculus, mechanics, and physical sciences with specialized ECAT & NUST entry test modules.',
    career: 'Pathways to Software Engineering, Mechanical, Electrical, Civil, Aerospace & Robotics.'
  },
  {
    id: 'ics-cs',
    title: 'ICS - Computer Science',
    gradeBadge: '11th & 12th Grade',
    category: 'ics',
    categoryName: 'Computing Stream',
    icon: 'fa-laptop-code',
    duration: '2 Years (HSSC Level)',
    subjects: ['Computer Science', 'Mathematics', 'Physics / Statistics', 'English', 'Urdu', 'Islamiat'],
    desc: 'Hands-on programming logic, C++ and Python fundamentals, algorithm design, relational databases, and IT board exam training.',
    career: 'Pathways to BS Computer Science, Artificial Intelligence, Software Engineering & Cyber Security.'
  },
  {
    id: 'icom',
    title: 'I.Com - Commerce & Banking',
    gradeBadge: '11th & 12th Grade',
    category: 'icom',
    categoryName: 'Commerce Stream',
    icon: 'fa-chart-pie',
    duration: '2 Years (HSSC Level)',
    subjects: ['Principles of Accounting', 'Principles of Commerce', 'Economics', 'Business Mathematics & Statistics'],
    desc: 'Applied financial accounting, corporate business principles, banking laws, and managerial economics for business aspirants.',
    career: 'Direct entry into CA, ACCA, BBA, BS Accounting & Finance, Fintech & Banking.'
  },
  {
    id: 'fa-arts',
    title: 'F.A. Arts & Humanities',
    gradeBadge: '11th & 12th Grade',
    category: 'fa',
    categoryName: 'Humanities Stream',
    icon: 'fa-palette',
    duration: '2 Years (HSSC Level)',
    subjects: ['Psychology', 'Fine Arts / Civics', 'Economics', 'Computer Studies', 'English Literature'],
    desc: 'Creative, sociological and analytical humanities education preparing students for legal, design, and media career tracks.',
    career: 'Pathways to LL.B (Law), BS Psychology, Mass Communication, Visual Arts & Digital Design.'
  }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderPrograms('all');
  initMatricCalculator();
  initHeaderScroll();
  initMobileMenu();
});

// Header scroll effect for glass intensity
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

// Render Intermediate Academic Programs
function renderPrograms(filter = 'all', btnElement = null) {
  if (btnElement) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  const container = document.getElementById('programsGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? INTERMEDIATE_PROGRAMS 
    : INTERMEDIATE_PROGRAMS.filter(p => p.category === filter);

  container.innerHTML = filtered.map(prog => `
    <div class="program-card">
      <div>
        <div class="program-header-row">
          <div class="program-icon-badge">
            <i class="fas ${prog.icon}"></i>
          </div>
          <span class="badge badge-gold">${prog.categoryName.toUpperCase()}</span>
        </div>

        <h3 class="program-title">${prog.title}</h3>
        <p class="program-desc">${prog.desc}</p>

        <div class="subject-pills-box">
          <div class="subject-pills-title">
            <i class="fas fa-layer-group"></i> Key Curriculum Subjects
          </div>
          <div class="subject-pills-list">
            ${prog.subjects.map(s => `<span class="subject-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="program-career-note">
          <i class="fas fa-graduation-cap"></i>
          <div>${prog.career}</div>
        </div>

        <button class="btn btn-gold btn-sm" style="width: 100%;" onclick="selectProgramForApp('${prog.title}')">
          <i class="fas fa-edit"></i> Apply For ${prog.title.split(' - ')[0]}
        </button>
      </div>
    </div>
  `).join('');
}

// Matric Marks Scholarship Engine
function initMatricCalculator() {
  const marksInput = document.getElementById('calcMatricMarks');
  const marksVal = document.getElementById('calcMatricVal');

  if (!marksInput) return;

  const calculate = () => {
    const marks = parseInt(marksInput.value, 10);
    const totalMarks = 1100;
    const percentage = ((marks / totalMarks) * 100).toFixed(1);

    // Update Slider visual progress gradient
    const min = parseInt(marksInput.min, 10) || 600;
    const max = parseInt(marksInput.max, 10) || 1100;
    const progressPct = ((marks - min) / (max - min)) * 100;
    marksInput.style.setProperty('--range-progress', `${progressPct}%`);

    if (marksVal) {
      marksVal.textContent = `${marks} / ${totalMarks} (${percentage}%)`;
    }

    // Base standard monthly tuition
    const baseMonthlyFee = 8500;
    let scholarshipPct = 0;
    let activeTierId = '';
    let statusMessage = '';

    if (percentage >= 90) {
      scholarshipPct = 100;
      activeTierId = 'tier-100';
      statusMessage = '🎉 100% Free Education & Full Tuition Waiver Awarded!';
    } else if (percentage >= 85) {
      scholarshipPct = 75;
      activeTierId = 'tier-75';
      statusMessage = '🌟 75% High Achiever Merit Concession Applied!';
    } else if (percentage >= 80) {
      scholarshipPct = 50;
      activeTierId = 'tier-50';
      statusMessage = '✨ 50% Intermediate Excellence Scholarship Applied!';
    } else if (percentage >= 70) {
      scholarshipPct = 30;
      activeTierId = 'tier-30';
      statusMessage = '✔️ 30% Matric Distinction Scholarship Applied!';
    } else if (percentage >= 60) {
      scholarshipPct = 15;
      statusMessage = '✔️ 15% Academic Assistance Concession Applied!';
    } else {
      scholarshipPct = 0;
      statusMessage = 'Standard Board Fee Structure Applicable.';
    }

    // Update Tier Badges active state
    document.querySelectorAll('.tier-badge-item').forEach(tier => {
      tier.classList.remove('active-tier');
    });
    if (activeTierId) {
      const activeEl = document.getElementById(activeTierId);
      if (activeEl) activeEl.classList.add('active-tier');
    }

    const discountAmount = Math.round((baseMonthlyFee * scholarshipPct) / 100);
    const netMonthly = baseMonthlyFee - discountAmount;

    // DOM Updates
    const pctElem = document.getElementById('scholarshipPct');
    const statusElem = document.getElementById('scholarshipStatusText');
    const baseElem = document.getElementById('baseMonthlyFee');
    const discElem = document.getElementById('discountMonthlyFee');
    const netElem = document.getElementById('netMonthlyFee');

    if (pctElem) pctElem.textContent = `${scholarshipPct}%`;
    if (statusElem) statusElem.textContent = statusMessage;
    if (baseElem) baseElem.textContent = `PKR ${baseMonthlyFee.toLocaleString()} / mo`;
    if (discElem) discElem.textContent = scholarshipPct > 0 ? `- PKR ${discountAmount.toLocaleString()} / mo` : 'PKR 0';
    
    if (netElem) {
      if (scholarshipPct === 100) {
        netElem.innerHTML = '<span style="color:#22c55e; font-weight:900;">FREE EDUCATION (100% OFF)</span>';
      } else {
        netElem.textContent = `PKR ${netMonthly.toLocaleString()} / mo`;
      }
    }

    // Also sync the marks to the admission form if empty or matching
    const formMarksInput = document.getElementById('matricMarksInput');
    if (formMarksInput && !formMarksInput.matches(':focus')) {
      formMarksInput.value = marks;
    }
  };

  marksInput.addEventListener('input', calculate);
  calculate();
}

// Preset button setter
function setSliderMarks(marks) {
  const marksInput = document.getElementById('calcMatricMarks');
  if (marksInput) {
    marksInput.value = marks;
    marksInput.dispatchEvent(new Event('input'));
  }
}

// Select program from card and auto-fill in application form
function selectProgramForApp(progTitle) {
  const select = document.getElementById('appGroup');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(progTitle.toLowerCase().split(' ')[0])) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  const admissionsSection = document.getElementById('admissions');
  if (admissionsSection) {
    admissionsSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected discipline: ${progTitle}`);
  }
}

// Submit Application Form Handler
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('studentName')?.value || 'Student Candidate';
  const fatherName = document.getElementById('fatherName')?.value || 'Guardian';
  const year = document.getElementById('appYear')?.value || '1st Year (11th Grade)';
  const group = document.getElementById('appGroup')?.value || 'F.Sc. Pre-Medical';
  const rollNo = document.getElementById('matricRoll')?.value || '109823';
  const board = document.getElementById('eduBoard')?.value || 'FBISE';
  const marks = document.getElementById('matricMarksInput')?.value || '980';
  const phone = document.getElementById('contactPhone')?.value || '0300-1234567';
  
  const tokenNumber = 'RIC-HSSC-' + Math.floor(10000 + Math.random() * 90000);
  const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="text-align: center;">
      <div style="width: 70px; height: 70px; background: rgba(212, 175, 55, 0.15); border: 2px solid var(--gold-400); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
        <i class="fas fa-check-circle" style="font-size: 2.2rem; color: var(--gold-400);"></i>
      </div>

      <span class="badge badge-gold" style="margin-bottom: 0.5rem;">Official Provisional Admission Slip</span>
      <h2 style="font-family: var(--font-heading); color: var(--white); font-size: 1.75rem; margin-bottom: 0.5rem; font-weight: 800;">
        Admission Form Submitted!
      </h2>
      <p style="color: var(--slate-300); font-size: 0.95rem; margin-bottom: 1.5rem;">
        Congratulations <strong>${name}</strong>! Your provisional registration for <strong>${year}</strong> in <strong>${group}</strong> has been received.
      </p>

      <div style="background: rgba(7, 13, 30, 0.85); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; margin-bottom: 1.5rem; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.5rem;">
          <span style="color: var(--slate-400);">Registration Token:</span>
          <span style="color: var(--gold-400); font-weight: 800; font-family: var(--font-mono);">${tokenNumber}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--slate-400);">Applicant Name:</span>
          <span style="color: var(--white); font-weight: 600;">${name} s/d/o ${fatherName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--slate-400);">Discipline Stream:</span>
          <span style="color: var(--gold-300); font-weight: 600;">${group}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--slate-400);">Matric Marks / Board:</span>
          <span style="color: var(--white);">${marks} Marks (${board})</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--slate-400);">Registered Date:</span>
          <span style="color: var(--white);">${currentDate}</span>
        </div>
      </div>

      <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: var(--radius-sm); padding: 0.75rem 1rem; color: #86efac; font-size: 0.85rem; margin-bottom: 1.5rem; text-align: left;">
        <i class="fas fa-info-circle"></i> <strong>Next Step:</strong> Please visit Riphah College Admission Office with your original Matric result card, 4 passport photos, and B-Form copy for interview verification.
      </div>

      <div style="display: flex; gap: 0.75rem;">
        <button class="btn btn-outline" style="flex: 1;" onclick="window.print()">
          <i class="fas fa-print"></i> Print Slip
        </button>
        <button class="btn btn-gold" style="flex: 1;" onclick="closeModal()">
          <i class="fas fa-check"></i> Done
        </button>
      </div>
    </div>
  `;

  openModal();
  showToast(`Admission Token Generated: ${tokenNumber}`);
}

// Student Portal Modal
function openPortalModal() {
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div>
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div class="logo-crest" style="margin: 0 auto 0.75rem auto; width: 50px; height: 50px; font-size: 1.5rem;">R</div>
        <h2 style="font-family: var(--font-heading); color: var(--white); font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem;">
          Student & Parent Portal
        </h2>
        <p style="color: var(--slate-400); font-size: 0.88rem;">Access live daily attendance, FBISE test series marks & fee ledger.</p>
      </div>

      <form onsubmit="handlePortal(event)">
        <div class="form-group">
          <label class="form-label">College Roll Number / Admission No.</label>
          <div class="input-with-icon">
            <i class="fas fa-id-badge"></i>
            <input type="text" class="form-input" placeholder="e.g. 2026-FSC-104" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Password / B-Form Number</label>
          <div class="input-with-icon">
            <i class="fas fa-key"></i>
            <input type="password" class="form-input" placeholder="••••••••••••" required>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <label style="color: var(--slate-300); display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
            <input type="checkbox" checked style="accent-color: var(--gold-500);"> Remember session
          </label>
          <a href="#" onclick="showToast('Password reset link sent to registered guardian phone.'); return false;" style="color: var(--gold-400);">Forgot password?</a>
        </div>

        <button type="submit" class="btn btn-gold" style="width: 100%; font-size: 1rem;">
          <i class="fas fa-sign-in-alt"></i> Login to Portal
        </button>
      </form>
    </div>
  `;

  openModal();
}

// Handle Portal Login
function handlePortal(e) {
  e.preventDefault();
  closeModal();
  showToast('Welcome back! Attendance: 98% | Next Test: Biology Ch-4 (Monday)');
}

// Modal open/close helpers
function openModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Toast notification helper
function showToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-bell" style="color: var(--gold-400);"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
