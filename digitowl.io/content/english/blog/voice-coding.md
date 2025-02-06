---
title: "Voice Coding: Let Your Words Write Your Code"
date: 2025-02-05
tags: ["voice coding", "Cursor", "SuperWhisper", "automation", "AI"]
draft: false
---

Ever dreamed of coding by simply talking to your computer like a modern-day wizard? While **Cursor** may not have a built-in microphone (sorry, no built-in wizardry here), our trusty sidekick **SuperWhisper** swoops in to convert your brilliant verbal commands into text. Think of it as your personal code translator—only cooler and with fewer side effects!

## How It Works: The Dynamic Duo

### 1. **SuperWhisper: Your Voice-to-Text Sidekick**

- **Enable Coding Mode:**  
  Open SuperWhisper’s settings and create a custom mode (like "Python Coding" or "Web Development"). Set a keyboard shortcut (say, `⌥ + Spacebar`) to jump into dictation mode. Now, you're ready to command your code like a boss.

- **Link to Cursor:**  
  In the mode settings, ensure that the **"Activate in Cursor App"** option is enabled. This clever setting makes sure every word you speak goes straight to Cursor’s active window. No lost commands here!

### 2. **From Voice to Code: The Workflow**

- **Speak Your Mind:**  
  Hit your shortcut (`⌥ + Spacebar`), and say something like, “Decrease sidebar padding by half.” SuperWhisper will transcribe your words and automatically copy them to your clipboard. Magic? Almost!

- **Paste in Cursor:**  
  Open Cursor’s Composer with `⌘I` (or start a new session with `⌘N`), then simply press `⌘V` to paste your transcribed command. For an extra dash of wizardry, throw in some context with `@` symbols (e.g., `@Codebase`) to guide the AI for smarter responses.

### 3. **Automation (Optional): Let Your Mac Do the Heavy Lifting**

If you’d rather not manually paste every time, you can automate the process using macOS Automator or AppleScript. Here's a cheeky little example:

```applescript
tell application "SuperWhisper" to activate
delay 0.5
tell application "System Events" to keystroke "v" using command down
