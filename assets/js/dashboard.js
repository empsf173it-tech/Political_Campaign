/* ==========================================================================
   CivicPulse 2026 - Dashboard JavaScript File
   Handles Mobile Sidebar, Tab Navigation, Metric Charts & Interactive Tables
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Toggle for Mobile Devices
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const dashboardSidebar = document.getElementById('dashboardSidebar');

  if (sidebarToggleBtn && dashboardSidebar) {
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    
    sidebarToggleBtn.addEventListener('click', () => {
      dashboardSidebar.classList.toggle('show');
      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('show');
      }
    });

    if (sidebarCloseBtn) {
      sidebarCloseBtn.addEventListener('click', () => {
        dashboardSidebar.classList.remove('show');
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('show');
        }
      });
    }

    // Close when overlay is clicked
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        dashboardSidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
      });
    }

    // Close when ANY button or link in the sidebar is clicked
    dashboardSidebar.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) {
        dashboardSidebar.classList.remove('show');
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('show');
        }
      }
    });
  }

  // 2. Interactive Single-Page Tab Switching for Dashboard Sidebar Buttons
  const navTabBtns = document.querySelectorAll('#dashboardNav [data-tab]');
  const tabPanes = document.querySelectorAll('.dashboard-tab-pane');
  const dashboardTabTitle = document.getElementById('dashboardTabTitle');

  const tabTitles = {
    overview: "Volunteer Campaign Dashboard",
    volunteers: "Volunteer Canvassing Roster",
    contributions: "Grassroots Contributions Breakdown",
    messages: "Campaign Team Message Dispatch",
    settings: "Campaign Account Settings"
  };

  if (navTabBtns.length > 0) {
    navTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = btn.getAttribute('data-tab');

        // Toggle active button style (only 1 button highlighted at a time!)
        navTabBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
        btn.classList.add('active');

        // Toggle tab panes
        tabPanes.forEach(pane => {
          if (pane.id === `tab-${targetTab}`) {
            pane.classList.remove('d-none');
            pane.classList.add('active');
          } else {
            pane.classList.add('d-none');
            pane.classList.remove('active');
          }
        });

        // Update Header Title
        if (dashboardTabTitle && tabTitles[targetTab]) {
          dashboardTabTitle.textContent = tabTitles[targetTab];
        }

        // Re-render chart if switching back to overview
        if (targetTab === 'overview') {
          renderMetricsChart();
        }

        // Auto-close sidebar on mobile view when a tab is selected
        if (dashboardSidebar) {
          dashboardSidebar.classList.remove('show');
          const sidebarOverlay = document.getElementById('sidebarOverlay');
          if (sidebarOverlay) {
            sidebarOverlay.classList.remove('show');
          }
        }
      });
    });
  }

  // 3. Simple Canvas Chart Rendering (Donation & Volunteer Trends)
  function renderMetricsChart() {
    const chartCanvas = document.getElementById('campaignMetricsChart');
    if (chartCanvas && chartCanvas.getContext) {
      const ctx = chartCanvas.getContext('2d');
      
      const width = chartCanvas.parentElement.clientWidth || 600;
      chartCanvas.width = width;
      chartCanvas.height = 280;

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
      const donations = [35, 45, 60, 50, 75, 90, 85, 110];
      const maxVal = 120;
      const padding = 40;
      const barWidth = (width - padding * 2) / months.length - 15;

      ctx.clearRect(0, 0, width, 280);

      // Draw High Contrast Gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padding + (i * (200 / 4));
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Draw Bars
      donations.forEach((val, idx) => {
        const x = padding + idx * (barWidth + 15) + 8;
        const barHeight = (val / maxVal) * 180;
        const y = 240 - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, 240);
        gradient.addColorStop(0, '#60A5FA');
        gradient.addColorStop(1, '#2563EB');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        // Month Label - High Contrast Crisp White Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(months[idx], x + barWidth / 2, 262);
      });
    }
  }

  // Initial Chart Render
  renderMetricsChart();
});
