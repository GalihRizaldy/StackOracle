import React, { useState, useEffect } from 'react';
import { Terminal, Server, Database, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const frontends = ['Next.js', 'React (Vite)', 'Vue 3', 'SvelteKit', 'Vanilla HTML/JS (Hardcore Mode)', 'Angular', 'Astro'];
const backends = ['Node.js Express', 'Laravel', 'Go Fiber', 'Rust Actix', 'Python FastAPI', 'Spring Boot', 'Ruby on Rails', 'Elysia.js', 'Hono'];
const databases = ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Supabase', 'Firebase', 'SQLite', 'DuckDB'];

const getChallengeMessage = (fe: string, be: string, db: string) => {
  if (fe.includes('Vanilla') && be.includes('Rust')) return 'Vanilla + Rust? Bersiaplah menjadi developer paling hardcore minggu ini!';
  if (db.includes('Redis') && (be.includes('Go') || be.includes('Rust'))) return 'Kecepatan cahaya! Stack super ngebut siap dieksekusi.';
  if (fe.includes('Next.js') && be.includes('Node.js')) return 'Ah, Fullstack TS klasik. Waktunya membangun startup next unicorn!';
  if (fe.includes('SvelteKit') && db.includes('Supabase')) return 'Modern dan mulus. DX idaman para developer masa kini.';
  if (be.includes('Python')) return 'Bawa AI sekalian ke backend-mu, mumpung pakai Python!';
  if (be.includes('Laravel') && fe.includes('Vue')) return 'Kombinasi andalan! Produktivitas level dewa menantimu.';
  if (fe.includes('Next.js') && be.includes('Rust') && db.includes('Redis')) return 'Wah, bersiaplah menjadi developer super ngebut minggu ini!';
  
  const defaultMessages = [
    'Kombinasi yang unik! Tantangan akhir pekan yang sempurna untuk mengasah skill-mu.',
    'Menarik! Mungkin ini saatnya mengeksplorasi paradigma baru.',
    'Stack yang solid. Silakan buka code editor-mu dan mulai mengetik!',
    'Wah, ini sih bakal jadi project yang seru banget buat dikulik.',
    'Kelihatannya menantang. Berani menerimanya?'
  ];
  return defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
};

export default function App() {
  const [isRolling, setIsRolling] = useState(false);
  const [stack, setStack] = useState({ fe: '???', be: '???', db: '???' });
  const [message, setMessage] = useState('Tekan tombol di bawah untuk menemukan takdir kodemu hari ini.');
  const [hasRolled, setHasRolled] = useState(false);

  const rollStack = () => {
    if (isRolling) return;
    setIsRolling(true);
    setHasRolled(true);
    setMessage('Menghubungkan ke The Grid...');

    let ticks = 0;
    const maxTicks = 20;
    const delay = 80;

    const interval = setInterval(() => {
      setStack({
        fe: frontends[Math.floor(Math.random() * frontends.length)],
        be: backends[Math.floor(Math.random() * backends.length)],
        db: databases[Math.floor(Math.random() * databases.length)],
      });
      ticks++;

      if (ticks >= maxTicks) {
        clearInterval(interval);
        
        const finalFe = frontends[Math.floor(Math.random() * frontends.length)];
        const finalBe = backends[Math.floor(Math.random() * backends.length)];
        const finalDb = databases[Math.floor(Math.random() * databases.length)];
        
        setStack({ fe: finalFe, be: finalBe, db: finalDb });
        setMessage(getChallengeMessage(finalFe, finalBe, finalDb));
        setIsRolling(false);
      }
    }, delay);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col pt-16 sm:pt-24 px-4 overflow-hidden relative">
      
      {/* Background Cyberpunk Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-600/10 blur-[80px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-3xl w-full mx-auto z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            StackOracle
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light border-b border-cyan-500/20 pb-4">
            Terminal Akses Ide. Temukan takdir project akhir pekanmu.
          </p>
        </motion.div>

        {/* Mystery Box / Results */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <TechCard 
            title="Frontend" 
            icon={<Terminal className="w-6 h-6 text-fuchsia-400" />} 
            value={stack.fe} 
            isRolling={isRolling} 
            delay={0}
            color="border-fuchsia-500/30"
            glowColor="shadow-[0_0_15px_rgba(217,70,239,0.15)]"
            textGlow="[text-shadow:_0_0_15px_rgba(217,70,239,1)]"
          />
          
          <TechCard 
            title="Backend" 
            icon={<Server className="w-6 h-6 text-purple-400" />} 
            value={stack.be} 
            isRolling={isRolling} 
            delay={0.1}
            color="border-purple-500/30"
            glowColor="shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            textGlow="[text-shadow:_0_0_15px_rgba(168,85,247,1)]"
          />
          
          <TechCard 
            title="Database" 
            icon={<Database className="w-6 h-6 text-cyan-400" />} 
            value={stack.db} 
            isRolling={isRolling} 
            delay={0.2}
            color="border-cyan-500/30"
            glowColor="shadow-[0_0_15px_rgba(34,211,238,0.15)]"
            textGlow="[text-shadow:_0_0_15px_rgba(34,211,238,1)]"
          />

        </div>

        {/* Challenge Message */}
        <div className="h-20 flex items-center justify-center w-full mb-10">
          {hasRolled && (
             <motion.div 
               key={message}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`text-center px-6 py-4 rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm max-w-2xl ${isRolling ? 'animate-pulse text-cyan-400/70 border-cyan-500/30' : 'text-slate-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]'}`}
             >
               <p className="text-lg flex items-center justify-center gap-2">
                 {!isRolling && <Sparkles className="w-5 h-5 text-fuchsia-400" />}
                 {message}
                 {!isRolling && <Sparkles className="w-5 h-5 text-cyan-400" />}
               </p>
             </motion.div>
          )}
          {!hasRolled && (
            <p className="text-slate-500 animate-pulse">{message}</p>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={rollStack}
          disabled={isRolling}
          className={`
            relative group overflow-hidden rounded-lg px-10 py-5 font-bold text-xl tracking-wide uppercase transition-all
            ${isRolling 
              ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' 
              : 'bg-transparent text-cyan-300 border border-cyan-500 hover:bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]'
            }
          `}
        >
          {/* Button Background Glitch Effect pseudo-element */}
          {!isRolling && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out z-0"></span>
          )}
          <span className="relative z-10 flex items-center justify-center gap-3">
             <Cpu className={`w-6 h-6 ${isRolling ? 'animate-spin' : ''}`} />
            {isRolling ? 'Mencari...' : 'Gacha My Stack!'}
          </span>
        </motion.button>
        
      </div>
    </div>
  );
}

function TechCard({ title, icon, value, isRolling, delay, color, glowColor, textGlow }: { title: string, icon: React.ReactNode, value: string, isRolling: boolean, delay: number, color: string, glowColor: string, textGlow: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border ${color} ${glowColor} transition-all duration-300 ${isRolling ? 'opacity-80 scale-95' : 'hover:-translate-y-1'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
      <div className="mb-4 p-3 bg-slate-950/50 rounded-lg border border-slate-700/50 shadow-inner">
        {icon}
      </div>
      <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-2">{title}</h3>
      <div className="h-10 flex items-center justify-center w-full">
        <p className={`text-xl font-bold text-center transition-all duration-75 ${value === '???' ? 'text-slate-600' : 'text-slate-100'} ${isRolling ? `animate-pulse text-white ${textGlow}` : ''}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}
