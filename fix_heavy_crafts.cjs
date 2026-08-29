const fs = require('fs');

const createTitaniumPlateCode = `
    const createTitaniumPlate = (y1, y2) => {
      const g = ctx.createLinearGradient(0, y1, 0, y2);
      g.addColorStop(0, '#64748b');
      g.addColorStop(0.5, '#334155');
      g.addColorStop(1, '#0f172a');
      return g;
    };
`;

const goliathCode = `      case 'goliath': {
        const footPadY = 32 + gearSpringOffset;
        
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(-32, 14); ctx.lineTo(-38, footPadY);
        ctx.moveTo(32, 14); ctx.lineTo(38, footPadY);
        ctx.stroke();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(-24, 18); ctx.lineTo(-38, footPadY);
        ctx.moveTo(24, 18); ctx.lineTo(38, footPadY);
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(-38, footPadY, 7.5, 3, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(38, footPadY, 7.5, 3, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.6;
        ctx.fillRect(16, -8, 20, 26);
        ctx.strokeRect(16, -8, 20, 26);

        ctx.fillStyle = createTitaniumPlate(-5, 15);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.0;
        ctx.fillRect(19, -5, 14, 20);
        ctx.strokeRect(19, -5, 14, 20);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(20, 0); ctx.lineTo(32, 0);
        ctx.moveTo(20, 6); ctx.lineTo(32, 6);
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.4;
        ctx.fillRect(-16, -14, 32, 6);
        ctx.strokeRect(-16, -14, 32, 6);

        ctx.fillStyle = '#030712';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.4;
        ctx.fillRect(-16, -8, 32, 24);
        ctx.strokeRect(-16, -8, 32, 24);

        if ((ship.loadedTrucksCount || 0) > 0) {
          ctx.save();
          ctx.translate(0, 10);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-12, -4, 24, 8);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(-12, -4, 24, 8);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(2, -7, 8, 4);
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.arc(-7, 4, 2.5, 0, Math.PI * 2);
          ctx.arc(7, 4, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.lineCap = 'round';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(-16, 14); ctx.lineTo(-26, 22); ctx.stroke();
        
        ctx.save();
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(-16, 14); ctx.lineTo(-26, 22); ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(-26, 22, 1.8, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(-36, -26); ctx.lineTo(-28, -34); ctx.lineTo(-16, -34); ctx.lineTo(-16, 16); ctx.lineTo(-36, 16); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = createTitaniumPlate(-18, 12);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.0;
        ctx.fillRect(-34, -18, 16, 30);
        ctx.strokeRect(-34, -18, 16, 30);

        ctx.fillStyle = createVisorGrad(-25.5, -25, 9, config.accentColor, config.visorColor);
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-33, -24); ctx.lineTo(-27, -30); ctx.lineTo(-18, -30); ctx.lineTo(-18, -20); ctx.lineTo(-33, -20); ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.ellipse(-26, -25, 3.5, 1.8, 0, 0, Math.PI*2); ctx.fill();
        ctx.restore();

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(-28, -34); ctx.lineTo(-28, -42); ctx.stroke();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(-33, -41); ctx.quadraticCurveTo(-28, -38, -23, -41); ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(-19, -33, 1.8, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.0;
        ctx.fillRect(-33, 16, 12, 7); ctx.strokeRect(-33, 16, 12, 7);
        ctx.fillRect(20, 16, 12, 7); ctx.strokeRect(20, 16, 12, 7);
        break;
      }`;

const behemothCode = `      case 'behemoth': {
        const footPadY = 33 + gearSpringOffset;
        
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(-32, 14); ctx.lineTo(-38, footPadY);
        ctx.moveTo(32, 14); ctx.lineTo(38, footPadY);
        ctx.stroke();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-24, 18); ctx.lineTo(-38, footPadY);
        ctx.moveTo(24, 18); ctx.lineTo(38, footPadY);
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(-38, footPadY, 7.5, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(38, footPadY, 7.5, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 1.6;
        ctx.fillRect(-36, -12, 22, 28);
        ctx.strokeRect(-36, -12, 22, 28);

        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-34, -4); ctx.lineTo(-16, -4);
        ctx.moveTo(-34, 4); ctx.lineTo(-16, 4);
        ctx.stroke();

        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(-30, -12); ctx.lineTo(-30, -24); ctx.stroke();
        
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(-30, -24); ctx.lineTo(-16, -12); ctx.stroke();

        ctx.fillStyle = '#fdba74';
        ctx.beginPath(); ctx.arc(-30, -24, 2, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#030712';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.4;
        ctx.fillRect(-14, -8, 28, 24);
        ctx.strokeRect(-14, -8, 28, 24);

        if ((ship.loadedTrucksCount || 0) > 0) {
          ctx.save();
          ctx.translate(0, 10);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-10, -4, 20, 8);
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(-10, -4, 20, 8);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(2, -7, 7, 4);
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.arc(-6, 4, 2.2, 0, Math.PI * 2);
          ctx.arc(6, 4, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.lineCap = 'round';
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2.8;
        ctx.beginPath(); ctx.moveTo(-14, 14); ctx.lineTo(-26, 23); ctx.stroke();
        
        ctx.save();
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = '#fed7aa';
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(-14, 14); ctx.lineTo(-26, 23); ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#f97316';
        ctx.beginPath(); ctx.arc(-26, 23, 1.8, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(14, -34); ctx.lineTo(34, -34); ctx.lineTo(36, -26); ctx.lineTo(36, 16); ctx.lineTo(14, 16); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = createTitaniumPlate(-18, 12);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.0;
        ctx.fillRect(16, -18, 18, 30);
        ctx.strokeRect(16, -18, 18, 30);

        ctx.fillStyle = createVisorGrad(24, -26, 9, config.accentColor, config.visorColor);
        ctx.strokeStyle = '#7dd3fc';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(17, -30); ctx.lineTo(31, -30); ctx.lineTo(33, -22); ctx.lineTo(17, -22); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.ellipse(24, -26, 3.5, 1.8, 0, 0, Math.PI*2); ctx.fill();
        ctx.restore();

        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(28, -34); ctx.lineTo(28, -43); ctx.stroke();

        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath(); ctx.moveTo(23, -42); ctx.quadraticCurveTo(28, -39, 33, -42); ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(19, -33, 1.8, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 1.0;
        ctx.fillRect(-30, 16, 12, 7); ctx.strokeRect(-30, 16, 12, 7);
        ctx.fillRect(18, 16, 16, 7); ctx.strokeRect(18, 16, 16, 7);
        break;
      }`;

const leviathanCode = `      case 'leviathan': {
        const footPadY = 34 + gearSpringOffset;
        
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(-34, 12); ctx.lineTo(-40, footPadY);
        ctx.moveTo(32, 12); ctx.lineTo(40, footPadY);
        ctx.stroke();

        ctx.strokeStyle = '#0891b2';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-26, 16); ctx.lineTo(-40, footPadY);
        ctx.moveTo(24, 16); ctx.lineTo(40, footPadY);
        ctx.stroke();

        ctx.fillStyle = '#0891b2';
        ctx.strokeStyle = '#164e63';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(-40, footPadY, 8, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(40, footPadY, 8, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(-38, -18); ctx.lineTo(-32, -28); ctx.lineTo(-10, -28); ctx.lineTo(-10, 16); ctx.lineTo(-38, 16); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = createTitaniumPlate(-12, 12);
        ctx.strokeStyle = '#67e8f9';
        ctx.lineWidth = 1.0;
        ctx.fillRect(-34, -12, 22, 24);
        ctx.strokeRect(-34, -12, 22, 24);

        ctx.fillStyle = createVisorGrad(-22, -22, 8, config.accentColor, config.visorColor);
        ctx.strokeStyle = '#a5f3fc';
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(-22, -22, 6, 3.5, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.ellipse(-24, -23, 2.5, 1.2, 0, 0, Math.PI*2); ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#0891b2';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-10, -14, 26, 5);
        ctx.strokeRect(-10, -14, 26, 5);

        ctx.fillStyle = '#020617';
        ctx.strokeStyle = '#155e75';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-10, -9, 26, 25);
        ctx.strokeRect(-10, -9, 26, 25);

        ctx.lineCap = 'round';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.8;
        ctx.beginPath(); ctx.moveTo(-10, 14); ctx.lineTo(-22, 23); ctx.stroke();

        ctx.fillStyle = '#22d3ee';
        ctx.beginPath(); ctx.arc(-22, 23, 1.8, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#020617';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(16, -38); ctx.lineTo(28, -38); ctx.lineTo(38, -16); ctx.lineTo(38, 16); ctx.lineTo(16, 16); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.strokeStyle = '#a5f3fc';
        ctx.lineWidth = 2.0;
        ctx.beginPath(); ctx.moveTo(22, -38); ctx.lineTo(22, -44); ctx.stroke();

        ctx.strokeStyle = '#22d3ee';
        ctx.beginPath(); ctx.moveTo(17, -43); ctx.quadraticCurveTo(22, -40, 27, -43); ctx.stroke();

        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(20, -10, 14, 4);
        ctx.fillRect(20, -2, 14, 4);

        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-34, 16, 20, 7); ctx.strokeRect(-34, 16, 20, 7);
        ctx.fillRect(22, 16, 12, 7); ctx.strokeRect(22, 16, 12, 7);
        break;
      }`;

const mammothCode = `      case 'mammoth': {
        const footPadY = 34 + gearSpringOffset;
        
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(-32, 14); ctx.lineTo(-38, footPadY);
        ctx.moveTo(32, 14); ctx.lineTo(38, footPadY);
        ctx.stroke();

        ctx.strokeStyle = '#854d0e';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-22, 18); ctx.lineTo(-38, footPadY);
        ctx.moveTo(22, 18); ctx.lineTo(38, footPadY);
        ctx.stroke();

        ctx.fillStyle = '#ca8a04';
        ctx.strokeStyle = '#713f12';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(-38, footPadY, 7.5, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(38, footPadY, 7.5, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 1.8;
        ctx.fillRect(-38, -14, 24, 30);
        ctx.strokeRect(-38, -14, 24, 30);

        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(-32, -14); ctx.lineTo(-38, -28); ctx.stroke();

        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(-24, -14); ctx.lineTo(-38, -28); ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.beginPath(); ctx.arc(-38, -28, 2.2, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.4;
        ctx.fillRect(-14, -8, 28, 24);
        ctx.strokeRect(-14, -8, 28, 24);

        if ((ship.loadedTrucksCount || 0) > 0) {
          ctx.save();
          ctx.translate(0, 10);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-10, -4, 20, 8);
          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(-10, -4, 20, 8);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(2, -7, 7, 4);
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.arc(-6, 4, 2.2, 0, Math.PI * 2);
          ctx.arc(6, 4, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.lineCap = 'round';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2.8;
        ctx.beginPath(); ctx.moveTo(-14, 14); ctx.lineTo(-26, 23); ctx.stroke();

        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(-26, 23, 1.8, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(14, -34); ctx.lineTo(32, -34); ctx.lineTo(38, -18); ctx.lineTo(38, 16); ctx.lineTo(14, 16); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.2;
        ctx.fillRect(18, -12, 16, 24);
        ctx.strokeRect(18, -12, 16, 24);

        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(18, -4); ctx.lineTo(34, -4);
        ctx.moveTo(18, 4); ctx.lineTo(34, 4);
        ctx.stroke();

        ctx.fillStyle = createVisorGrad(23.5, -26, 9, config.accentColor, config.visorColor);
        ctx.strokeStyle = '#fda4af';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(16, -30); ctx.lineTo(30, -30); ctx.lineTo(33, -22); ctx.lineTo(16, -22); ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.ellipse(23, -26, 3.5, 1.8, 0, 0, Math.PI*2); ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(34, -32, 2, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 1.0;
        ctx.fillRect(-30, 16, 12, 7); ctx.strokeRect(-30, 16, 12, 7);
        ctx.fillRect(20, 16, 14, 7); ctx.strokeRect(20, 16, 14, 7);
        break;
      }`;

let code = fs.readFileSync('src/game/renderer.ts', 'utf8');
code = code.replace(
    /const createVisorGrad = \([^)]+\) => \{[^}]+};\s*/,
    match => createTitaniumPlateCode + '\n    ' + match
);

const regex = /case 'goliath':\s*{[\s\S]*?(?=\s*case 'vanguard':)/;
code = code.replace(regex, goliathCode + '\n' + behemothCode + '\n' + leviathanCode + '\n' + mammothCode + '\n');
fs.writeFileSync('src/game/renderer.ts', code);
