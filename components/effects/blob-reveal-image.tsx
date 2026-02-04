'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type Point = { x: number; y: number };

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function makeBlobPath(
  center: Point,
  radius: number,
  time: number,
  points = 10,
  wobble = 0.28,
) {
  const angleStep = (Math.PI * 2) / points;
  const coords: Point[] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const phase = time * 0.0012 + i * 0.9;
    const wobbleRadius = radius * wobble;
    const r = radius + Math.sin(phase) * wobbleRadius;
    coords.push({
      x: center.x + Math.cos(angle) * r,
      y: center.y + Math.sin(angle) * r,
    });
  }

  let d = `M ${coords[0].x.toFixed(3)} ${coords[0].y.toFixed(3)}`;
  for (let i = 0; i < coords.length; i++) {
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const cur = coords[i];
    const next = coords[(i + 1) % coords.length];
    const nextNext = coords[(i + 2) % coords.length];

    const cp1x = cur.x + (next.x - prev.x) / 4;
    const cp1y = cur.y + (next.y - prev.y) / 4;
    const cp2x = next.x - (nextNext.x - cur.x) / 4;
    const cp2y = next.y - (nextNext.y - cur.y) / 4;

    d += ` C ${cp1x.toFixed(3)} ${cp1y.toFixed(3)}, ${cp2x.toFixed(3)} ${cp2y.toFixed(3)}, ${next.x.toFixed(3)} ${next.y.toFixed(3)}`;
  }
  return d + ' Z';
}

export type BlobRevealImageProps = {
  baseSrc: string;
  revealSrc: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  initialRadius?: number;
  activeRadius?: number;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  revealPriority?: boolean;
  deferReveal?: boolean;
  deferRevealMs?: number;
};

// High-perf implementation:
// - No React state updates on pointer move.
// - requestAnimationFrame updates SVG path via refs.
// - Pointer events work on mouse + touch.
export function BlobRevealImage({
  baseSrc,
  revealSrc,
  alt,
  className,
  imageClassName,
  initialRadius = 0,
  activeRadius = 22,
  quality = 92,
  sizes = '(min-width: 1024px) 420px, (min-width: 640px) 320px, 288px',
  priority = false,
  revealPriority = priority,
  deferReveal = false,
  deferRevealMs = 900,
}: BlobRevealImageProps) {
  const reactId = useId();
  const clipId = useMemo(() => `clip-${reactId}`.replace(/:/g, ''), [reactId]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const revealLayerRef = useRef<HTMLDivElement | null>(null);

  const [revealEnabled, setRevealEnabled] = useState(!deferReveal);
  const revealEnabledRef = useRef(revealEnabled);
  revealEnabledRef.current = revealEnabled;

  const enableRevealOnce = () => {
    if (revealEnabledRef.current) return;
    revealEnabledRef.current = true;
    setRevealEnabled(true);
  };

  const targetRef = useRef<Point>({ x: 50, y: 50 });
  const currentRef = useRef<Point>({ x: 50, y: 50 });
  const radiusRef = useRef(initialRadius);
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const tick = (time: number) => {
      const smoothing = 0.16;
      const target = targetRef.current;
      const current = currentRef.current;

      currentRef.current = {
        x: lerp(current.x, target.x, smoothing),
        y: lerp(current.y, target.y, smoothing),
      };

      const desiredRadius = activeRef.current ? activeRadius : initialRadius;
      radiusRef.current = lerp(radiusRef.current, desiredRadius, 0.18);

      const pathEl = pathRef.current;
      const layerEl = revealLayerRef.current;

      if (pathEl) {
        const radius = radiusRef.current;
        const d = prefersReduced
          ? makeBlobPath(currentRef.current, radius, 0, 12, 0)
          : makeBlobPath(currentRef.current, radius, time);
        pathEl.setAttribute('d', d);
      }

      if (layerEl) {
        const opacity = activeRef.current ? 1 : 0;
        // Smooth opacity without triggering React updates
        const prev = Number(layerEl.getAttribute('data-o') ?? '0');
        const next = lerp(prev, opacity, 0.18);
        layerEl.setAttribute('data-o', String(next));
        layerEl.style.opacity = String(next);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [activeRadius, initialRadius]);

  useEffect(() => {
    if (!deferReveal) return;
    const id = window.setTimeout(() => {
      setRevealEnabled(true);
    }, deferRevealMs);
    return () => window.clearTimeout(id);
  }, [deferReveal, deferRevealMs]);

  const setFromClientPoint = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp01((clientX - rect.left) / rect.width) * 100;
    const y = clamp01((clientY - rect.top) / rect.height) * 100;
    targetRef.current = { x, y };
  };

  const onPointerEnter: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === 'touch') return;
    enableRevealOnce();
    activeRef.current = true;
    setFromClientPoint(e.clientX, e.clientY);
  };

  const onPointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    activeRef.current = false;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!activeRef.current && e.pointerType !== 'touch') return;
    setFromClientPoint(e.clientX, e.clientY);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    enableRevealOnce();
    activeRef.current = true;
    setFromClientPoint(e.clientX, e.clientY);
    if (e.pointerType !== 'touch') {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType !== 'touch') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    if (e.pointerType === 'touch') {
      // Keep it briefly visible after tap
      window.setTimeout(() => {
        activeRef.current = false;
      }, 650);
      return;
    }
    activeRef.current = false;
  };

  const onPointerCancel: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType !== 'touch') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    activeRef.current = false;
  };

  const onLostPointerCapture: React.PointerEventHandler<
    HTMLDivElement
  > = () => {
    activeRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onLostPointerCapture={onLostPointerCapture}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      aria-label={alt}
      role="img"
    >
      {/* SVG defs only: used by CSS clip-path below */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath
            id={clipId}
            clipPathUnits="objectBoundingBox"
            transform="scale(0.01)"
          >
            <path ref={pathRef} d="M 50 50 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative h-full w-full">
        <Image
          src={baseSrc}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          draggable={false}
          className={[
            'object-cover pointer-events-none select-none',
            imageClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        />

        <div
          ref={revealLayerRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
            willChange: 'clip-path, opacity',
          }}
        >
          {revealEnabled ? (
            <Image
              src={revealSrc}
              alt={alt}
              fill
              priority={revealPriority}
              quality={quality}
              sizes={sizes}
              draggable={false}
              className={[
                'object-cover pointer-events-none select-none',
                imageClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
