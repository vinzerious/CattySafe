/**
 * CattySafe — Main Application Controller & Interactive Canvas Telemetry
 */

import { CattyAcousticEngine, SOUND_PROFILES, SMART_SWEEP_STAGES } from './audio-engine.js';

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

const STORAGE_KEY_CLEARED = 'cattysafe_cleared_zones_v1';
const STORAGE_KEY_THEME = 'cattysafe_theme_v1';

class CattySafeApp {
  constructor() {
    this.engine = new CattyAcousticEngine();
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
    this.renderZoneInspector();
    this.renderAudioStatus(this.engine.getStatus());
    this.startCanvasLoop();

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
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
          }
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

    if (fill) fill.style.width = completed ? '100%' : '0%';
    if (stageText) {
      stageText.textContent = completed
        ? 'เสร็จสิ้นการส่งคลื่นเสียงครบ 4 ระยะ (20 วินาที) — โปรดสังเกตความเคลื่อนไหวรอบรถ'
        : 'พร้อมส่งคลื่นเสียงอัตโนมัติ 4 ระยะ (เคาะปลุก → กวาดความถี่สูง → เสียงขู่ฟ่อ → เสียงเขย่าโลหะ)';
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
        if (zoneId && VEHICLE_ZONES[zoneId]) {
          this.selectedZoneId = zoneId;
          this.renderZoneInspector();
        }
      });
      spot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const zoneId = spot.getAttribute('data-zone-hotspot');
          if (zoneId && VEHICLE_ZONES[zoneId]) {
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
        if (zoneId && VEHICLE_ZONES[zoneId]) {
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
        const zone = VEHICLE_ZONES[this.selectedZoneId];
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
    const zone = VEHICLE_ZONES[this.selectedZoneId] || VEHICLE_ZONES['engine-bay'];
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
      gainReadout.textContent = activeProfile ? activeProfile.pinnaeGainDb : '+14 dB (ช่วงไวสุด)';
    }

    if (startSweepBtn && startSweepText) {
      startSweepBtn.setAttribute('data-sweeping', status.isSmartSweeping ? 'true' : 'false');
      startSweepText.textContent = status.isSmartSweeping
        ? 'กำลังสแกนไล่แมวอัตโนมัติ 20 วินาที (แตะเพื่อหยุด)'
        : 'เริ่มส่งคลื่นเสียงไล่แมวอัตโนมัติ 20 วินาที (4 ระยะ)';
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
      torchSoundBtnText.textContent = status.isPlaying
        ? 'หยุดคลื่นเสียงไล่แมว'
        : 'ปล่อยคลื่นความถี่สูงกวาด (13.5–19.5 kHz)';
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
        this.engine.playProfile('kitten-contact-call');
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
          this.engine.playProfile('ultrasonic-sweep');
        }
      });
    }
  }

  // =========================================================================
  // REAL-TIME CANVAS VISUALIZER (FELINE AUDIOGRAM + LIVE FFT / OSCILLOSCOPE)
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

    // 1. Highlight Smartphone Deliverable High-Sensitivity Deterrent Zone (13.5 kHz - 19.5 kHz)
    const x13k = this.freqToX(13500, w, padLeft, padRight);
    const x19k = this.freqToX(19500, w, padLeft, padRight);
    ctx.fillStyle = 'rgba(255, 122, 69, 0.14)';
    ctx.fillRect(x13k, padTop, x19k - x13k, plotH);

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

    // Top zone badge inside 13.5-19.5 kHz band
    if (w > 420) {
      ctx.fillStyle = '#FFB088';
      ctx.font = '600 9.5px "JetBrains Mono", monospace';
      ctx.fillText('13.5–19.5kHz', (x13k + x19k) / 2, padTop + 11);
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

    // 3. Draw Feline Auditory Sensitivity Curve (45 Hz - 64 kHz, broad peak 500 Hz - 32 kHz)
    const catPoints = [
      [45, 0.15], [120, 0.45], [500, 0.78], [2000, 0.90],
      [8000, 0.98], [16000, 0.95], [24000, 0.88], [32000, 0.76],
      [48000, 0.42], [64000, 0.10]
    ];
    ctx.beginPath();
    ctx.strokeStyle = '#FF7A45';
    ctx.lineWidth = 2.5;
    catPoints.forEach(([hz, sens], i) => {
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
