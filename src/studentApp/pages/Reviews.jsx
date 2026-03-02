import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Reviews = () => {
  const reviews = [
    { id: 1, rating: 5, reviewer: 'Tech_Innovations.CORP', project: 'Protocol: E-commerce Build', comment: 'Excellent execution. Code quality exceeds standard parameters.', date: 'JAN 10, 2025' },
    { id: 2, rating: 4, reviewer: 'Startup_XYZ', project: 'UI/UX Design: Mobile Interface', comment: 'Great eye for detail. Delivered ahead of schedule.', date: 'JAN 05, 2025' },
  ];

  return (
    <div className="min-h-screen bg-background font-mono selection:bg-primary selection:text-black">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
            <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-cyan-400 animate-gradient-x">Reputation_Logs</h1>

            <div className="bg-surface border border-white/10 p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-xs text-text-muted uppercase tracking-widest">Aggregate_Score</div>
              <div className="text-center mb-2">
                <div className="text-6xl font-black text-white mb-2 shadow-neon inline-block">4.8</div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < 4 ? 'fill-primary text-primary' : 'text-white/10'}`} />
                  ))}
                </div>
                <div className="text-xs text-text-muted uppercase tracking-widest border-t border-white/10 pt-4 inline-block px-8">Based on 24 Verified Contracts</div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-surface border border-white/10 p-6 hover:bg-white/5 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-white/10'}`} />
                        ))}
                      </div>
                      <div className="font-bold text-white uppercase tracking-wider mb-1 group-hover:text-primary transition-colors">{review.reviewer}</div>
                      <div className="text-xs text-text-muted font-mono">{review.project}</div>
                    </div>
                    <div className="text-xs text-text-muted font-mono border border-white/10 px-2 py-1">{review.date}</div>
                  </div>
                  <p className="text-white/80 font-mono text-sm border-l-2 border-white/10 pl-4">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};
export default Reviews;
