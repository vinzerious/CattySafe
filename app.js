/**
 * CattySafe — Main Application Controller & Interactive Canvas Telemetry
 */

import { CattyAcousticEngine, SOUND_PROFILES, SMART_SWEEP_STAGES, DOG_SMART_SWEEP_STAGES } from './audio-engine.js';

export const VEHICLE_ZONES = {
  'engine-bay': {
    id: 'engine-bay',
    code: 'ZONE A',
    nameTh: 'ห้องเครื่องยนต์และสายพานหน้าเครื่อง',
    nameEn: 'Engine Bay & Fan Belts',
    riskPercent: 'ความเสี่ยงสูงสุด 62%',
    whyTh: 'เสื้อสูบเก็บความอบอุ่น (35–50°C) ได้นาน 4–6 ชม. หลังดับเครื่อง ลูกแมวมักมุดจากช่องใต้กันชนหน้าขึ้นไปซุกใกล้สายพานหน้าเครื่องและใบพัดหม้อน้ำ',
    cautionTh: 'ห้ามบีบแตรไล่! ให้เคาะฝากระโปรง 3 ครั้ง (Neko Ban Ban) หากได้ยินเสียงแมวติดอยู่ข้างใน ให้เปิดฝากระโปรงหรือใช้ "โหมดเสียงล่อ (Coax)"',
    recommendedProfile: 'neko-banban-knock',
    secondaryProfile: 'kitten-contact-call',
    buttonLabelTh: 'ส่งเสียงเคาะเตือนปลุกห้องเครื่อง (75–380 Hz)'
  },
  'wheel-wells': {
    id: 'wheel-wells',
    code: 'ZONE B',
    nameTh: 'ซุ้มล้อหน้าและบนหน้ายางรถยนต์',
    nameEn: 'Front Wheel Wells & Tire Tops',
    riskPercent: 'ความเสี่ยง 21%',
    whyTh: 'ช่องว่างเหนือยางล้อหน้าเป็นที่บังลมและฝนชั้นดี และได้รับไออุ่นจากเบรกและห้องเครื่อง แมวมักขึ้นไปขดตัวนอนบนหน้ายาง',
    cautionTh: 'แมวมีทางวิ่งหนีออกด้านนอกได้สะดวก ใช้เสียงขู่ฟ่อ (Feline Hiss) หรือคลื่นความถี่สูงกวาดเพื่อไล่ออกได้ทันที',
    recommendedProfile: 'feline-hiss',
    secondaryProfile: 'ultrasonic-sweep',
    buttonLabelTh: 'ส่งเสียงแมวเจ้าถิ่นขู่ฟ่อเคลียร์ซุ้มล้อ (3.5–11.5 kHz)'
  },
  'undercarriage': {
    id: 'undercarriage',
    code: 'ZONE C',
    nameTh: 'ใต้ท้องรถและแคตตาไลติกคอนเวอร์เตอร์',
    nameEn: 'Undercarriage & Catalytic Shield',
    riskPercent: 'ความเสี่ยง 11%',
    whyTh: 'พื้นใต้ท้องรถเป็นจุดหลบแดดและหลบสุนัข แมวมักนอนหมอบอยู่กึ่งกลางลำตัวรถซึ่งคนขับมองไม่เห็นขณะเดินขึ้นประตูฝั่งคนขับ',
    cautionTh: 'ส่งคลื่นความถี่สูงกวาดสลับ (13.5–19.5 kHz) หรือเสียงเขย่ากระป๋องโลหะเพื่อให้แมววิ่งออกจากใต้ท้องรถก่อนถอยรถ',
    recommendedProfile: 'ultrasonic-sweep',
    secondaryProfile: 'metallic-shaker',
    buttonLabelTh: 'ส่งคลื่นกวาดความถี่สูงไล่ใต้ท้องรถ (13.5–19.5 kHz)'
  },
  'rear-exhaust': {
    id: 'rear-exhaust',
    code: 'ZONE D',
    nameTh: 'ซุ้มล้อหลังและท่อพักไอเสีย',
    nameEn: 'Rear Axle & Muffler Heat Shield',
    riskPercent: 'ความเสี่ยง 6%',
    whyTh: 'หม้อพักไอเสียด้านหลังยังอุ่นอยู่หลังจอดรถใหม่ๆ แมวบางตัวแอบซุกใกล้คานล้อหลังซึ่งเป็นจุดบอดกระจกมองหลัง',
    cautionTh: 'ใช้เสียงสุนัขคำราม/เห่าเตือน หรือเสียงเขย่าโลหะเพื่อให้แมวผละออกจากท้ายรถ',
    recommendedProfile: 'canine-warning',
    secondaryProfile: 'metallic-shaker',
    buttonLabelTh: 'ส่งเสียงสุนัขเตือนภัยเคลียร์ท้ายรถ (140–2,600 Hz)'
  }
};

export const DOG_VEHICLE_ZONES = {
  'engine-bay': {
    id: 'engine-bay',
    code: 'ZONE A',
    nameTh: 'ใต้กันชนหน้าและแผ่นปิดใต้ห้องเครื่อง',
    nameEn: 'Front Bumper & Lower Splash Guard',
    riskPercent: 'ความเสี่ยง 18%',
    whyTh: 'ลูกสุนัขมักมุดเข้ามาซุกใต้กันชนหน้าเพื่อหาไออุ่น หรือสุนัขโตอาจมุดมากัดสายไฟ ABS และท่อยางใต้ห้องเครื่อง',
    cautionTh: 'ใช้เสียงเคาะตัวถังปลุกสุนัข (65–320 Hz) หรือเปิดโหมดเสียงล่อ (ตุ๊กตาบีบปี๊บ) เพื่อเรียกลูกสุนัขให้ออกมาทางด้านหน้ารถ',
    recommendedProfile: 'dog-chassis-thump',
    secondaryProfile: 'dog-squeaky-toy',
    buttonLabelTh: 'ส่งเสียงเคาะตัวถังปลุกสุนัขหน้ากันชน (65–320 Hz)'
  },
  'wheel-wells': {
    id: 'wheel-wells',
    code: 'ZONE B',
    nameTh: 'ซุ้มล้อหน้าและข้างแก้มยางรถยนต์',
    nameEn: 'Front Tires & Wheel Wells',
    riskPercent: 'ความเสี่ยง 24%',
    whyTh: 'สุนัขชอบนอนเอาหลังพิงแก้มยางล้อหน้าเพราะบังแดดและเย็นสบาย ซึ่งคนขับมักมองไม่เห็นหากขึ้นรถจากฝั่งตรงข้าม',
    cautionTh: 'ใช้เสียงโซนาร์พัลส์ความถี่จุดพีคหูสุนัข (4.2–7.8 kHz) หรือเสียงแมวขู่ป้องกันตัวเพื่อให้สุนัขลุกเดินออกห่างจากล้อหน้า',
    recommendedProfile: 'dog-sonar-ping',
    secondaryProfile: 'dog-feline-warning',
    buttonLabelTh: 'ส่งโซนาร์พัลส์เคลียร์ข้างล้อหน้า (4.2–7.8 kHz)'
  },
  'undercarriage': {
    id: 'undercarriage',
    code: 'ZONE C',
    nameTh: 'กึ่งกลางใต้ท้องรถ (จุดสุนัขหลบแดดอันดับ 1)',
    nameEn: 'Center Undercarriage Shade',
    riskPercent: 'ความเสี่ยงสูงสุด 36%',
    whyTh: 'พื้นปูนหรือดินใต้ท้องรถเป็นจุดที่เย็นที่สุดในตอนกลางวัน สุนัขจรและสุนัขบ้านมักนอนหลับลึกอยู่กึ่งกลางใต้ท้องรถ',
    cautionTh: 'ส่งคลื่นนกหวีดสุนัขความถี่สูง (12–18.5 kHz) หรือเสียงกระป๋องลมอัด Pet Corrector เพื่อปลุกและไล่สุนัขออกจากใต้ท้องรถ',
    recommendedProfile: 'dog-whistle-sweep',
    secondaryProfile: 'dog-shaker-interrupter',
    buttonLabelTh: 'ส่งคลื่นนกหวีดสุนัขไล่ใต้ท้องรถ (12.0–18.5 kHz)'
  },
  'rear-exhaust': {
    id: 'rear-exhaust',
    code: 'ZONE D',
    nameTh: 'คานล้อหลังและจุดบอดขณะถอยรถ',
    nameEn: 'Rear Axle & Reverse Blind Spot',
    riskPercent: 'ความเสี่ยงสูง 22%',
    whyTh: 'สุนัขที่นอนอยู่หลังล้อหลังอยู่ในจุดบอดกระจกมองหลัง 100% เสี่ยงต่อการถูกล้อทับทันทีที่คนขับเข้าเกียร์ถอยหลัง (R)',
    cautionTh: 'ส่งเสียงแตรลมเตือนภัยฉุกเฉิน (280–1,850 Hz) หรือเสียงเขย่าโลหะเพื่อให้สุนัขรีบลุกออกจากท้ายรถทันทีก่อนถอย',
    recommendedProfile: 'dog-airhorn-burst',
    secondaryProfile: 'dog-shaker-interrupter',
    buttonLabelTh: 'ส่งเสียงแตรลมเตือนภัยเคลียร์ท้ายรถ (280–1,850 Hz)'
  }
};

const STORAGE_KEY_CLEARED = 'cattysafe_cleared_zones_v1';
const STORAGE_KEY_THEME = 'cattysafe_theme_v1';
const STORAGE_KEY_SPECIES = 'cattysafe_species_v1';

class CattySafeApp {
  constructor() {
    this.engine = new CattyAcousticEngine();
    this.species = this.loadSpecies(); // 'cat' | 'dog'
    this.selectedZoneId = 'engine-bay';
    this.clearedZones = this.loadClearedZones();
    this.canvasMode = 'audiogram'; // 'audiogram' | 'waveform'
    this.freqData = new Uint8Array(512);
    this.timeData = new Uint8Array(512);

    // Mic listener state
    this.isListeningMic = false;
    this.isSimulatingMic = false;
    this.micLevel = 0;
    this.micPeakDetected = false;
    this.micTimer = null;
    this.micAudioCtx = null;
    this.micSource = null;
    this.micAnalyser = null;

    this.init();
  }

  loadSpecies() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SPECIES);
      return saved === 'dog' ? 'dog' : 'cat';
    } catch (_) {
      return 'cat';
    }
  }

  saveSpecies() {
    try {
      localStorage.setItem(STORAGE_KEY_SPECIES, this.species);
    } catch (_) {}
  }

  getActiveZoneMap() {
    return this.species === 'dog' ? DOG_VEHICLE_ZONES : VEHICLE_ZONES;
  }

  loadClearedZones() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLEARED);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (_) {
      return {};
    }
  }

  saveClearedZones() {
    try {
      localStorage.setItem(STORAGE_KEY_CLEARED, JSON.stringify(this.clearedZones));
    } catch (_) {}
  }

  init() {
    this.initTheme();
    this.bindSpeciesToggle();
    this.bindTopControls();
    this.bindSmartSweepControls();
    this.bindModeTabs();
    this.bindSoundProfileButtons();
    this.bindVehicleInspector();
    this.bindMicListener();
    this.bindManualLab();
    this.bindResearchInlinePlayButtons();
    this.bindTorchDialog();

    this.engine.onStateChange = (status) => this.renderAudioStatus(status);
    this.applySpeciesUI();
    this.renderZoneInspector();
    this.renderAudioStatus(this.engine.getStatus());
    this.startCanvasLoop();

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  bindSpeciesToggle() {
    const btns = document.querySelectorAll('.species-toggle-btn[data-species]');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextSpecies = btn.getAttribute('data-species') === 'dog' ? 'dog' : 'cat';
        if (nextSpecies !== this.species) {
          this.setSpecies(nextSpecies);
        }
      });
    });
  }

  setSpecies(species) {
    this.species = species === 'dog' ? 'dog' : 'cat';
    this.saveSpecies();
    if (this.engine.isPlaying) {
      this.engine.stopAll();
    }
    // Select the highest-risk default zone for the target species
    this.selectedZoneId = this.species === 'dog' ? 'undercarriage' : 'engine-bay';
    this.applySpeciesUI();
    this.resetSweepUI(false);
    this.renderZoneInspector();
    this.renderAudioStatus(this.engine.getStatus());
  }

  applySpeciesUI() {
    const isDog = this.species === 'dog';
    document.documentElement.setAttribute('data-species', this.species);

    // Update toggle buttons aria-pressed
    document.querySelectorAll('.species-toggle-btn[data-species]').forEach((btn) => {
      const sp = btn.getAttribute('data-species');
      btn.setAttribute('aria-pressed', sp === this.species ? 'true' : 'false');
    });

    // Show/hide species-specific sound profile cards
    document.querySelectorAll('[data-species-card]').forEach((card) => {
      const cardSp = card.getAttribute('data-species-card');
      if (cardSp === this.species) {
        card.removeAttribute('hidden');
      } else {
        card.setAttribute('hidden', '');
      }
    });

    // Update Sweep Console header & lead
    const sweepHeading = document.getElementById('sweep-console-heading');
    const sweepLead = document.getElementById('sweep-lead-text');
    const ch1 = document.getElementById('stage-chip-label-1');
    const ch2 = document.getElementById('stage-chip-label-2');
    const ch3 = document.getElementById('stage-chip-label-3');
    const ch4 = document.getElementById('stage-chip-label-4');

    if (sweepHeading) {
      sweepHeading.textContent = isDog
        ? 'ระบบสแกนเสียงไล่สุนัขรอบคันรถอัตโนมัติ (Canine 4-Stage Sweep)'
        : 'ระบบสแกนเสียงไล่แมวรอบคันรถอัตโนมัติ (Neko Ban Ban 4-Stage Sweep)';
    }
    if (sweepLead) {
      sweepLead.textContent = isDog
        ? 'ปลุกสุนัขที่นอนหลับใต้ท้องรถหรือพิงยางล้อ → ส่งคลื่นนกหวีดสุนัขความถี่สูง 12–18.5 kHz → โซนาร์พัลส์ 4–8 kHz → เสียงกระป๋องลมอัดเตือนภัย'
        : 'ปลุกแมวที่หลับในห้องเครื่อง → ส่งคลื่นกวาดความถี่สูง 13.5–19.5 kHz → เสียงแมวเจ้าถิ่นขู่ฟ่อ → เสียงเขย่าโลหะเคลียร์ซุ้มล้อและใต้ท้องรถ';
    }
    if (ch1) ch1.textContent = isDog ? 'เคาะปลุกสุนัข' : 'เคาะปลุก';
    if (ch2) ch2.textContent = isDog ? 'นกหวีด 12–18.5k' : 'กวาด 13.5–19.5k';
    if (ch3) ch3.textContent = isDog ? 'โซนาร์ 4.2–7.8k' : 'เสียงขู่ฟ่อ';
    if (ch4) ch4.textContent = isDog ? 'กระป๋องลมอัด' : 'เขย่าโลหะ';

    // Update Audiogram legend
    const audSpeciesLegend = document.getElementById('audiogram-species-legend');
    const audBandLegend = document.getElementById('audiogram-band-legend');
    if (audSpeciesLegend) {
      audSpeciesLegend.textContent = isDog
        ? 'ความไวหูสุนัข (67 Hz – 45 kHz · พีค 4–8 kHz)'
        : 'ความไวหูแมว (45 Hz – 64 kHz)';
    }
    if (audBandLegend) {
      audBandLegend.textContent = isDog
        ? 'ช่วงนกหวีดสุนัขจากลำโพงมือถือ (12.0–18.5 kHz)'
        : 'ช่วงส่งคลื่นไล่แมวสูงสุดจากลำโพงมือถือ (13.5–19.5 kHz)';
    }

    // Update Mode Tabs & Context Banners
    const tabDeterLabel = document.getElementById('tab-deter-label');
    const tabCoaxLabel = document.getElementById('tab-coax-label');
    const deterBanner = document.getElementById('deter-context-banner-text');
    const coaxBanner = document.getElementById('coax-context-banner-text');

    if (tabDeterLabel) {
      tabDeterLabel.textContent = isDog
        ? '1. เสียงไล่สุนัขใต้ท้องรถ/ล้อ (Deter)'
        : '1. เสียงไล่แมวใต้ท้องรถ/ซุ้มล้อ (Deter)';
    }
    if (tabCoaxLabel) {
      tabCoaxLabel.textContent = isDog
        ? '2. เสียงล่อสุนัขออกจากใต้รถ (Coax)'
        : '2. เสียงล่อออกจากห้องเครื่อง (Coax)';
    }
    if (deterBanner) {
      deterBanner.innerHTML = isDog
        ? '<strong>ใช้เมื่อสุนัขหลบนอนใต้ท้องรถ พิงยางล้อ หรือนอนขวางจุดอับสายตาหลังรถ:</strong> สุนัขมีช่วงการได้ยินไวมากที่ <strong>4,000–18,500 Hz</strong> การใช้คลื่นนกหวีดความถี่สูงสลับกับเสียงกระป๋องลมอัด (Pet Corrector) จะทำให้สุนัขตื่นตัวและลุกเดินออกจากใต้รถโดยไม่ตื่นตระหนก'
        : '<strong>ใช้เมื่อแมวหลบอยู่ใต้ท้องรถ บนยางล้อ หรือซุ้มล้อ:</strong> พื้นที่เหล่านี้มีทางออกเปิดโล่ง แมวสามารถวิ่งหนีออกจากตัวรถได้ทันทีเมื่อได้ยินเสียงความถี่สูงหรือเสียงขู่เตือน';
    }
    if (coaxBanner) {
      coaxBanner.innerHTML = isDog
        ? '<strong>ใช้เมื่อสุนัขขี้กลัวหรือลูกสุนัขไม่ยอมคลานออกจากใต้ท้องรถ:</strong> ห้ามบีบแตรใส่สุนัขที่กำลังกลัวเพราะอาจทำให้หมอบนิ่งใต้เพลาล้อ ให้วางมือถือห่างจากรถ 2 เมตร แล้วเปิดเสียงตุ๊กตาบีบปี๊บ เสียงผิวปากเรียก หรือเสียงเคาะชามอาหารเพื่อดึงดูดให้เดินออกมาเอง'
        : '<strong>ทำไมต้องใช้เสียงล่อเมื่อแมวติดในห้องเครื่อง? (Engine Bay Paradox):</strong> หากลูกแมวมุดเข้าไปซุกในห้องเครื่องลึกๆ การบีบแตรหรือเปิดเสียงขู่ดังๆ อาจทำให้แมวกลัวสุดขีดแล้ว <em>ตัวแข็งทื่อ (Freeze) หรือมุดหนีลึกเข้าไปในสายพานเครื่องยนต์</em> ให้วางมือถือบนพื้นห่างจากหน้ารถ 1.5–2 เมตร แล้วเปิดเสียงล่อด้านล่างเพื่อให้แมวเดินออกมาเอง';
    }

    // Update Right Column Inspector Heading & SVG Zone Risk Labels
    const inspectorHeading = document.getElementById('inspector-heading');
    const svgZoneA = document.getElementById('svg-zone-a-label');
    const svgZoneC = document.getElementById('svg-zone-c-label');
    const svgZoneD = document.getElementById('svg-zone-d-label');
    const stubA = document.getElementById('stub-title-engine-bay');
    const stubB = document.getElementById('stub-title-wheel-wells');
    const stubC = document.getElementById('stub-title-undercarriage');
    const stubD = document.getElementById('stub-title-rear-exhaust');

    if (inspectorHeading) {
      inspectorHeading.textContent = isDog
        ? 'แผนผังจุดเสี่ยงสุนัขซ่อนใต้รถ 4 โซน'
        : 'แผนผังจุดเสี่ยงแมวซ่อนในรถ 4 โซน';
    }
    if (svgZoneA) svgZoneA.textContent = isDog ? 'ใต้กันชน 18%' : 'ห้องเครื่อง 62%';
    if (svgZoneC) svgZoneC.textContent = isDog ? 'ใต้ท้องรถ 36%' : 'ใต้ท้องรถ 11%';
    if (svgZoneD) svgZoneD.textContent = isDog ? 'ล้อหลัง 22%' : 'ท่อไอเสีย 6%';

    if (stubA) stubA.textContent = isDog ? 'ใต้กันชนหน้า & สายไฟใต้ห้องเครื่อง' : 'เคาะฝากระโปรง & เช็คห้องเครื่อง';
    if (stubB) stubB.textContent = isDog ? 'ซุ้มล้อหน้า & ข้างแก้มยางทั้ง 2 ฝั่ง' : 'ซุ้มล้อหน้า & บนหน้ายางทั้ง 2 ฝั่ง';
    if (stubC) stubC.textContent = isDog ? 'กึ่งกลางใต้ท้องรถ (จุดสุนัขหลบแดด)' : 'ใต้ท้องรถ & แคตตาไลติกคอนเวอร์เตอร์';
    if (stubD) stubD.textContent = isDog ? 'หลังล้อหลัง & จุดบอดขณะถอยรถ' : 'ซุ้มล้อหลัง & ท่อพักไอเสีย';
  }

  initTheme() {
    const switchEl = document.getElementById('garage-night-switch');
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY_THEME);
    } catch (_) {}

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (switchEl) {
      switchEl.checked = isDark;
      switchEl.addEventListener('change', () => {
        const nextTheme = switchEl.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        try {
          localStorage.setItem(STORAGE_KEY_THEME, nextTheme);
        } catch (_) {}
      });
    }
  }

  bindTopControls() {
    const volSlider = document.getElementById('master-volume-slider');
    const volValue = document.getElementById('master-volume-value');
    if (volSlider) {
      volSlider.addEventListener('input', () => {
        const pct = Number(volSlider.value);
        this.engine.setVolume(pct / 100);
        if (volValue) volValue.textContent = `${pct}%`;
      });
    }
  }

  bindSmartSweepControls() {
    const startBtn = document.getElementById('btn-start-smart-sweep');
    const stopBtn = document.getElementById('btn-stop-all');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (this.engine.isSmartSweeping) {
          this.engine.stopAll();
          this.resetSweepUI();
          return;
        }

        this.engine.startSmartSweep(
          (progress) => this.updateSweepProgressUI(progress),
          () => {
            this.resetSweepUI(true);
          },
          this.species
        );
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.engine.stopAll();
        this.resetSweepUI();
      });
    }
  }

  updateSweepProgressUI(progress) {
    const fill = document.getElementById('sweep-progress-fill');
    const stageText = document.getElementById('sweep-stage-title');
    const timeText = document.getElementById('sweep-time-counter');
    const chips = document.querySelectorAll('.stage-step-chip');

    if (fill) fill.style.width = `${progress.percent.toFixed(1)}%`;
    if (stageText && progress.stage) {
      stageText.textContent = progress.stage.titleTh;
    }
    if (timeText) {
      const rem = Math.max(0, progress.totalSec - progress.elapsedSec).toFixed(1);
      timeText.textContent = `เหลือเวลา ${rem} วินาที`;
    }
    chips.forEach((chip) => {
      const chipStage = Number(chip.getAttribute('data-stage'));
      chip.setAttribute('data-current', progress.stage && progress.stage.stage === chipStage ? 'true' : 'false');
    });

    // Also highlight corresponding vehicle zone on the schematic during sweep
    if (progress.stage) {
      const profile = SOUND_PROFILES[progress.stage.profileId];
      if (profile && profile.targetZone && this.selectedZoneId !== profile.targetZone) {
        this.selectedZoneId = profile.targetZone;
        this.renderZoneInspector();
      }
    }
  }

  resetSweepUI(completed = false) {
    const fill = document.getElementById('sweep-progress-fill');
    const stageText = document.getElementById('sweep-stage-title');
    const timeText = document.getElementById('sweep-time-counter');
    const chips = document.querySelectorAll('.stage-step-chip');
    const isDog = this.species === 'dog';

    if (fill) fill.style.width = completed ? '100%' : '0%';
    if (stageText) {
      if (completed) {
        stageText.textContent = 'เสร็จสิ้นการส่งคลื่นเสียงครบ 4 ระยะ (20 วินาที) — โปรดสังเกตความเคลื่อนไหวรอบรถ';
      } else {
        stageText.textContent = isDog
          ? 'พร้อมส่งคลื่นเสียงไล่สุนัข 4 ระยะ (เคาะปลุก → นกหวีดอัลตราโซนิก → โซนาร์พัลส์ → กระป๋องลมอัด)'
          : 'พร้อมส่งคลื่นเสียงอัตโนมัติ 4 ระยะ (เคาะปลุก → กวาดความถี่สูง → เสียงขู่ฟ่อ → เสียงเขย่าโลหะ)';
      }
    }
    if (timeText) {
      timeText.textContent = completed ? 'สำเร็จ 20.0 วินาที' : '20.0 วินาที';
    }
    chips.forEach((chip) => chip.setAttribute('data-current', 'false'));
  }

  bindModeTabs() {
    const tabBtns = document.querySelectorAll('.mode-tab-btn');
    const panels = document.querySelectorAll('.mode-panel');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('aria-controls');
        tabBtns.forEach((b) => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
        panels.forEach((p) => {
          if (p.id === targetId) {
            p.removeAttribute('hidden');
          } else {
            p.setAttribute('hidden', '');
          }
        });
      });
    });

    // Canvas mode toggle (Audiogram vs Waveform)
    const canvasTabBtns = document.querySelectorAll('.canvas-tab-btn');
    canvasTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.canvasMode = btn.getAttribute('data-canvas-mode') || 'audiogram';
        canvasTabBtns.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      });
    });
  }

  bindSoundProfileButtons() {
    const rows = document.querySelectorAll('[data-profile-id]');
    rows.forEach((row) => {
      const profileId = row.getAttribute('data-profile-id');
      const playBtn = row.querySelector('.btn-sound-play');
      if (!playBtn) return;

      playBtn.addEventListener('click', () => {
        if (this.engine.isPlaying && this.engine.activeProfileId === profileId && !this.engine.isSmartSweeping) {
          this.engine.stopAll();
        } else {
          this.resetSweepUI();
          this.engine.playProfile(profileId);
          const profile = SOUND_PROFILES[profileId];
          if (profile && profile.targetZone) {
            this.selectedZoneId = profile.targetZone;
            this.renderZoneInspector();
          }
        }
      });
    });
  }

  bindResearchInlinePlayButtons() {
    const btns = document.querySelectorAll('[data-inline-play]');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const profileId = btn.getAttribute('data-inline-play');
        if (this.engine.isPlaying && this.engine.activeProfileId === profileId) {
          this.engine.stopAll();
        } else {
          this.resetSweepUI();
          this.engine.playProfile(profileId);
        }
      });
    });
  }

  bindVehicleInspector() {
    // SVG schematic hotspots
    const hotspots = document.querySelectorAll('[data-zone-hotspot]');
    hotspots.forEach((spot) => {
      spot.addEventListener('click', () => {
        const zoneId = spot.getAttribute('data-zone-hotspot');
        const zoneMap = this.getActiveZoneMap();
        if (zoneId && zoneMap[zoneId]) {
          this.selectedZoneId = zoneId;
          this.renderZoneInspector();
        }
      });
      spot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const zoneId = spot.getAttribute('data-zone-hotspot');
          const zoneMap = this.getActiveZoneMap();
          if (zoneId && zoneMap[zoneId]) {
            this.selectedZoneId = zoneId;
            this.renderZoneInspector();
          }
        }
      });
    });

    // Zone checklist stubs
    const stubItems = document.querySelectorAll('[data-zone-stub]');
    stubItems.forEach((item) => {
      item.addEventListener('click', () => {
        const zoneId = item.getAttribute('data-zone-stub');
        const zoneMap = this.getActiveZoneMap();
        if (zoneId && zoneMap[zoneId]) {
          this.selectedZoneId = zoneId;
          this.renderZoneInspector();
        }
      });
    });

    // Zone action buttons in detail drawer
    const playZoneBtn = document.getElementById('btn-zone-play-recommended');
    const stampZoneBtn = document.getElementById('btn-zone-toggle-stamp');
    const resetZonesBtn = document.getElementById('btn-reset-zones');

    if (playZoneBtn) {
      playZoneBtn.addEventListener('click', () => {
        const zoneMap = this.getActiveZoneMap();
        const zone = zoneMap[this.selectedZoneId];
        if (!zone) return;
        if (this.engine.isPlaying && this.engine.activeProfileId === zone.recommendedProfile) {
          this.engine.stopAll();
        } else {
          this.resetSweepUI();
          this.engine.playProfile(zone.recommendedProfile);
        }
      });
    }

    if (stampZoneBtn) {
      stampZoneBtn.addEventListener('click', () => {
        const zId = this.selectedZoneId;
        if (this.clearedZones[zId]) {
          delete this.clearedZones[zId];
        } else {
          const now = new Date();
          this.clearedZones[zId] = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        }
        this.saveClearedZones();
        this.renderZoneInspector();
      });
    }

    if (resetZonesBtn) {
      resetZonesBtn.addEventListener('click', () => {
        this.clearedZones = {};
        this.saveClearedZones();
        this.renderZoneInspector();
      });
    }
  }

  renderZoneInspector() {
    const zoneMap = this.getActiveZoneMap();
    const zone = zoneMap[this.selectedZoneId] || zoneMap['engine-bay'];
    const isCleared = Boolean(this.clearedZones[zone.id]);

    const nameEl = document.getElementById('zone-detail-name');
    const riskEl = document.getElementById('zone-detail-risk');
    const whyEl = document.getElementById('zone-detail-why');
    const playBtnText = document.getElementById('zone-play-btn-text');
    const stampBtn = document.getElementById('btn-zone-toggle-stamp');
    const stampBtnText = document.getElementById('zone-stamp-btn-text');

    if (nameEl) nameEl.textContent = `${zone.code}: ${zone.nameTh}`;
    if (riskEl) riskEl.textContent = zone.riskPercent;
    if (whyEl) whyEl.textContent = `${zone.whyTh} — ${zone.cautionTh}`;
    if (playBtnText) {
      const isPlayingZone = this.engine.isPlaying && this.engine.activeProfileId === zone.recommendedProfile;
      playBtnText.textContent = isPlayingZone ? 'หยุดส่งเสียงโซนนี้' : zone.buttonLabelTh;
    }

    if (stampBtn && stampBtnText) {
      stampBtn.setAttribute('data-cleared', isCleared ? 'true' : 'false');
      stampBtnText.textContent = isCleared
        ? `ยืนยันปลอดภัยแล้ว (${this.clearedZones[zone.id]})`
        : 'ประทับตรา: ตรวจโซนนี้ปลอดภัยแล้ว';
    }

    // Update SVG hotspots & wave rings
    document.querySelectorAll('[data-zone-hotspot]').forEach((spot) => {
      const zId = spot.getAttribute('data-zone-hotspot');
      const selected = zId === this.selectedZoneId;
      const cleared = Boolean(this.clearedZones[zId]);
      spot.setAttribute('data-selected', selected ? 'true' : 'false');
      spot.setAttribute('data-cleared', cleared ? 'true' : 'false');

      const fillRect = spot.querySelector('.zone-shape');
      if (fillRect) {
        if (cleared) {
          fillRect.setAttribute('fill', 'rgba(41, 196, 138, 0.28)');
          fillRect.setAttribute('stroke', '#29C48A');
        } else if (selected) {
          fillRect.setAttribute('fill', 'rgba(242, 100, 48, 0.30)');
          fillRect.setAttribute('stroke', '#F26430');
        } else {
          fillRect.setAttribute('fill', 'rgba(120, 110, 96, 0.14)');
          fillRect.setAttribute('stroke', '#8C8273');
        }
        fillRect.setAttribute('stroke-width', selected ? '2.5' : '1.5');
      }
    });

    // Update checklist stubs
    let clearedCount = 0;
    document.querySelectorAll('[data-zone-stub]').forEach((item) => {
      const zId = item.getAttribute('data-zone-stub');
      const selected = zId === this.selectedZoneId;
      const timeStr = this.clearedZones[zId];
      const cleared = Boolean(timeStr);
      if (cleared) clearedCount++;

      item.setAttribute('data-selected', selected ? 'true' : 'false');
      item.setAttribute('data-cleared', cleared ? 'true' : 'false');

      const statusBadge = item.querySelector('.zone-stamp-status');
      if (statusBadge) {
        statusBadge.textContent = cleared ? `ปลอดภัย ${timeStr}` : 'รอตรวจเช็ค';
      }
    });

    const counterBadge = document.getElementById('clearance-counter-badge');
    if (counterBadge) {
      counterBadge.textContent = `ตรวจแล้ว ${clearedCount}/4 โซน`;
      counterBadge.setAttribute('data-all-clear', clearedCount === 4 ? 'true' : 'false');
    }
  }

  renderAudioStatus(status) {
    const pill = document.getElementById('top-telemetry-pill');
    const statusLabel = document.getElementById('top-status-text');
    const hzReadout = document.getElementById('metric-hz-value');
    const modReadout = document.getElementById('metric-mod-value');
    const gainReadout = document.getElementById('metric-pinnae-value');
    const startSweepBtn = document.getElementById('btn-start-smart-sweep');
    const startSweepText = document.getElementById('smart-sweep-btn-text');
    const stopBtn = document.getElementById('btn-stop-all');
    const isDog = this.species === 'dog';

    if (pill) pill.setAttribute('data-active', status.isPlaying ? 'true' : 'false');
    if (statusLabel) {
      statusLabel.textContent = status.isPlaying
        ? `กำลังส่งคลื่นเสียง: ${status.currentInstantHz.toLocaleString()} Hz`
        : 'สแตนด์บายพร้อมส่งเสียง';
    }

    if (hzReadout) {
      hzReadout.textContent = status.isPlaying
        ? `${status.currentInstantHz.toLocaleString()} Hz`
        : '0 Hz (พักสัญญาณ)';
    }
    if (modReadout) {
      modReadout.textContent = status.currentModulationLabel;
    }

    const activeProfile = status.activeProfileId ? SOUND_PROFILES[status.activeProfileId] : null;
    if (gainReadout) {
      gainReadout.textContent = activeProfile
        ? activeProfile.pinnaeGainDb
        : (isDog ? '+13 dB (พีคหูสุนัข 4–8 kHz)' : '+14 dB (ช่วงไวสุด)');
    }

    if (startSweepBtn && startSweepText) {
      startSweepBtn.setAttribute('data-sweeping', status.isSmartSweeping ? 'true' : 'false');
      if (status.isSmartSweeping) {
        startSweepText.textContent = isDog
          ? 'กำลังสแกนไล่สุนัขอัตโนมัติ 20 วินาที (แตะเพื่อหยุด)'
          : 'กำลังสแกนไล่แมวอัตโนมัติ 20 วินาที (แตะเพื่อหยุด)';
      } else {
        startSweepText.textContent = isDog
          ? 'เริ่มส่งคลื่นเสียงไล่สุนัขอัตโนมัติ 20 วินาที (4 ระยะ)'
          : 'เริ่มส่งคลื่นเสียงไล่แมวอัตโนมัติ 20 วินาที (4 ระยะ)';
      }
    }

    if (stopBtn) {
      stopBtn.disabled = !status.isPlaying;
    }

    // Update profile cards active state
    document.querySelectorAll('[data-profile-id]').forEach((row) => {
      const pId = row.getAttribute('data-profile-id');
      const isThisPlaying = status.isPlaying && status.activeProfileId === pId;
      row.setAttribute('data-playing', isThisPlaying ? 'true' : 'false');
      const btnText = row.querySelector('.btn-sound-play-label');
      if (btnText) {
        btnText.textContent = isThisPlaying ? 'หยุดเสียง' : 'ปล่อยคลื่นเสียง';
      }
    });

    // Update inline research buttons
    document.querySelectorAll('[data-inline-play]').forEach((btn) => {
      const pId = btn.getAttribute('data-inline-play');
      const isThisPlaying = status.isPlaying && status.activeProfileId === pId;
      btn.textContent = isThisPlaying ? 'หยุดตัวอย่างเสียง' : 'ฟังเสียงสังเคราะห์จริง';
    });

    // Update torch modal button if open
    const torchSoundBtnText = document.getElementById('torch-sound-btn-label');
    if (torchSoundBtnText) {
      if (status.isPlaying) {
        torchSoundBtnText.textContent = isDog ? 'หยุดคลื่นเสียงไล่สุนัข' : 'หยุดคลื่นเสียงไล่แมว';
      } else {
        torchSoundBtnText.textContent = isDog
          ? 'ปล่อยคลื่นนกหวีดสุนัข (12.0–18.5 kHz)'
          : 'ปล่อยคลื่นความถี่สูงกวาด (13.5–19.5 kHz)';
      }
    }

    this.renderZoneInspector();
  }

  // =========================================================================
  // MODE 3: ENGINE BAY ACOUSTIC MIC LISTENER
  // =========================================================================

  bindMicListener() {
    const startMicBtn = document.getElementById('btn-start-mic-listen');
    const simMicBtn = document.getElementById('btn-simulate-kitten-detect');
    const switchCoaxBtn = document.getElementById('btn-jump-to-coax');

    if (startMicBtn) {
      startMicBtn.addEventListener('click', async () => {
        if (this.isListeningMic) {
          this.stopMicListener();
          return;
        }
        await this.startRealMicListener();
      });
    }

    if (simMicBtn) {
      simMicBtn.addEventListener('click', () => {
        this.runSimulatedKittenDetection();
      });
    }

    if (switchCoaxBtn) {
      switchCoaxBtn.addEventListener('click', () => {
        const coaxTab = document.getElementById('tab-btn-coax');
        if (coaxTab) coaxTab.click();
        this.engine.playProfile(this.species === 'dog' ? 'dog-squeaky-toy' : 'kitten-contact-call');
      });
    }
  }

  async startRealMicListener() {
    const statusEl = document.getElementById('mic-status-readout');
    const btnEl = document.getElementById('btn-start-mic-listen');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser mediaDevices unavailable');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.micAudioCtx = new AudioCtx();
      this.micSource = this.micAudioCtx.createMediaStreamSource(stream);
      const bp = this.micAudioCtx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1400; // Feline vocal band 600 - 3200 Hz
      bp.Q.value = 0.9;

      this.micAnalyser = this.micAudioCtx.createAnalyser();
      this.micAnalyser.fftSize = 256;
      this.micSource.connect(bp);
      bp.connect(this.micAnalyser);

      this.micStream = stream;
      this.isListeningMic = true;
      if (btnEl) {
        btnEl.setAttribute('data-active', 'true');
        btnEl.textContent = 'หยุดฟังเสียงไมโครโฟน';
      }
      if (statusEl) {
        statusEl.textContent = 'กำลังฟังเสียงย่านความถี่ลูกแมวร้อง (600–3,200 Hz) จ่อมือถือใกล้รอยต่อฝากระโปรง...';
      }

      const buf = new Uint8Array(this.micAnalyser.frequencyBinCount);
      this.micTimer = setInterval(() => {
        if (!this.isListeningMic || !this.micAnalyser) return;
        this.micAnalyser.getByteFrequencyData(buf);
        let sum = 0;
        for (let i = 2; i < 40; i++) sum += buf[i];
        const avg = Math.min(100, Math.round((sum / 38 / 255) * 180));
        this.updateMicMeterUI(avg, avg > 48);
      }, 90);
    } catch (_) {
      // Graceful fallback if mic permission is denied or unavailable
      this.runSimulatedKittenDetection(true);
    }
  }

  stopMicListener() {
    if (this.micTimer) {
      clearInterval(this.micTimer);
      this.micTimer = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    if (this.micAudioCtx) {
      this.micAudioCtx.close().catch(() => {});
      this.micAudioCtx = null;
    }
    this.isListeningMic = false;
    this.isSimulatingMic = false;
    const btnEl = document.getElementById('btn-start-mic-listen');
    const statusEl = document.getElementById('mic-status-readout');
    if (btnEl) {
      btnEl.setAttribute('data-active', 'false');
      btnEl.textContent = 'เปิดไมโครโฟนขยายเสียงห้องเครื่อง';
    }
    if (statusEl) {
      statusEl.textContent = 'พร้อมตรวจจับเสียงร้องเหมียวหรือเสียงขูดขีดในห้องเครื่อง (ย่านกรอง 600–3,200 Hz)';
    }
    this.updateMicMeterUI(4, false);
  }

  runSimulatedKittenDetection(fromFallback = false) {
    this.stopMicListener();
    this.isSimulatingMic = true;
    const statusEl = document.getElementById('mic-status-readout');
    if (statusEl) {
      statusEl.textContent = fromFallback
        ? 'โหมดจำลองการตรวจจับ (ไมโครโฟนไม่ได้รับอนุญาต): กำลังสแกนสัญญาณเสียงลูกแมวที่ 1,180 Hz...'
        : 'กำลังจำลองสถานการณ์พบเสียงลูกแมวร้องเบาๆ ในห้องเครื่องที่ความถี่ 1,180 Hz...';
    }

    let step = 0;
    this.micTimer = setInterval(() => {
      step++;
      const simulatedLevel = step < 18 ? 15 + Math.sin(step * 0.7) * 12 + (step > 6 ? 52 : 0) : 10;
      const detected = simulatedLevel > 50;
      this.updateMicMeterUI(Math.round(simulatedLevel), detected);
      if (step >= 24) {
        clearInterval(this.micTimer);
        this.micTimer = null;
        this.isSimulatingMic = false;
      }
    }, 120);
  }

  updateMicMeterUI(levelPct, isAlert) {
    const fill = document.getElementById('mic-level-fill');
    const dbText = document.getElementById('mic-db-readout');
    const alertBox = document.getElementById('mic-alert-recommendation');

    if (fill) {
      fill.style.width = `${Math.max(4, Math.min(100, levelPct))}%`;
      fill.style.backgroundColor = isAlert ? 'var(--deter-primary)' : 'var(--safe-primary)';
    }
    if (dbText) {
      dbText.textContent = isAlert
        ? `ตรวจพบสัญญาณเสียงย่าน 1.1–1.5 kHz (${levelPct}% Peak) — สงสัยมีแมวในห้องเครื่อง!`
        : `ระดับสัญญาณห้องเครื่อง: ${levelPct}% (ปกติ)`;
    }
    if (alertBox) {
      if (isAlert) {
        alertBox.removeAttribute('hidden');
      }
    }
  }

  // =========================================================================
  // MODE 4: MANUAL BIO-FREQUENCY LAB
  // =========================================================================

  bindManualLab() {
    const freqInput = document.getElementById('lab-freq-slider');
    const freqLabel = document.getElementById('lab-freq-display');
    const waveSelect = document.getElementById('lab-waveform-select');
    const modSelect = document.getElementById('lab-modulation-select');
    const playLabBtn = document.getElementById('btn-play-manual-lab');
    const presetChips = document.querySelectorAll('[data-lab-preset-hz]');

    const syncLab = () => {
      const hz = freqInput ? Number(freqInput.value) : 16500;
      const waveform = waveSelect ? waveSelect.value : 'sine';
      const modulation = modSelect ? modSelect.value : 'sweep';
      if (freqLabel) freqLabel.textContent = `${hz.toLocaleString()} Hz`;
      this.engine.updateManualLab({ freqHz: hz, waveform, modulation });
    };

    if (freqInput) freqInput.addEventListener('input', syncLab);
    if (waveSelect) waveSelect.addEventListener('change', syncLab);
    if (modSelect) modSelect.addEventListener('change', syncLab);

    presetChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const hz = Number(chip.getAttribute('data-lab-preset-hz'));
        if (freqInput && hz) {
          freqInput.value = String(hz);
          syncLab();
          if (!this.engine.isPlaying || this.engine.activeProfileId !== 'manual-lab') {
            this.engine.playProfile('manual-lab');
          }
        }
      });
    });

    if (playLabBtn) {
      playLabBtn.addEventListener('click', () => {
        if (this.engine.isPlaying && this.engine.activeProfileId === 'manual-lab') {
          this.engine.stopAll();
          playLabBtn.textContent = 'เปิดเครื่องกำเนิดความถี่กำหนดเอง';
        } else {
          syncLab();
          this.engine.playProfile('manual-lab');
          playLabBtn.textContent = 'หยุดเครื่องกำเนิดความถี่กำหนดเอง';
        }
      });
    }
  }

  // =========================================================================
  // SCREEN INSPECTION TORCH OVERLAY
  // =========================================================================

  bindTorchDialog() {
    const openBtn = document.getElementById('btn-open-torch');
    const dialog = document.getElementById('inspection-torch-dialog');
    const closeBtn = document.getElementById('btn-close-torch');
    const strobeBtn = document.getElementById('btn-toggle-torch-strobe');
    const soundBtn = document.getElementById('btn-torch-trigger-sound');
    const lampBox = document.getElementById('torch-lamp-surface');

    if (openBtn && dialog) {
      openBtn.addEventListener('click', () => {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      });
    }

    if (closeBtn && dialog) {
      closeBtn.addEventListener('click', () => {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      });
    }

    if (strobeBtn && lampBox) {
      strobeBtn.addEventListener('click', () => {
        const current = lampBox.getAttribute('data-strobe') === 'true';
        lampBox.setAttribute('data-strobe', current ? 'false' : 'true');
        strobeBtn.textContent = current ? 'เปิดไฟกะพริบเตือน (Strobe)' : 'ใช้ไฟส่องสว่างคงที่';
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (this.engine.isPlaying) {
          this.engine.stopAll();
        } else {
          this.engine.playProfile(this.species === 'dog' ? 'dog-whistle-sweep' : 'ultrasonic-sweep');
        }
      });
    }
  }

  // =========================================================================
  // REAL-TIME CANVAS VISUALIZER (FELINE/CANINE AUDIOGRAM + LIVE FFT / OSCILLOSCOPE)
  // =========================================================================

  startCanvasLoop() {
    const canvas = document.getElementById('acoustic-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderFrame = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const targetW = Math.round(rect.width * dpr);
        const targetH = Math.round(rect.height * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
        ctx.save();
        ctx.scale(dpr, dpr);
        if (this.canvasMode === 'audiogram') {
          this.drawAudiogramAndSpectrum(ctx, rect.width, rect.height);
        } else {
          this.drawWaveformOscilloscope(ctx, rect.width, rect.height);
        }
        ctx.restore();
      }
      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  }

  /**
   * Maps frequency (40 Hz to 64,000 Hz) onto logarithmic horizontal coordinate [0..width]
   */
  freqToX(hz, width, padLeft = 38, padRight = 16) {
    const minLog = Math.log10(45);
    const maxLog = Math.log10(64000);
    const clamped = Math.max(45, Math.min(64000, hz));
    const ratio = (Math.log10(clamped) - minLog) / (maxLog - minLog);
    return padLeft + ratio * (width - padLeft - padRight);
  }

  drawAudiogramAndSpectrum(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    const padLeft = 38;
    const padRight = 16;
    const padTop = 18;
    const padBottom = 26;
    const plotH = h - padTop - padBottom;
    const isDog = this.species === 'dog';

    // 1. Highlight Smartphone Deliverable High-Sensitivity Deterrent Zone
    const bandLow = isDog ? 12000 : 13500;
    const bandHigh = isDog ? 18500 : 19500;
    const xLow = this.freqToX(bandLow, w, padLeft, padRight);
    const xHigh = this.freqToX(bandHigh, w, padLeft, padRight);
    ctx.fillStyle = 'rgba(255, 122, 69, 0.14)';
    ctx.fillRect(xLow, padTop, xHigh - xLow, plotH);

    // Subtle Grid Lines & Log Frequency Tick Labels
    ctx.strokeStyle = '#232B36';
    ctx.lineWidth = 1;
    const ticks = [
      { hz: 100, label: '100Hz' },
      { hz: 500, label: '500Hz' },
      { hz: 2000, label: '2kHz' },
      { hz: 8000, label: '8kHz' },
      { hz: 19500, label: '19.5kHz' },
      { hz: 64000, label: '64kHz' }
    ];

    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#9AA5B4';
    ctx.textAlign = 'center';

    ticks.forEach((t) => {
      const tx = this.freqToX(t.hz, w, padLeft, padRight);
      ctx.beginPath();
      ctx.moveTo(tx, padTop);
      ctx.lineTo(tx, padTop + plotH);
      ctx.stroke();

      if (tx > 26 && tx < w - 18) {
        ctx.fillText(t.label, tx, h - 8);
      }
    });

    // Top zone badge inside target band
    if (w > 420) {
      ctx.fillStyle = '#FFB088';
      ctx.font = '600 9.5px "JetBrains Mono", monospace';
      ctx.fillText(isDog ? '12.0–18.5kHz' : '13.5–19.5kHz', (xLow + xHigh) / 2, padTop + 11);
    }

    // Horizontal sensitivity guide lines
    [0.25, 0.5, 0.75].forEach((r) => {
      const gy = padTop + r * plotH;
      ctx.beginPath();
      ctx.moveTo(padLeft, gy);
      ctx.lineTo(w - padRight, gy);
      ctx.stroke();
    });

    // 2. Draw Human Auditory Sensitivity Curve (20 Hz - 20 kHz, peaks at 2-4 kHz)
    const humanPoints = [
      [50, 0.18], [150, 0.42], [500, 0.68], [1000, 0.80],
      [3000, 0.86], [8000, 0.65], [15000, 0.35], [19500, 0.08], [21000, 0.0]
    ];
    ctx.beginPath();
    ctx.strokeStyle = '#6D9DC5';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    humanPoints.forEach(([hz, sens], i) => {
      const px = this.freqToX(hz, w, padLeft, padRight);
      const py = padTop + (1 - sens) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Draw Species Auditory Sensitivity Curve (Cat: 45 Hz - 64 kHz vs Dog: 67 Hz - 45 kHz)
    const speciesPoints = isDog
      ? [
          [67, 0.12], [150, 0.44], [500, 0.76], [2000, 0.90],
          [4000, 0.97], [8000, 0.98], [16000, 0.89], [24000, 0.72],
          [35000, 0.42], [45000, 0.10]
        ]
      : [
          [45, 0.15], [120, 0.45], [500, 0.78], [2000, 0.90],
          [8000, 0.98], [16000, 0.95], [24000, 0.88], [32000, 0.76],
          [48000, 0.42], [64000, 0.10]
        ];
    ctx.beginPath();
    ctx.strokeStyle = '#FF7A45';
    ctx.lineWidth = 2.5;
    speciesPoints.forEach(([hz, sens], i) => {
      const px = this.freqToX(hz, w, padLeft, padRight);
      const py = padTop + (1 - sens) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // 4. Overlay Live Web Audio FFT Spectrum Bars when playing
    if (this.engine.isPlaying && this.engine.getFrequencyData(this.freqData)) {
      const sampleRate = this.engine.ctx ? this.engine.ctx.sampleRate : 48000;
      const binCount = this.freqData.length;
      ctx.fillStyle = 'rgba(41, 196, 138, 0.68)';

      for (let i = 1; i < binCount; i += 2) {
        const val = this.freqData[i];
        if (val < 8) continue;
        const binHz = (i * sampleRate) / (binCount * 2);
        if (binHz < 45 || binHz > 22000) continue;
        const bx = this.freqToX(binHz, w, padLeft, padRight);
        const barH = (val / 255) * plotH * 0.9;
        ctx.fillRect(bx - 1.5, padTop + plotH - barH, 3, barH);
      }

      // Draw active Instant Frequency Cursor Beacon
      if (this.engine.currentInstantHz > 0) {
        const cx = this.freqToX(this.engine.currentInstantHz, w, padLeft, padRight);
        ctx.strokeStyle = '#29C48A';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, padTop);
        ctx.lineTo(cx, padTop + plotH);
        ctx.stroke();

        ctx.fillStyle = '#29C48A';
        ctx.beginPath();
        ctx.arc(cx, padTop + 14, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawWaveformOscilloscope(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#232B36';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    if (this.engine.isPlaying && this.engine.getTimeDomainData(this.timeData)) {
      ctx.strokeStyle = '#29C48A';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      const sliceWidth = w / this.timeData.length;
      let x = 0;
      for (let i = 0; i < this.timeData.length; i++) {
        const v = this.timeData[i] / 128.0;
        const y = (v * h) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#4A5568';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cattySafeApp = new CattySafeApp();
  });
} else {
  window.cattySafeApp = new CattySafeApp();
}
