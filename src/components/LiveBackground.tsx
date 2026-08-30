import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Wind, Sparkles, Droplets, Eye, EyeOff } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulseOffset: number;
  life: number;
  maxLife: number;
  kind: 'mote' | 'droplet' | 'pollen' | 'spore';
}

interface CausticOrb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  color: string;
  phase: number;
  speed: number;
  spread: number;
}

type AtmosphereMode = 'botanical' | 'golden' | 'sage';

export const LiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('botanical');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isMoving: boolean; lastMove: number }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isMoving: false,
    lastMove: 0,
  });

  // Track scroll velocity to gently sway particles on scroll
  const scrollRef = useRef<{ lastY: number; velocity: number }>({
    lastY: typeof window !== 'undefined' ? window.scrollY : 0,
    velocity: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - scrollRef.current.lastY;
      scrollRef.current.velocity = Math.max(Math.min(diff * 0.15, 8), -8);
      scrollRef.current.lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High DPI Support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Color palettes tuned specifically for Safenia Botanical Quiet Luxury
    const palettes = {
      botanical: {
        orbs: [
          { color: 'rgba(86, 96, 74, 0.085)', radius: 340 }, // Olive
          { color: 'rgba(183, 155, 107, 0.09)', radius: 380 }, // Champagne gold
          { color: 'rgba(217, 204, 184, 0.18)', radius: 420 }, // Warm Sand
          { color: 'rgba(48, 56, 45, 0.06)', radius: 300 }, // Deep Forest
        ],
        particleColors: [
          { color: '#B79B6B', glow: 'rgba(183, 155, 107, 0.4)' }, // Gold
          { color: '#56604A', glow: 'rgba(86, 96, 74, 0.3)' }, // Olive
          { color: '#D9CCB8', glow: 'rgba(217, 204, 184, 0.5)' }, // Warm Sand
          { color: '#8F9B7E', glow: 'rgba(143, 155, 126, 0.35)' }, // Light Sage
        ],
      },
      golden: {
        orbs: [
          { color: 'rgba(183, 155, 107, 0.14)', radius: 400 },
          { color: 'rgba(224, 195, 140, 0.12)', radius: 420 },
          { color: 'rgba(217, 204, 184, 0.22)', radius: 460 },
          { color: 'rgba(166, 111, 85, 0.05)', radius: 320 },
        ],
        particleColors: [
          { color: '#C8A975', glow: 'rgba(200, 169, 117, 0.45)' },
          { color: '#D9CCB8', glow: 'rgba(217, 204, 184, 0.5)' },
          { color: '#B79B6B', glow: 'rgba(183, 155, 107, 0.4)' },
          { color: '#EADFC9', glow: 'rgba(234, 223, 201, 0.6)' },
        ],
      },
      sage: {
        orbs: [
          { color: 'rgba(86, 96, 74, 0.11)', radius: 380 },
          { color: 'rgba(167, 173, 152, 0.13)', radius: 410 },
          { color: 'rgba(217, 204, 184, 0.16)', radius: 360 },
          { color: 'rgba(48, 56, 45, 0.08)', radius: 340 },
        ],
        particleColors: [
          { color: '#56604A', glow: 'rgba(86, 96, 74, 0.4)' },
          { color: '#8F9B7E', glow: 'rgba(143, 155, 126, 0.4)' },
          { color: '#A7AD98', glow: 'rgba(167, 173, 152, 0.35)' },
          { color: '#B79B6B', glow: 'rgba(183, 155, 107, 0.3)' },
        ],
      },
    };

    const currentPalette = palettes[atmosphere];

    // Create Living Caustic Orbs
    const orbs: CausticOrb[] = currentPalette.orbs.map((item, idx) => ({
      x: (width / (currentPalette.orbs.length + 1)) * (idx + 1) + (Math.random() - 0.5) * 100,
      y: (height / 2) + (Math.random() - 0.5) * (height * 0.4),
      targetX: (width / (currentPalette.orbs.length + 1)) * (idx + 1),
      targetY: (height / 2),
      radius: item.radius,
      baseRadius: item.radius,
      color: item.color,
      phase: idx * (Math.PI / 2),
      speed: 0.0006 + idx * 0.0002,
      spread: 120 + idx * 40,
    }));

    // Generate Botanical Micro-droplets and Pollen Spores
    const particleCount = Math.min(Math.floor((width * height) / 28000), 65);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = currentPalette.particleColors[i % currentPalette.particleColors.length];
      const kind: Particle['kind'] = i % 4 === 0 ? 'droplet' : i % 3 === 0 ? 'pollen' : 'mote';
      const baseRadius = kind === 'droplet' ? 2.8 + Math.random() * 2.2 : kind === 'pollen' ? 1.8 + Math.random() * 1.5 : 0.8 + Math.random() * 1.4;
      const baseAlpha = kind === 'droplet' ? 0.35 + Math.random() * 0.35 : kind === 'pollen' ? 0.25 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35, // Gentle upward buoyant drift
        radius: baseRadius,
        baseRadius,
        alpha: baseAlpha,
        baseAlpha,
        color: colorObj.color,
        glowColor: colorObj.glow,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        life: Math.random() * 500,
        maxLife: 400 + Math.random() * 600,
        kind,
      });
    }

    // Ripple collection from mouse interactions
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    const ripples: Ripple[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Mouse Tracking for dynamic live viscosity response
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isMoving = true;
      mouseRef.current.lastMove = Date.now();

      // Occasionally spawn a gentle ripple when moving
      if (Math.random() < 0.08 && ripples.length < 8) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 4,
          maxRadius: 80 + Math.random() * 40,
          alpha: 0.18,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.isMoving = true;
        mouseRef.current.lastMove = Date.now();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let time = 0;

    // Render loop
    const render = () => {
      time += 1;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      if (Date.now() - mouseRef.current.lastMove > 2000) {
        mouseRef.current.isMoving = false;
      }

      // Smooth scroll velocity decay
      scrollRef.current.velocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      if (isLiveActive) {
        // --- 1. Render Living Caustic Fluid Orbs (Harmonic Lissajous Breathing) ---
        ctx.save();
        orbs.forEach((orb, i) => {
          const t = time * orb.speed + orb.phase;
          const offsetX = Math.sin(t) * orb.spread;
          const offsetY = Math.cos(t * 0.8) * (orb.spread * 0.65);
          const currentX = orb.x + offsetX;
          const currentY = orb.y + offsetY;
          
          // Gentle pulsation radius
          const pulse = Math.sin(time * 0.008 + i) * 35;
          const r = Math.max(orb.baseRadius + pulse, 120);

          const grad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, r);
          grad.addColorStop(0, orb.color);
          grad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, '0.04)'));
          grad.addColorStop(1, 'rgba(245, 240, 230, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        // --- 2. Render Interactive Cursor Halo (Gentle Golden Warmth) ---
        if (mouseRef.current.x > 0 && mouseRef.current.y > 0 && mouseRef.current.isMoving) {
          ctx.save();
          const mouseGlow = ctx.createRadialGradient(
            mouseRef.current.x,
            mouseRef.current.y,
            0,
            mouseRef.current.x,
            mouseRef.current.y,
            160
          );
          mouseGlow.addColorStop(0, 'rgba(183, 155, 107, 0.07)');
          mouseGlow.addColorStop(0.6, 'rgba(217, 204, 184, 0.03)');
          mouseGlow.addColorStop(1, 'rgba(245, 240, 230, 0)');

          ctx.fillStyle = mouseGlow;
          ctx.beginPath();
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 160, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // --- 3. Render Fluid Ripples ---
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.radius += 0.9;
          rip.alpha *= 0.97;

          if (rip.alpha < 0.005 || rip.radius >= rip.maxRadius) {
            ripples.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(183, 155, 107, ${rip.alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        // --- 4. Render Botanical Particles & Golden Micro-Droplets ---
        ctx.save();
        particles.forEach((p) => {
          p.life += 1;
          if (p.life > p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20) {
            // Respawn at bottom or random edge
            p.x = Math.random() * width;
            p.y = height + 15;
            p.life = 0;
            p.maxLife = 400 + Math.random() * 600;
          }

          // Natural harmonic sway
          const sway = Math.sin(time * 0.02 + p.pulseOffset) * 0.4;
          p.x += p.vx + sway;
          p.y += p.vy - (scrollRef.current.velocity * 0.4);

          // Interactive avoidance / reaction to mouse
          if (mouseRef.current.x > 0) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110 && dist > 0) {
              const force = (110 - dist) / 110;
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
            }
          }

          // Shimmering alpha calculation
          const alphaCycle = Math.sin(p.life * p.pulseSpeed + p.pulseOffset);
          const currentAlpha = Math.max(0.05, p.baseAlpha + alphaCycle * 0.2);

          // Draw outer subtle glow for droplets & pollen
          if (p.kind === 'droplet' || p.kind === 'pollen') {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.glowColor.replace(/[\d\.]+\)$/, `${currentAlpha * 0.4})`);
            ctx.fill();
          }

          // Draw core particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [atmosphere, isLiveActive]);

  useEffect(() => {
    const cleanup = initScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initScene]);

  return (
    <>
      {/* Fixed Fullscreen Living Canvas Layer */}
      <canvas
        ref={canvasRef}
        id="safenia-live-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none transition-opacity duration-1000"
        style={{ opacity: isLiveActive ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Discreet Quiet-Luxury Atmosphere Controller (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Expanded Atmosphere Tuning Panel */}
        {isPanelOpen && (
          <div className="mb-3 p-4 bg-[#F5F0E6]/95 backdrop-blur-md border border-[#17130F]/15 shadow-xl text-left w-64 space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#17130F]/08 pb-2">
              <span className="text-[10px] font-sans-body uppercase tracking-[0.24em] font-semibold text-[#56604A]">
                ATMOSPHERE
              </span>
              <button
                onClick={() => setIsLiveActive(!isLiveActive)}
                className="text-[10px] font-sans-body uppercase tracking-wider font-semibold text-[#17130F] hover:text-[#56604A] flex items-center space-x-1 cursor-pointer"
              >
                {isLiveActive ? (
                  <>
                    <Eye className="w-3 h-3 text-[#56604A]" />
                    <span>Live On</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 text-[#7A746B]" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#7A746B] block">
                Botanical Mood
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setAtmosphere('botanical')}
                  className={`px-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    atmosphere === 'botanical'
                      ? 'bg-[#17130F] text-[#F5F0E6]'
                      : 'border border-[#17130F]/15 text-[#56604A] hover:border-[#17130F]'
                  }`}
                >
                  Herbarium
                </button>
                <button
                  onClick={() => setAtmosphere('golden')}
                  className={`px-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    atmosphere === 'golden'
                      ? 'bg-[#17130F] text-[#F5F0E6]'
                      : 'border border-[#17130F]/15 text-[#56604A] hover:border-[#17130F]'
                  }`}
                >
                  Golden Oil
                </button>
                <button
                  onClick={() => setAtmosphere('sage')}
                  className={`px-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    atmosphere === 'sage'
                      ? 'bg-[#17130F] text-[#F5F0E6]'
                      : 'border border-[#17130F]/15 text-[#56604A] hover:border-[#17130F]'
                  }`}
                >
                  Wild Sage
                </button>
              </div>
            </div>

            <div className="text-[10px] text-[#56604A]/80 font-light leading-relaxed pt-1 border-t border-[#17130F]/08">
              Interactive botanical fluid currents and golden cold-pressed oil motes responding to touch and cursor flow.
            </div>
          </div>
        )}

        {/* Minimalist Pill Trigger */}
        <button
          id="btn-live-background-toggle"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="group flex items-center space-x-2 px-3.5 py-2 bg-[#F5F0E6]/90 hover:bg-[#F5F0E6] text-[#17130F] border border-[#17130F]/15 backdrop-blur-md shadow-sm transition-all duration-300 cursor-pointer"
          title="Toggle Living Botanical Canvas"
          aria-label="Toggle Atmosphere Settings"
        >
          <span className="relative flex h-2 w-2">
            {isLiveActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B79B6B] opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveActive ? 'bg-[#56604A]' : 'bg-[#7A746B]'}`}></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans-body font-semibold text-[#17130F] group-hover:text-[#56604A] transition-colors">
            {isLiveActive ? 'ATMOSPHERE: LIVE' : 'ATMOSPHERE: PAUSED'}
          </span>
          <Wind className="w-3 h-3 text-[#B79B6B] transform group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </>
  );
};
