const navItems = [
  ['Dashboard', '⌂'], ['Customers', '👥'], ['Service Calls', '🔧'], ['PM Scheduling', '📅'],
  ['Quotes', '📄'], ['Invoices', '🧾'], ['Equipment', '🧰'], ['Technician Notes', '📝'],
  ['Costs', '📦'], ['Profit Calculator', '📈'],
];

const metrics = [
  { label: 'Active Customers', value: '248', change: '+18 this month', icon: '👥', tone: 'blue' },
  { label: 'Open Service Calls', value: '37', change: '11 high priority', icon: '🚚', tone: 'orange' },
  { label: 'PM Visits Due', value: '64', change: 'Next 14 days', icon: '📅', tone: 'green' },
  { label: 'Projected Profit', value: '$42.8k', change: '31.5% blended margin', icon: '💵', tone: 'purple' },
];

const serviceCalls = [
  { id: 'SC-1048', customer: 'Northgate Medical Plaza', type: 'No cooling', tech: 'E. Ramirez', priority: 'High', status: 'Dispatching', time: '8:30 AM' },
  { id: 'SC-1049', customer: 'Summit Foods DC', type: 'Compressor alarm', tech: 'M. Clark', priority: 'Critical', status: 'On site', time: '9:15 AM' },
  { id: 'SC-1050', customer: 'Harbor Point Offices', type: 'Tenant comfort', tech: 'J. Lee', priority: 'Medium', status: 'Scheduled', time: '11:00 AM' },
  { id: 'SC-1051', customer: 'Apex School District', type: 'RTU belt noise', tech: 'T. Nguyen', priority: 'Low', status: 'Complete', time: '1:45 PM' },
];

const pmSchedule = [
  { site: 'Canyon Ridge Retail', asset: '12 RTUs', window: 'May 8', completion: 82 },
  { site: 'Triad Logistics', asset: 'Chiller plant', window: 'May 10', completion: 47 },
  { site: 'Bluebird Apartments', asset: 'Boilers', window: 'May 13', completion: 64 },
];

const quotes = [
  { name: 'Warehouse economizer retrofit', customer: 'Summit Foods DC', amount: '$18,900', status: 'Awaiting approval' },
  { name: 'VAV box replacements', customer: 'Northgate Medical Plaza', amount: '$32,400', status: 'Sent' },
  { name: 'Controls service agreement', customer: 'Harbor Point Offices', amount: '$9,650', status: 'Draft' },
];

const equipment = [
  { unit: 'RTU-07', site: 'Canyon Ridge Retail', age: '9 yrs', last: 'Filter, belt, coil wash', health: 'Good' },
  { unit: 'CH-02', site: 'Triad Logistics', age: '14 yrs', last: 'VFD fault reset', health: 'Watch' },
  { unit: 'BLR-01', site: 'Bluebird Apartments', age: '6 yrs', last: 'Ignition inspection', health: 'Excellent' },
];

const notes = [
  { tech: 'E. Ramirez', note: 'Found condenser coil impacted. Recommended quarterly wash and added photo documentation.', tag: 'Follow-up quote' },
  { tech: 'M. Clark', note: 'Temporary compressor lockout cleared. Need OEM contactor and phase monitor on return trip.', tag: 'Parts needed' },
  { tech: 'J. Lee', note: 'Tenant suite 410 thermostat relocated away from direct sun load. Comfort improved.', tag: 'Resolved' },
];

const costRows = [
  { label: 'Labor', actual: 12840, budget: 15000 },
  { label: 'Materials', actual: 18425, budget: 21000 },
  { label: 'Subcontractors', actual: 7250, budget: 9000 },
];

const state = { revenue: 68000, labor: 18500, materials: 14200, subs: 7600, overhead: 8500 };
const root = document.getElementById('root');

const currency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const slug = (value) => value.toLowerCase().replaceAll(' ', '-');

function panelHeader(icon, title, action) {
  return `<header class="panel-header"><div><span class="panel-icon">${icon}</span><h2>${title}</h2></div><button>${action}<span>›</span></button></header>`;
}

function render() {
  root.innerHTML = `
    <main class="app dark">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <div class="brand-mark">❄</div>
          <div><strong>Apex Mechanical</strong><span>HVAC Project Hub</span></div>
        </div>
        <nav aria-label="Primary navigation">
          ${navItems.map(([label, icon], index) => `<a class="${index === 0 ? 'active' : ''}" href="#${slug(label)}"><span>${icon}</span><span>${label}</span></a>`).join('')}
        </nav>
        <div class="sidebar-card"><span>⚙</span><strong>Fleet capacity</strong><p>16 techs scheduled · 4 emergency slots open</p></div>
      </aside>

      <section class="workspace">
        <header class="topbar">
          <button class="icon-button mobile-only" id="menuButton" aria-label="Open menu">☰</button>
          <div class="search"><span>⌕</span><input placeholder="Search customers, calls, invoices, or equipment..." /></div>
          <div class="topbar-actions">
            <button class="icon-button" aria-label="Notifications">🔔</button>
            <button class="theme-toggle" id="themeToggle"><span>☀</span><span class="mode-label">Light mode</span></button>
          </div>
        </header>

        <section class="hero" id="dashboard">
          <div>
            <p class="eyebrow"><span>●</span> Live operations dashboard</p>
            <h1>Control every HVAC project from dispatch to final margin.</h1>
            <p>A modern command center for customer tracking, service calls, PM scheduling, quoting, invoices, equipment history, field notes, and job profitability.</p>
          </div>
          <div class="hero-panel"><span class="hero-icon">🌡</span><span>Today's readiness</span><strong>94%</strong><small>Technicians, parts, and PM checklists aligned</small></div>
        </section>

        <section class="metrics-grid" aria-label="Key project metrics">
          ${metrics.map((metric) => `<article class="metric-card ${metric.tone}"><div>${metric.icon}</div><span>${metric.label}</span><strong>${metric.value}</strong><small>${metric.change}</small></article>`).join('')}
        </section>

        <section class="content-grid">
          <article class="panel wide" id="service-calls">
            ${panelHeader('🔧', 'Service call tracking', 'View board')}
            <div class="table-list">${serviceCalls.map((call) => `
              <div class="service-row">
                <div class="call-id"><span>✓</span><strong>${call.id}</strong></div>
                <div><span>${call.customer}</span><small>${call.type}</small></div>
                <div><span>${call.tech}</span><small>${call.time}</small></div>
                <em class="priority ${call.priority.toLowerCase()}">${call.priority}</em>
                <b>${call.status}</b>
              </div>`).join('')}
            </div>
          </article>

          <article class="panel" id="pm-scheduling">
            ${panelHeader('📅', 'PM scheduling', 'Calendar')}
            <div class="stack">${pmSchedule.map((pm) => `<div class="pm-card"><div><strong>${pm.site}</strong><span>${pm.asset} · ${pm.window}</span></div><div class="progress"><span style="width:${pm.completion}%"></span></div><small>${pm.completion}% ready</small></div>`).join('')}</div>
          </article>

          <article class="panel" id="quotes">
            ${panelHeader('📄', 'Quote tracking', 'New quote')}
            <div class="stack">${quotes.map((quote) => `<div class="quote"><strong>${quote.name}</strong><span>${quote.customer}</span><div><b>${quote.amount}</b><em>${quote.status}</em></div></div>`).join('')}</div>
          </article>

          <article class="panel" id="invoices">
            ${panelHeader('🧾', 'Invoice tracking', 'A/R report')}
            <div class="invoice-summary"><div><span>Ready to bill</span><strong>$76.2k</strong></div><div><span>Open invoices</span><strong>$119.8k</strong></div><div><span>Past due</span><strong>$12.4k</strong></div></div>
          </article>

          <article class="panel wide" id="equipment">
            ${panelHeader('🧰', 'Equipment history', 'Asset library')}
            <div class="equipment-grid">${equipment.map((item) => `<div class="equipment-card"><div><strong>${item.unit}</strong><span>${item.site}</span></div><p>${item.last}</p><footer><span>${item.age}</span><b>${item.health}</b></footer></div>`).join('')}</div>
          </article>

          <article class="panel" id="technician-notes">
            ${panelHeader('📝', 'Technician notes', 'Review')}
            <div class="stack notes">${notes.map((entry) => `<div class="note"><div><span>👷</span><strong>${entry.tech}</strong><em>${entry.tag}</em></div><p>${entry.note}</p></div>`).join('')}</div>
          </article>

          <article class="panel" id="costs">
            ${panelHeader('📦', 'Labor / material / sub tracking', 'Cost detail')}
            <div class="cost-stack">${costRows.map((row) => { const pct = Math.round((row.actual / row.budget) * 100); return `<div class="cost-row"><div><span>${row.label}</span><strong>${currency(row.actual)}</strong></div><div class="progress"><span style="width:${pct}%"></span></div><small>${pct}% of ${currency(row.budget)} budget</small></div>`; }).join('')}</div>
          </article>

          <article class="panel profit-panel" id="profit-calculator">
            ${panelHeader('📈', 'Profit calculator', 'Save scenario')}
            <div class="calculator">${Object.entries(state).map(([key, value]) => `<label><span>${key}</span><input type="number" data-calc="${key}" value="${value}" /></label>`).join('')}</div>
            <div class="profit-result" id="profitResult"></div>
          </article>
        </section>
      </section>
    </main>`;

  bindEvents();
  updateProfit();
}

function bindEvents() {
  const app = document.querySelector('.app');
  const sidebar = document.getElementById('sidebar');
  document.getElementById('menuButton').addEventListener('click', () => sidebar.classList.add('open'));
  sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => sidebar.classList.remove('open')));
  document.getElementById('themeToggle').addEventListener('click', () => {
    app.classList.toggle('dark');
    const isDark = app.classList.contains('dark');
    document.querySelector('#themeToggle span:first-child').textContent = isDark ? '☀' : '🌙';
    document.querySelector('.mode-label').textContent = isDark ? 'Light mode' : 'Dark mode';
  });
  document.querySelectorAll('[data-calc]').forEach((input) => input.addEventListener('input', (event) => {
    state[event.target.dataset.calc] = Number(event.target.value || 0);
    updateProfit();
  }));
  document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && event.target.id !== 'menuButton') sidebar.classList.remove('open');
  });
}

function updateProfit() {
  const cost = state.labor + state.materials + state.subs + state.overhead;
  const gross = state.revenue - cost;
  const margin = state.revenue > 0 ? (gross / state.revenue) * 100 : 0;
  document.getElementById('profitResult').innerHTML = `
    <div><span>Total cost</span><strong>${currency(cost)}</strong></div>
    <div><span>Gross profit</span><strong>${currency(gross)}</strong></div>
    <div><span>Margin</span><strong>${margin.toFixed(1)}%</strong></div>`;
}

render();
