/**
 * Cyber Attack Dashboard - Dynamic Threat Monitor
 * Simulates real-time threat detection and system monitoring
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    logUpdateInterval: 2000,      // New log entry every 2 seconds
    counterUpdateInterval: 150,   // Counter increments every 150ms
    barOscillateInterval: 3000,   // Status bars update every 3 seconds
    maxLogEntries: 50,            // Maximum log entries to keep
    counterIncrement: 1,          // How much to increment counter each time
  };

  // Threat types and targets for realistic log generation
  const THREATS = {
    types: [
      'SQL_INJECTION',
      'XSS_ATTACK',
      'DDOS_ATTEMPT',
      'BRUTE_FORCE',
      'MALWARE_DETECTED',
      'ZERO_DAY_EXPLOIT',
      'PHISHING_DETECTED',
      'RANSOMWARE_BLOCKED',
      'PORT_SCAN',
      'PRIVILEGE_ESCALATION'
    ],
    targets: [
      'SQL_DB',
      'WEB_SERVER',
      'AUTH_SYSTEM',
      'API_GATEWAY',
      'USER_PORTAL',
      'ADMIN_PANEL',
      'FILE_SERVER',
      'EMAIL_SERVER',
      'DNS_SERVER',
      'PAYMENT_GATEWAY'
    ],
    actions: [
      'BLOCKED (AI_CORE_V3)',
      'QUARANTINED (FIREWALL)',
      'NEUTRALIZED (ZERO_DAY)',
      'TERMINATED (NEURAL_NET)',
      'ISOLATED (SANDBOX)',
      'DENIED (AI_FIREWALL)'
    ]
  };

  // System status bars configuration
  const STATUS_BARS = [
    { id: 'firewall', min: 96, max: 100, name: 'AI FIREWALL STATUS' },
    { id: 'analysis', min: 98, max: 100, name: 'REAL-TIME ANALYSIS' },
    { id: 'zeroday', min: 92, max: 96, name: 'ZERO-DAY PREVENTION' },
    { id: 'neural', min: 94, max: 98, name: 'NEURAL CORE V3' }
  ];

  // Global state
  let threatCounter = 12847; // Starting number
  let logEntries = [];

  /**
   * Generate random IP address
   */
  function generateIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  /**
   * Get current time in HH:MM:SS format
   */
  function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  /**
   * Generate random threat log entry
   */
  function generateLogEntry() {
    const type = THREATS.types[Math.floor(Math.random() * THREATS.types.length)];
    const target = THREATS.targets[Math.floor(Math.random() * THREATS.targets.length)];
    const action = THREATS.actions[Math.floor(Math.random() * THREATS.actions.length)];
    const ip = generateIP();
    const time = getCurrentTime();

    return {
      time,
      type,
      target,
      action,
      ip
    };
  }

  /**
   * Create HTML for log entry
   */
  function createLogEntryHTML(entry) {
    return `
      <div class="log-entry">
        <span class="log-time">[${entry.time}]</span>
        <span class="log-type">${entry.type}</span>
        <span class="log-details">
          IP: <span class="log-ip">${entry.ip}</span> >
          TARGET: ${entry.target} >
          ACTION: <span class="log-action">${entry.action}</span>
        </span>
      </div>
    `;
  }

  /**
   * Add new log entry to the terminal
   */
  function addLogEntry() {
    const logContainer = document.getElementById('threatLog');
    if (!logContainer) return;

    const entry = generateLogEntry();
    logEntries.push(entry);

    // Keep only the last N entries
    if (logEntries.length > CONFIG.maxLogEntries) {
      logEntries.shift();
    }

    // Add new entry
    const entryHTML = createLogEntryHTML(entry);
    logContainer.insertAdjacentHTML('beforeend', entryHTML);

    // Remove oldest if too many
    const entries = logContainer.querySelectorAll('.log-entry');
    if (entries.length > CONFIG.maxLogEntries) {
      entries[0].remove();
    }

    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  /**
   * Update threat counter with glitch effect
   */
  function updateThreatCounter() {
    threatCounter += CONFIG.counterIncrement;

    const counterDigits = document.querySelectorAll('.counter-digit');
    if (!counterDigits.length) return;

    // Convert counter to 5-digit string
    const counterStr = String(threatCounter).padStart(5, '0');

    // Update each digit
    counterDigits.forEach((digit, index) => {
      const newValue = counterStr[index];

      // Add glitch effect randomly
      if (Math.random() > 0.7) {
        digit.classList.add('glitch');
        setTimeout(() => digit.classList.remove('glitch'), 300);
      }

      digit.textContent = newValue;
    });
  }

  /**
   * Oscillate status bar values
   */
  function oscillateStatusBars() {
    STATUS_BARS.forEach(bar => {
      const fillElement = document.querySelector(`#${bar.id}-bar .status-fill`);
      const percentElement = document.getElementById(`${bar.id}-percent`);

      if (!fillElement || !percentElement) return;

      // Generate random value within range
      const value = Math.floor(Math.random() * (bar.max - bar.min + 1)) + bar.min;

      // Update bar and percentage
      fillElement.style.width = `${value}%`;
      percentElement.textContent = `${value}%`;
    });
  }

  /**
   * Initialize the dashboard with some initial log entries
   */
  function initializeDashboard() {
    // Add initial log entries
    for (let i = 0; i < 10; i++) {
      addLogEntry();
    }

    // Start intervals
    setInterval(addLogEntry, CONFIG.logUpdateInterval);
    setInterval(updateThreatCounter, CONFIG.counterUpdateInterval);
    setInterval(oscillateStatusBars, CONFIG.barOscillateInterval);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
  } else {
    initializeDashboard();
  }
})();
