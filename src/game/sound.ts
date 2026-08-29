// Web Audio API Synthesizer for Space Lander
// Includes dynamic thrusters, altitude/cave ambient wind & resonance system, and ambient space menu music

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;

  // Master Gain
  private masterGain: GainNode | null = null;

  // Thruster audio nodes
  private leftGainNode: GainNode | null = null;
  private rightGainNode: GainNode | null = null;
  private isLeftThrusterPlaying = false;
  private isRightThrusterPlaying = false;

  // Radar ping timer
  private lastPingTime = 0;

  // Dynamic Atmospheric & Cavern Ambience Nodes
  private ambientMasterGain: GainNode | null = null;
  private windGainNode: GainNode | null = null;
  private windFilterNode: BiquadFilterNode | null = null;
  private caveGainNode: GainNode | null = null;
  private caveFilterNode: BiquadFilterNode | null = null;
  private ambientLfoGain: GainNode | null = null;
  private isAmbienceRunning = false;

  // Menu Music Synth Nodes
  private menuMusicGain: GainNode | null = null;
  private isMenuMusicPlaying = false;
  private menuChordTimer: number | null = null;
  private menuSparkleTimer: number | null = null;
  private activeMenuOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.setupThrusters();
      this.setupAmbience();
      this.setupMenuMusicGain();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private createNoiseBuffer(seconds = 3): AudioBuffer {
    if (!this.ctx) throw new Error('No context');
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Generate pink-tinted noise for smoother aerodynamic rumble
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.25;
    }
    return buffer;
  }

  // ==========================================
  // THRUSTER AUDIO ENGINE
  // ==========================================
  private setupThrusters() {
    if (!this.ctx || !this.masterGain) return;

    const noiseBuffer = this.createNoiseBuffer(2);

    // Left Thruster setup
    const leftSource = this.ctx.createBufferSource();
    leftSource.buffer = noiseBuffer;
    leftSource.loop = true;

    const leftFilter = this.ctx.createBiquadFilter();
    leftFilter.type = 'bandpass';
    leftFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    leftFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const leftPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (leftPanner) leftPanner.pan.setValueAtTime(-0.6, this.ctx.currentTime);

    this.leftGainNode = this.ctx.createGain();
    this.leftGainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    leftSource.connect(leftFilter);
    if (leftPanner) {
      leftFilter.connect(leftPanner);
      leftPanner.connect(this.leftGainNode);
    } else {
      leftFilter.connect(this.leftGainNode);
    }
    this.leftGainNode.connect(this.masterGain);
    leftSource.start();

    // Right Thruster setup
    const rightSource = this.ctx.createBufferSource();
    rightSource.buffer = noiseBuffer;
    rightSource.loop = true;

    const rightFilter = this.ctx.createBiquadFilter();
    rightFilter.type = 'bandpass';
    rightFilter.frequency.setValueAtTime(340, this.ctx.currentTime);
    rightFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const rightPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (rightPanner) rightPanner.pan.setValueAtTime(0.6, this.ctx.currentTime);

    this.rightGainNode = this.ctx.createGain();
    this.rightGainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    rightSource.connect(rightFilter);
    if (rightPanner) {
      rightFilter.connect(rightPanner);
      rightPanner.connect(this.rightGainNode);
    } else {
      rightFilter.connect(this.rightGainNode);
    }
    this.rightGainNode.connect(this.masterGain);
    rightSource.start();
  }

  public setLeftThruster(active: boolean) {
    if (!this.ctx) this.initContext();
    if (!this.ctx || !this.leftGainNode) return;

    const targetGain = active ? 0.35 : 0;
    const now = this.ctx.currentTime;
    this.leftGainNode.gain.cancelScheduledValues(now);
    this.leftGainNode.gain.linearRampToValueAtTime(targetGain, now + 0.05);
    this.isLeftThrusterPlaying = active;
  }

  public setRightThruster(active: boolean) {
    if (!this.ctx) this.initContext();
    if (!this.ctx || !this.rightGainNode) return;

    const targetGain = active ? 0.35 : 0;
    const now = this.ctx.currentTime;
    this.rightGainNode.gain.cancelScheduledValues(now);
    this.rightGainNode.gain.linearRampToValueAtTime(targetGain, now + 0.05);
    this.isRightThrusterPlaying = active;
  }

  public stopAllThrusters() {
    this.setLeftThruster(false);
    this.setRightThruster(false);
  }

  // ==========================================
  // DYNAMIC ATMOSPHERIC & CAVERN AMBIENT SYSTEM
  // ==========================================
  private setupAmbience() {
    if (!this.ctx || !this.masterGain) return;

    this.ambientMasterGain = this.ctx.createGain();
    this.ambientMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.ambientMasterGain.connect(this.masterGain);

    const noiseBuffer = this.createNoiseBuffer(4);

    // 1. High Altitude / Open Skyway Wind Layer
    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    this.windFilterNode = this.ctx.createBiquadFilter();
    this.windFilterNode.type = 'bandpass';
    this.windFilterNode.frequency.setValueAtTime(950, this.ctx.currentTime);
    this.windFilterNode.Q.setValueAtTime(4.2, this.ctx.currentTime); // resonant whistling

    this.windGainNode = this.ctx.createGain();
    this.windGainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // Subtle LFO modulation for organic wind gusting
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.35, this.ctx.currentTime); // slow gust cycle

    this.ambientLfoGain = this.ctx.createGain();
    this.ambientLfoGain.gain.setValueAtTime(140, this.ctx.currentTime); // sweeps ±140 Hz
    lfo.connect(this.ambientLfoGain);
    this.ambientLfoGain.connect(this.windFilterNode.frequency);
    lfo.start();

    windSource.connect(this.windFilterNode);
    this.windFilterNode.connect(this.windGainNode);
    this.windGainNode.connect(this.ambientMasterGain);
    windSource.start();

    // 2. Subterranean Cavern & Deep Chasm Resonance Layer
    const caveSource = this.ctx.createBufferSource();
    caveSource.buffer = noiseBuffer;
    caveSource.loop = true;

    this.caveFilterNode = this.ctx.createBiquadFilter();
    this.caveFilterNode.type = 'bandpass';
    this.caveFilterNode.frequency.setValueAtTime(260, this.ctx.currentTime);
    this.caveFilterNode.Q.setValueAtTime(6.0, this.ctx.currentTime); // deep hollow resonant pitch

    this.caveGainNode = this.ctx.createGain();
    this.caveGainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // Slow secondary modulation for cave air draft
    const caveLfo = this.ctx.createOscillator();
    caveLfo.type = 'triangle';
    caveLfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);

    const caveLfoGain = this.ctx.createGain();
    caveLfoGain.gain.setValueAtTime(60, this.ctx.currentTime);
    caveLfo.connect(caveLfoGain);
    caveLfoGain.connect(this.caveFilterNode.frequency);
    caveLfo.start();

    caveSource.connect(this.caveFilterNode);
    this.caveFilterNode.connect(this.caveGainNode);
    this.caveGainNode.connect(this.ambientMasterGain);
    caveSource.start();

    this.isAmbienceRunning = true;
  }

  /**
   * Dynamically adjusts wind whistling & cavern resonance in real time
   * @param params Flight conditions: altitudeRatio (0 ground to 1 sky ceiling), inCaveRatio (0 open sky to 1 tight cavern), speed (m/s), atmosphereDensity (0 vacuum to 1 thick)
   */
  public updateAmbience(params: {
    altitudeRatio: number; // 0 (near bottom) to 1 (near top sky)
    inCaveRatio: number; // 0 (open clear space) to 1 (tight cave corridor / under ceiling)
    speed: number; // ship velocity magnitude
    atmosphereDensity: number; // planet air resistance multiplier
    isCrashed?: boolean;
    isLanded?: boolean;
  }) {
    if (!this.ctx) this.initContext();
    if (!this.ctx || !this.ambientMasterGain || !this.windGainNode || !this.caveGainNode) return;

    const now = this.ctx.currentTime;

    if (params.isCrashed || params.isLanded || this.isMuted) {
      this.ambientMasterGain.gain.setTargetAtTime(0, now, 0.2);
      return;
    }

    // Master ambience enabled during active flight
    this.ambientMasterGain.gain.setTargetAtTime(0.75, now, 0.1);

    const speedFactor = Math.min(1.5, params.speed / 12);
    const atmFactor = Math.max(0.35, Math.min(1.2, params.atmosphereDensity * 800 + 0.3));

    // 1. High Altitude Open Skyway Wind Whistle
    // Whistling increases when soaring high up or moving swiftly through atmospheric layers
    const altitudeFactor = Math.pow(Math.max(0, params.altitudeRatio), 1.2);
    const openSkyFactor = 1 - params.inCaveRatio * 0.8;
    const targetWindGain = Math.min(0.24, (altitudeFactor * 0.16 + speedFactor * 0.10) * openSkyFactor * atmFactor);
    
    // Frequency sweeps higher at high altitudes and fast speeds (e.g. 750 Hz -> 2200 Hz)
    const targetWindFreq = 750 + altitudeFactor * 900 + speedFactor * 550;

    this.windGainNode.gain.setTargetAtTime(targetWindGain, now, 0.15);
    if (this.windFilterNode) {
      this.windFilterNode.frequency.setTargetAtTime(targetWindFreq, now, 0.2);
    }

    // 2. Subterranean Cavern & Trench Resonance
    // Deep eerie hollow howling resonance builds up when inside tight rock chasms, caves, or below overhanging ceilings
    const caveDepth = Math.max(0, Math.min(1, params.inCaveRatio));
    const targetCaveGain = Math.min(0.28, (caveDepth * 0.22 + (1 - params.altitudeRatio) * 0.08) * atmFactor);

    // Cave resonance frequency shifts based on chasm tightness
    const targetCaveFreq = 180 + (1 - caveDepth) * 160 + speedFactor * 80;

    this.caveGainNode.gain.setTargetAtTime(targetCaveGain, now, 0.2);
    if (this.caveFilterNode) {
      this.caveFilterNode.frequency.setTargetAtTime(targetCaveFreq, now, 0.25);
    }
  }

  public stopAmbience() {
    if (this.ctx && this.ambientMasterGain) {
      this.ambientMasterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
    }
  }

  // ==========================================
  // AMBIENT SPACE MENU MUSIC SYNTHESIZER
  // ==========================================
  private setupMenuMusicGain() {
    if (!this.ctx || !this.masterGain) return;
    this.menuMusicGain = this.ctx.createGain();
    this.menuMusicGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.menuMusicGain.connect(this.masterGain);
  }

  /**
   * Generates a warm, ethereal, space-synth chord progression
   */
  public startMenuMusic() {
    this.initContext();
    if (!this.ctx || !this.menuMusicGain || this.isMenuMusicPlaying) return;

    this.isMenuMusicPlaying = true;
    const now = this.ctx.currentTime;
    this.menuMusicGain.gain.cancelScheduledValues(now);
    this.menuMusicGain.gain.setValueAtTime(0, now);
    this.menuMusicGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.22, now + 1.5);

    // Harmonic chord definitions (Deep Space Synth progression in Eb/C minor)
    // Frequencies (Hz) for ethereal floating pads
    const chords: number[][] = [
      [155.56, 233.08, 293.66, 349.23, 466.16], // Ebmaj9 (Eb3, Bb3, D4, F4, Bb4)
      [130.81, 196.00, 261.63, 311.13, 392.00], // Cm9 (C3, G3, C4, Eb4, G4)
      [103.83, 174.61, 207.65, 261.63, 329.63], // Abmaj7#11 (Ab2, F3, Ab3, C4, E4)
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bb6/9 (Bb2, F3, Bb3, D4, F4)
    ];

    let chordIndex = 0;
    const playNextChord = () => {
      if (!this.isMenuMusicPlaying || !this.ctx || !this.menuMusicGain) return;

      const chordNow = this.ctx.currentTime;
      const chordDuration = 5.5; // 5.5 seconds per chord with crossfade
      const currentChordNotes = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      // Clean up previous dead notes
      this.activeMenuOscillators = this.activeMenuOscillators.filter((item) => {
        try {
          return item.gain.gain.value > 0.0001;
        } catch {
          return false;
        }
      });

      // Filter for warm analog synth tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, chordNow);
      filter.frequency.exponentialRampToValueAtTime(1100, chordNow + chordDuration * 0.45);
      filter.frequency.exponentialRampToValueAtTime(450, chordNow + chordDuration);
      filter.Q.setValueAtTime(1.8, chordNow);

      const chordMaster = this.ctx.createGain();
      chordMaster.gain.setValueAtTime(0.001, chordNow);
      chordMaster.gain.linearRampToValueAtTime(0.18, chordNow + 1.8);
      chordMaster.gain.setValueAtTime(0.18, chordNow + chordDuration - 1.2);
      chordMaster.gain.linearRampToValueAtTime(0.0001, chordNow + chordDuration + 0.8);

      filter.connect(chordMaster);
      chordMaster.connect(this.menuMusicGain);

      // Create rich detuned oscillator voices for each note in chord
      currentChordNotes.forEach((freq, idx) => {
        if (!this.ctx) return;

        // Main sine pad
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, chordNow);
        osc1.detune.setValueAtTime(idx % 2 === 0 ? -4 : 4, chordNow);

        // Soft triangle sub-layer for warm harmonics
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq, chordNow);
        osc2.detune.setValueAtTime(idx % 2 === 0 ? 5 : -5, chordNow);

        const noteGain = this.ctx.createGain();
        noteGain.gain.setValueAtTime(0.35 / currentChordNotes.length, chordNow);

        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(filter);

        osc1.start(chordNow);
        osc2.start(chordNow);

        osc1.stop(chordNow + chordDuration + 1.0);
        osc2.stop(chordNow + chordDuration + 1.0);

        this.activeMenuOscillators.push({ osc: osc1, gain: chordMaster });
      });

      // Schedule next chord with slight overlap
      this.menuChordTimer = window.setTimeout(playNextChord, (chordDuration - 1.0) * 1000);
    };

    // Random sparkling crystalline cosmic arpeggios
    const triggerSparkle = () => {
      if (!this.isMenuMusicPlaying || !this.ctx || !this.menuMusicGain) return;

      const sparkleNow = this.ctx.currentTime;
      const sparklePitches = [880, 1046.5, 1174.66, 1318.51, 1567.98, 1760]; // crystalline high notes
      const pitch = sparklePitches[Math.floor(Math.random() * sparklePitches.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, sparkleNow);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.05, sparkleNow + 0.4);

      gain.gain.setValueAtTime(0.001, sparkleNow);
      gain.gain.linearRampToValueAtTime(0.04, sparkleNow + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, sparkleNow + 1.4);

      if (panner) {
        panner.pan.setValueAtTime((Math.random() - 0.5) * 1.4, sparkleNow);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.menuMusicGain);
      } else {
        osc.connect(gain);
        gain.connect(this.menuMusicGain);
      }

      osc.start(sparkleNow);
      osc.stop(sparkleNow + 1.5);

      const nextDelay = 1800 + Math.random() * 2400;
      this.menuSparkleTimer = window.setTimeout(triggerSparkle, nextDelay);
    };

    playNextChord();
    this.menuSparkleTimer = window.setTimeout(triggerSparkle, 1200);
  }

  public stopMenuMusic() {
    if (!this.isMenuMusicPlaying) return;
    this.isMenuMusicPlaying = false;

    if (this.menuChordTimer) {
      clearTimeout(this.menuChordTimer);
      this.menuChordTimer = null;
    }
    if (this.menuSparkleTimer) {
      clearTimeout(this.menuSparkleTimer);
      this.menuSparkleTimer = null;
    }

    if (this.ctx && this.menuMusicGain) {
      const now = this.ctx.currentTime;
      this.menuMusicGain.gain.cancelScheduledValues(now);
      this.menuMusicGain.gain.linearRampToValueAtTime(0, now + 0.6);
    }
  }

  // ==========================================
  // ONE-SHOT SOUND EFFECTS
  // ==========================================
  public playLandingChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A major chord arpeggio

    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      gain.gain.setValueAtTime(0, now + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, now + index * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.9);
    });
  }

  public playCrashSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;

    // Sub thump
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.8);

    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.85);

    // Noise blast
    const noiseBuffer = this.createNoiseBuffer(1);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(80, now + 0.7);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.75);
  }

  public playExplosion() {
    this.playCrashSound();
  }

  public playBeaconPing(distanceNorm: number) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = performance.now();
    const interval = 400 + distanceNorm * 1800; // 0.4s to 2.2s between pings

    if (now - this.lastPingTime > interval) {
      this.lastPingTime = now;
      const audioNow = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = 600 + (1 - distanceNorm) * 500;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioNow);

      gain.gain.setValueAtTime(0.08, audioNow);
      gain.gain.exponentialRampToValueAtTime(0.001, audioNow + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(audioNow);
      osc.stop(audioNow + 0.15);
    }
  }

  public playFuelPickup() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  public playLowFuelAlarm() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playHullScrape(intensity = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const duration = 0.12 + Math.min(0.25, intensity * 0.15);

    // Filtered harsh metallic grating friction noise
    const noiseBuffer = this.createNoiseBuffer(1);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1400 + Math.random() * 800, now);
    bandpass.Q.setValueAtTime(4.5, now);

    const gain = this.ctx.createGain();
    const peakGain = Math.min(0.4, 0.12 + intensity * 0.22);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(peakGain, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + duration + 0.02);
  }

  public playHullImpact(severity = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;

    // Metallic clang osc
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    const startFreq = 280 + severity * 180;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

    const clangVol = Math.min(0.6, 0.2 + severity * 0.35);
    oscGain.gain.setValueAtTime(clangVol, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.38);

    // Resonant ring
    const ringOsc = this.ctx.createOscillator();
    const ringGain = this.ctx.createGain();
    ringOsc.type = 'sine';
    ringOsc.frequency.setValueAtTime(740 + Math.random() * 200, now);
    ringGain.gain.setValueAtTime(0.15 * severity, now);
    ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    ringOsc.connect(ringGain);
    ringGain.connect(this.masterGain);
    ringOsc.start(now);
    ringOsc.stop(now + 0.42);
  }

  public playLowHullAlarm() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    [0, 0.12].forEach((offset) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1180, now + offset);

      gain.gain.setValueAtTime(0.18, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + offset);
      osc.stop(now + offset + 0.09);
    });
  }

  public playRepairChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6 rising
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.08 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  public playCargoLatch() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Dual electro-magnetic clamp tone with mechanical latch snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.16);

    // Click snap
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(2200, now + 0.04);
    clickGain.gain.setValueAtTime(0.15, now + 0.04);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickOsc.start(now + 0.04);
    clickOsc.stop(now + 0.11);
  }

  public playCargoDelivered() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Glorious 4-note ascending chord for successful delivery
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.55);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.6);
    });
  }

  public playCargoTension() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.1);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  public playCargoWarning(isHazard = true) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Sci-fi 2-tone telemetry hazard ping (high tech warning chime)
    const tones = isHazard ? [880, 1174.66] : [659.25, 880]; // A5 -> D6 or E5 -> A5
    tones.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = isHazard ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.09 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.3);
    });
  }

  public playCargoDetonation() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // 1. Deep sub-bass explosive punch
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.6);
    subGain.gain.setValueAtTime(0.55, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.72);

    // 2. High-energy explosive noise blast
    const noiseBuffer = this.createNoiseBuffer(1);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 0.55);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.45, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.62);
  }

  public playCryoVent() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    // High-pressure cryogenic hiss
    const noiseBuffer = this.createNoiseBuffer(1);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.setValueAtTime(4.0, now);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.48);
  }

  public playIsotopeDamage() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    // Crystalline stress crack + alarm beep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.18);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  public playPlasmaEMP() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    // High-frequency discharge zapping buzz
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  public playMagneticHum() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.15);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  public playScoreTick(pitchMult = 1.0) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    
    // Crisp mechanical slot machine reel click
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(1400 * pitchMult, now);
    clickOsc.frequency.exponentialRampToValueAtTime(320 * pitchMult, now + 0.022);
    
    clickGain.gain.setValueAtTime(0.09, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickOsc.start(now);
    clickOsc.stop(now + 0.025);

    // Subtle metallic acoustic ping
    const pingOsc = this.ctx.createOscillator();
    const pingGain = this.ctx.createGain();
    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(1960 * pitchMult, now);
    pingGain.gain.setValueAtTime(0.035, now);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    pingOsc.connect(pingGain);
    pingGain.connect(this.masterGain);
    pingOsc.start(now);
    pingOsc.stop(now + 0.04);
  }

  public playScoreFinalChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.055);
      gain.gain.setValueAtTime(0, now + idx * 0.055);
      gain.gain.linearRampToValueAtTime(0.13, now + idx * 0.055 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.45);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.5);
    });
  }

  public playAchievementChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    // Elegant, sparkling celestial chime: D5 -> F#5 -> A5 -> D6
    const notes = [587.33, 739.99, 880.0, 1174.66];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.065);
      gain.gain.setValueAtTime(0, now + idx * 0.065);
      gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.065 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.065 + 0.65);
      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.065);
      osc.stop(now + idx * 0.065 + 0.7);
    });
  }

  public playVolcanoRumble(intensity = 0.5, distNorm = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const audibility = Math.max(0, 1 - distNorm);
    if (audibility <= 0.05) return;

    // Sub seismic roar
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45 + intensity * 25, now);
    osc.frequency.exponentialRampToValueAtTime(22, now + 0.6);

    const rumbleVol = Math.min(0.35, (0.08 + intensity * 0.18) * audibility);
    oscGain.gain.setValueAtTime(rumbleVol, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  public playVolcanoBlast(distNorm = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const audibility = Math.max(0, 1 - distNorm * 0.85);
    if (audibility <= 0.05) return;

    // Lowpass explosive magma discharge
    const noiseBuffer = this.createNoiseBuffer(1);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + 0.7);

    const gain = this.ctx.createGain();
    const vol = Math.min(0.4, 0.28 * audibility);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.72);
  }

  public playVolcanoSizzle() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const noiseBuffer = this.createNoiseBuffer(0.5);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800 + Math.random() * 800, now);
    filter.Q.setValueAtTime(4.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.18);
  }

  public playVolcanicRockHit() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Heavy blunt kinetic magma impact
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.28);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public playClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const sound = new SoundManager();
