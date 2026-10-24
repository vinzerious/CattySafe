/**
 * CattySafe Bio-Acoustic Engine (Web Audio API Procedural Synthesizer)
 *
 * Designed around two real-world constraints:
 * 1. Feline auditory sensitivity peaks between 500 Hz and 32 kHz, with 2-3x pinnae amplification
 *    between 2 kHz and 16 kHz.
 * 2. Smartphone DACs and micro-speakers roll off sharply above 18-20 kHz, meaning "25 kHz" static
 *    apps produce near-silence. CattySafe targets the 13.5 kHz - 19.5 kHz deliverable ceiling paired
 *    with broadband 3 kHz - 12 kHz sibilant transients and 70 Hz - 2.8 kHz predator/knock harmonics.
 */

export const SOUND_PROFILES = {
  // === DETER / FLUSH PROFILES (โหมดไล่ออกจากใต้รถและซุ้มล้อ) ===
  'ultrasonic-sweep': {
    id: 'ultrasonic-sweep',
    category: 'deter',
    nameTh: 'คลื่นความถี่สูงกวาดสลับ (Anti-Habituation FM Sweep)',
    nameEn: '13.5–19.5 kHz Stochastic FM Sweep',
    freqLabel: '13,500 – 19,500 Hz',
    primaryHz: 16800,
    bandMin: 13500,
    bandMax: 19500,
    pinnaeGainDb: '+14 dB',
    targetZone: 'undercarriage',
    effectiveness: 96,
    mechanismTh: 'กวาดความถี่ขึ้น-ลงแบบสุ่มในช่วงสูงสุดที่ลำโพงมือถือส่งออกได้จริง (13.5–19.5 kHz) ป้องกันสมองแมวเกิดความเคยชิน (Anti-Habituation) เสียงแหลมเสียดหูแมวแต่คนได้ยินเบา',
    usageTipTh: 'เหมาะสำหรับส่องมือถือไปทางใต้ท้องรถหรือซุ้มล้อเพื่อให้แมวรำคาญและเดินออกมาเอง'
  },
  'feline-hiss': {
    id: 'feline-hiss',
    category: 'deter',
    nameTh: 'เสียงแมวเจ้าถิ่นขู่ฟ่อและพ่นลม (Aggressive Feline Hiss)',
    nameEn: '3.5–11.5 kHz Broadband Sibilant Burst',
    freqLabel: '3,500 – 11,500 Hz',
    primaryHz: 6800,
    bandMin: 3500,
    bandMax: 11500,
    pinnaeGainDb: '+15 dB',
    targetZone: 'wheel-wells',
    effectiveness: 94,
    mechanismTh: 'จำลองคลื่นเสียงพ่นลมขู่ฟ่อ (Sibilant Noise) ที่มีหัวคลื่นกระแทกเร็ว (<15 ms) ตรงกับสัญญาณเตือนภัยตามสัญชาตญาณแมวว่ามีแมวเจ้าถิ่นดุร้ายอยู่ในพื้นที่',
    usageTipTh: 'ใช้ได้ผลดีมากกับแมวจรที่แอบซุกบนยางรถยนต์หรือซุ้มล้อหน้า'
  },
  'metallic-shaker': {
    id: 'metallic-shaker',
    category: 'deter',
    nameTh: 'เสียงเขย่ากระป๋องโลหะ/เหรียญ (Metallic Shaker Rattle)',
    nameEn: '4.0–15.0 kHz High-Crest Transient Rattle',
    freqLabel: '4,000 – 15,000 Hz',
    primaryHz: 9200,
    bandMin: 4000,
    bandMax: 15000,
    pinnaeGainDb: '+13 dB',
    targetZone: 'undercarriage',
    effectiveness: 91,
    mechanismTh: 'สร้างหัวคลื่นเสียงโลหะกระทบกันแบบคาดเดาจังหวะไม่ได้ กรวยหูแมว (Pinnae) จะขยายเสียงแหลมฉับพลันย่าน 4–15 kHz จนแมวสะดุ้งและผละออกจากใต้รถทันที',
    usageTipTh: 'เทคนิคเดียวกับ Shaker Can ของครูฝึกสัตว์ ใช้หยุดพฤติกรรมแมวที่ดื้อหรือไม่ยอมขยับ'
  },
  'canine-warning': {
    id: 'canine-warning',
    category: 'deter',
    nameTh: 'เสียงสุนัขคำรามและเห่าเตือน (Canine Growl & Bark)',
    nameEn: '140–2,600 Hz Formant Predator Transient',
    freqLabel: '140 – 2,600 Hz',
    primaryHz: 620,
    bandMin: 140,
    bandMax: 2600,
    pinnaeGainDb: '+8 dB',
    targetZone: 'rear-exhaust',
    effectiveness: 89,
    mechanismTh: 'คลื่นความถี่ต่ำจำลองเสียงคำรามในลำคอ (140–320 Hz) สลับเสียงเห่ากระแทก กระตุ้นสัญชาตญาณระวังผู้ล่าตามธรรมชาติให้แมวรีบวิ่งหนีขึ้นที่สูง',
    usageTipTh: 'ใช้เมื่อแมวหลบอยู่ใต้ท้องรถฝั่งท่อไอเสียหรือล้อหลังแล้วมีทางวิ่งหนีออกด้านข้างชัดเจน'
  },
  'dual-bio-alarm': {
    id: 'dual-bio-alarm',
    category: 'deter',
    nameTh: 'ไซเรนความถี่คู่รบกวนทิศทาง (Dual-Band Bio-Chirp)',
    nameEn: '2.8 kHz + 16.2 kHz Dissonant Intermodulation',
    freqLabel: '2,800 & 16,200 Hz',
    primaryHz: 16200,
    bandMin: 2800,
    bandMax: 17500,
    pinnaeGainDb: '+14 dB',
    targetZone: 'wheel-wells',
    effectiveness: 92,
    mechanismTh: 'ส่งคลื่น 2 ความถี่ที่ไม่ประสานกันพร้อมกัน (ย่านเสียงกลาง 2.8 kHz และย่านความถี่สูง 16.2 kHz) ทำให้ระบบระบุพิกัดเสียงของแมวสับสนและรู้สึกว่าพื้นที่ใต้รถไม่ปลอดภัย',
    usageTipTh: 'เหมาะกับลานจอดรถที่มีเสียงรบกวนรอบข้าง เพราะคลื่นคู่จะทะลุเสียงสะท้อนได้ดี'
  },
  'neko-banban-knock': {
    id: 'neko-banban-knock',
    category: 'deter',
    nameTh: 'เสียงเคาะฝากระโปรงปลุกแมว (Neko Ban Ban Knock Pulse)',
    nameEn: '75–380 Hz Resonant Hood Thump + Haptic',
    freqLabel: '75 – 380 Hz',
    primaryHz: 180,
    bandMin: 75,
    bandMax: 380,
    pinnaeGainDb: '+5 dB',
    targetZone: 'engine-bay',
    effectiveness: 86,
    mechanismTh: 'จำลองเสียงเคาะแผ่นโลหะฝากระโปรงรถความถี่ต่ำพร้อมสั่งสั่นมอเตอร์โทรศัพท์ เพื่อปลุกแมวที่หลับสนิทในห้องเครื่องให้ตื่นตัวโดยไม่ทำให้ช็อกจนมุดลึก',
    usageTipTh: 'วางมือถือแตะหรือจ่อใกล้ฝากระโปรงรถควบคู่กับการใช้มือเคาะเบาๆ 3 ครั้งก่อนเริ่มสแกน'
  },

  // === COAX / LURE PROFILES (โหมดล่อแมวขี้กลัวออกจากห้องเครื่อง) ===
  'kitten-contact-call': {
    id: 'kitten-contact-call',
    category: 'coax',
    nameTh: 'เสียงลูกแมวร้องเรียกแม่ (Kitten Contact Meow)',
    nameEn: '850–1,650 Hz Harmonic Feline Pitch Contour',
    freqLabel: '850 – 1,650 Hz',
    primaryHz: 1240,
    bandMin: 800,
    bandMax: 3200,
    pinnaeGainDb: '+11 dB',
    targetZone: 'engine-bay',
    effectiveness: 95,
    mechanismTh: 'สังเคราะห์โครงสร้างเสียงฮาร์มอนิกของลูกแมวร้องเรียก (Fundamental 900–1,500 Hz โค้งขึ้นแล้วตกลง) กระตุ้นสัญชาตญาณความอยากรู้อยากเห็นและการช่วยเหลือให้แมวมุดออกมาหาต้นเสียง',
    usageTipTh: 'ใช้เมื่อสงสัยว่ามีแมวติดอยู่ในห้องเครื่องลึกๆ ให้วางมือถือห่างจากหน้ารถ 1.5–2 เมตรเพื่อล่อให้ออกมา'
  },
  'food-can-kibble': {
    id: 'food-can-kibble',
    category: 'coax',
    nameTh: 'เสียงเปิดกระป๋องอาหารและเทอาหารเม็ด (Can Pop & Kibble)',
    nameEn: '1.8–9.5 kHz Metallic Pull-Tab & Kibble Cascade',
    freqLabel: '1,800 – 9,500 Hz',
    primaryHz: 4800,
    bandMin: 1800,
    bandMax: 9500,
    pinnaeGainDb: '+13 dB',
    targetZone: 'engine-bay',
    effectiveness: 93,
    mechanismTh: 'จำลองจังหวะงัดฝากระป๋องโลหะ (Click-Pop) ตามด้วยเสียงเม็ดอาหารกระทบชาม เปลี่ยนอารมณ์แมวที่กำลังระแวงให้เดินออกมาตามสัญญาณอาหาร (Conditioned Positive Stimulus)',
    usageTipTh: 'ได้ผลดีเยี่ยมกับแมวบ้านหรือแมวจรคุ้นคนที่ซ่อนตัวอยู่ใต้รถและไม่ยอมออกเพราะกลัวคน'
  },
  'prey-squeak': {
    id: 'prey-squeak',
    category: 'coax',
    nameTh: 'เสียงหนูร้องจี๊ดดึงดูดความสนใจ (Subtle Prey Squeak)',
    nameEn: '4.5–8.8 kHz Rodent Ultrasonic-Edge Chirp',
    freqLabel: '4,500 – 8,800 Hz',
    primaryHz: 6400,
    bandMin: 4500,
    bandMax: 8800,
    pinnaeGainDb: '+15 dB',
    targetZone: 'wheel-wells',
    effectiveness: 90,
    mechanismTh: 'คลื่นเสียงสั้นความถี่ 4.5–8.8 kHz ซึ่งตรงกับจุดที่ประสาทหูแมวไวที่สุดตามวิวัฒนาการ (8 kHz Peak) ดึงดูดให้แมวที่ตัวแข็งทื่อในมุมอับย่องออกมาสำรวจ',
    usageTipTh: 'วางมือถือไว้บนพื้นห่างจากซุ้มล้อประมาณ 1–2 เมตรเพื่อให้แมวย่องออกมาดู'
  },
  'friendly-trill': {
    id: 'friendly-trill',
    species: 'cat',
    category: 'coax',
    nameTh: 'เสียงแม่แมวทักทาย Prrp + เสียงเรียกคุ้นเคย (Friendly Trill)',
    nameEn: '420–1,400 Hz Vibrato Trill & Soft Sibilance',
    freqLabel: '420 – 1,400 Hz',
    primaryHz: 780,
    bandMin: 420,
    bandMax: 2400,
    pinnaeGainDb: '+10 dB',
    targetZone: 'engine-bay',
    effectiveness: 88,
    mechanismTh: 'เสียงสั่นเครือในลำคอ (Chirrup/Trill 28 Hz vibrato บนคลื่น 600–1,200 Hz) ที่แม่แมวใช้เรียกลูกให้เดินตาม เป็นสัญญาณความปลอดภัยสูง',
    usageTipTh: 'เหมาะสำหรับลูกแมวที่ตื่นกลัวเสียงดังหลังเคาะฝากระโปรงรถแล้วไม่กล้าวิ่งออกมา'
  },

  // === DOG DETER / WAKE PROFILES (โหมดปลุกและไล่สุนัขใต้ท้องรถ/จุดบอดล้อ) ===
  'dog-whistle-sweep': {
    id: 'dog-whistle-sweep',
    species: 'dog',
    category: 'deter',
    nameTh: 'คลื่นนกหวีดสุนัขความถี่สูงกวาด (Silent Dog Whistle Sweep)',
    nameEn: '12.0–18.5 kHz Galton Whistle FM Sweep',
    freqLabel: '12,000 – 18,500 Hz',
    primaryHz: 15400,
    bandMin: 12000,
    bandMax: 18500,
    pinnaeGainDb: '+13 dB',
    targetZone: 'undercarriage',
    effectiveness: 95,
    mechanismTh: 'จำลองคลื่นนกหวีดฝึกสุนัข (Galton Ultrasonic-Edge Whistle) กวาดสลับในย่าน 12.0–18.5 kHz ซึ่งสุนัขได้ยินชัดเจนและรู้สึกรำคาญจนต้องลุกออกจากใต้ท้องรถโดยไม่ส่งเสียงดังรบกวนเพื่อนบ้าน',
    usageTipTh: 'เหมาะสำหรับปลุกสุนัขที่นอนหลบแดดอยู่กึ่งกลางใต้ท้องรถหรือข้างล้อ'
  },
  'dog-shaker-interrupter': {
    id: 'dog-shaker-interrupter',
    species: 'dog',
    category: 'deter',
    nameTh: 'เสียงกระป๋องเขย่าเหรียญครูฝึกสุนัข (Trainer Shaker Can)',
    nameEn: '4.0–14.0 kHz High-Crest Acoustic Interrupter',
    freqLabel: '4,000 – 14,000 Hz',
    primaryHz: 7600,
    bandMin: 4000,
    bandMax: 14000,
    pinnaeGainDb: '+14 dB',
    targetZone: 'undercarriage',
    effectiveness: 96,
    mechanismTh: 'ต้นแบบจากอุปกรณ์หยุดพฤติกรรมสุนัข (Pet Convincer / Shaker Can) สร้างหัวคลื่นโลหะกระทบกันตรงจุดพีคการได้ยินของสุนัข (4–8 kHz) ทำให้สุนัขที่หลับลึกสะดุ้งตื่นและเดินออกจากใต้รถทันที',
    usageTipTh: 'ได้ผลดีที่สุดสำหรับปลุกสุนัขจรหรือสุนัขบ้านที่นอนหลับลึกใต้ท้องรถและไม่ยอมลุก'
  },
  'dog-sonar-ping': {
    id: 'dog-sonar-ping',
    species: 'dog',
    category: 'deter',
    nameTh: 'คลื่นโซนาร์พัลส์จุดพีคหูสุนัข (Canine Peak-Hearing Ping)',
    nameEn: '4.2–7.8 kHz Rapid Staccato Acoustic Ping',
    freqLabel: '4,200 – 7,800 Hz',
    primaryHz: 5800,
    bandMin: 4200,
    bandMax: 7800,
    pinnaeGainDb: '+15 dB',
    targetZone: 'rear-exhaust',
    effectiveness: 92,
    mechanismTh: 'ส่งพัลส์คลื่นความถี่ 4.2–7.8 kHz ซึ่งเป็นจุดที่โสตประสาทสุนัขไวที่สุดตามธรรมชาติ ตัดจังหวะรัวสั้นๆ เพื่อเคลียร์จุดบอดหลังล้อรถก่อนถอยหลัง',
    usageTipTh: 'ใช้ส่งสัญญาณเตือนสุนัขที่นอนขวางอยู่ด้านหลังรถ (จุดบอดกล้องมองหลัง)'
  },
  'dog-airhorn-burst': {
    id: 'dog-airhorn-burst',
    species: 'dog',
    category: 'deter',
    nameTh: 'เสียงแตรลมเตือนภัยความถี่ต่ำ-กลาง (Startle Horn Pulse)',
    nameEn: '280–1,850 Hz Dual-Chord Brass Horn Transient',
    freqLabel: '280 – 1,850 Hz',
    primaryHz: 540,
    bandMin: 280,
    bandMax: 1850,
    pinnaeGainDb: '+11 dB',
    targetZone: 'rear-exhaust',
    effectiveness: 93,
    mechanismTh: 'จำลองเสียงแตรลมฉุกเฉินแบบไล่ระดับความดัง (Soft-Start Brass Transient) เพื่อเตือนสุนัขตัวใหญ่หรือสุนัขสูงวัยที่เริ่มหูตึงในย่านความถี่สูงให้ถอยห่างจากตัวรถ',
    usageTipTh: 'เหมาะสำหรับสุนัขโตหรือสุนัขสูงวัยที่ไม่ตอบสนองต่อคลื่นความถี่สูง'
  },
  'dog-feline-warning': {
    id: 'dog-feline-warning',
    species: 'dog',
    category: 'deter',
    nameTh: 'เสียงขู่ฟ่อป้องกันสุนัขคุ้ยซุ้มล้อ (Wheel-Well Deterrent Hiss)',
    nameEn: '3.5–11.5 kHz Sharp Defensive Sibilance',
    freqLabel: '3,500 – 11,500 Hz',
    primaryHz: 6800,
    bandMin: 3500,
    bandMax: 11500,
    pinnaeGainDb: '+12 dB',
    targetZone: 'wheel-wells',
    effectiveness: 88,
    mechanismTh: 'เสียงพ่นลมขู่ฟ่อความถี่สูงทำให้สุนัขระแวงว่าจะถูกกงเล็บข่วนที่จมูก ช่วยหยุดพฤติกรรมสุนัขที่กำลังมุดคุ้ยซุ้มล้อหรือกัดสายไฟเซ็นเซอร์ใต้กันชน',
    usageTipTh: 'ใช้เมื่อสุนัขกำลังมุดดมกลิ่นหรือคุ้ยบริเวณซุ้มล้อหน้าและใต้กันชน'
  },
  'dog-chassis-thump': {
    id: 'dog-chassis-thump',
    species: 'dog',
    category: 'deter',
    nameTh: 'เสียงเคาะตัวถังปลุกสุนัขหลับลึก (Chassis Wake Thump)',
    nameEn: '65–320 Hz Sub-Resonant Thump + Vibration',
    freqLabel: '65 – 320 Hz + สั่น',
    primaryHz: 145,
    bandMin: 65,
    bandMax: 320,
    pinnaeGainDb: '+8 dB',
    targetZone: 'engine-bay',
    effectiveness: 87,
    mechanismTh: 'คลื่นกระแทกความถี่ต่ำพร้อมแรงสั่นสะเทือน ช่วยส่งสัญญาณเตือนสุนัขที่นอนพิงยางรถยนต์หรือใต้กันชนหน้าให้รู้ตัวว่ากำลังจะมีการขยับรถ',
    usageTipTh: 'ใช้เป็นจังหวะแรกก่อนปล่อยคลื่นนกหวีดสุนัขเพื่อไม่ให้สุนัขตกใจกระทันหัน'
  },

  // === DOG COAX / CALL PROFILES (โหมดเรียกสุนัขให้ออกมาจากใต้รถอย่างเป็นมิตร) ===
  'dog-squeaky-toy': {
    id: 'dog-squeaky-toy',
    species: 'dog',
    category: 'coax',
    nameTh: 'เสียงตุ๊กตาบีบปี๊บดึงดูดสุนัข (Squeaky Toy Lure)',
    nameEn: '2.2–5.4 kHz Dual-Reed Squeaker Contour',
    freqLabel: '2,200 – 5,400 Hz',
    primaryHz: 3400,
    bandMin: 2200,
    bandMax: 5400,
    pinnaeGainDb: '+14 dB',
    targetZone: 'undercarriage',
    effectiveness: 96,
    mechanismTh: 'สังเคราะห์เสียงลิ้นลมของเล่นสุนัขจังหวะบีบ-คลาย (2.2–5.4 kHz) กระตุ้นความตื่นเต้นและอยากรู้อยากเห็น ทำให้สุนัขรีบคลานออกจากใต้ท้องรถมาหาต้นเสียงทันที',
    usageTipTh: 'ได้ผลดีเยี่ยมในการล่อสุนัขบ้านหรือสุนัขขี้กลัวที่ไม่ยอมขยับออกจากใต้ท้องรถ'
  },
  'dog-recall-whistle': {
    id: 'dog-recall-whistle',
    species: 'dog',
    category: 'coax',
    nameTh: 'เสียงผิวปากเรียกสุนัขเป็นมิตร (Friendly Recall Whistle)',
    nameEn: '1.4–3.2 kHz Upward Two-Note Whistle',
    freqLabel: '1,400 – 3,200 Hz',
    primaryHz: 2350,
    bandMin: 1400,
    bandMax: 3200,
    pinnaeGainDb: '+12 dB',
    targetZone: 'rear-exhaust',
    effectiveness: 92,
    mechanismTh: 'คลื่นเสียงผิวปากตวัดขึ้น 2 พยางค์ (Upward Pitch Glissando) ซึ่งสุนัขทั่วโลกจดจำว่าเป็นสัญญาณเรียกด้วยความเป็นมิตรจากมนุษย์',
    usageTipTh: 'ยืนห่างจากตัวรถ 2 เมตรแล้วเปิดเสียงนี้เพื่อเรียกให้สุนัขเดินตามออกมาพ้นแนวล้อรถ'
  },
  'dog-bowl-kibble': {
    id: 'dog-bowl-kibble',
    species: 'dog',
    category: 'coax',
    nameTh: 'เสียงเคาะชามสแตนเลสและเทอาหารเม็ด (Bowl Clink & Kibble)',
    nameEn: '1.6–8.8 kHz Metallic Bowl Ring & Pellet Cascade',
    freqLabel: '1,600 – 8,800 Hz',
    primaryHz: 4200,
    bandMin: 1600,
    bandMax: 8800,
    pinnaeGainDb: '+13 dB',
    targetZone: 'undercarriage',
    effectiveness: 94,
    mechanismTh: 'จำลองเสียงชามข้าวสแตนเลสกระทบพื้นตามด้วยเสียงอาหารเม็ดร่วงกราว กระตุ้นการตอบสนองแบบ Pavlovian ให้สุนัขลุกออกจากใต้รถทันที',
    usageTipTh: 'เหมาะมากสำหรับสุนัขจรที่นอนหลบแดดใต้รถและดื้อไม่ยอมลุกเมื่อถูกไล่'
  },
  'dog-puppy-whine': {
    id: 'dog-puppy-whine',
    species: 'dog',
    category: 'coax',
    nameTh: 'เสียงลูกสุนัขครางเรียกแม่ (Puppy Contact Whimper)',
    nameEn: '680–2,100 Hz Harmonic Canine Contact Call',
    freqLabel: '680 – 2,100 Hz',
    primaryHz: 1180,
    bandMin: 680,
    bandMax: 2100,
    pinnaeGainDb: '+11 dB',
    targetZone: 'wheel-wells',
    effectiveness: 90,
    mechanismTh: 'เสียงร้องหงิงๆ ความถี่อ่อนโยน (680–2,100 Hz) ช่วยล่อลูกสุนัขที่หลงเข้าไปซุกในซุ้มล้อหรือใต้กันชนหน้าให้เดินออกมาหาต้นเสียงอย่างปลอดภัย',
    usageTipTh: 'ใช้เมื่อพบลูกสุนัขตัวเล็กแอบซุกในซุ้มล้อหรือใต้ท้องรถแล้วกลัวไม่กล้าออกมา'
  }
};

export const SMART_SWEEP_STAGES = [
  {
    stage: 1,
    startSec: 0,
    endSec: 4,
    profileId: 'neko-banban-knock',
    titleTh: 'ระยะที่ 1/4: เคาะเตือนปลุกแมวหลับ (Wake & Vibrate)',
    descTh: 'ส่งคลื่นทุ้มต่ำ 75–380 Hz พร้อมสั่นเตือน ให้แมวที่หลับในห้องเครื่องหรือบนยางตื่นตัวโดยไม่ช็อก'
  },
  {
    stage: 2,
    startSec: 4,
    endSec: 10,
    profileId: 'ultrasonic-sweep',
    titleTh: 'ระยะที่ 2/4: กวาดคลื่นความถี่สูง 13.5–19.5 kHz (High-Freq Sweep)',
    descTh: 'กวาดความถี่สูงสุดที่ลำโพงมือถือปล่อยได้จริง รบกวนโสตประสาทแมวแบบไม่ให้ชินเสียง'
  },
  {
    stage: 3,
    startSec: 10,
    endSec: 15,
    profileId: 'feline-hiss',
    titleTh: 'ระยะที่ 3/4: เสียงแมวเจ้าถิ่นขู่ฟ่อ (Territorial Hiss Burst)',
    descTh: 'ส่งคลื่น Sibilant 3.5–11.5 kHz กระตุ้นสัญชาตญาณให้แมวผละออกจากใต้ท้องรถ'
  },
  {
    stage: 4,
    startSec: 15,
    endSec: 20,
    profileId: 'metallic-shaker',
    titleTh: 'ระยะที่ 4/4: เสียงโลหะกระทบฉับพลัน (Final Perimeter Flush)',
    descTh: 'สร้างหัวคลื่นแหลมคม 4–15 kHz สลับจังหวะสุ่ม เพื่อเคลียร์ซุ้มล้อและใต้ท้องรถขั้นสุดท้าย'
  }
];

export const DOG_SMART_SWEEP_STAGES = [
  {
    stage: 1,
    startSec: 0,
    endSec: 4,
    profileId: 'dog-chassis-thump',
    titleTh: 'ระยะที่ 1/4: เคาะตัวถังปลุกสุนัขหลับลึก (Chassis Wake Thump)',
    descTh: 'ส่งคลื่นทุ้มต่ำ 65–320 Hz พร้อมสั่นเตือน ให้สุนัขที่นอนพิงล้อหรือใต้ท้องรถรู้สึกตัวก่อน'
  },
  {
    stage: 2,
    startSec: 4,
    endSec: 10,
    profileId: 'dog-whistle-sweep',
    titleTh: 'ระยะที่ 2/4: คลื่นนกหวีดสุนัข 12.0–18.5 kHz (Dog Whistle Sweep)',
    descTh: 'กวาดคลื่นความถี่นกหวีดฝึกสุนัข กระตุ้นให้สุนัขตื่นตัวและลุกออกจากเงาใต้ท้องรถ'
  },
  {
    stage: 3,
    startSec: 10,
    endSec: 15,
    profileId: 'dog-shaker-interrupter',
    titleTh: 'ระยะที่ 3/4: เสียงกระป๋องเขย่าเหรียญครูฝึก (Trainer Shaker Can)',
    descTh: 'สร้างหัวคลื่นโลหะ 4–14 kHz ตรงจุดพีคหูสุนัขเพื่อตัดพฤติกรรมการนอนขวางทางรถ'
  },
  {
    stage: 4,
    startSec: 15,
    endSec: 20,
    profileId: 'dog-sonar-ping',
    titleTh: 'ระยะที่ 4/4: คลื่นโซนาร์พัลส์เคลียร์ท้ายรถ (Canine Peak Ping)',
    descTh: 'ส่งพัลส์ความถี่ 4.2–7.8 kHz เคลียร์จุดบอดหลังล้อรถและใต้กันชนท้ายขั้นสุดท้าย'
  }
];

export class CattyAcousticEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.isPlaying = false;
    this.activeProfileId = null;
    this.volume = 0.85;
    this.loopTimer = null;
    this.activeNodes = [];
    this.currentInstantHz = 0;
    this.currentModulationLabel = 'พร้อมทำงาน (Standby)';

    // Smart Sweep state
    this.isSmartSweeping = false;
    this.sweepStartTime = 0;
    this.sweepDurationSec = 20;
    this.sweepInterval = null;
    this.onSweepProgress = null;
    this.onStateChange = null;

    // Manual Lab state
    this.manualConfig = {
      freqHz: 16500,
      waveform: 'sine',
      modulation: 'sweep', // 'static' | 'sweep' | 'strobe' | 'random'
    };

    // Mic listener state
    this.micStream = null;
    this.micAnalyser = null;
    this.micSimulated = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx({ latencyHint: 'interactive' });
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 1024;
      this.analyser.smoothingTimeConstant = 0.78;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.02);
    }
  }

  stopAll() {
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.sweepInterval) {
      clearInterval(this.sweepInterval);
      this.sweepInterval = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (_) {
        // Ignore already stopped nodes
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.isSmartSweeping = false;
    this.activeProfileId = null;
    this.currentInstantHz = 0;
    this.currentModulationLabel = 'พร้อมทำงาน (Standby)';
    if (navigator.vibrate) {
      try { navigator.vibrate(0); } catch (_) {}
    }
    if (this.onStateChange) {
      this.onStateChange(this.getStatus());
    }
  }

  getStatus() {
    return {
      isPlaying: this.isPlaying,
      isSmartSweeping: this.isSmartSweeping,
      activeProfileId: this.activeProfileId,
      currentInstantHz: Math.round(this.currentInstantHz),
      currentModulationLabel: this.currentModulationLabel,
      volume: this.volume
    };
  }

  playProfile(profileId) {
    this.initContext();
    const wasSmartSweeping = this.isSmartSweeping;
    if (!wasSmartSweeping) {
      this.stopAll();
    } else {
      // Clear only audio nodes when transitioning inside Smart Sweep
      if (this.loopTimer) {
        clearTimeout(this.loopTimer);
        clearInterval(this.loopTimer);
        this.loopTimer = null;
      }
      this.activeNodes.forEach((n) => {
        try { if (n.stop) n.stop(); if (n.disconnect) n.disconnect(); } catch (_) {}
      });
      this.activeNodes = [];
    }

    this.isPlaying = true;
    this.activeProfileId = profileId;

    switch (profileId) {
      case 'ultrasonic-sweep':
        this._runUltrasonicSweep();
        break;
      case 'feline-hiss':
        this._runFelineHiss();
        break;
      case 'metallic-shaker':
        this._runMetallicShaker();
        break;
      case 'canine-warning':
        this._runCanineWarning();
        break;
      case 'dual-bio-alarm':
        this._runDualBioAlarm();
        break;
      case 'neko-banban-knock':
        this._runNekoBanBanKnock();
        break;
      case 'kitten-contact-call':
        this._runKittenContactCall();
        break;
      case 'food-can-kibble':
        this._runFoodCanKibble();
        break;
      case 'prey-squeak':
        this._runPreySqueak();
        break;
      case 'friendly-trill':
        this._runFriendlyTrill();
        break;
      case 'dog-whistle-sweep':
        this._runDogWhistleSweep();
        break;
      case 'dog-shaker-interrupter':
        this._runMetallicShaker('dog-shaker-interrupter', 'Trainer Shaker Can 4–14 kHz');
        break;
      case 'dog-sonar-ping':
        this._runDogSonarPing();
        break;
      case 'dog-airhorn-burst':
        this._runDogAirhornBurst();
        break;
      case 'dog-feline-warning':
        this._runFelineHiss('dog-feline-warning', 'Defensive Hiss 3.5–11.5 kHz');
        break;
      case 'dog-chassis-thump':
        this._runNekoBanBanKnock('dog-chassis-thump', 'Chassis Thump 65–320 Hz + Haptic');
        break;
      case 'dog-squeaky-toy':
        this._runDogSqueakyToy();
        break;
      case 'dog-recall-whistle':
        this._runDogRecallWhistle();
        break;
      case 'dog-bowl-kibble':
        this._runFoodCanKibble('dog-bowl-kibble', 'Stainless Bowl Ring + Kibble');
        break;
      case 'dog-puppy-whine':
        this._runDogPuppyWhine();
        break;
      case 'manual-lab':
        this._runManualLab();
        break;
      default:
        this._runUltrasonicSweep();
    }

    if (this.onStateChange) {
      this.onStateChange(this.getStatus());
    }
  }

  startSmartSweep(onProgress, onComplete, species = 'cat') {
    this.initContext();
    this.stopAll();
    this.isSmartSweeping = true;
    this.isPlaying = true;
    this.sweepStartTime = performance.now();
    const stages = species === 'dog' ? DOG_SMART_SWEEP_STAGES : SMART_SWEEP_STAGES;
    let currentStageIdx = -1;

    const tick = () => {
      if (!this.isSmartSweeping) return;
      const elapsedSec = (performance.now() - this.sweepStartTime) / 1000;
      if (elapsedSec >= this.sweepDurationSec) {
        this.stopAll();
        if (onComplete) onComplete();
        return;
      }

      const stageIdx = stages.findIndex(
        (s) => elapsedSec >= s.startSec && elapsedSec < s.endSec
      );
      if (stageIdx !== -1 && stageIdx !== currentStageIdx) {
        currentStageIdx = stageIdx;
        const stageObj = stages[stageIdx];
        this.playProfile(stageObj.profileId);
        this.isSmartSweeping = true;
      }

      if (onProgress) {
        onProgress({
          elapsedSec,
          totalSec: this.sweepDurationSec,
          percent: Math.min(100, (elapsedSec / this.sweepDurationSec) * 100),
          stage: stages[currentStageIdx] || stages[0],
          instantHz: Math.round(this.currentInstantHz)
        });
      }
    };

    tick();
    this.sweepInterval = setInterval(tick, 80);
    if (this.onStateChange) {
      this.onStateChange(this.getStatus());
    }
  }

  // =========================================================================
  // PROCEDURAL SYNTHESIS ROUTINES
  // =========================================================================

  _createNoiseBuffer(durationSec = 1.5) {
    const sampleRate = this.ctx.sampleRate;
    const length = Math.floor(sampleRate * durationSec);
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  _runUltrasonicSweep() {
    this.currentModulationLabel = 'FM Sweep 13.5–19.5 kHz + Strobe';
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.value = 14800;
    osc2.frequency.value = 17200;

    gain1.gain.value = 0.55;
    gain2.gain.value = 0.25;

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);

    osc1.start();
    osc2.start();
    this.activeNodes.push(osc1, osc2, gain1, gain2);

    const modulate = () => {
      if (!this.isPlaying || this.activeProfileId !== 'ultrasonic-sweep') return;
      const now = this.ctx.currentTime;
      const target1 = 13500 + Math.random() * 6000; // 13.5 - 19.5 kHz
      const target2 = 11500 + Math.random() * 5500;
      const dur = 0.14 + Math.random() * 0.22;

      osc1.frequency.exponentialRampToValueAtTime(target1, now + dur);
      osc2.frequency.exponentialRampToValueAtTime(target2, now + dur);

      // Pulse envelope to prevent auditory adaptation
      const pulseGain = Math.random() > 0.2 ? 0.65 : 0.12;
      gain1.gain.setTargetAtTime(pulseGain, now, 0.03);

      this.currentInstantHz = target1;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      this.loopTimer = setTimeout(modulate, dur * 1000);
    };
    modulate();
  }

  _runFelineHiss(targetProfileId = 'feline-hiss', label = 'Sibilant Hiss 3.5–11.5 kHz Burst') {
    this.currentModulationLabel = label;
    const noiseBuffer = this._createNoiseBuffer(2.0);

    const triggerHissBurst = () => {
      if (!this.isPlaying || this.activeProfileId !== targetProfileId) return;
      const now = this.ctx.currentTime;

      const source = this.ctx.createBufferSource();
      source.buffer = noiseBuffer;

      // Dual bandpass filters for aggressive feline vocal tract resonance
      const bp1 = this.ctx.createBiquadFilter();
      bp1.type = 'bandpass';
      const centerHz = 5200 + Math.random() * 3800;
      bp1.frequency.setValueAtTime(centerHz, now);
      bp1.frequency.exponentialRampToValueAtTime(centerHz * 0.72, now + 0.65);
      bp1.Q.value = 1.8;

      const hp = this.ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 3200;

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0.001, now);
      // Sharp spit attack (<12 ms) followed by sustained hiss
      env.gain.linearRampToValueAtTime(0.95, now + 0.012);
      env.gain.exponentialRampToValueAtTime(0.55, now + 0.18);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.72);

      source.connect(hp);
      hp.connect(bp1);
      bp1.connect(env);
      env.connect(this.masterGain);

      source.start(now);
      source.stop(now + 0.75);
      this.activeNodes.push(source, bp1, hp, env);

      this.currentInstantHz = centerHz;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      const nextDelay = 820 + Math.random() * 350;
      this.loopTimer = setTimeout(triggerHissBurst, nextDelay);
    };
    triggerHissBurst();
  }

  _runMetallicShaker(targetProfileId = 'metallic-shaker', label = 'Stochastic Metallic Transients 4–15 kHz') {
    this.currentModulationLabel = label;
    const noiseBuffer = this._createNoiseBuffer(0.3);

    const triggerHit = () => {
      if (!this.isPlaying || this.activeProfileId !== targetProfileId) return;
      const now = this.ctx.currentTime;

      // Metallic inharmonic ring oscillators + noise burst
      const baseFreqs = [4200, 6850, 9400, 12600, 14800];
      const chosenHz = baseFreqs[Math.floor(Math.random() * baseFreqs.length)] + (Math.random() * 700 - 350);

      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'square' : 'sawtooth';
        const ratio = [1, 1.414, 2.13][i];
        osc.frequency.setValueAtTime(Math.min(18500, chosenHz * ratio), now);

        env.gain.setValueAtTime(0.001, now);
        env.gain.linearRampToValueAtTime(0.32 / (i + 1), now + 0.004);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.065 + i * 0.02);

        osc.connect(env);
        env.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.12);
        this.activeNodes.push(osc, env);
      }

      // Metallic impact click
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const hp = this.ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 5500;
      const nEnv = this.ctx.createGain();
      nEnv.gain.setValueAtTime(0.6, now);
      nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      noise.connect(hp);
      hp.connect(nEnv);
      nEnv.connect(this.masterGain);
      noise.start(now);
      noise.stop(now + 0.05);
      this.activeNodes.push(noise, hp, nEnv);

      this.currentInstantHz = chosenHz;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      const nextMs = 110 + Math.random() * 240;
      this.loopTimer = setTimeout(triggerHit, nextMs);
    };
    triggerHit();
  }

  _runCanineWarning() {
    this.currentModulationLabel = 'Canine Formant Growl + Bark 140–2,600 Hz';

    const triggerSequence = () => {
      if (!this.isPlaying || this.activeProfileId !== 'canine-warning') return;
      const now = this.ctx.currentTime;

      // Low guttural growl (FM modulated sawtooth through formant filter)
      const growlOsc = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const formant = this.ctx.createBiquadFilter();
      const growlEnv = this.ctx.createGain();

      growlOsc.type = 'sawtooth';
      growlOsc.frequency.setValueAtTime(145, now);
      growlOsc.frequency.linearRampToValueAtTime(175, now + 0.45);

      lfo.type = 'sine';
      lfo.frequency.value = 24; // Growl rattle rate
      lfoGain.gain.value = 35;

      formant.type = 'bandpass';
      formant.frequency.setValueAtTime(480, now);
      formant.Q.value = 2.2;

      growlEnv.gain.setValueAtTime(0.01, now);
      growlEnv.gain.linearRampToValueAtTime(0.65, now + 0.08);
      growlEnv.gain.exponentialRampToValueAtTime(0.01, now + 0.48);

      lfo.connect(lfoGain);
      lfoGain.connect(growlOsc.frequency);
      growlOsc.connect(formant);
      formant.connect(growlEnv);
      growlEnv.connect(this.masterGain);

      growlOsc.start(now);
      lfo.start(now);
      growlOsc.stop(now + 0.5);
      lfo.stop(now + 0.5);

      // Sharp warning bark transient at +0.52s
      const barkOsc = this.ctx.createOscillator();
      const barkFilter = this.ctx.createBiquadFilter();
      const barkEnv = this.ctx.createGain();

      barkOsc.type = 'sawtooth';
      barkOsc.frequency.setValueAtTime(420, now + 0.52);
      barkOsc.frequency.exponentialRampToValueAtTime(980, now + 0.57);
      barkOsc.frequency.exponentialRampToValueAtTime(290, now + 0.76);

      barkFilter.type = 'bandpass';
      barkFilter.frequency.setValueAtTime(1150, now + 0.52);
      barkFilter.Q.value = 1.4;

      barkEnv.gain.setValueAtTime(0.001, now + 0.52);
      barkEnv.gain.linearRampToValueAtTime(0.95, now + 0.54);
      barkEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.78);

      barkOsc.connect(barkFilter);
      barkFilter.connect(barkEnv);
      barkEnv.connect(this.masterGain);

      barkOsc.start(now + 0.52);
      barkOsc.stop(now + 0.8);

      this.activeNodes.push(growlOsc, lfo, lfoGain, formant, growlEnv, barkOsc, barkFilter, barkEnv);
      this.currentInstantHz = 980;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      this.loopTimer = setTimeout(triggerSequence, 1050);
    };
    triggerSequence();
  }

  _runDualBioAlarm() {
    this.currentModulationLabel = 'Dissonant Dual-Band 2.8 kHz + 16.2 kHz';
    const oscLow = this.ctx.createOscillator();
    const oscHigh = this.ctx.createOscillator();
    const gainLow = this.ctx.createGain();
    const gainHigh = this.ctx.createGain();

    oscLow.type = 'sawtooth';
    oscHigh.type = 'sine';
    oscLow.frequency.value = 2800;
    oscHigh.frequency.value = 16200;

    gainLow.gain.value = 0.28;
    gainHigh.gain.value = 0.55;

    oscLow.connect(gainLow);
    oscHigh.connect(gainHigh);
    gainLow.connect(this.masterGain);
    gainHigh.connect(this.masterGain);

    oscLow.start();
    oscHigh.start();
    this.activeNodes.push(oscLow, oscHigh, gainLow, gainHigh);

    let toggle = false;
    const step = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dual-bio-alarm') return;
      const now = this.ctx.currentTime;
      toggle = !toggle;
      const lowHz = toggle ? 2850 : 3420;
      const highHz = toggle ? 16200 : 14600;
      oscLow.frequency.setTargetAtTime(lowHz, now, 0.02);
      oscHigh.frequency.setTargetAtTime(highHz, now, 0.02);
      this.currentInstantHz = highHz;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(step, 180);
    };
    step();
  }

  _runNekoBanBanKnock(targetProfileId = 'neko-banban-knock', label = 'Neko Ban Ban Hood Knock 75–380 Hz + Haptic') {
    this.currentModulationLabel = label;

    const triggerKnockPair = () => {
      if (!this.isPlaying || this.activeProfileId !== targetProfileId) return;
      const now = this.ctx.currentTime;

      // Double knock ("Ban-Ban!")
      [0, 0.22].forEach((offset) => {
        const osc = this.ctx.createOscillator();
        const sub = this.ctx.createOscillator();
        const env = this.ctx.createGain();

        osc.type = 'triangle';
        sub.type = 'sine';

        osc.frequency.setValueAtTime(340, now + offset);
        osc.frequency.exponentialRampToValueAtTime(95, now + offset + 0.14);

        sub.frequency.setValueAtTime(150, now + offset);
        sub.frequency.exponentialRampToValueAtTime(65, now + offset + 0.16);

        env.gain.setValueAtTime(0.001, now + offset);
        env.gain.linearRampToValueAtTime(0.95, now + offset + 0.008);
        env.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.17);

        osc.connect(env);
        sub.connect(env);
        env.connect(this.masterGain);

        osc.start(now + offset);
        sub.start(now + offset);
        osc.stop(now + offset + 0.18);
        sub.stop(now + offset + 0.18);
        this.activeNodes.push(osc, sub, env);
      });

      if (navigator.vibrate) {
        try { navigator.vibrate([90, 120, 90]); } catch (_) {}
      }

      this.currentInstantHz = 220;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      this.loopTimer = setTimeout(triggerKnockPair, 950);
    };
    triggerKnockPair();
  }

  // =========================================================================
  // COAX / LURE SYNTHESIS ROUTINES
  // =========================================================================

  _runKittenContactCall() {
    this.currentModulationLabel = 'Kitten Contact Meow 850–1,650 Hz';

    const triggerMeow = () => {
      if (!this.isPlaying || this.activeProfileId !== 'kitten-contact-call') return;
      const now = this.ctx.currentTime;

      const fund = this.ctx.createOscillator();
      const harm2 = this.ctx.createOscillator();
      const formant = this.ctx.createBiquadFilter();
      const env = this.ctx.createGain();

      fund.type = 'sawtooth';
      harm2.type = 'triangle';

      const basePitch = 920 + Math.random() * 180;
      // Characteristic kitten pitch contour: rise swiftly to peak, gentle fall
      fund.frequency.setValueAtTime(basePitch, now);
      fund.frequency.exponentialRampToValueAtTime(basePitch * 1.55, now + 0.14);
      fund.frequency.exponentialRampToValueAtTime(basePitch * 1.18, now + 0.45);
      fund.frequency.exponentialRampToValueAtTime(basePitch * 0.88, now + 0.68);

      harm2.frequency.setValueAtTime(basePitch * 2, now);
      harm2.frequency.exponentialRampToValueAtTime(basePitch * 3.1, now + 0.14);
      harm2.frequency.exponentialRampToValueAtTime(basePitch * 1.76, now + 0.68);

      // Mouth opening vowel formant ("Mee-ow")
      formant.type = 'bandpass';
      formant.frequency.setValueAtTime(1400, now);
      formant.frequency.exponentialRampToValueAtTime(2400, now + 0.2);
      formant.frequency.exponentialRampToValueAtTime(1100, now + 0.65);
      formant.Q.value = 2.4;

      env.gain.setValueAtTime(0.001, now);
      env.gain.linearRampToValueAtTime(0.65, now + 0.06);
      env.gain.setValueAtTime(0.6, now + 0.42);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      fund.connect(formant);
      harm2.connect(formant);
      formant.connect(env);
      env.connect(this.masterGain);

      fund.start(now);
      harm2.start(now);
      fund.stop(now + 0.72);
      harm2.stop(now + 0.72);
      this.activeNodes.push(fund, harm2, formant, env);

      this.currentInstantHz = Math.round(basePitch * 1.35);
      if (this.onStateChange) this.onStateChange(this.getStatus());

      this.loopTimer = setTimeout(triggerMeow, 1350);
    };
    triggerMeow();
  }

  _runFoodCanKibble(targetProfileId = 'food-can-kibble', label = 'Can Pull-Tab Pop + Kibble Cascade') {
    this.currentModulationLabel = label;

    const triggerCanAndKibble = () => {
      if (!this.isPlaying || this.activeProfileId !== targetProfileId) return;
      const now = this.ctx.currentTime;

      // 1. Metallic pull-tab click + lid pop
      [0, 0.16].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(idx === 0 ? 2400 : 3800, now + offset);
        osc.frequency.exponentialRampToValueAtTime(idx === 0 ? 1200 : 6200, now + offset + 0.045);

        env.gain.setValueAtTime(0.001, now + offset);
        env.gain.linearRampToValueAtTime(0.75, now + offset + 0.005);
        env.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);

        osc.connect(env);
        env.connect(this.masterGain);
        osc.start(now + offset);
        osc.stop(now + offset + 0.07);
        this.activeNodes.push(osc, env);
      });

      // 2. Dry kibble pellets hitting ceramic bowl (0.35s - 1.1s)
      for (let k = 0; k < 9; k++) {
        const dropOffset = 0.35 + k * 0.075 + Math.random() * 0.03;
        const pOsc = this.ctx.createOscillator();
        const pEnv = this.ctx.createGain();
        pOsc.type = 'sine';
        const pelletHz = 3200 + Math.random() * 5400;
        pOsc.frequency.setValueAtTime(pelletHz, now + dropOffset);
        pOsc.frequency.exponentialRampToValueAtTime(pelletHz * 0.65, now + dropOffset + 0.028);

        pEnv.gain.setValueAtTime(0.001, now + dropOffset);
        pEnv.gain.linearRampToValueAtTime(0.45, now + dropOffset + 0.003);
        pEnv.gain.exponentialRampToValueAtTime(0.001, now + dropOffset + 0.032);

        pOsc.connect(pEnv);
        pEnv.connect(this.masterGain);
        pOsc.start(now + dropOffset);
        pOsc.stop(now + dropOffset + 0.04);
        this.activeNodes.push(pOsc, pEnv);
      }

      this.currentInstantHz = 4800;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      this.loopTimer = setTimeout(triggerCanAndKibble, 1450);
    };
    triggerCanAndKibble();
  }

  _runPreySqueak() {
    this.currentModulationLabel = 'Rodent Squeak 4.5–8.8 kHz Chirp';

    const triggerSqueak = () => {
      if (!this.isPlaying || this.activeProfileId !== 'prey-squeak') return;
      const now = this.ctx.currentTime;

      const chirpCount = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < chirpCount; i++) {
        const offset = i * 0.14;
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();

        osc.type = 'sine';
        const startHz = 5200 + Math.random() * 1400;
        const peakHz = startHz + 2200;
        osc.frequency.setValueAtTime(startHz, now + offset);
        osc.frequency.exponentialRampToValueAtTime(peakHz, now + offset + 0.045);
        osc.frequency.exponentialRampToValueAtTime(startHz * 0.9, now + offset + 0.09);

        env.gain.setValueAtTime(0.001, now + offset);
        env.gain.linearRampToValueAtTime(0.55, now + offset + 0.015);
        env.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.095);

        osc.connect(env);
        env.connect(this.masterGain);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
        this.activeNodes.push(osc, env);
        this.currentInstantHz = Math.round(peakHz);
      }

      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(triggerSqueak, 900 + Math.random() * 450);
    };
    triggerSqueak();
  }

  _runFriendlyTrill() {
    this.currentModulationLabel = 'Maternal Feline Trill 420–1,400 Hz';

    const triggerTrill = () => {
      if (!this.isPlaying || this.activeProfileId !== 'friendly-trill') return;
      const now = this.ctx.currentTime;

      const carrier = this.ctx.createOscillator();
      const vibrato = this.ctx.createOscillator();
      const vibGain = this.ctx.createGain();
      const env = this.ctx.createGain();

      carrier.type = 'triangle';
      carrier.frequency.setValueAtTime(520, now);
      carrier.frequency.exponentialRampToValueAtTime(1180, now + 0.38);
      carrier.frequency.exponentialRampToValueAtTime(920, now + 0.52);

      // Purr-trill 28 Hz modulation
      vibrato.type = 'sine';
      vibrato.frequency.value = 28;
      vibGain.gain.value = 85;

      env.gain.setValueAtTime(0.001, now);
      env.gain.linearRampToValueAtTime(0.65, now + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      vibrato.connect(vibGain);
      vibGain.connect(carrier.frequency);
      carrier.connect(env);
      env.connect(this.masterGain);

      carrier.start(now);
      vibrato.start(now);
      carrier.stop(now + 0.58);
      vibrato.stop(now + 0.58);
      this.activeNodes.push(carrier, vibrato, vibGain, env);

      this.currentInstantHz = 960;
      if (this.onStateChange) this.onStateChange(this.getStatus());

      this.loopTimer = setTimeout(triggerTrill, 1200);
    };
    triggerTrill();
  }

  // =========================================================================
  // DOG MODE SYNTHESIS ROUTINES
  // =========================================================================

  _runDogWhistleSweep() {
    this.currentModulationLabel = 'Galton Dog Whistle 12.0–18.5 kHz';
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 14200;
    env.gain.value = 0.65;

    osc.connect(env);
    env.connect(this.masterGain);
    osc.start();
    this.activeNodes.push(osc, env);

    const stepWhistle = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dog-whistle-sweep') return;
      const now = this.ctx.currentTime;
      const nextHz = 12000 + Math.random() * 6500; // 12.0 - 18.5 kHz
      const dur = 0.18 + Math.random() * 0.25;
      osc.frequency.exponentialRampToValueAtTime(nextHz, now + dur);
      env.gain.setTargetAtTime(Math.random() > 0.18 ? 0.72 : 0.12, now, 0.025);

      this.currentInstantHz = nextHz;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(stepWhistle, dur * 1000);
    };
    stepWhistle();
  }

  _runDogSonarPing() {
    this.currentModulationLabel = 'Canine Peak Ping 4.2–7.8 kHz';

    const triggerPing = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dog-sonar-ping') return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'triangle';
      const targetHz = 4400 + Math.random() * 3200;
      osc.frequency.setValueAtTime(targetHz, now);
      osc.frequency.exponentialRampToValueAtTime(targetHz * 1.18, now + 0.09);

      env.gain.setValueAtTime(0.001, now);
      env.gain.linearRampToValueAtTime(0.8, now + 0.008);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(env);
      env.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
      this.activeNodes.push(osc, env);

      this.currentInstantHz = targetHz;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(triggerPing, 240);
    };
    triggerPing();
  }

  _runDogAirhornBurst() {
    this.currentModulationLabel = 'Brass Air-Horn 280–1,850 Hz';

    const triggerHorn = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dog-airhorn-burst') return;
      const now = this.ctx.currentTime;

      const freqs = [310, 392, 620];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);

        env.gain.setValueAtTime(0.001, now);
        env.gain.linearRampToValueAtTime(0.28 / (idx + 1), now + 0.03);
        env.gain.setValueAtTime(0.26 / (idx + 1), now + 0.36);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

        osc.connect(env);
        env.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.5);
        this.activeNodes.push(osc, env);
      });

      this.currentInstantHz = 540;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(triggerHorn, 920);
    };
    triggerHorn();
  }

  _runDogSqueakyToy() {
    this.currentModulationLabel = 'Squeaky Toy Double-Reed 2.2–5.4 kHz';

    const triggerSqueak = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dog-squeaky-toy') return;
      const now = this.ctx.currentTime;

      // Press + release double squeak
      [
        { offset: 0, startHz: 2600, endHz: 4800, dur: 0.16 },
        { offset: 0.2, startHz: 4400, endHz: 2300, dur: 0.22 }
      ].forEach((s) => {
        const osc = this.ctx.createOscillator();
        const env = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(s.startHz, now + s.offset);
        osc.frequency.exponentialRampToValueAtTime(s.endHz, now + s.offset + s.dur);

        env.gain.setValueAtTime(0.001, now + s.offset);
        env.gain.linearRampToValueAtTime(0.7, now + s.offset + 0.02);
        env.gain.exponentialRampToValueAtTime(0.001, now + s.offset + s.dur + 0.02);

        osc.connect(env);
        env.connect(this.masterGain);
        osc.start(now + s.offset);
        osc.stop(now + s.offset + s.dur + 0.03);
        this.activeNodes.push(osc, env);
      });

      this.currentInstantHz = 3600;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(triggerSqueak, 950);
    };
    triggerSqueak();
  }

  _runDogRecallWhistle() {
    this.currentModulationLabel = 'Upward Recall Whistle 1.4–3.2 kHz';

    const triggerWhistle = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dog-recall-whistle') return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';

      // Two-note upward recall contour ("Whee-whooit!")
      osc.frequency.setValueAtTime(1480, now);
      osc.frequency.exponentialRampToValueAtTime(1920, now + 0.16);
      osc.frequency.setValueAtTime(1650, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(3100, now + 0.52);

      env.gain.setValueAtTime(0.001, now);
      env.gain.linearRampToValueAtTime(0.65, now + 0.03);
      env.gain.setValueAtTime(0.05, now + 0.18);
      env.gain.linearRampToValueAtTime(0.75, now + 0.25);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.56);

      osc.connect(env);
      env.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.58);
      this.activeNodes.push(osc, env);

      this.currentInstantHz = 2850;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(triggerWhistle, 1250);
    };
    triggerWhistle();
  }

  _runDogPuppyWhine() {
    this.currentModulationLabel = 'Puppy Contact Whimper 680–2,100 Hz';

    const triggerWhine = () => {
      if (!this.isPlaying || this.activeProfileId !== 'dog-puppy-whine') return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';

      const startHz = 1650 + Math.random() * 250;
      osc.frequency.setValueAtTime(startHz, now);
      osc.frequency.exponentialRampToValueAtTime(1980, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.42);

      env.gain.setValueAtTime(0.001, now);
      env.gain.linearRampToValueAtTime(0.6, now + 0.03);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(env);
      env.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.46);
      this.activeNodes.push(osc, env);

      this.currentInstantHz = 1280;
      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(triggerWhine, 980);
    };
    triggerWhine();
  }

  // =========================================================================
  // MANUAL BIO-FREQUENCY LAB
  // =========================================================================

  updateManualLab(config) {
    this.manualConfig = { ...this.manualConfig, ...config };
    if (this.isPlaying && this.activeProfileId === 'manual-lab') {
      this.playProfile('manual-lab');
    }
  }

  _runManualLab() {
    const { freqHz, waveform, modulation } = this.manualConfig;
    this.currentModulationLabel = `Lab: ${waveform.toUpperCase()} · ${modulation.toUpperCase()}`;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = waveform === 'sibilant' ? 'sawtooth' : waveform;
    osc.frequency.value = freqHz;
    gain.gain.value = 0.6;

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    this.activeNodes.push(osc, gain);
    this.currentInstantHz = freqHz;

    const stepMod = () => {
      if (!this.isPlaying || this.activeProfileId !== 'manual-lab') return;
      const now = this.ctx.currentTime;
      const base = this.manualConfig.freqHz;

      if (this.manualConfig.modulation === 'static') {
        osc.frequency.setTargetAtTime(base, now, 0.03);
        gain.gain.setTargetAtTime(0.6, now, 0.03);
        this.currentInstantHz = base;
      } else if (this.manualConfig.modulation === 'sweep') {
        const delta = Math.min(3000, base * 0.22);
        const nextHz = Math.max(80, Math.min(20000, base + (Math.random() * 2 - 1) * delta));
        osc.frequency.exponentialRampToValueAtTime(nextHz, now + 0.22);
        this.currentInstantHz = nextHz;
      } else if (this.manualConfig.modulation === 'strobe') {
        const isHigh = Math.random() > 0.35;
        gain.gain.setTargetAtTime(isHigh ? 0.75 : 0.04, now, 0.015);
        this.currentInstantHz = base;
      } else if (this.manualConfig.modulation === 'random') {
        const nextHz = Math.max(120, Math.min(19800, base * (0.75 + Math.random() * 0.5)));
        osc.frequency.setValueAtTime(nextHz, now);
        gain.gain.setTargetAtTime(Math.random() > 0.25 ? 0.7 : 0.15, now, 0.01);
        this.currentInstantHz = nextHz;
      }

      if (this.onStateChange) this.onStateChange(this.getStatus());
      this.loopTimer = setTimeout(stepMod, 220);
    };
    stepMod();
  }

  // =========================================================================
  // REAL-TIME SPECTRUM & WAVEFORM DATA FOR CANVAS
  // =========================================================================

  getFrequencyData(targetArray) {
    if (!this.analyser) return false;
    this.analyser.getByteFrequencyData(targetArray);
    return true;
  }

  getTimeDomainData(targetArray) {
    if (!this.analyser) return false;
    this.analyser.getByteTimeDomainData(targetArray);
    return true;
  }
}
