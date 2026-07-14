"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AnimatedNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // Increased particle count for better visibility and density
  const nodeCount = isMobile ? 30 : 70;
  const connectionDistance = isMobile ? 100 : 165;

  const initNodes = useCallback(
    (width: number, height: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
      nodesRef.current = nodes;
    },
    [nodeCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse event handlers for pointer interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    if (prefersReducedMotion) {
      // Draw static frame
      const isDark = themeRef.current === "dark";
      const nodeColor = isDark
        ? "rgba(56, 189, 248, 0.35)"
        : "rgba(100, 116, 139, 0.35)";
      const lineColor = isDark
        ? "rgba(56, 189, 248, 0.12)"
        : "rgba(100, 116, 139, 0.12)";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      const isDark = themeRef.current === "dark";
      
      // Dynamic fade factors based on scroll to make Hero stand out and calm text sections
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const fadeFactor = Math.max(0.25, 1 - scrollY / 750);

      // Increased opacity for stronger but professional presence
      const baseNodeOpacity = 0.45 * fadeFactor;
      const baseLineOpacity = 0.14 * fadeFactor;

      const nodeColor = isDark
        ? `rgba(56, 189, 248, ${baseNodeOpacity})`
        : `rgba(100, 116, 139, ${baseNodeOpacity})`;
      
      const lineColorTemplate = isDark
        ? (alpha: number) => `rgba(56, 189, 248, ${alpha})`
        : (alpha: number) => `rgba(100, 116, 139, ${alpha})`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions and handle pointer attraction
      nodes.forEach((node) => {
        if (mouse.x > -500) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Gentle cursor attraction force
            const force = (180 - dist) / 180;
            node.x += dx * 0.005 * force;
            node.y += dy * 0.005 * force;
          }
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections (Node-to-Node)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const distanceFactor = 1 - dist / connectionDistance;
            let finalAlpha = baseLineOpacity * distanceFactor;

            // Highlight connections near mouse
            if (mouse.x > -500) {
              const mdx1 = mouse.x - nodes[i].x;
              const mdy1 = mouse.y - nodes[i].y;
              const mdist1 = Math.sqrt(mdx1 * mdx1 + mdy1 * mdy1);

              const mdx2 = mouse.x - nodes[j].x;
              const mdy2 = mouse.y - nodes[j].y;
              const mdist2 = Math.sqrt(mdx2 * mdx2 + mdy2 * mdy2);

              if (mdist1 < 160 && mdist2 < 160) {
                finalAlpha = Math.min(0.35, finalAlpha * 1.6);
              }
            }

            ctx.beginPath();
            ctx.strokeStyle = lineColorTemplate(finalAlpha);
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw connections (Node-to-Mouse) on desktop
      if (mouse.x > -500 && !isMobile) {
        nodes.forEach((node) => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.16 * fadeFactor;
            ctx.beginPath();
            ctx.strokeStyle = lineColorTemplate(opacity);
            ctx.lineWidth = 0.65;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      // Draw nodes
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let isGlowing = false;
        let radius = 2.0;

        if (mouse.x > -500 && dist < 120) {
          isGlowing = true;
          radius = 2.0 + (1 - dist / 120) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Draw soft glow under nodes
        if (isGlowing) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(56, 189, 248, ${0.1 * fadeFactor})`
            : `rgba(100, 116, 139, ${0.1 * fadeFactor})`;
          ctx.fill();
        } else if (node.x % 7 < 1) { // 1 in 7 nodes get a permanent soft design glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(56, 189, 248, ${0.05 * fadeFactor})`
            : `rgba(100, 116, 139, ${0.05 * fadeFactor})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (!prefersReducedMotion) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion, initNodes, connectionDistance, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
