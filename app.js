'use strict';
// ════════════════════════════════════════════
//  MASTER CONFIG
// ════════════════════════════════════════════
const REGIONS = ['North Central','Northeast','Northwest','South Central','Southeast','Southwest'];

const REGION_COLORS = {
  'North Central': '#0073FF',
  'Northeast':     '#E1523D',
  'Northwest':     '#43B02A',
  'South Central': '#4EC3E0',
  'Southeast':     '#c9a200',
  'Southwest':     '#8b44cc',
  'PSFO':          '#041E42',
};

// REGIONS_PSFO: standard 6 + PSFO (used for Campus, Special, Placements Ended)
const REGIONS_PSFO = ['North Central','Northeast','Northwest','South Central','Southeast','Southwest','PSFO'];

const MONTHS_LBL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const ROLES = {
  pd: { label:'Program Directors',        color:'#0073FF', bg:'#e8f1ff', text:'#0058cc' },
  tm: { label:'Training Manager',         color:'#E1523D', bg:'#fdf0ee', text:'#b83626' },
  th: { label:'Therapy Dog Program Mgr',  color:'#43B02A', bg:'#edf8ea', text:'#2a7a18' },
  br: { label:'Breeding Program Manager', color:'#425563', bg:'#edf0f2', text:'#2e404e' },
  pp: { label:'Puppy Program Managers',   color:'#c9a200', bg:'#fffbe6', text:'#7a6000' },
};

// Each section defines its fields.
// type: 'number' = normal input
// type: 'computed' = auto-summed from `sumOf` field ids (same section)
const SECTIONS = [
  {
    id:'applicants', label:'Applicant/Candidates', role:'pd', entry:true,
    fields:[
      { id:'app_requests',    label:'Application Requests Received',  type:'number',   group:'requests' },
      { id:'added_waitlist',  label:'Added to Waitlist',              type:'number',   group:'added' },
      { id:'waitlist_total',  label:'Waitlist Total',                 type:'computed',
        sumOf:['wl_facility','wl_hearing','wl_service','wl_medical_alert','wl_service_fac','wl_ptsd'],
        isTotal:true, group:'detail' },
      { id:'wl_facility',     label:'Facility',                       type:'number',   group:'detail', indent:true },
      { id:'wl_hearing',      label:'Hearing',                        type:'number',   group:'detail', indent:true },
      { id:'wl_service',      label:'Service',                        type:'number',   group:'detail', indent:true },
      { id:'wl_medical_alert',label:'Medical Alert',                  type:'number',   group:'detail', indent:true },
      { id:'wl_service_fac',  label:'Service with Facilitator',       type:'number',   group:'detail', indent:true },
      { id:'wl_ptsd',         label:'PTSD',                           type:'number',   group:'detail', indent:true },
    ]
  },
  {
    id:'graduates', label:'Graduates', role:'pd', entry:true,
    regions: 'psfo',
    fields:[
      { id:'adi_tests',     label:'ADI Tests',                     type:'number',   group:'g_adi' },
      { id:'checkins_6mo',  label:'6-Month 2-Way Check-ins',       type:'number',   group:'g_checkins' },
      { id:'live_meetings', label:'Other Live 2-Way Meetings',     type:'number',   group:'g_live' },
      { id:'touches',       label:'Calls, Emails & Other Touches', type:'number',   group:'g_touches' },
      { id:'total',         label:'Total',                         type:'computed', group:'g_total', isTotal:true,
        sumOf:['adi_tests','checkins_6mo','live_meetings','touches'] },
    ],
  },
  {
    id:'dog_placements', label:'Dog Placements', role:'pd', entry:true,
    placementType: true,   // flag: render with the 4-sub-section layout
    placementSections: [
      {
        id:'campus',   label:'Campus Placements',
        color:'#0073FF', lightBg:'#e8f1ff',
        regions: 'psfo',   // 6 standard + PSFO
        fields:[
          { id:'facility',     label:'Facility',                  type:'number' },
          { id:'hearing',      label:'Hearing',                   type:'number' },
          { id:'service',      label:'Service',                   type:'number' },
          { id:'medical_alert',label:'Medical Alert',             type:'number' },
          { id:'service_fac',  label:'Service with Facilitator',  type:'number' },
          { id:'ptsd',         label:'PTSD',                      type:'number' },
          { id:'total',        label:'Total',
            type:'computed', isTotal:true,
            sumOf:['facility','hearing','service','medical_alert','service_fac','ptsd'] },
        ]
      },
      {
        id:'credited', label:'Credited Placements',
        color:'#425563', lightBg:'#edf0f2',
        regions: 'standard',   // 6 regions only, no PSFO
        fields:[
          { id:'facility',     label:'Facility',                  type:'number' },
          { id:'hearing',      label:'Hearing',                   type:'number' },
          { id:'service',      label:'Service',                   type:'number' },
          { id:'medical_alert',label:'Medical Alert',             type:'number' },
          { id:'service_fac',  label:'Service with Facilitator',  type:'number' },
          { id:'ptsd',         label:'PTSD',                      type:'number' },
          { id:'total',        label:'Total',
            type:'computed', isTotal:true,
            sumOf:['facility','hearing','service','medical_alert','service_fac','ptsd'] },
        ]
      },
      {
        id:'ended',    label:'Placements Ended <12 Months',
        color:'#E1523D', lightBg:'#fdf0ee',
        regions: 'psfo',   // 6 standard + PSFO
        fields:[
          { id:'facility',     label:'Facility',                  type:'number' },
          { id:'hearing',      label:'Hearing',                   type:'number' },
          { id:'service',      label:'Service',                   type:'number' },
          { id:'medical_alert',label:'Medical Alert',             type:'number' },
          { id:'service_fac',  label:'Service with Facilitator',  type:'number' },
          { id:'ptsd',         label:'PTSD',                      type:'number' },
          { id:'total',        label:'Total',
            type:'computed', isTotal:true,
            sumOf:['facility','hearing','service','medical_alert','service_fac','ptsd'] },
        ]
      },
      {
        id:'special',  label:'Special Placements',
        color:'#43B02A', lightBg:'#edf8ea',
        regions: 'psfo',   // 6 standard + PSFO
        fields:[
          { id:'offsite',      label:'Off-Site Placements',       type:'number' },
          { id:'successors',   label:'Successors',                type:'number' },
          { id:'veterans',     label:'Veterans',                  type:'number' },
          { id:'minors',       label:'Minors <18 Years Old',      type:'number' },
          { id:'total',        label:'Total',
            type:'computed', isTotal:true,
            sumOf:['offsite','successors','veterans','minors'] },
        ]
      },
    ],
    fields:[]   // kept for compatibility
  },
  { id:'graduate_log',     label:'Graduate Log',           role:'pd', entry:false, fields:[] },
  {
    id:'pro_training', label:'Professional Training Dogs', role:'tm', entry:true,
    fields:[
      { id:'sem1', label:'1st Semester', type:'number', group:'semesters' },
      { id:'sem2', label:'2nd Semester', type:'number', group:'semesters' },
      { id:'sem3', label:'3rd Semester', type:'number', group:'semesters' },
      { id:'total', label:'Total', type:'computed', group:'semesters', isTotal:true,
        sumOf:['sem1','sem2','sem3'] },
    ],
    regions: 'psfo',
  },
  {
    id:'release_dogs', label:'Release Dogs', role:'tm', entry:true,
    fields:[
      { id:'to_therapy',     label:'Release to Therapy Dog',               type:'number',   group:'r_therapy' },
      { id:'agency_transfer',label:'Agency Transfers',                     type:'number',   group:'r_agency' },
      { id:'prior_matric',   label:'Dogs Released Prior to Matriculation', type:'number',   group:'r_prior' },
      { id:'all_other',      label:'All Other Release Dogs',               type:'number',   group:'r_other' },
      { id:'total',          label:'Total',                                type:'computed', group:'r_total', isTotal:true,
        sumOf:['to_therapy','agency_transfer','prior_matric','all_other'] },
    ],
  },
  {
    id:'therapy_dogs', label:'Therapy Dogs', role:'th', entry:true,
    regions: 'psfo',
    fields:[
      { id:'from_list',    label:'Placement from Therapy List',       type:'number',   group:'th_list'  },
      { id:'prog_or_prev', label:'Program or Prev Released or Retired',type:'number',   group:'th_prog'  },
      { id:'total',        label:'Total',                             type:'computed', group:'th_total', isTotal:true,
        sumOf:['from_list','prog_or_prev'] },
    ],
  },
  {
    id:'breeder_dogs', label:'Breeder Dogs', role:'br', entry:true,
    breederType: true,
    fields:[
      { id:'selected_male',   label:'Breeders Selected - Male',   type:'number',   group:'br_male',   regions:'standard' },
      { id:'selected_female', label:'Breeders Selected - Female', type:'number',   group:'br_female', regions:'standard' },
      { id:'br_total',        label:'Total Selected',             type:'computed', group:'br_stotal', isTotal:true,
        sumOf:['selected_male','selected_female'],                                                    regions:'standard' },
    ],
    hqFields:[
      { id:'active_male',     label:'Active Male Breeders',       type:'number',   group:'hq_active_male'   },
      { id:'active_female',   label:'Active Female Breeders',     type:'number',   group:'hq_active_female' },
      { id:'new_bc',          label:'Active New BC Households',   type:'number',   group:'hq_new_bc'        },
      { id:'repeat_bc',       label:'Active Repeat BC Households',type:'number',   group:'hq_repeat_bc'     },
      { id:'dams_bred',       label:'Dams Bred',                  type:'number',   group:'hq_dams'          },
      { id:'litters_whelped', label:'Litters Whelped',            type:'number',   group:'hq_litters'       },
      { id:'live_puppies',    label:'Live Puppies Born',          type:'number',   group:'hq_puppies'       },
    ],
  },
  {
    id:'puppy_placements', label:'Puppy Placements', role:'pp', entry:true,
    regions: 'psfo',
    fields:[
      { id:'new_raiser',    label:'New Puppy Raiser Placements',    type:'number',   group:'pp_new'    },
      { id:'repeat_raiser', label:'Repeat Puppy Raiser Placements', type:'number',   group:'pp_repeat' },
      { id:'waitlist',      label:'Puppy Waitlist Total',           type:'number',   group:'pp_wait'   },
      { id:'matriculated',  label:'Puppies Matriculated',           type:'number',   group:'pp_matric' },
      { id:'total',         label:'Total Placements',              type:'computed',  group:'pp_total', isTotal:true,
        sumOf:['new_raiser','repeat_raiser'], psfoOnly:false },
    ],
    psfoFields:[
      { id:'puppy_classes',  label:'Puppy Classes',          type:'number', group:'pp_classes'  },
      { id:'raiser_followup',label:'Puppy Raiser Follow Ups',type:'number', group:'pp_followup' },
    ],
    psfoType: true,
  },
  {
    id:'active_raisers', label:'Active Puppy Raisers', role:'pp', entry:true,
    fields:[
      { id:'total_raisers', label:'Total Active Raisers', type:'number', group:'ar_total' },
    ],
  },
  {
    id:'puppy_interest', label:'Puppy Interest', role:'pp', entry:true,
    fields:[
      { id:'app_requests', label:'Puppy Application Requests', type:'number',   group:'pi_requests' },
      { id:'apps_received',label:'Applications Received',      type:'number',   group:'pi_received' },
      { id:'apps_approved',label:'Applications Approved',      type:'number',   group:'pi_approved' },
      { id:'proj_waitlist',label:'Projected Waitlist',         type:'number',   group:'pi_waitlist' },
      { id:'fostered',     label:'Puppies Fostered',           type:'number',   group:'pi_fostered' },
    ],
  },
  {
    id:'prison_programs', label:'Prison Programs', role:'pp', entry:true,
    fields:[
      { id:'active_programs', label:'Active Number of Programs', type:'number',   group:'pr_programs' },
      { id:'active_puppies',  label:'Active Number of Puppies',  type:'number',   group:'pr_puppies'  },
      { id:'placed_month',    label:'Puppies Placed This Month', type:'number',   group:'pr_placed'   },
    ],
  },
  {
    id:'college_clubs', label:'College Clubs', role:'pp', entry:true,
    fields:[
      { id:'active_clubs',   label:'Active Number of Clubs',    type:'number',   group:'cc_clubs'   },
      { id:'active_puppies', label:'Active Number of Puppies',  type:'number',   group:'cc_puppies' },
      { id:'placed_month',   label:'Puppies Placed This Month', type:'number',   group:'cc_placed'  },
    ],
  },
];

const ENTRY_SECS = SECTIONS.filter(s => s.entry);

// ════════════════════════════════════════════
//  DATA STORE  --  persistent via window.storage
//  appData[year][month][sectionId][region][fieldId] = number
// ════════════════════════════════════════════
const appData = {};
let sfData = [], manualEntries = [];

function gv(yr,mo,sec,region,field){
  return ((((appData[yr]||{})[mo]||{})[sec]||{})[region]||{})[field]||0;
}
function sv(yr,mo,sec,region,field,val,skipQueue){
  if(!appData[yr])appData[yr]={};
  if(!appData[yr][mo])appData[yr][mo]={};
  if(!appData[yr][mo][sec])appData[yr][mo][sec]={};
  if(!appData[yr][mo][sec][region])appData[yr][mo][sec][region]={};
  appData[yr][mo][sec][region][field]=parseInt(val)||0;
  // Queue a Supabase save unless called from seed/load (skipQueue=true)
  if(!skipQueue && _currentUser) queueSave(yr,mo,sec,region,field,parseInt(val)||0);
}

// ══════════════════════════════════════════════════════════
//  SUPABASE BACKEND
//  Auth:  email/password via Supabase Auth
//  Data:  program_data table (upsert per field change)
//         graduate_entries table (grad log)
// ══════════════════════════════════════════════════════════

const SUPA_URL  = 'https://kickxekctozpbetmmdwb.supabase.co';
const SUPA_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpY2t4ZWtjdG96cGJldG1tZHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODc3ODUsImV4cCI6MjA5NTQ2Mzc4NX0.81jD6byI4cQypghXbKbafvzthVCaxYPQThQSVfQTxd4';
const SB = supabase.createClient(SUPA_URL, SUPA_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'cc-dashboard-auth',
  }
});

let _currentUser  = null;
let _storageSaving = false;

// ── UI helpers ──
function setSaveStatus(msg, color='var(--text-muted)'){
  const el=document.getElementById('save-status');
  if(el){ el.textContent=msg; el.style.color=color; }
}

// ── 15-minute inactivity timeout ──
const INACTIVITY_MS = 15 * 60 * 1000;  // 15 minutes
let _lastActivity = Date.now();
let _inactivityTimer = null;

function resetActivityTimer(){
  _lastActivity = Date.now();
  clearTimeout(_inactivityTimer);
  _inactivityTimer = setTimeout(async ()=>{
    // Sign out after 15 minutes of inactivity
    await SB.auth.signOut();
    _currentUser = null;
    _loginComplete = false;
    showLogin();
  }, INACTIVITY_MS);
}

// Reset timer on any user interaction
['click','keydown','mousemove','touchstart','scroll'].forEach(evt=>{
  document.addEventListener(evt, resetActivityTimer, {passive:true});
});

function showApp(){
  // Hide the login overlay
  const loginPage = document.getElementById('page-login');
  if(loginPage) loginPage.classList.add('hidden');
  // Show the nav
  const nav = document.getElementById('topnav');
  if(nav) nav.style.removeProperty('display');
  // Show user info
  const badge = document.getElementById('user-badge');
  const logoutBtn = document.getElementById('logout-btn');
  if(badge && _currentUser){ badge.textContent=_currentUser.email; badge.style.display='inline'; }
  if(logoutBtn) logoutBtn.style.display='inline-block';
  const changePwBtn = document.getElementById('change-pw-btn');
  if(changePwBtn) changePwBtn.style.display='inline-block';
  // Start inactivity timer
  resetActivityTimer();
}

function showLogin(){
  // Show login overlay
  const loginPage = document.getElementById('page-login');
  if(loginPage) loginPage.classList.remove('hidden');
  // Hide nav
  const nav = document.getElementById('topnav');
  if(nav) nav.style.display='none';
  // Remove active from all app pages so they hide
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  // Hide user info
  const badge = document.getElementById('user-badge');
  const logoutBtn = document.getElementById('logout-btn');
  if(badge) badge.style.display='none';
  if(logoutBtn) logoutBtn.style.display='none';
  const cpBtn = document.getElementById('change-pw-btn');
  if(cpBtn) cpBtn.style.display='none';
}

// ── Auth ──
// -- Password validation --
const PW_RULES = {
  len:   function(pw){ return pw.length >= 8 && pw.length <= 15; },
  upper: function(pw){ return /[A-Z]/.test(pw); },
  lower: function(pw){ return /[a-z]/.test(pw); },
  num:   function(pw){ return /[0-9]/.test(pw); },
  sym:   function(pw){ return /[!@#$%^&*()_+=\[\]{};':",.<>/?`~]/.test(pw); },
};

function checkPasswordStrength(prefix){
  const pw = document.getElementById(prefix+'-password').value;
  const keys = ['len','upper','lower','num','sym'];
  let allMet = true;
  keys.forEach(function(key){
    const met = PW_RULES[key](pw);
    const el = document.getElementById(prefix+'-req-'+key);
    if(el) el.classList.toggle('met', met);
    if(!met) allMet = false;
  });
  const btn = document.getElementById(prefix+'-password-btn');
  if(btn) btn.disabled = !allMet;
}

function validatePassword(pw, confirmPw, errorElId){
  const errEl = document.getElementById(errorElId);
  errEl.textContent = '';
  if(!PW_RULES.len(pw))   { errEl.textContent='Password must be 8-15 characters.'; return false; }
  if(!PW_RULES.upper(pw)) { errEl.textContent='Needs at least one uppercase letter.'; return false; }
  if(!PW_RULES.lower(pw)) { errEl.textContent='Needs at least one lowercase letter.'; return false; }
  if(!PW_RULES.num(pw))   { errEl.textContent='Needs at least one number.'; return false; }
  if(!PW_RULES.sym(pw))   { errEl.textContent='Needs at least one symbol.'; return false; }
  if(pw !== confirmPw)    { errEl.textContent='Passwords do not match.'; return false; }
  return true;
}

async function doSetPassword(){
  const pw      = document.getElementById('set-password').value;
  const confirm = document.getElementById('set-password-confirm').value;
  const btn     = document.getElementById('set-password-btn');
  if(!validatePassword(pw, confirm, 'set-password-error')) return;
  btn.disabled = true; btn.textContent = 'Setting password...';
  const { error } = await SB.auth.updateUser({ password: pw });
  if(error){
    document.getElementById('set-password-error').textContent = error.message;
    btn.disabled = false; btn.textContent = 'Set Password';
    return;
  }
  document.getElementById('page-setpassword').classList.add('hidden');
  await afterLogin();
}

function showChangePw(){
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('page-changepassword').classList.remove('hidden');
}

async function doChangePassword(){
  const pw      = document.getElementById('change-password').value;
  const confirm = document.getElementById('change-password-confirm').value;
  const btn     = document.getElementById('change-password-btn');
  if(!validatePassword(pw, confirm, 'change-password-error')) return;
  btn.disabled = true; btn.textContent = 'Updating...';
  const { error } = await SB.auth.updateUser({ password: pw });
  if(error){
    document.getElementById('change-password-error').textContent = error.message;
    btn.disabled = false; btn.textContent = 'Update Password';
    return;
  }
  document.getElementById('page-changepassword').classList.add('hidden');
  showPage('home');
  showToast('Password updated successfully', '#43B02A');
}

async function doLogin(){
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');
  const btn      = document.getElementById('login-btn');
  errEl.textContent='';
  if(!email||!password){ errEl.textContent='Please enter your email and password.'; return; }
  btn.disabled=true; btn.textContent='Signing in...';
  const { data, error } = await SB.auth.signInWithPassword({ email, password });
  if(error){
    errEl.textContent = error.message==='Invalid login credentials'
      ? 'Incorrect email or password.' : error.message;
    btn.disabled=false; btn.textContent='Sign In';
    return;
  }
  _currentUser = data.user;
  btn.textContent='Sign In';
  btn.disabled=false;
  await afterLogin();
}

function doLogout(){
  clearTimeout(_inactivityTimer);
  // Wipe every Supabase/auth key from localStorage synchronously
  try{
    const keys = Object.keys(localStorage);
    keys.forEach(k=>{
      if(k.includes('supabase')||k.includes('sb-')||k.includes('cc-dashboard'))
        localStorage.removeItem(k);
    });
  } catch(e){}
  // Fire signOut in background but don't wait -- reload immediately
  try{ SB.auth.signOut(); } catch(e){}
  window.location.reload();
}

// ── Save program entry data ──
// Stores each field as its own row: (year, month, section_id, region, field_id, value)
let _saveQueue = {};
let _saveTimer = null;

function debouncePersist(){
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(()=>flushSaveQueue(), 800);
}

async function flushSaveQueue(){
  if(!_currentUser){ _saveQueue={}; return; }
  const rows = Object.values(_saveQueue);
  if(!rows.length) return;
  _saveQueue = {};
  setSaveStatus('Saving...','var(--text-muted)');
  _storageSaving = true;

  const deadline = new Promise(resolve=>setTimeout(()=>resolve({error:{message:'timeout'}}), 6000));

  const { error } = await Promise.race([
    SB.from('program_data').upsert(rows,{onConflict:'year,month,section_id,region,field_id'}),
    deadline
  ]);

  _storageSaving = false;
  if(error){
    setSaveStatus('','var(--text-muted)');
  } else {
    const ts = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    setSaveStatus('Saved '+ts,'#FECB00');
    setTimeout(()=>setSaveStatus('','var(--text-muted)'),6000);
    cacheDataLocally(); // update local cache after successful save
  }
}

function queueSave(yr,mo,sec,region,field,val){
  const key = yr+'-'+mo+'-'+sec+'-'+region+'-'+field;
  _saveQueue[key] = {
    year:yr, month:mo, section_id:sec,
    region:region, field_id:field, value:parseInt(val)||0,
    updated_by: _currentUser?.email || 'unknown',
    updated_at: new Date().toISOString()
  };
}

async function persistData(){
  await flushSaveQueue();
}

// ── Save graduate entries ──
async function persistGrads(){
  if(!_currentUser) return;
  // Upsert all current manual entries
  const rows = manualEntries.map(e=>({
    entry_id: e.id,
    first_name: e.first, last_name: e.last, middle_initial: e.mi||'',
    dog_name: e.dog, category: e.cat, region: e.region,
    graduation_date: e.date,
    updated_by: _currentUser.email,
    updated_at: new Date().toISOString()
  }));
  if(!rows.length) return;
  await SB.from('graduate_entries').upsert(rows, {onConflict:'entry_id'});
}

// ── Merge Supabase rows into appData ──
function mergeAppData(rows){
  if(!Array.isArray(rows)) return;
  // skipQueue=true -- loading from DB, no need to write back
  rows.forEach(r=>{
    sv(r.year, r.month, r.section_id, r.region, r.field_id, r.value, true);
  });
}

// ── Load all data from Supabase ──
async function loadPersistedData(){
  if(!_currentUser){ setSaveStatus('','var(--text-muted)'); return false; }
  setSaveStatus('Loading...','var(--text-muted)');
  try{
    const { data, error } = await SB
      .from('program_data')
      .select('year,month,section_id,region,field_id,value');

    if(error){
      setSaveStatus('Error: '+error.message,'#E1523D');
      return false;
    }
    if(data && data.length){
      mergeAppData(data);
      setSaveStatus('Loaded '+data.length+' rows','#43B02A');
      setTimeout(()=>setSaveStatus('','var(--text-muted)'),5000);
    } else {
      setSaveStatus('','var(--text-muted)');
    }

    const { data:gd, error:ge } = await SB
      .from('graduate_entries').select('*').order('entry_id');
    if(!ge && gd && gd.length){
      manualEntries = gd.map(r=>({
        id:r.entry_id, first:r.first_name, last:r.last_name, mi:r.middle_initial||'',
        dog:r.dog_name, cat:r.category, region:r.region,
        date:r.graduation_date, matchClient:null, matchDog:null
      }));
    }
    return true;
  } catch(e){
    setSaveStatus('','var(--text-muted)');
    return false;
  }
}

// ── Called after successful login ──
let _loginComplete = false;
async function afterLogin(){
  if(_loginComplete) return; // guard against double-fire
  _loginComplete = true;

  // 1. Show the app shell immediately -- don't wait for data
  showApp();
  buildEntryPage();
  showPage('home');   // render cards right away

  // 2. Load from local cache immediately (instant, no network)
  const hadCache = loadCachedData();
  if(hadCache){
    buildTOC();
    setTimeout(()=>{
      const s = document.querySelector('.sub-panel.active');
      if(s) loadSectionValues(s.id.replace('panel-',''));
    }, 80);
  }

  // 3. Sync with Supabase in background then refresh whatever is visible
  loadPersistedData().then(()=>{
    if(manualEntries.length) renderManualTable();
    buildTOC();
    cacheDataLocally();
    // Refresh entry fields regardless of which panel is active
    refreshAllVisibleValues();
  });
}


// ════════════════════════════════════════════
//  HOME -- TABLE OF CONTENTS
// ════════════════════════════════════════════
function buildTOC(){
  const el = document.getElementById('toc-container');
  if(!el) return;
  const grouped={};
  SECTIONS.forEach(s=>{if(!grouped[s.role])grouped[s.role]=[];grouped[s.role].push(s);});

  el.innerHTML =
    ['pd','tm','th','br','pp'].map(rk=>{
      const role=ROLES[rk], secs=grouped[rk]||[];
      const cards=secs.map(sec=>{
        const dest = sec.entry ? `goToSection('${sec.id}','${rk}')` : `(setRole('${rk}'),showPage('graduates'))`;
        return `<div class="toc-card" onclick="${dest}">
          <div class="toc-card-body">
            <div class="toc-name">${sec.label}</div>
            <div class="toc-role-tag">${role.label}</div>
          </div>
          <div class="toc-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>`;
      }).join('');
      return `<div class="toc-group">
        <div class="toc-group-header">
          <span class="role-label">${role.label}</span>
          <span class="toc-count">${secs.length} section${secs.length!==1?'s':''}</span>
        </div>
        <div class="toc-row">${cards}</div>
      </div>`;
    }).join('');
}

// ════════════════════════════════════════════
//  ACTIVE REGION -- global selection persists across all sections
// ════════════════════════════════════════════
let activeRegion = REGIONS[0]; // default to first region alphabetically

function buildRegionPills(roleKey){
  const container = document.getElementById('global-region-pills');
  if(!container) return;

  // Determine which regions to show for this role
  // PD sections include graduates (psfo), pro training (psfo) -- show PSFO + HQ if applicable
  // For simplicity: show all standard 6 + PSFO for roles that use it, HQ for breeder
  const roleSecs = ENTRY_SECS.filter(s => !roleKey || s.role === roleKey);
  const needsPSFO = roleSecs.some(s => s.regions==='psfo' || s.psfoType || s.placementType);
  const needsHQ   = roleSecs.some(s => s.breederType);

  const allPills = [...REGIONS];
  if(needsPSFO) allPills.push('PSFO');
  if(needsHQ)   allPills.push('Headquarters');

  // If activeRegion isn't in the list for this role, reset to first
  if(!allPills.includes(activeRegion)) activeRegion = allPills[0];

  container.innerHTML = allPills.map(r => `
    <button class="region-pill${r===activeRegion?' active':''}"
            onclick="setActiveRegion('${r}')">
      ${r}
    </button>`).join('');
}

function setActiveRegion(region){
  activeRegion = region;

  // Update pill UI
  document.querySelectorAll('.region-pill').forEach(p => {
    p.classList.toggle('active', p.textContent.trim() === region);
  });

  // Activate the matching region panel and reload its values
  const activePanel = document.querySelector('.sub-panel.active');
  if(activePanel){
    const secId = activePanel.id.replace('panel-','');
    activateRegionPanel(secId, region);
    // Small delay so the panel is visible before values load
    setTimeout(()=>loadSectionValues(secId), 50);
  }
}

// ════════════════════════════════════════════
//  DATA ENTRY -- BUILD
// ════════════════════════════════════════════
function buildEntryPage(){
  // Section tabs
  document.getElementById('section-tabs').innerHTML =
    ENTRY_SECS.map((s,i)=>
      `<button class="section-tab${i===0?' active':''}" onclick="activateSection('${s.id}')">${s.label}</button>`
    ).join('');

  // Panels
  document.getElementById('section-panels').innerHTML = ENTRY_SECS.map((s,i)=>{
    const role=ROLES[s.role];
    const hasFields = s.fields.length > 0;
    const isPlacement = !!s.placementType;
    const isBreeder   = !!s.breederType;
    const isPuppyPl   = !!s.psfoType;
    const inner = isPlacement ? buildPlacementPanel(s) : isBreeder ? buildBreederPanel(s) : isPuppyPl ? buildPuppyPlacementsPanel(s) : hasFields ? buildFieldedPanel(s) : buildSimplePanel(s);
    return `<div class="sub-panel${i===0?' active':''}" id="panel-${s.id}">
      <div class="entry-panel-hdr">
        <div>
          <div style="font-size:15px;font-weight:700;color:var(--text-head);">${s.label}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">
            Responsible: <span style="color:${role.color};font-weight:600;">${role.label}</span>
          </div>
        </div>
      </div>
      ${inner}
    </div>`;
  }).join('');

  // Region dropdown for grad log
  document.getElementById('g-region').innerHTML =
    '<option value="">Select...</option>'+REGIONS.map(r=>`<option>${r}</option>`).join('');
}

// ── Fielded panel (e.g. Applicants, Pro Training) ──
function buildFieldedPanel(sec){
  const hasPSFO = sec.regions === 'psfo';
  const panelRegions = hasPSFO ? REGIONS_PSFO : REGIONS;

  const regionTabsHTML = REGIONS.map((r,i)=>
    `<button class="region-tab${i===0?' active':''}" onclick="switchRegionTab('${sec.id}','${r}',this)">${r}</button>`
  ).join('') + (hasPSFO
    ? `<button class="region-tab psfo-tab" onclick="switchRegionTab('${sec.id}','PSFO',this)">PSFO</button>`
    : '');

  const regionPanels = panelRegions.map((r,i)=>`
    <div class="region-panel${i===0?' active':''}" id="rpanel-${sec.id}-${rKey(r)}">
      <div style="font-size:13px;font-weight:700;color:var(--text-head);margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${REGION_COLORS[r]||'#041E42'};flex-shrink:0;"></span>
        ${r}
      </div>
      ${buildFieldRows(sec, r)}
    </div>`
  ).join('');

  // All-regions summary table
  const numFields = sec.fields.filter(f=>f.type==='number'||f.type==='computed');
  const tableHead = `<thead><tr>
    <th>Region</th>
    ${numFields.map(f=>`<th class="th-center" style="${f.isTotal?'color:var(--cc-blue);background:#eef5ff;':''}">${f.label}</th>`).join('')}
  </tr></thead>`;
  const tableBody = `<tbody id="summary-tbody-${sec.id}"></tbody>`;

  return `
    <div class="region-tabs">${regionTabsHTML}</div>
    ${regionPanels}
    <div class="all-regions-table-wrap">
      <div class="art-header">
        <div class="art-title">All Regions Summary</div>
      </div>
      <div style="overflow-x:auto;">
        <table>${tableHead}${tableBody}</table>
      </div>
    </div>`;
}

// Group config: maps group key → display label and header color class
const FIELD_GROUPS = {
  requests: { label:'Application Requests',       cls:'grp-requests'       },
  added:    { label:'Added to Waitlist',          cls:'grp-waitlist-added' },
  detail:   { label:'Waitlist Total & Breakdown', cls:'grp-waitlist-detail'},
  semesters: { label:'Semesters',                  cls:'grp-semesters'       },
  g_adi:      { label:'ADI Tests',                          cls:'grp-g-adi'      },
  g_checkins: { label:'6-Month 2-Way Check-ins',             cls:'grp-g-checkins' },
  g_live:     { label:'Other Live 2-Way Meetings',           cls:'grp-g-live'     },
  g_touches:  { label:'Calls, Emails & Other Touches',       cls:'grp-g-touches'  },
  g_total:    { label:'Total',                               cls:'grp-g-total'    },
  r_therapy:  { label:'Release to Therapy Dog',              cls:'grp-r-therapy'  },
  r_agency:   { label:'Agency Transfers',                    cls:'grp-r-agency'   },
  r_prior:    { label:'Dogs Released Prior to Matriculation',cls:'grp-r-prior'    },
  r_other:    { label:'All Other Release Dogs',              cls:'grp-r-other'    },
  r_total:    { label:'Total',                               cls:'grp-r-total'    },
  th_list:    { label:'Placement from Therapy List',          cls:'grp-th-list'    },
  th_prog:    { label:'Program or Prev Released or Retired',  cls:'grp-th-prog'    },
  th_total:   { label:'Total',                               cls:'grp-th-total'   },
  br_male:    { label:'Breeders Selected - Male',            cls:'grp-br-male'    },
  br_female:  { label:'Breeders Selected - Female',          cls:'grp-br-female'  },
  br_stotal:  { label:'Total Selected',                      cls:'grp-br-stotal'  },
  hq_active_male:   { label:'Active Male Breeders',          cls:'grp-hq-am'      },
  hq_active_female: { label:'Active Female Breeders',        cls:'grp-hq-af'      },
  hq_new_bc:        { label:'Active New BC Households',      cls:'grp-hq-nbc'     },
  hq_repeat_bc:     { label:'Active Repeat BC Households',   cls:'grp-hq-rbc'     },
  hq_dams:          { label:'Dams Bred',                     cls:'grp-hq-dams'    },
  hq_litters:       { label:'Litters Whelped',               cls:'grp-hq-lit'     },
  hq_puppies:       { label:'Live Puppies Born',             cls:'grp-hq-pup'     },
  /* Puppy Placements */
  pp_new:      { label:'New Puppy Raiser Placements',    cls:'grp-pp-new'      },
  pp_repeat:   { label:'Repeat Puppy Raiser Placements', cls:'grp-pp-repeat'   },
  pp_wait:     { label:'Puppy Waitlist Total',           cls:'grp-pp-wait'     },
  pp_matric:   { label:'Puppies Matriculated',           cls:'grp-pp-matric'   },
  pp_total:    { label:'Total Placements',               cls:'grp-pp-total'    },
  pp_classes:  { label:'Puppy Classes',                  cls:'grp-pp-classes'  },
  pp_followup: { label:'Puppy Raiser Follow Ups',        cls:'grp-pp-followup' },
  /* Active Raisers */
  ar_total:    { label:'Total Active Raisers',           cls:'grp-ar-total'    },
  /* Puppy Interest */
  pi_requests: { label:'Puppy Application Requests',     cls:'grp-pi-req'      },
  pi_received: { label:'Applications Received',          cls:'grp-pi-rec'      },
  pi_approved: { label:'Applications Approved',          cls:'grp-pi-app'      },
  pi_waitlist: { label:'Projected Waitlist',             cls:'grp-pi-wait'     },
  pi_fostered: { label:'Puppies Fostered',               cls:'grp-pi-fos'      },
  /* Prison Programs */
  pr_programs: { label:'Active Number of Programs',      cls:'grp-pr-prog'     },
  pr_puppies:  { label:'Active Number of Puppies',       cls:'grp-pr-pup'      },
  pr_placed:   { label:'Puppies Placed This Month',      cls:'grp-pr-placed'   },
  /* College Clubs */
  cc_clubs:    { label:'Active Number of Clubs',         cls:'grp-cc-clubs'    },
  cc_puppies:  { label:'Active Number of Puppies',       cls:'grp-cc-pup'      },
  cc_placed:   { label:'Puppies Placed This Month',      cls:'grp-cc-placed'   },
};

function buildFieldRows(sec, region){
  // Collect unique groups in the order they appear in fields
  const seenGroups = [];
  sec.fields.forEach(f=>{
    if(f.group && !seenGroups.includes(f.group)) seenGroups.push(f.group);
  });

  // Fields with no group go into a single default card
  const ungrouped = sec.fields.filter(f=>!f.group);
  const grouped   = seenGroups.map(gk=>({
    key: gk,
    ...(FIELD_GROUPS[gk] || { label: gk, cls:'grp-requests' }),
    fields: sec.fields.filter(f=>f.group===gk),
  }));

  const renderFields = (fields) => fields.map(f=>{
    const isComp = f.type==='computed';
    const rowCls = (f.isTotal?'total-row ':'')+(f.indent?'fields-indent ':'')+'field-row';
    const inputEl = isComp
      ? `<input class="field-input computed" id="inp-${sec.id}-${rKey(region)}-${f.id}" value="0" readonly tabindex="-1">`
      : `<input class="field-input" type="text" inputmode="numeric" pattern="[0-9]*"
           id="inp-${sec.id}-${rKey(region)}-${f.id}" value="0"
           onkeypress="return /[0-9]/.test(event.key)"
           onchange="onFieldChange('${sec.id}','${region}','${f.id}',this.value)">`;
    return `<div class="${rowCls}">
      <div class="field-label">${f.label}</div>
      ${inputEl}
    </div>`;
  }).join('');

  const groupCards = grouped.map(grp=>`
    <div class="field-group-card">
      <div class="field-group-title ${grp.cls}">${grp.label}</div>
      ${renderFields(grp.fields)}
    </div>`).join('');

  const ungroupedCard = ungrouped.length
    ? `<div class="field-group-card"><div class="field-group-title grp-requests">Fields</div>${renderFields(ungrouped)}</div>`
    : '';

  return groupCards + ungroupedCard;
}

// ── Simple panel (placeholder until fields are defined) ──
function buildSimplePanel(sec){
  const regionTabsHTML = REGIONS.map((r,i)=>
    `<button class="region-tab${i===0?' active':''}" onclick="switchSimpleRegionTab('${sec.id}','${r}',this)">${r}</button>`
  ).join('');

  const regionPanels = REGIONS.map((r,i)=>`
    <div class="region-panel${i===0?' active':''}" id="rpanel-${sec.id}-${rKey(r)}">
      <div class="fields-card">
        <div class="fields-section-title">${r} -- ${sec.label}</div>
        <div class="field-row">
          <div class="field-label">Total</div>
          <input class="field-input" type="text" inputmode="numeric" pattern="[0-9]*"
            id="inp-${sec.id}-${rKey(r)}-total" value="0"
            onkeypress="return /[0-9]/.test(event.key)"
            onchange="onSimpleChange('${sec.id}','${r}',this.value)">
        </div>
      </div>
    </div>`
  ).join('');

  return `<div class="region-tabs">${regionTabsHTML}</div>${regionPanels}
    <div style="padding:10px 0 4px;font-size:12px;color:var(--text-muted);">
      Detailed fields for this section coming soon. Enter totals per region above.
    </div>`;
}

function rKey(r){ return r.replace(/\s/g,'_'); }

// ── Placement panel (Dog Placements 5-section layout) ──
function buildPlacementPanel(sec){
  // PSFO tab strip: 6 standard + PSFO (PSFO shown for campus, special, ended only)
  const regionTabsHTML = REGIONS.map((r,i)=>
    `<button class="region-tab${i===0?' active':''}" onclick="switchRegionTab('${sec.id}','${r}',this)">${r}</button>`
  ).join('') +
  `<button class="region-tab psfo-tab" onclick="switchRegionTab('${sec.id}','PSFO',this)">PSFO</button>`;

  const regionPanels = REGIONS_PSFO.map((region,i)=>`
    <div class="region-panel${i===0?' active':''}" id="rpanel-${sec.id}-${rKey(region)}">
      <div style="font-size:13px;font-weight:700;color:var(--text-head);margin-bottom:14px;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${REGION_COLORS[region]||'#888'};flex-shrink:0;"></span>${region}
        ${region==='PSFO'?'<span style="font-size:10px;font-weight:500;color:var(--text-muted);background:#f0f4f9;padding:2px 8px;border-radius:10px;margin-left:4px;">Campus, Special & Placements Ended only</span>':''}
      </div>
      ${buildPlacementSubSections(sec, region)}
    </div>`
  ).join('');

  // Summary table across all regions
  const summaryHTML = buildPlacementSummaryTable(sec);

  return `<div class="region-tabs" id="rtabs-${sec.id}">${regionTabsHTML}</div>
    ${regionPanels}
    ${summaryHTML}`;
}

function buildPlacementSubSections(sec, region){
  return sec.placementSections.map(ps => {
    // 'psfo' sections show for all 6 + PSFO; 'standard' sections only show for the 6 regions
    const isPSFO = region === 'PSFO';
    const psfoAllowed = ps.regions === 'psfo';
    if(isPSFO && !psfoAllowed) return '';  // PSFO only shows for campus, special, ended

    return `<div class="field-group-card" style="margin-bottom:14px;">
      <div class="field-group-title" style="background:${ps.color};">${ps.label}</div>
      ${ps.fields.map(f=>{
        const isComp = f.type==='computed';
        const rowCls = (f.isTotal?'total-row ':'')+'field-row';
        const fid = `inp-dp-${rKey(region)}-${ps.id}-${f.id}`;
        const inputEl = isComp
          ? `<input class="field-input computed" id="${fid}" value="0" readonly tabindex="-1">`
          : `<input class="field-input" type="text" inputmode="numeric" pattern="[0-9]*"
               id="${fid}" value="0"
               onkeypress="return /[0-9]/.test(event.key)"
               onchange="onPlacementChange('${region}','${ps.id}','${f.id}',this.value)">`;
        return `<div class="${rowCls}">
          <div class="field-label">${f.label}</div>
          ${inputEl}
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

function buildPlacementSummaryTable(sec){
  // Summary shows Credited Placements only, across the 6 standard regions
  const credited = sec.placementSections.find(ps=>ps.id==='credited');
  if(!credited) return '';
  const subHeaders = credited.fields.map(f=>
    `<th class="th-center" style="${f.isTotal?'color:var(--cc-blue);background:#eef5ff;font-weight:700;':''}">${f.label}</th>`
  ).join('');

  return `<div class="all-regions-table-wrap" style="margin-top:1.5rem;">
    <div class="art-header">
      <div class="art-title">All Regions -- Credited Placements</div>
    </div>
    <div style="overflow-x:auto;">
      <table>
        <thead>
          <tr>
            <th style="background:#f0f4f9;color:var(--text-muted);font-size:11px;font-weight:600;padding:10px 14px;border-bottom:1.5px solid var(--border);">Region</th>
            ${subHeaders}
          </tr>
        </thead>
        <tbody id="dp-summary-tbody"></tbody>
      </table>
    </div>
  </div>`;
}

function onPlacementChange(region, subSecId, fieldId, val){
  const yr=+document.getElementById('entry-year').value;
  const mo=+document.getElementById('entry-month').value;
  // Store as: appData[yr][mo]['dog_placements'][region][subSecId+'_'+fieldId]
  sv(yr,mo,'dog_placements',region,subSecId+'_'+fieldId,val);
  recomputePlacement(region, subSecId, yr, mo);
  updatePlacementSummaryTable(yr, mo);
}

function recomputePlacement(region, subSecId, yr, mo){
  const sec = SECTIONS.find(s=>s.id==='dog_placements'); if(!sec) return;
  const ps = sec.placementSections.find(p=>p.id===subSecId); if(!ps) return;
  ps.fields.filter(f=>f.type==='computed').forEach(f=>{
    const sum = f.sumOf.reduce((acc,fid)=>acc+gv(yr,mo,'dog_placements',region,subSecId+'_'+fid),0);
    sv(yr,mo,'dog_placements',region,subSecId+'_'+f.id,sum);
    const el=document.getElementById(`inp-dp-${rKey(region)}-${subSecId}-${f.id}`);
    if(el) el.value=sum;
  });
}

function loadPlacementValues(yr, mo){
  const sec = SECTIONS.find(s=>s.id==='dog_placements'); if(!sec) return;
  REGIONS_PSFO.forEach(region=>{
    sec.placementSections.forEach(ps=>{
      if(region==='PSFO' && ps.regions!=='psfo') return;
      ps.fields.forEach(f=>{
        const el=document.getElementById(`inp-dp-${rKey(region)}-${ps.id}-${f.id}`);
        if(el) el.value=gv(yr,mo,'dog_placements',region,ps.id+'_'+f.id);
      });
      recomputePlacement(region,ps.id,yr,mo);
    });
  });
  updatePlacementSummaryTable(yr,mo);
}

function updatePlacementSummaryTable(yr, mo){
  const sec=SECTIONS.find(s=>s.id==='dog_placements'); if(!sec) return;
  const tbody=document.getElementById('dp-summary-tbody'); if(!tbody) return;
  const credited=sec.placementSections.find(ps=>ps.id==='credited'); if(!credited) return;

  let colTotals={};
  credited.fields.forEach(f=>{colTotals[f.id]=0;});

  const rows = REGIONS.map(region=>{  // standard 6 only
    const cells=credited.fields.map(f=>{
      const v=gv(yr,mo,'dog_placements',region,'credited_'+f.id);
      colTotals[f.id]+=v;
      return `<td class="${f.isTotal?'td-total':'td-num'}">${v}</td>`;
    }).join('');
    const color=REGION_COLORS[region]||'#888';
    return `<tr>
      <td style="font-weight:600;white-space:nowrap;padding:10px 14px;border-bottom:1px solid var(--border);">
        <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle;"></span>${region}
      </td>${cells}</tr>`;
  });

  const totalCells=credited.fields.map(f=>
    `<td class="td-total" style="font-weight:700;">${colTotals[f.id]}</td>`
  ).join('');

  tbody.innerHTML=rows.join('')+
    `<tr class="total-row-tr">
      <td style="padding:10px 14px;font-weight:700;color:var(--cc-navy);">All Regions</td>
      ${totalCells}
    </tr>`;
}

// ── Puppy Placements panel (6 standard fields + PSFO has different fields) ──
function buildPuppyPlacementsPanel(sec){
  const tabsHTML = REGIONS.map((r,i)=>
    `<button class="region-tab${i===0?' active':''}" onclick="switchRegionTab('${sec.id}','${r}',this)">${r}</button>`
  ).join('') +
  `<button class="region-tab psfo-tab" onclick="switchRegionTab('${sec.id}','PSFO',this)">PSFO</button>`;

  const stdPanels = REGIONS.map((r,i)=>`
    <div class="region-panel${i===0?' active':''}" id="rpanel-${sec.id}-${rKey(r)}">
      <div style="font-size:13px;font-weight:700;color:var(--text-head);margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${REGION_COLORS[r]};flex-shrink:0;"></span>${r}
      </div>
      ${buildBreederFieldCards(sec.fields, sec.id, r)}
    </div>`
  ).join('');

  const psfoPanel = `
    <div class="region-panel" id="rpanel-${sec.id}-PSFO">
      <div style="font-size:13px;font-weight:700;color:var(--text-head);margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#041E42;flex-shrink:0;"></span>PSFO
        <span style="font-size:10px;font-weight:500;color:var(--text-muted);background:#f0f4f9;padding:2px 8px;border-radius:10px;margin-left:4px;">PSFO metrics only</span>
      </div>
      ${buildBreederFieldCards(sec.psfoFields, sec.id, 'PSFO')}
    </div>`;

  const displayFields = sec.fields.filter(f=>f.type==='number'||f.type==='computed');
  const tableHead = `<thead><tr>
    <th>Region</th>
    ${displayFields.map(f=>`<th class="th-center" style="${f.isTotal?'color:var(--cc-blue);background:#eef5ff;':''}">${f.label}</th>`).join('')}
  </tr></thead>`;

  return `<div class="region-tabs">${tabsHTML}</div>
    ${stdPanels}${psfoPanel}
    <div class="all-regions-table-wrap" style="margin-top:1.5rem;">
      <div class="art-header"><div class="art-title">All Regions Summary -- Puppy Placements</div></div>
      <div style="overflow-x:auto;">
        <table>${tableHead}<tbody id="summary-tbody-${sec.id}"></tbody></table>
      </div>
    </div>`;
}

function loadPuppyPlacementsValues(yr, mo){
  const sec=SECTIONS.find(s=>s.id==='puppy_placements'); if(!sec) return;
  REGIONS.forEach(r=>{
    sec.fields.forEach(f=>{
      const el=document.getElementById(`inp-puppy_placements-${rKey(r)}-${f.id}`);
      if(el) el.value=gv(yr,mo,'puppy_placements',r,f.id);
    });
    recomputeSection('puppy_placements',r,yr,mo);
  });
  sec.psfoFields.forEach(f=>{
    const el=document.getElementById(`inp-puppy_placements-PSFO-${f.id}`);
    if(el) el.value=gv(yr,mo,'puppy_placements','PSFO',f.id);
  });
  updatePuppyPlacementsSummary(yr,mo);
}

function updatePuppyPlacementsSummary(yr,mo){
  const sec=SECTIONS.find(s=>s.id==='puppy_placements'); if(!sec) return;
  const tbody=document.getElementById('summary-tbody-puppy_placements'); if(!tbody) return;
  const displayFields=sec.fields.filter(f=>f.type==='number'||f.type==='computed');
  let totals={}; displayFields.forEach(f=>{totals[f.id]=0;});
  tbody.innerHTML = REGIONS.map(r=>{
    const color=REGION_COLORS[r]||'#888';
    const cells=displayFields.map(f=>{
      const v=gv(yr,mo,'puppy_placements',r,f.id);
      totals[f.id]+=v;
      return `<td class="${f.isTotal?'td-total':'td-num'}">${v}</td>`;
    }).join('');
    return `<tr>
      <td style="font-weight:600;white-space:nowrap;padding:10px 14px;border-bottom:1px solid var(--border);">
        <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle;"></span>${r}
      </td>${cells}</tr>`;
  }).join('') +
  `<tr class="total-row-tr">
    <td style="padding:10px 14px;font-weight:700;color:var(--cc-navy);">Total</td>
    ${displayFields.map(f=>`<td class="td-total" style="font-weight:700;">${totals[f.id]}</td>`).join('')}
  </tr>`;
}

// ── Breeder Dogs panel ──
function buildBreederPanel(sec){
  const hqColor = '#041E42';

  // Region tabs: 6 standard + Headquarters
  const tabsHTML = REGIONS.map((r,i)=>
    `<button class="region-tab${i===0?' active':''}" onclick="switchRegionTab('${sec.id}','${r}',this)">${r}</button>`
  ).join('') +
  `<button class="region-tab psfo-tab" onclick="switchRegionTab('${sec.id}','Headquarters',this)">Headquarters</button>`;

  // Standard region panels
  const stdPanels = REGIONS.map((r,i)=>`
    <div class="region-panel${i===0?' active':''}" id="rpanel-${sec.id}-${rKey(r)}">
      <div style="font-size:13px;font-weight:700;color:var(--text-head);margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${REGION_COLORS[r]};flex-shrink:0;"></span>${r}
      </div>
      ${buildBreederFieldCards(sec.fields, sec.id, r)}
    </div>`
  ).join('');

  // HQ panel
  const hqPanel = `
    <div class="region-panel" id="rpanel-${sec.id}-Headquarters">
      <div style="font-size:13px;font-weight:700;color:var(--text-head);margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${hqColor};flex-shrink:0;"></span>Headquarters
        <span style="font-size:10px;font-weight:500;color:var(--text-muted);background:#f0f4f9;padding:2px 8px;border-radius:10px;margin-left:4px;">HQ metrics only</span>
      </div>
      ${buildBreederFieldCards(sec.hqFields, sec.id, 'Headquarters')}
    </div>`;

  // Summary table (standard regions only -- selected breeders)
  const displayFields = sec.fields.filter(f=>f.type==='number'||f.type==='computed');
  const tableHead = `<thead><tr>
    <th>Region</th>
    ${displayFields.map(f=>`<th class="th-center" style="${f.isTotal?'color:var(--cc-blue);background:#eef5ff;':''}">${f.label}</th>`).join('')}
  </tr></thead>`;

  return `<div class="region-tabs">${tabsHTML}</div>
    ${stdPanels}${hqPanel}
    <div class="all-regions-table-wrap" style="margin-top:1.5rem;">
      <div class="art-header"><div class="art-title">All Regions Summary -- Breeders Selected</div></div>
      <div style="overflow-x:auto;">
        <table>${tableHead}<tbody id="summary-tbody-${sec.id}"></tbody></table>
      </div>
    </div>`;
}

function buildBreederFieldCards(fields, secId, region){
  const seenGroups = [];
  fields.forEach(f=>{ if(f.group && !seenGroups.includes(f.group)) seenGroups.push(f.group); });

  return seenGroups.map(gk=>{
    const grpMeta = FIELD_GROUPS[gk] || { label: gk, cls:'grp-requests' };
    const grpFields = fields.filter(f=>f.group===gk);
    return `<div class="field-group-card">
      <div class="field-group-title ${grpMeta.cls}">${grpMeta.label}</div>
      ${grpFields.map(f=>{
        const isComp = f.type==='computed';
        const rowCls = (f.isTotal?'total-row ':'')+'field-row';
        const inputEl = isComp
          ? `<input class="field-input computed" id="inp-${secId}-${rKey(region)}-${f.id}" value="0" readonly tabindex="-1">`
          : `<input class="field-input" type="text" inputmode="numeric" pattern="[0-9]*"
               id="inp-${secId}-${rKey(region)}-${f.id}" value="0"
               onkeypress="return /[0-9]/.test(event.key)"
               onchange="onBreederChange('${region}','${f.id}',this.value)">`;
        return `<div class="${rowCls}">
          <div class="field-label">${f.label}</div>
          ${inputEl}
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

function onBreederChange(region, fieldId, val){
  const yr=+document.getElementById('entry-year').value;
  const mo=+document.getElementById('entry-month').value;
  sv(yr,mo,'breeder_dogs',region,fieldId,val);
  recomputeBreeder(region, yr, mo);
  updateBreederSummaryTable(yr, mo);
  debouncePersist();
}

function recomputeBreeder(region, yr, mo){
  const sec=SECTIONS.find(s=>s.id==='breeder_dogs'); if(!sec) return;
  // Only standard fields have computed totals
  sec.fields.filter(f=>f.type==='computed').forEach(f=>{
    const sum=f.sumOf.reduce((acc,fid)=>acc+gv(yr,mo,'breeder_dogs',region,fid),0);
    sv(yr,mo,'breeder_dogs',region,f.id,sum);
    const el=document.getElementById(`inp-breeder_dogs-${rKey(region)}-${f.id}`);
    if(el) el.value=sum;
  });
}

function loadBreederValues(yr, mo){
  const sec=SECTIONS.find(s=>s.id==='breeder_dogs'); if(!sec) return;
  // Standard regions
  REGIONS.forEach(r=>{
    sec.fields.forEach(f=>{
      const el=document.getElementById(`inp-breeder_dogs-${rKey(r)}-${f.id}`);
      if(el) el.value=gv(yr,mo,'breeder_dogs',r,f.id);
    });
    recomputeBreeder(r,yr,mo);
  });
  // HQ
  sec.hqFields.forEach(f=>{
    const el=document.getElementById(`inp-breeder_dogs-Headquarters-${f.id}`);
    if(el) el.value=gv(yr,mo,'breeder_dogs','Headquarters',f.id);
  });
  updateBreederSummaryTable(yr,mo);
}

function updateBreederSummaryTable(yr, mo){
  const sec=SECTIONS.find(s=>s.id==='breeder_dogs'); if(!sec) return;
  const tbody=document.getElementById(`summary-tbody-breeder_dogs`); if(!tbody) return;
  const displayFields=sec.fields.filter(f=>f.type==='number'||f.type==='computed');
  let totals={}; displayFields.forEach(f=>{totals[f.id]=0;});

  tbody.innerHTML = REGIONS.map(r=>{
    const color=REGION_COLORS[r]||'#888';
    const cells=displayFields.map(f=>{
      const v=gv(yr,mo,'breeder_dogs',r,f.id);
      totals[f.id]+=v;
      return `<td class="${f.isTotal?'td-total':'td-num'}">${v}</td>`;
    }).join('');
    return `<tr>
      <td style="font-weight:600;white-space:nowrap;padding:10px 14px;border-bottom:1px solid var(--border);">
        <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle;"></span>${r}
      </td>${cells}</tr>`;
  }).join('') +
  `<tr class="total-row-tr">
    <td style="padding:10px 14px;font-weight:700;color:var(--cc-navy);">Total</td>
    ${displayFields.map(f=>`<td class="td-total" style="font-weight:700;">${totals[f.id]}</td>`).join('')}
  </tr>`;
}

// ════════════════════════════════════════════
//  DATA ENTRY -- INTERACTIONS
// ════════════════════════════════════════════
function switchRegionTab(secId, region, btn){
  // Deactivate all tabs + panels for this section
  const panel = document.getElementById(`panel-${secId}`);
  panel.querySelectorAll('.region-tab').forEach(t=>t.classList.remove('active'));
  panel.querySelectorAll('.region-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`rpanel-${secId}-${rKey(region)}`).classList.add('active');
  // Keep global region in sync when user clicks a tab manually
  if(REGIONS.includes(region) || region==='PSFO' || region==='Headquarters'){
    activeRegion = region;
    document.querySelectorAll('.region-pill').forEach(p=>{
      p.classList.toggle('active', p.textContent.trim()===region);
    });
  }
  loadSectionValues(secId);
}

function switchSimpleRegionTab(secId, region, btn){
  switchRegionTab(secId, region, btn);
}

function activateSection(id){
  ENTRY_SECS.forEach((s,i)=>{
    document.querySelectorAll('.section-tab')[i]?.classList.toggle('active',s.id===id);
  });
  document.querySelectorAll('.sub-panel').forEach(p=>p.classList.toggle('active',p.id===`panel-${id}`));
  // Load values with a small delay to ensure the region panel is active first
  setTimeout(()=>{
    syncRegionTabToActive(id);
    loadSectionValues(id);
  }, 50);
}

function syncRegionTabToActive(secId){
  const panel = document.getElementById(`panel-${secId}`);
  if(!panel) return;
  // Directly activate the correct region panel (tabs are hidden)
  activateRegionPanel(secId, activeRegion);
}

function activateRegionPanel(secId, region){
  const panel = document.getElementById(`panel-${secId}`);
  if(!panel) return;
  // Deactivate all region panels in this section
  panel.querySelectorAll('.region-panel').forEach(p=>p.classList.remove('active'));
  panel.querySelectorAll('.region-tab').forEach(t=>t.classList.remove('active'));
  // Activate the target panel
  const target = document.getElementById(`rpanel-${secId}-${rKey(region)}`);
  if(target) target.classList.add('active');
  // Also mark the button active (even though hidden, keeps state clean)
  const btn = panel.querySelector(`.region-tab[onclick*="'${region}'"]`);
  if(btn) btn.classList.add('active');
}

function onFieldChange(secId, region, fieldId, val){
  const yr=+document.getElementById('entry-year').value;
  const mo=+document.getElementById('entry-month').value;
  sv(yr,mo,secId,region,fieldId,val);
  recomputeSection(secId, region, yr, mo);
  updateSectionSummaryTable(secId, yr, mo);
  debouncePersist();
}

function onSimpleChange(secId, region, val){
  const yr=+document.getElementById('entry-year').value;
  const mo=+document.getElementById('entry-month').value;
  sv(yr,mo,secId,region,'total',val);
  debouncePersist();
}

// Debounced auto-save -- waits 1.5s after last keystroke before writing to storage
let _persistTimer=null;
function debouncePersist(){
  clearTimeout(_persistTimer);
  _persistTimer=setTimeout(()=>{ persistData(); }, 1500);
}

function recomputeSection(secId, region, yr, mo){
  const sec = SECTIONS.find(s=>s.id===secId); if(!sec) return;
  sec.fields.filter(f=>f.type==='computed').forEach(f=>{
    const sum = f.sumOf.reduce((acc,fid)=>acc+gv(yr,mo,secId,region,fid),0);
    sv(yr,mo,secId,region,f.id,sum);
    const el = document.getElementById(`inp-${secId}-${rKey(region)}-${f.id}`);
    if(el) el.value = sum;
  });
}

function loadSectionValues(secId){
  const yr=+document.getElementById('entry-year').value;
  const mo=+document.getElementById('entry-month').value;
  const sec=SECTIONS.find(s=>s.id===secId); if(!sec) return;

  if(sec.placementType){ loadPlacementValues(yr,mo); return; }
  if(sec.breederType){ loadBreederValues(yr,mo); return; }
  if(sec.psfoType){ loadPuppyPlacementsValues(yr,mo); return; }

  const secRegions = sec.regions==='psfo' ? REGIONS_PSFO : REGIONS;

  if(sec.fields.length>0){
    secRegions.forEach(r=>{
      sec.fields.forEach(f=>{
        const el=document.getElementById(`inp-${secId}-${rKey(r)}-${f.id}`);
        if(el) el.value=gv(yr,mo,secId,r,f.id);
      });
      recomputeSection(secId,r,yr,mo);
    });
    updateSectionSummaryTable(secId,yr,mo);
  } else {
    REGIONS.forEach(r=>{
      const el=document.getElementById(`inp-${secId}-${rKey(r)}-total`);
      if(el) el.value=gv(yr,mo,secId,r,'total');
    });
  }
}

function updateSectionSummaryTable(secId, yr, mo){
  const sec=SECTIONS.find(s=>s.id===secId); if(!sec||!sec.fields.length) return;
  const tbody=document.getElementById(`summary-tbody-${secId}`); if(!tbody) return;
  const displayFields=sec.fields.filter(f=>f.type==='number'||f.type==='computed');
  const secRegions = sec.regions==='psfo' ? REGIONS_PSFO : REGIONS;

  let totals={}; displayFields.forEach(f=>{totals[f.id]=0;});

  tbody.innerHTML = secRegions.map(r=>{
    const color=REGION_COLORS[r]||'#888';
    const cells=displayFields.map(f=>{
      const v=gv(yr,mo,secId,r,f.id);
      totals[f.id]+=v;
      return `<td class="${f.isTotal?'td-total':'td-num'}">${v}</td>`;
    }).join('');
    return `<tr>
      <td style="font-weight:600;color:var(--text-head);white-space:nowrap;padding:10px 14px;border-bottom:1px solid var(--border);">
        <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle;"></span>${r}
      </td>${cells}</tr>`;
  }).join('')+
  `<tr class="total-row-tr">
    <td style="padding:10px 14px;font-weight:700;color:var(--cc-navy);">Total</td>
    ${displayFields.map(f=>`<td class="td-total" style="font-weight:700;">${totals[f.id]}</td>`).join('')}
  </tr>`;
}

function onEntryPeriodChange(){
  const activePanel = document.querySelector('.sub-panel.active');
  if(!activePanel) return;
  const secId = activePanel.id.replace('panel-','');
  loadSectionValues(secId);
}

async function saveAll(){
  // Re-read all inputs and persist
  const yr=+document.getElementById('entry-year').value;
  const mo=+document.getElementById('entry-month').value;
  ENTRY_SECS.forEach(sec=>{
    if(sec.psfoType){
      REGIONS.forEach(r=>{
        sec.fields.filter(f=>f.type==='number').forEach(f=>{
          const el=document.getElementById(`inp-puppy_placements-${rKey(r)}-${f.id}`);
          if(el) sv(yr,mo,'puppy_placements',r,f.id,el.value);
        });
        recomputeSection('puppy_placements',r,yr,mo);
      });
      sec.psfoFields.forEach(f=>{
        const el=document.getElementById(`inp-puppy_placements-PSFO-${f.id}`);
        if(el) sv(yr,mo,'puppy_placements','PSFO',f.id,el.value);
      });
    } else if(sec.breederType){
      REGIONS.forEach(r=>{
        sec.fields.filter(f=>f.type==='number').forEach(f=>{
          const el=document.getElementById(`inp-breeder_dogs-${rKey(r)}-${f.id}`);
          if(el) sv(yr,mo,'breeder_dogs',r,f.id,el.value);
        });
        recomputeBreeder(r,yr,mo);
      });
      sec.hqFields.forEach(f=>{
        const el=document.getElementById(`inp-breeder_dogs-Headquarters-${f.id}`);
        if(el) sv(yr,mo,'breeder_dogs','Headquarters',f.id,el.value);
      });
    } else if(sec.placementType){
      REGIONS_PSFO.forEach(region=>{
        sec.placementSections.forEach(ps=>{
          if(region==='PSFO' && ps.regions!=='psfo') return;
          ps.fields.filter(f=>f.type==='number').forEach(f=>{
            const el=document.getElementById(`inp-dp-${rKey(region)}-${ps.id}-${f.id}`);
            if(el) sv(yr,mo,sec.id,region,ps.id+'_'+f.id,el.value);
          });
          recomputePlacement(region,ps.id,yr,mo);
        });
      });
    } else if(sec.fields.length>0){
      const saveRegs = sec.regions==='psfo' ? REGIONS_PSFO : REGIONS;
      saveRegs.forEach(r=>{
        sec.fields.filter(f=>f.type==='number').forEach(f=>{
          const el=document.getElementById(`inp-${sec.id}-${rKey(r)}-${f.id}`);
          if(el) sv(yr,mo,sec.id,r,f.id,el.value);
        });
        recomputeSection(sec.id,r,yr,mo);
      });
    } else {
      REGIONS.forEach(r=>{
        const el=document.getElementById(`inp-${sec.id}-${rKey(r)}-total`);
        if(el) sv(yr,mo,sec.id,r,'total',el.value);
      });
    }
  });
  await flushSaveQueue();
  showToast('Data saved!','#43B02A');
  buildTOC();
}

function goToSection(id, roleKey){
  setRole(roleKey);
  showPage('entry');
  setTimeout(()=>activateSection(id),60);
}

// ════════════════════════════════════════════
//  GRADUATE LOG
// ════════════════════════════════════════════
function addGradEntry(){
  const f=document.getElementById('g-first').value.trim();
  const l=document.getElementById('g-last').value.trim();
  const dog=document.getElementById('g-dog').value.trim();
  if(!f||!l||!dog){showToast('First name, last name, and dog name required.','#E1523D');return;}
  manualEntries.push({
    first:f,last:l,mi:document.getElementById('g-mi').value.trim(),dog,
    cat:document.getElementById('g-cat').value,
    region:document.getElementById('g-region').value,
    date:document.getElementById('g-date').value,
    id:Date.now(),matchClient:null,matchDog:null
  });
  ['g-first','g-last','g-mi','g-dog','g-date'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('g-cat').value='';
  document.getElementById('g-region').value='';
  renderManualTable();
  if(sfData.length)runCrossRef();
  persistGrads();
}

function removeGradEntry(id){
  manualEntries=manualEntries.filter(e=>e.id!==id);
  renderManualTable();
  if(sfData.length)runCrossRef();
  persistGrads();
}

function renderManualTable(){
  const tb=document.getElementById('grad-manual-body');
  if(!manualEntries.length){
    tb.innerHTML='<tr><td colspan="8" style="color:var(--text-muted);text-align:center;padding:2.5rem;font-size:13px;">No entries yet -- add a graduate above.</td></tr>';
    return;
  }
  tb.innerHTML=manualEntries.map(e=>{
    const name=`${e.last}, ${e.first}${e.mi?' '+e.mi+'.':''}`;
    const cm=e.matchClient===false,dm=e.matchDog===false;
    const cls=cm?'hl-client':dm?'hl-dog':'';
    const status=e.matchClient===null
      ?'<span class="badge b-pend">Pending check</span>'
      :(!cm&&!dm)?'<span class="badge b-green"> Matched</span>'
      :`${cm?'<span class="badge b-red">Client not found</span> ':''}${dm?'<span class="badge b-red">Dog not found</span>':''}`;
    return `<tr class="${cls}">
      <td><strong>${name}</strong>${cm?'<span class="mflag">! not in SF</span>':''}</td>
      <td>${e.mi||'--'}</td>
      <td>${e.dog}${dm?'<span class="mflag">!</span>':''}</td>
      <td><span class="badge b-blue">${e.cat||'--'}</span></td>
      <td>${e.region||'--'}</td>
      <td style="font-size:12px;font-family:monospace;">${e.date||'--'}</td>
      <td>${status}</td>
      <td><button class="del-btn" onclick="removeGradEntry(${e.id})" title="Delete entry">x</button></td>
    </tr>`;
  }).join('');
}

function renderSFTable(){
  const tb=document.getElementById('grad-sf-body');
  if(!sfData.length){
    tb.innerHTML='<tr><td colspan="6" style="color:var(--text-muted);text-align:center;padding:2.5rem;font-size:13px;">Upload a Salesforce CSV to populate this table.</td></tr>';
    return;
  }
  tb.innerHTML=sfData.map(row=>`<tr class="${row.notInManual?'hl-sfonly':''}">
    <td>${row.name||'--'}${row.notInManual?'<span class="sflag">! not in log</span>':''}</td>
    <td>${row.dog||'--'}</td>
    <td><span class="badge b-sky">${row.category||'--'}</span></td>
    <td>${row.region||'--'}</td>
    <td style="font-size:12px;font-family:monospace;">${row.date||'--'}</td>
    <td>${row.notInManual?'<span class="badge b-sky">Not in manual log</span>':'<span class="badge b-green"> Found</span>'}</td>
  </tr>`).join('');
}

function loadCSV(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{parseCSV(e.target.result);document.getElementById('sf-status').style.display='block';document.getElementById('sf-badge').textContent=` ${file.name} -- ${sfData.length} records loaded`;renderSFTable();if(manualEntries.length)runCrossRef();};
  reader.readAsText(file);
}

function handleDrop(e){
  e.preventDefault();document.getElementById('upload-zone').classList.remove('drag-over');
  const file=e.dataTransfer.files[0];
  if(file?.name.endsWith('.csv')){const reader=new FileReader();reader.onload=ev=>{parseCSV(ev.target.result);document.getElementById('sf-status').style.display='block';document.getElementById('sf-badge').textContent=` ${file.name} -- ${sfData.length} records loaded`;renderSFTable();if(manualEntries.length)runCrossRef();};reader.readAsText(file);}
}

function parseCSV(text){
  const lines=text.split('\n').map(l=>l.trim()).filter(l=>l);if(!lines.length)return;
  const hdrs=lines[0].split(',').map(h=>h.trim().toLowerCase().replace(/[^a-z0-9]/g,'_'));
  const col=(...ns)=>{for(const n of ns){const i=hdrs.findIndex(h=>h.includes(n));if(i>=0)return i;}return -1;};
  const nc=col('name','client','full'),fc=col('first'),lc=col('last'),dc=col('dog'),cc=col('categ','type','program'),rc=col('region','area'),dtc=col('date','grad');
  sfData=lines.slice(1).map(line=>{
    const cols=line.split(',').map(c=>c.trim().replace(/^"|"$/g,''));
    let name=nc>=0?cols[nc]:'';
    if(!name&&fc>=0&&lc>=0)name=`${cols[lc]}, ${cols[fc]}`;
    return{name:name||cols[0]||'',dog:dc>=0?cols[dc]:(cols[1]||''),category:cc>=0?cols[cc]:'',region:rc>=0?cols[rc]:'',date:dtc>=0?cols[dtc]:'',notInManual:false};
  }).filter(r=>r.name.trim());
}

function runCrossRef(){
  manualEntries.forEach(e=>{
    const row=sfData.find(r=>r.name.toLowerCase().includes(e.last.toLowerCase())&&r.name.toLowerCase().includes(e.first.toLowerCase()));
    e.matchClient=!!row;
    e.matchDog=row?row.dog.toLowerCase().trim()===e.dog.toLowerCase().trim():false;
  });
  sfData.forEach(row=>{row.notInManual=!manualEntries.find(e=>row.name.toLowerCase().includes(e.last.toLowerCase())&&row.name.toLowerCase().includes(e.first.toLowerCase()));});
  renderManualTable();renderSFTable();
  showToast('Cross-reference complete!','#0073FF');
}

// ════════════════════════════════════════════
//  DASHBOARD
// ════════════════════════════════════════════
let dashCharts={};
if(window.ChartDataLabels) Chart.register(ChartDataLabels);

function getMonths(view,month){
  return {month:[month],q1:[1,2,3],q2:[4,5,6],q3:[7,8,9],q4:[10,11,12],
    ytd:Array.from({length:month},(_,i)=>i+1)}[view];
}
function getPeriod(view,yr,mo){
  return {month:`${MONTHS_LBL[mo-1]} ${yr}`,q1:`Q1 ${yr}  .  Jan-Mar`,q2:`Q2 ${yr}  .  Apr-Jun`,
    q3:`Q3 ${yr}  .  Jul-Sep`,q4:`Q4 ${yr}  .  Oct-Dec`,ytd:`YTD ${yr}  .  Jan-${MONTHS_LBL[mo-1]}`}[view];
}

function aggRegions(yr,months,secId,fieldId,regions){
  return (regions||REGIONS).map(r=>months.reduce((s,m)=>s+gv(yr,m,secId,r,fieldId),0));
}
function aggTotal(yr,months,secId,fieldId,regions){
  return (regions||REGIONS).reduce((s,r)=>s+months.reduce((ms,m)=>ms+gv(yr,m,secId,r,fieldId),0),0);
}
function dpAgg(yr,months,psId,fieldId,regions){
  return (regions||REGIONS).map(r=>months.reduce((s,m)=>s+gv(yr,m,'dog_placements',r,psId+'_'+fieldId),0));
}
function dpTotal(yr,months,psId,fieldId,regions){
  return (regions||REGIONS).reduce((s,r)=>s+months.reduce((ms,m)=>ms+gv(yr,m,'dog_placements',r,psId+'_'+fieldId),0),0);
}

function updateDashboard(){
  const yr=+document.getElementById('dash-year').value;
  const mo=+document.getElementById('dash-month').value;
  const view=document.getElementById('dash-view').value;
  const months=getMonths(view,mo);
  document.getElementById('dash-month').disabled=(view!=='month'&&view!=='ytd');
  document.getElementById('dash-period-label').textContent=getPeriod(view,yr,mo);
  Object.values(dashCharts).forEach(c=>c.destroy()); dashCharts={};
  const container=document.getElementById('dash-content');
  container.innerHTML='';

  buildApplicantsDash(container,yr,mo,months,view);
  buildGraduatesDash(container,yr,mo,months,view);
  buildDogPlacementsDash(container,yr,mo,months,view);
  buildProTrainingDash(container,yr,mo,months,view);
  buildReleaseDocsDash(container,yr,mo,months,view);
  buildTherapyDash(container,yr,mo,months,view);
  buildBreederDash(container,yr,mo,months,view);
  buildPuppyDash(container,yr,mo,months,view);
}

// ── Section block wrapper ──
function secBlock(container, icon, title, accentColor, accentBg, buildFn){
  const wrap=document.createElement('div');
  wrap.className='dash-section-block';
  wrap.innerHTML=`
    <div class="dsb-header">
      <div class="dsb-title-row">
        <div class="dsb-title-text">
          <div class="dsb-title">${title}</div>
        </div>
      </div>
      <hr class="dsb-rule">
    </div>
    <div class="dsb-charts"></div>`;
  container.appendChild(wrap);
  const chartsArea = wrap.querySelector('.dsb-charts');
  buildFn(chartsArea, accentColor);
}

// ── Chart card factory ──
function mkCard(id, title, h=260){
  const d=document.createElement('div');
  d.className='vcard';
  d.innerHTML=`<div class="vcard-title">${title}</div>
    <div style="position:relative;height:${h}px;"><canvas id="${id}"></canvas></div>`;
  return d;
}

function row2(area, ...cards){
  const g=document.createElement('div');
  g.className='vcards-row';
  cards.forEach(c=>g.appendChild(c));
  area.appendChild(g);
}

function row1wide(area, card){
  card.classList.add('vcard-wide');
  const g=document.createElement('div');
  g.className='vcards-row';
  g.appendChild(card);
  area.appendChild(g);
}

// ══ CHART DESIGN SYSTEM ══════════════════════════

const FONT='Poppins';
// Axis tick labels: brighter, easier to read on dark bg
const TEXT_C='#8899a8';  // matches --text-muted

const TIP={
  backgroundColor:'rgba(4,12,28,.96)',
  titleFont:{family:FONT,size:11,weight:'600'},
  bodyFont:{family:FONT,size:11},
  padding:12,cornerRadius:10,
  borderColor:'rgba(254,203,0,.25)',borderWidth:1,
  displayColors:true,boxWidth:8,boxHeight:8,
  titleColor:'#FECB00',
  bodyColor:'rgba(255,255,255,.8)',
};

// Legend: bright enough to read comfortably on dark bg
const LEGEND_CFG={
  position:'bottom',
  labels:{
    font:{family:FONT,size:11,weight:'500'},
    boxWidth:9,padding:18,
    usePointStyle:true,pointStyleWidth:9,
    color:'#3a4d5c', // matches --text-body
  }
};

// ── Brand-aligned section color palettes ──
// High-contrast within each family for readability on dark bg

function ha(hex, a){
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ══════════════════════════════════════════════════════
//  PALETTE SYSTEM -- Canine Companions brand colors
//  Source: canine.org official brand identity
//  Primary:   CCI Blue  #0073FF
//  Accent:    CCI Yellow #FECB00
//  Secondary: CCI Sky   #4EC3E0, CCI Green #43B02A,
//             CCI Red   #E1523D, CCI Slate #425563
//  Dark:      CCI Navy  #041E42
// ══════════════════════════════════════════════════════

// Official CCI brand hex values
const CCI = {
  blue:   '#0073FF',
  yellow: '#FECB00',
  navy:   '#041E42',
  sky:    '#4EC3E0',
  green:  '#43B02A',
  red:    '#E1523D',
  slate:  '#425563',
};

// Opacity steps: darkest first so stacked charts read bottom-heavy
const STEPS = [0.90, 0.72, 0.56, 0.40, 0.26, 0.16];

// Build a 6-stop opacity ramp from one CCI color
function pal(hex){ return STEPS.map(a => ha(hex, a)); }

// ── Per-section palettes using CCI brand colors ──

// Applicants & Graduates → CCI Blue family
const P_BLUE_FAM = pal(CCI.blue);

// Dog Placements → distinct CCI hues per category
// service=blue, svc_fac=sky, medical_alert=navy, ptsd=green, facility=red, hearing=yellow
const P_DOGCAT = [
  ha(CCI.blue,   0.88),  // Service
  ha(CCI.sky,    0.88),  // Service w/ Facilitator
  ha(CCI.navy,   0.88),  // Medical Alert
  ha(CCI.green,  0.88),  // PTSD
  ha(CCI.red,    0.88),  // Facility
  ha(CCI.yellow, 0.88),  // Hearing
];

// Pro Training → CCI Yellow family
const P_YELLOW = pal(CCI.yellow);

// Release Dogs → CCI Red family
const P_ORANGE = pal(CCI.red);

// Therapy Dogs → CCI Sky family
const P_PURPLE = pal(CCI.sky);

// Breeder Dogs → CCI Slate family
const P_SILVER = pal(CCI.slate);

// Puppy / Interest / Raisers → CCI Green family
const P_GREY = pal(CCI.green);

// Prison & College → CCI Navy family
const P_KHAKI = pal(CCI.navy);

// Region single-series bars: CCI Blue at stepped opacity per region
function regionFill(i)  { return ha(CCI.blue, STEPS[i % STEPS.length]); }
function regionBorder(i){ return CCI.blue; }

// Generic palette access
function pFill(p, i)  { return p[i % p.length]; }
function pBorder(p, i){ return p[i % p.length]; }

// ── Data labels ──
// Inside stacked: white, larger, easy to read
const DL_INSIDE={
  display:(c)=>(c.dataset.data[c.dataIndex]||0)>0,
  formatter:(v)=>v>=1000?(v/1000).toFixed(1)+'k':String(v),
  color:'rgba(255,255,255,.95)',
  font:{family:FONT,size:11,weight:'700'},
  anchor:'center',align:'center',clamp:true,
  textShadowBlur:5,textShadowColor:'rgba(0,0,0,.45)',
};

// Outside single-series: bright on dark bg
const DL_OUTSIDE={
  display:(c)=>(c.dataset.data[c.dataIndex]||0)>0,
  formatter:(v)=>v>=1000?(v/1000).toFixed(1)+'k':String(v),
  color:'#3a4d5c',
  font:{family:FONT,size:11,weight:'700'},
  anchor:'end',align:'top',offset:4,
};

const DL_NONE={display:false};

// ── Scale defaults: no grid, no axis border, readable ticks ──
const SCALE_X=(stacked=false)=>({
  stacked,
  ticks:{color:TEXT_C,font:{family:FONT,size:10.5,weight:'500'},autoSkip:false,maxRotation:28},
  grid:{display:false},
  border:{display:false},
});
const SCALE_Y=(stacked=false)=>({
  stacked,
  ticks:{color:TEXT_C,font:{family:FONT,size:10.5,weight:'500'},maxTicksLimit:6},
  grid:{display:false},
  border:{display:false},
  beginAtZero:true,
});

function barOpts(stacked, legend, outside=false){
  return{
    responsive:true,maintainAspectRatio:false,
    plugins:{
      legend:legend?LEGEND_CFG:{display:false},
      datalabels:outside?DL_OUTSIDE:DL_INSIDE,
      tooltip:TIP,
    },
    scales:{x:SCALE_X(stacked), y:SCALE_Y(stacked)},
  };
}

function hBarOpts(){
  return{
    responsive:true,maintainAspectRatio:false,indexAxis:'y',
    plugins:{
      legend:{display:false},
      datalabels:{
        display:(c)=>(c.dataset.data[c.dataIndex]||0)>0,
        formatter:(v)=>v>=1000?(v/1000).toFixed(1)+'k':String(v),
        color:'#3a4d5c',
        font:{family:FONT,size:11,weight:'600'},
        anchor:'end',align:'right',offset:5,
      },
      tooltip:TIP,
    },
    scales:{
      x:{ticks:{color:TEXT_C,font:{family:FONT,size:10.5,weight:'500'}},grid:{display:false},border:{display:false},beginAtZero:true},
      y:{ticks:{color:TEXT_C,font:{family:FONT,size:11,weight:'500'}},grid:{display:false},border:{display:false}},
    },
  };
}

function donutOpts(pos='bottom'){
  return{
    responsive:true,maintainAspectRatio:false,cutout:'65%',
    plugins:{
      legend:{...LEGEND_CFG,position:pos},
      datalabels:{
        display:(c)=>{const t=c.dataset.data.reduce((a,b)=>a+b,0);return t>0&&c.dataset.data[c.dataIndex]/t>=.06;},
        formatter:(v,c)=>{const t=c.dataset.data.reduce((a,b)=>a+b,0);return Math.round(v/t*100)+'%';},
        color:'#fff',font:{family:FONT,size:10,weight:'700'},
        textShadowBlur:4,textShadowColor:'rgba(0,0,0,.35)',
      },
      tooltip:TIP,
    },
  };
}

function lineOpts(legend=false){
  return{
    responsive:true,maintainAspectRatio:false,
    plugins:{legend:legend?LEGEND_CFG:{display:false},datalabels:DL_NONE,tooltip:TIP},
    scales:{x:SCALE_X(), y:SCALE_Y()},
  };
}

// ════════════════════════
//  APPLICANTS
// ════════════════════════
function buildApplicantsDash(container,yr,mo,months,view){
  const pLabel=getPeriod(view,yr,mo);
  const wlColors=['#0073FF','#E1523D','#43B02A','#4EC3E0','#c9a200','#8b44cc'];
  const wlFields=[
    {id:'wl_facility',    label:'Facility'},
    {id:'wl_hearing',     label:'Hearing'},
    {id:'wl_service',     label:'Service'},
    {id:'wl_medical_alert',label:'Medical Alert'},
    {id:'wl_service_fac', label:'Svc w/ Facilitator'},
    {id:'wl_ptsd',        label:'PTSD'},
  ];

  secBlock(container,'','Applicant / Candidates','',' ',(area)=>{
    const c1=mkCard('c-app-reqs','Application Requests by Region',230);
    const c2=mkCard('c-app-wl-adds','Added to Waitlist by Region',230);
    row2(area,c1,c2);
    const c3=mkCard('c-wl-stack','Waitlist Breakdown by Category & Region',280);
    row1wide(area,c3);

    setTimeout(()=>{
      if(document.getElementById('c-app-reqs')) dashCharts['c-app-reqs']=new Chart(document.getElementById('c-app-reqs'),{
        type:'bar',
        data:{labels:REGIONS,datasets:[{label:'App Requests',
          data:aggRegions(yr,months,'applicants','app_requests'),
          backgroundColor:REGIONS.map((_,i)=>regionFill(i)),
          borderColor:REGIONS.map((_,i)=>regionBorder(i)),
          borderWidth:0,borderRadius:6,borderSkipped:false}]},
        options:barOpts(false,false,true)
      });
      if(document.getElementById('c-app-wl-adds')) dashCharts['c-app-wl-adds']=new Chart(document.getElementById('c-app-wl-adds'),{
        type:'bar',
        data:{labels:REGIONS,datasets:[{label:'Added to Waitlist',
          data:aggRegions(yr,months,'applicants','added_waitlist'),
          backgroundColor:REGIONS.map((_,i)=>regionFill(i)),
          borderColor:REGIONS.map((_,i)=>regionBorder(i)),
          borderWidth:0,borderRadius:6,borderSkipped:false}]},
        options:barOpts(false,false,true)
      });
      if(document.getElementById('c-wl-stack')) dashCharts['c-wl-stack']=new Chart(document.getElementById('c-wl-stack'),{
        type:'bar',
        data:{labels:REGIONS,datasets:wlFields.map((f,i)=>({
          label:f.label,
          data:aggRegions(yr,months,'applicants',f.id),
          backgroundColor:pFill(P_BLUE_FAM,i),borderColor:pBorder(P_BLUE_FAM,i),
          borderWidth:0,borderRadius:3,stack:'wl'
        }))},
        options:barOpts(true,true)
      });
    },80);
  });
}

// ════════════════════════
//  GRADUATES
// ════════════════════════
function buildGraduatesDash(container,yr,mo,months,view){
  const pLabel=getPeriod(view,yr,mo);
  const tf=[
    {id:'adi_tests',    label:'ADI Tests',                     color:'#0073FF'},
    {id:'checkins_6mo', label:'6-Month Check-ins',             color:'#43B02A'},
    {id:'live_meetings',label:'Other Live 2-Way Meetings',     color:'#4EC3E0'},
    {id:'touches',      label:'Calls, Emails & Touches',       color:'#c9a200'},
  ];

  secBlock(container,'','Graduates','',' ',(area)=>{
    const c1=mkCard('c-grad-stack','Graduate Touches by Region & Type',290);
    row1wide(area,c1);
    setTimeout(()=>{
      if(document.getElementById('c-grad-stack')) dashCharts['c-grad-stack']=new Chart(document.getElementById('c-grad-stack'),{
        type:'bar',
        data:{labels:REGIONS_PSFO,datasets:tf.map((f,i)=>({
          label:f.label,
          data:REGIONS_PSFO.map(r=>months.reduce((s,m)=>s+gv(yr,m,'graduates',r,f.id),0)),
          backgroundColor:pFill(P_BLUE_FAM,i),borderColor:pBorder(P_BLUE_FAM,i),
          borderWidth:0,borderRadius:4,stack:'g'
        }))},
        options:barOpts(true,true)
      });
    },80);
  });
}
// ════════════════════════
//  DOG PLACEMENTS
// ════════════════════════
function buildDogPlacementsDash(container,yr,mo,months,view){
  const catFields=[
    {id:'facility',     label:'Facility',            color:'#0073FF'},
    {id:'hearing',      label:'Hearing',             color:'#E1523D'},
    {id:'service',      label:'Service',             color:'#43B02A'},
    {id:'medical_alert',label:'Medical Alert',       color:'#4EC3E0'},
    {id:'service_fac',  label:'Svc w/ Facilitator',  color:'#c9a200'},
    {id:'ptsd',         label:'PTSD',                color:'#8b44cc'},
  ];

  secBlock(container,'','Dog Placements','',' ',(area)=>{
    const c1=mkCard('c-dp-cred','Credited Placements by Category & Region',280);
    row1wide(area,c1);
    const c2=mkCard('c-dp-ended','Placements Ended <12 Months by Category & Region',280);
    row1wide(area,c2);
    setTimeout(()=>{
      const dpDatasets=(stack)=>catFields.map((f,i)=>({
        label:f.label,
        data:stack==='cr'?dpAgg(yr,months,'credited',f.id,REGIONS):dpAgg(yr,months,'ended',f.id,REGIONS_PSFO),
        backgroundColor:pFill(P_DOGCAT,i),borderColor:pBorder(P_DOGCAT,i),
        borderWidth:0,borderRadius:3,stack
      }));
      if(document.getElementById('c-dp-cred')) dashCharts['c-dp-cred']=new Chart(document.getElementById('c-dp-cred'),{
        type:'bar',data:{labels:REGIONS,datasets:dpDatasets('cr')},options:barOpts(true,true)
      });
      if(document.getElementById('c-dp-ended')) dashCharts['c-dp-ended']=new Chart(document.getElementById('c-dp-ended'),{
        type:'bar',data:{labels:REGIONS_PSFO,datasets:dpDatasets('en')},options:barOpts(true,true)
      });
    },80);
  });
}

// ════════════════════════
//  PROFESSIONAL TRAINING
// ════════════════════════
function buildProTrainingDash(container,yr,mo,months,view){
  const semColors=['#0073FF','#43B02A','#4EC3E0'];
  const sems=[{id:'sem1',label:'1st Semester'},{id:'sem2',label:'2nd Semester'},{id:'sem3',label:'3rd Semester'}];

  secBlock(container,'','Professional Training Dogs','',' ',(area)=>{
    const c1=mkCard('c-pt-stack','Semester Breakdown by Region',270);
    row1wide(area,c1);
    setTimeout(()=>{
      if(document.getElementById('c-pt-stack')) dashCharts['c-pt-stack']=new Chart(document.getElementById('c-pt-stack'),{
        type:'bar',
        data:{labels:REGIONS_PSFO,datasets:sems.map((s,i)=>({
          label:s.label,
          data:REGIONS_PSFO.map(r=>months.reduce((sm,m)=>sm+gv(yr,m,'pro_training',r,s.id),0)),
          backgroundColor:pFill(P_YELLOW,i),borderColor:pBorder(P_YELLOW,i),
          borderWidth:0,borderRadius:4,stack:'pt'
        }))},
        options:barOpts(true,true)
      });
    },80);
  });
}

// ════════════════════════
//  RELEASE DOGS
// ════════════════════════
function buildReleaseDocsDash(container,yr,mo,months,view){
  const rf=[
    {id:'to_therapy',     label:'Release to Therapy',      color:'#E1523D'},
    {id:'agency_transfer',label:'Agency Transfers',         color:'#e56a58'},
    {id:'prior_matric',   label:'Prior to Matriculation',   color:'#c9a200'},
    {id:'all_other',      label:'All Other',               color:'#425563'},
  ];

  secBlock(container,'','Release Dogs','',' ',(area)=>{
    const c1=mkCard('c-rel-stack','Release Dogs by Type & Region',270);
    row1wide(area,c1);
    setTimeout(()=>{
      if(document.getElementById('c-rel-stack')) dashCharts['c-rel-stack']=new Chart(document.getElementById('c-rel-stack'),{
        type:'bar',
        data:{labels:REGIONS,datasets:rf.map((f,i)=>({
          label:f.label,
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'release_dogs',r,f.id),0)),
          backgroundColor:pFill(P_ORANGE,i),borderColor:pBorder(P_ORANGE,i),
          borderWidth:0,borderRadius:4,stack:'r'
        }))},
        options:barOpts(true,true)
      });
    },80);
  });
}

// ════════════════════════
//  THERAPY DOGS
// ════════════════════════
function buildTherapyDash(container,yr,mo,months,view){
  const tf=[
    {id:'from_list',    label:'From Therapy List',           color:'#43B02A'},
    {id:'prog_or_prev', label:'Prog / Prev Released',        color:'#62c44e'},
  ];

  secBlock(container,'','Therapy Dogs','',' ',(area)=>{
    const c1=mkCard('c-th-stack','Therapy Dog Placements by Type & Region',260);
    row1wide(area,c1);
    setTimeout(()=>{
      if(document.getElementById('c-th-stack')) dashCharts['c-th-stack']=new Chart(document.getElementById('c-th-stack'),{
        type:'bar',
        data:{labels:REGIONS_PSFO,datasets:tf.map((f,i)=>({
          label:f.label,
          data:REGIONS_PSFO.map(r=>months.reduce((s,m)=>s+gv(yr,m,'therapy_dogs',r,f.id),0)),
          backgroundColor:pFill(P_PURPLE,i),borderColor:pBorder(P_PURPLE,i),
          borderWidth:0,borderRadius:4,stack:'th'
        }))},
        options:barOpts(true,true)
      });
    },80);
  });
}

// ════════════════════════
//  BREEDER DOGS
// ════════════════════════
function buildBreederDash(container,yr,mo,months,view){
  const bf=[
    {id:'selected_male',   label:'Selected -- Male',   color:'#425563'},
    {id:'selected_female', label:'Selected -- Female', color:'#4EC3E0'},
  ];
  const hqf=[
    {id:'active_male',    label:'Active Male',         color:'#0073FF'},
    {id:'active_female',  label:'Active Female',       color:'#E1523D'},
    {id:'new_bc',         label:'New BC Households',   color:'#43B02A'},
    {id:'repeat_bc',      label:'Repeat BC Households',color:'#4EC3E0'},
    {id:'dams_bred',      label:'Dams Bred',           color:'#c9a200'},
    {id:'litters_whelped',label:'Litters Whelped',     color:'#8b44cc'},
    {id:'live_puppies',   label:'Live Puppies Born',   color:'#E1523D'},
  ];

  secBlock(container,'','Breeder Dogs','',' ',(area)=>{
    const c1=mkCard('c-br-selected','Breeders Selected by Region',230);
    const c2=mkCard('c-br-hq','Headquarters Metrics',230);
    row2(area,c1,c2);
    setTimeout(()=>{
      if(document.getElementById('c-br-selected')) dashCharts['c-br-selected']=new Chart(document.getElementById('c-br-selected'),{
        type:'bar',
        data:{labels:REGIONS,datasets:bf.map((f,i)=>({
          label:f.label,
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'breeder_dogs',r,f.id),0)),
          backgroundColor:pFill(P_SILVER,i),borderColor:pBorder(P_SILVER,i),
          borderWidth:0,borderRadius:5
        }))},
        options:barOpts(false,true,false)
      });
      if(document.getElementById('c-br-hq')) dashCharts['c-br-hq']=new Chart(document.getElementById('c-br-hq'),{
        type:'bar',
        data:{labels:hqf.map(f=>f.label),datasets:[{
          label:'HQ',
          data:hqf.map(f=>months.reduce((s,m)=>s+gv(yr,m,'breeder_dogs','Headquarters',f.id),0)),
          backgroundColor:hqf.map((_,i)=>pFill(P_SILVER,i)),
          borderColor:hqf.map((_,i)=>pBorder(P_SILVER,i)),
          borderWidth:0,borderRadius:5
        }]},
        options:hBarOpts()
      });
    },80);
  });
}

// ════════════════════════
//  PUPPY PROGRAMS
// ════════════════════════
function buildPuppyDash(container,yr,mo,months,view){
  const ppColors=['#c9a200','#43B02A','#E1523D','#0073FF'];
  const ppFields=[
    {id:'new_raiser',   label:'New Raiser Placements',    color:'#c9a200'},
    {id:'repeat_raiser',label:'Repeat Raiser Placements', color:'#d4ae1a'},
    {id:'waitlist',     label:'Waitlist Total',            color:'#4EC3E0'},
    {id:'matriculated', label:'Puppies Matriculated',      color:'#43B02A'},
  ];
  const piFields=[
    {id:'app_requests', label:'App Requests',    color:'#0073FF'},
    {id:'apps_received',label:'Apps Received',   color:'#43B02A'},
    {id:'apps_approved',label:'Apps Approved',   color:'#43B02A'},
    {id:'proj_waitlist',label:'Proj. Waitlist',  color:'#c9a200'},
    {id:'fostered',     label:'Fostered',         color:'#E1523D'},
  ];

  secBlock(container,'','Puppy Programs','',' ',(area)=>{
    const c1=mkCard('c-pp-place','Puppy Placements by Type & Region',250);
    const c2=mkCard('c-pp-raisers','Active Puppy Raisers by Region',250);
    row2(area,c1,c2);
    const c3=mkCard('c-pp-interest','Puppy Interest Metrics by Region',260);
    row1wide(area,c3);
    const c4=mkCard('c-pp-prison','Prison Programs by Region',240);
    const c5=mkCard('c-pp-college','College Clubs by Region',240);
    row2(area,c4,c5);

    setTimeout(()=>{
      if(document.getElementById('c-pp-place')) dashCharts['c-pp-place']=new Chart(document.getElementById('c-pp-place'),{
        type:'bar',
        data:{labels:REGIONS,datasets:ppFields.map((f,i)=>({
          label:f.label,
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'puppy_placements',r,f.id),0)),
          backgroundColor:pFill(P_GREY,i),borderColor:pBorder(P_GREY,i),borderWidth:0,borderRadius:3,stack:'pp'
        }))},
        options:barOpts(true,true)
      });
      if(document.getElementById('c-pp-raisers')) dashCharts['c-pp-raisers']=new Chart(document.getElementById('c-pp-raisers'),{
        type:'bar',
        data:{labels:REGIONS,datasets:[{
          label:'Active Raisers',
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'active_raisers',r,'total_raisers'),0)),
          backgroundColor:REGIONS.map((_,i)=>pFill(P_GREY,i)),
          borderColor:REGIONS.map((_,i)=>pBorder(P_GREY,i)),
          borderWidth:0,borderRadius:6,borderSkipped:false
        }]},
        options:barOpts(false,false,true)
      });
      if(document.getElementById('c-pp-interest')) dashCharts['c-pp-interest']=new Chart(document.getElementById('c-pp-interest'),{
        type:'bar',
        data:{labels:REGIONS,datasets:piFields.map((f,i)=>({
          label:f.label,
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'puppy_interest',r,f.id),0)),
          backgroundColor:pFill(P_GREY,i),borderColor:pBorder(P_GREY,i),borderWidth:0,borderRadius:3,stack:'pi'
        }))},
        options:barOpts(true,true)
      });
      const prF=[{id:'active_programs',label:'Active Programs'},{id:'active_puppies',label:'Active Puppies'},{id:'placed_month',label:'Placed This Month'}];
      if(document.getElementById('c-pp-prison')) dashCharts['c-pp-prison']=new Chart(document.getElementById('c-pp-prison'),{
        type:'bar',
        data:{labels:REGIONS,datasets:prF.map((f,i)=>({
          label:f.label,
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'prison_programs',r,f.id),0)),
          backgroundColor:pFill(P_KHAKI,i),borderColor:pBorder(P_KHAKI,i),borderWidth:0,borderRadius:5
        }))},
        options:barOpts(false,true,false)
      });
      const ccF=[{id:'active_clubs',label:'Active Clubs'},{id:'active_puppies',label:'Active Puppies'},{id:'placed_month',label:'Placed This Month'}];
      if(document.getElementById('c-pp-college')) dashCharts['c-pp-college']=new Chart(document.getElementById('c-pp-college'),{
        type:'bar',
        data:{labels:REGIONS,datasets:ccF.map((f,i)=>({
          label:f.label,
          data:REGIONS.map(r=>months.reduce((s,m)=>s+gv(yr,m,'college_clubs',r,f.id),0)),
          backgroundColor:pFill(P_KHAKI,i),borderColor:pBorder(P_KHAKI,i),borderWidth:0,borderRadius:5
        }))},
        options:barOpts(false,true,false)
      });
    },80);
  });
}

function makeChartCard(title,subtitle,canvasId){
  const c=document.createElement('div');
  c.className='chart-card';
  c.innerHTML=`<div class="chart-title">${title}</div><div class="chart-sub">${subtitle}</div><div class="chart-legend"></div><div style="position:relative;height:240px;"><canvas id="${canvasId}"></canvas></div>`;
  return c;
}
function chartOpts(showLegend=false,stacked=false,outside=false){return barOpts(stacked,showLegend,outside);}
function doughnutOpts(){return donutOpts();}

// ════════════════════════════════════════════
//  ROLE-AWARE NAV
// ════════════════════════════════════════════
// Maps role key → which nav buttons are visible and which entry sections show
const ROLE_NAV = {
  pd: { entry:true,  graduates:true  },
  tm: { entry:true,  graduates:false },
  th: { entry:true,  graduates:false },
  br: { entry:true,  graduates:false },
  pp: { entry:true,  graduates:false },
};

let currentRole = null;   // set when user clicks a TOC card

function setRole(roleKey){
  currentRole = roleKey;
  const perms = ROLE_NAV[roleKey] || {};
  document.getElementById('nav-entry').style.display     = perms.entry     ? '' : 'none';
  document.getElementById('nav-graduates').style.display = perms.graduates  ? '' : 'none';
}

function showPage(id){
  // Hide all pages
  document.querySelectorAll('.page').forEach(p=>{
    p.classList.remove('active');
  });
  // Show target page
  const target = document.getElementById('page-'+id);
  if(!target){ console.error('showPage: page-'+id+' not found'); return; }
  target.classList.add('active');
  // Update nav
  document.querySelectorAll('.nav-btn[data-page]').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-page')===id);
  });
  // Page-specific actions
  if(id==='dashboard') updateDashboard();
  if(id==='home')      buildTOC();
  if(id==='entry'){
    rebuildEntryForRole(currentRole);
    // Delay to let panels fully render, then load saved values
    setTimeout(()=>{
      const s = document.querySelector('.sub-panel.active');
      if(s) loadSectionValues(s.id.replace('panel-',''));
    }, 150);
  }
}

function rebuildEntryForRole(roleKey){
  const roleSecs = roleKey
    ? ENTRY_SECS.filter(s=>s.role===roleKey)
    : ENTRY_SECS;
  if(!roleSecs.length) return;

  // Build region pills for this role
  buildRegionPills(roleKey);

  // Tabs
  document.getElementById('section-tabs').innerHTML =
    roleSecs.map((s,i)=>
      `<button class="section-tab${i===0?' active':''}" onclick="activateSection('${s.id}')">${s.label}</button>`
    ).join('');

  // Panels: only show panels belonging to this role
  document.querySelectorAll('.sub-panel').forEach(p=>{
    const secId = p.id.replace('panel-','');
    const sec = SECTIONS.find(s=>s.id===secId);
    const show = !roleKey || (sec && sec.role===roleKey);
    p.style.display = show ? '' : 'none';
  });

  // Activate first tab of this role
  activateSection(roleSecs[0].id);
}

// ════════════════════════════════════════════
//  NAV & UTILS
// ════════════════════════════════════════════
function showToast(msg,color='#43B02A'){
  const el=document.getElementById('toast');
  el.style.cssText=`position:fixed;bottom:24px;right:24px;background:${color};color:#fff;font-family:'Poppins',Arial,sans-serif;font-size:13px;font-weight:600;padding:10px 20px;border-radius:10px;box-shadow:var(--sh-lg);z-index:9999;display:block;`;
  el.textContent=msg;
  setTimeout(()=>{el.style.display='none';},2800);
}

// ════════════════════════════════════════════
//  INIT -- load persisted data then render
// ════════════════════════════════════════════
// ════════════════════════════════════════════
//  DATA INITIALISATION
//  All values start at zero -- real data entered by staff
// ════════════════════════════════════════════
(function initData(){
  manualEntries = [];
})();

(async function init(){
  // Check if this is a password reset / magic link (has #access_token in URL)
  const hashParams = new URLSearchParams(window.location.hash.replace('#',''));
  const accessToken = hashParams.get('access_token');
  const tokenType   = hashParams.get('type');

  if(accessToken && (tokenType === 'invite' || tokenType === 'recovery' || tokenType === 'signup')){
    // Set the session from the token so updateUser works
    try{
      await SB.auth.setSession({
        access_token: accessToken,
        refresh_token: hashParams.get('refresh_token') || ''
      });
    } catch(e){}
    // Show set password page
    showLogin(); // hide everything first
    document.getElementById('page-login').classList.add('hidden');
    document.getElementById('page-setpassword').classList.remove('hidden');
    return; // stop here -- doSetPassword handles the rest
  }

  // Normal flow -- show login first
  showLogin();

  const _loadedAt = Date.now();

  // Listen for auth state changes
  SB.auth.onAuthStateChange(async (event, session) => {
    // Ignore spurious SIGNED_OUT on initial page load (Supabase fires this
    // briefly before restoring the session from localStorage)
    if(event === 'SIGNED_OUT'){
      // Always handle SIGNED_OUT -- grace window only matters on fresh page load
      // doLogout() already calls showLogin() directly, so just clean up state here
      _currentUser = null;
      _loginComplete = false;
      return;
    }
    if((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') && session){
      if(_loginComplete) return;
      _currentUser = session.user;
      await afterLogin();
    }
  });

  // Also do an immediate getSession check -- this restores session from
  // localStorage on refresh without needing to wait for the auth event
  const { data: { session } } = await SB.auth.getSession();
  if(session && !_loginComplete){
    _currentUser = session.user;
    await afterLogin();
  }
})();