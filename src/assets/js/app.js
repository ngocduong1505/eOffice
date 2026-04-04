/**
 * app.js — eOffice Prototype Application Logic
 *
 * Dynamically loads screen HTML fragments on demand.
 * Screens are organized in: screens/{group}/{id-slug}.html
 * Shared sidebar is loaded once from: components/sidebar.html
 */

// Screen registry: screen ID -> file path
const SCREEN_REGISTRY = {
  // ── Văn bản Đến ──────────────────────────────
  's1':  'screens/vb-den/s1-danh-sach.html',
  's2':  'screens/vb-den/s2-tiep-nhan.html',
  's3':  'screens/vb-den/s3-chi-tiet.html',
  's4':  'screens/vb-den/s4-chi-dao.html',
  's5':  'screens/vb-den/s5-dang-xu-ly.html',
  's6':  'screens/vb-den/s6-hoan-thanh.html',
  's7':  'screens/vb-den/s7-thiet-lap-luong.html',
  // ── Văn bản Đi ───────────────────────────────
  's8':  'screens/vb-di/s8-danh-sach.html',
  's9':  'screens/vb-di/s9-soan-thao.html',
  's10': 'screens/vb-di/s10-duyet-song-song.html',
  's11': 'screens/vb-di/s11-ky-so.html',
  's12': 'screens/vb-di/s12-cap-so-ban-hanh.html',
  's13': 'screens/vb-di/s13-da-ban-hanh.html',
  // ── Văn bản Nội bộ ───────────────────────────
  's14': 'screens/noi-bo/s14-danh-sach.html',
  's15': 'screens/noi-bo/s15-tao-moi.html',
  // ── Hồ sơ lưu trữ ────────────────────────────
  's16': 'screens/ho-so/s16-danh-sach.html',
  's17': 'screens/ho-so/s17-tao-ho-so.html',
  's18': 'screens/ho-so/s18-chi-tiet.html',
  's19': 'screens/ho-so/s19-nop-luu.html',
  // ── Sổ đăng ký & Báo cáo ─────────────────────
  's20': 'screens/so-bc/s20-so-dang-ky.html',
  's21': 'screens/so-bc/s21-cau-hinh-so.html',
  's22': 'screens/so-bc/s22-bao-cao.html',
};

// Map each screen ID to its sidebar group key
const SCREEN_GROUP = {
  s1: 'vb-den', s2: 'vb-den', s3: 'vb-den', s4: 'vb-den',
  s5: 'vb-den', s6: 'vb-den', s7: 'vb-den',
  s8: 'vb-di',  s9: 'vb-di',  s10: 'vb-di', s11: 'vb-di',
  s12: 'vb-di', s13: 'vb-di',
  s14: 'noi-bo', s15: 'noi-bo',
  s16: 'ho-so',  s17: 'ho-so', s18: 'ho-so', s19: 'ho-so',
  s20: 'so-bc',  s21: 'so-bc', s22: 'so-bc',
};

const container = document.getElementById('screen-container');
const loadedScreens = new Set(); // track which screens are already in the DOM
let currentScreen = null;

/**
 * Navigate to a screen. Fetches HTML from file if not yet loaded.
 * @param {string} id - Screen ID, e.g. 's1'
 */
async function goScreen(id) {
  // Load screen HTML if not already in DOM
  if (!loadedScreens.has(id)) {
    const path = SCREEN_REGISTRY[id];
    if (!path) {
      console.error(`goScreen: unknown screen id "${id}"`);
      return;
    }
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${path}`);
      const html = await res.text();
      // Create a temporary container to parse the fragment
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      // Append the screen div(s) to the container
      while (tmp.firstChild) {
        container.appendChild(tmp.firstChild);
      }
      loadedScreens.add(id);
    } catch (err) {
      console.error(`Failed to load screen ${id}:`, err);
      return;
    }
  }

  // Hide all currently visible screens
  container.querySelectorAll('.screen.on').forEach(s => s.classList.remove('on'));

  // Show the requested screen
  const target = document.getElementById(id);
  if (target) target.classList.add('on');

  // ── Sync bottom flow-nav ──
  document.querySelectorAll('.fn-btn').forEach(b => b.classList.remove('on'));
  const nb = document.getElementById('nb-' + id);
  if (nb) nb.classList.add('on');

  // ── Sync sidebar child item ──
  document.querySelectorAll('.ni.sub-2').forEach(n => n.classList.remove('on'));
  const si = document.getElementById('si-' + id);
  if (si) si.classList.add('on');

  // ── Sync sidebar parent group ──
  const group = SCREEN_GROUP[id];
  if (group) {
    // Deactivate all parent items
    document.querySelectorAll('.ni.sub[id^="si-"]').forEach(n => n.classList.remove('on'));
    // Activate the correct parent
    const parent = document.getElementById('si-' + group);
    if (parent) parent.classList.add('on');
    // Open the child list of the active group
    openNavGroup(group);
  }

  currentScreen = id;
}

/**
 * Toggle a sidebar nav group open/closed.
 * If the group is closed, open it and navigate to defaultScreen.
 * If it is already open, just collapse it.
 * @param {string} group       - e.g. 'vb-den'
 * @param {string} defaultScreen - screen ID to navigate to when opening
 */
function toggleNavGroup(group, defaultScreen) {
  const children = document.getElementById('children-' + group);
  if (!children) return;

  const isOpen = !children.classList.contains('collapsed');

  if (isOpen) {
    // Collapse this group
    children.classList.add('collapsed');
  } else {
    // Expand and navigate
    openNavGroup(group);
    goScreen(defaultScreen);
  }
}

/**
 * Open (expand) a nav group without toggling.
 * @param {string} group - e.g. 'vb-den'
 */
function openNavGroup(group) {
  // Close all other groups
  document.querySelectorAll('.ni-children').forEach(el => {
    if (el.id !== 'children-' + group) el.classList.add('collapsed');
  });
  // Open the target group
  const children = document.getElementById('children-' + group);
  if (children) children.classList.remove('collapsed');
}

/**
 * Switch tab inside a detail panel.
 * @param {HTMLElement} el - The clicked .dptab element
 * @param {string} paneId - ID of the .tab-pane to show
 */
function switchTab(el, paneId) {
  el.parentElement.querySelectorAll('.dptab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  const body = el.closest('.dp-tabs').nextElementSibling;
  body.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('on'));
  const target = document.getElementById(paneId);
  if (target) {
    target.classList.add('on');
    target.style.display = 'block';
  }
}

/**
 * Load the shared sidebar component into #sidebar-host (once).
 */
async function loadSidebar() {
  const host = document.getElementById('sidebar-host');
  if (!host) return;
  try {
    const res = await fetch('components/sidebar.html');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    host.innerHTML = await res.text();
  } catch (err) {
    console.error('Failed to load sidebar:', err);
  }
}

// ── Bootstrap: load sidebar + Screen 1 on page ready ────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadSidebar();
  goScreen('s1');
});
