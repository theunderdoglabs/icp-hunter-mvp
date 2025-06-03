import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TrophyRoomPage from './pages/TrophyRoomPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultsPage from './pages/ResultsPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Background ambient particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <Header />
      
      {/* Main content with top padding for fixed header */}
      <main className="pt-16 min-h-screen flex flex-col relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trophy-room" element={<TrophyRoomPage />} />
          <Route path="/checkout/:username" element={<CheckoutPage />} />
          <Route path="/processing/:username" element={<ProcessingPage />} />
          <Route path="/results/:username" element={<ResultsPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;