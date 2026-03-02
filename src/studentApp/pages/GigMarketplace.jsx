import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, DollarSign, Clock, MapPin, Bookmark, Zap, Globe, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/authStore';
import { subscribeToGigs } from '../../lib/gigService';
import { applyForGig } from '../../lib/applicationService';
import toast from 'react-hot-toast';
import PostGigModal from '../components/recruiter/PostGigModal';

const GigMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPostGigOpen, setIsPostGigOpen] = useState(false);
  const categories = ['ALL_NODES', 'WEB_DEV', 'DESIGN_SYS', 'CONTENT_GEN', 'MARKETING_OPS', 'DATA_MINING'];


  const { user } = useAuthStore();
  const isStudent = user && !['mentor', 'alumni/mentor', 'recruiter'].includes(user?.role?.toLowerCase());
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const unsub = subscribeToGigs((data) => setGigs(data));
    return () => unsub();
  }, []);

  const handleApply = async (gig) => {
    if (!user) return;
    try {
      await applyForGig({
        gigId: gig.id,
        studentId: user.uid,
        studentName: user.name || user.email,
        coverLetter: "Standard fast-apply from marketplace",
        recruiterId: gig.postedBy
      });
      toast.success('APPLICATION SUBMITTED: ' + gig.title);
    } catch (err) {
      toast.error('APPLICATION FAILED: ' + err.message);
    }
  };
  return (
    <div className="min-h-screen bg-background font-mono selection:bg-primary selection:text-black flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 relative overflow-y-auto">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
            <div className="flex items-center space-x-4 mb-2">
              <div className="h-px w-10 bg-primary"></div>
              <p className="text-primary text-xs uppercase tracking-widest">Marketplace v3.0</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 shadow-neon">
              GLOBAL_GIG_<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-cyan-400 animate-gradient-x">MARKETPLACE</span>
            </h1>

            {/* Search and Filter */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="INITIATE_QUERY..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-white/5 transition-all text-sm font-mono uppercase"
                />
              </div>
              <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-surface border border-white/10 text-white hover:bg-white/5 hover:border-white transition-all uppercase text-sm tracking-wider font-bold">
                <Filter className="w-4 h-4" />
                <span>Filter_Params</span>
              </button>
              {(user?.role?.toLowerCase() === 'mentor' || user?.role?.toLowerCase() === 'alumni/mentor' || user?.role?.toLowerCase() === 'recruiter') && (
                <button 
                  onClick={() => setIsPostGigOpen(true)}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-black hover:bg-primary-hover transition-all uppercase text-sm tracking-wider font-bold clip-diagonal"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Post_Gig</span>
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${selectedCategory === cat.toLowerCase()
                      ? 'bg-primary text-black border-primary'
                      : 'bg-transparent text-text-muted border-white/10 hover:border-white/50 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gig Cards */}
            <div className="space-y-4">
              {gigs.map((gig, index) => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface border border-white/10 p-6 hover:border-primary/50 transition-all group relative overflow-hidden"
                >
                  {gig.featured && (
                    <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-bold px-3 py-1 uppercase">
                      Priority_Contract
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-16 h-16 bg-black border border-white/20 flex items-center justify-center">
                      {gig.logo}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{gig.title}</h3>
                      <p className="text-text-muted font-mono text-sm mb-4">{gig.recruiterName || gig.company || 'Unknown Entity'}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {(gig.skills || []).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 text-white text-[10px] uppercase font-mono tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-6 text-xs text-text-muted font-mono uppercase tracking-wider">
                        <span className="flex items-center space-x-2">
                          <DollarSign className="w-3 h-3 text-primary" />
                          <span>{gig.budget || 'Negotiable'}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{gig.duration || 'Flexible'}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span>{gig.location || 'Remote'}</span>
                        </span>
                        <span>Posted: {new Date(gig.createdAt).toLocaleDateString()}</span>
                        <span>Status: {gig.status}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                      {isStudent && (
                        <button 
                          onClick={() => handleApply(gig)}
                          className="px-8 py-3 bg-white text-black font-bold uppercase text-xs hover:bg-primary transition-colors clip-diagonal"
                        >
                          Accept_Contract
                        </button>
                      )}
                      <button className="px-8 py-3 border border-white/20 text-white font-bold uppercase text-xs hover:border-white transition-colors">
                        Inspect_Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      <PostGigModal isOpen={isPostGigOpen} onClose={() => setIsPostGigOpen(false)} />
    </div>
  );
};

export default GigMarketplace;
