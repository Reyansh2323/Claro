'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export const FeatureBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative inline-flex items-center justify-center"
    >
      <style jsx>{`
        .feature-badge {
          padding: 10px 20px;
          border: none;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: default;
          position: relative;
          background: linear-gradient(90deg, #5bfcc4, #f593e4, #71a4f0);
          border-radius: 12px;
          color: #fff;
          font-weight: 600;
          box-shadow:
            inset 0px 0px 5px #ffffffa9,
            inset 0px 35px 30px #000,
            0px 5px 10px #000000cc;
          text-shadow: 1px 1px 1px #000;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .feature-badge::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          filter: blur(0);
          z-index: -1;
          background: conic-gradient(
            #00000000 80deg,
            #40baf7,
            #f34ad7,
            #5bfcc4,
            #00000000 280deg
          );
          transition: filter 0.3s ease;
        }

        .feature-badge:hover::before {
          filter: blur(15px);
        }
      `}</style>

      <div className="feature-badge">
        <Zap size={14} className="flex-shrink-0" />
        <span>Powerful Features</span>
      </div>
    </motion.div>
  )
}

export default FeatureBadge
