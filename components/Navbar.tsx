import React, { useState, useEffect } from 'react';
import { ShoppingBag, WifiOff, Clock, RotateCcw, FileText, Download, Users, DollarSign } from 'lucide-react';
import { AppMode } from '../types';
import { Button } from './Button';

interface NavbarProps {
  mode: AppMode;
  onToggleMode: () => void;
  onShowRecent: () => void;
  onShowReport: () => void;
  onSyncPrices: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onToggleMode,
  onShowRecent,
  onShowReport,
  onSyncPrices
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0 z-20 shadow-sm">
      {/* Brand & Status */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <ShoppingBag size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            SmartBilling<span className="text-blue-600">POS</span>
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
              <WifiOff size={12} />
              <span>Offline</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock size={12} />
              <span className="font-mono">{time.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle & Actions */}
      <div className="flex items-center gap-3">

        {/* Mode Switcher */}
        <div
          className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 mr-2 cursor-pointer"
          onClick={onToggleMode}
          title="Toggle between Auto (Vision) and Manual Mode"
        >
          <div className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === AppMode.MANUAL ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>
            MANUAL
          </div>
          <div className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === AppMode.AUTO ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400'}`}>
            AUTO (AI)
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onSyncPrices}
          title="Simulate Price Sync"
          icon={<DollarSign size={16} />}
        >
          USP
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onShowReport}
          icon={<FileText size={16} />}
        >
          Daily Report
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onShowRecent}
          icon={<RotateCcw size={16} />}
        >
          History
        </Button>
      </div>
    </header>
  );
};