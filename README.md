# 📘 VocabAccent - English Learning Web App

VocabAccent is a dynamic and responsive English learning platform designed to help users improve their vocabulary and pronunciation through interactive lessons, modals, and voice support. This app integrates custom fonts, smooth UI navigation, and API-based dynamic content loading.

---

## 🧩 Core Features

1. **User Authentication**  
   - Login with name and password validation using SweetAlert2. Shows/hides sections based on login status.

2. **Dynamic Vocabulary Lessons**  
   - Fetches and displays lessons and words from external APIs. Words are shown in cards with meaning, pronunciation, and interaction buttons.

3. **Word Details Modal**  
   - On clicking the details icon, opens a modal with example sentences, synonyms, and a close button.

4. **Voice Pronunciation Support**  
   - Uses the Web Speech API to pronounce words aloud on clicking the sound icon.

5. **FAQ Section with JavaScript Concepts**  
   - Displays answers to key JavaScript topics like `var/let/const`, arrow functions, promises, closures, etc.

6. **Smooth Navigation & UI Behavior**  
   - Fixed navbar with smooth scrolling to sections and visual state changes like active buttons and spinners.

7. **Custom Bengali Font Integration**  
   - Locally integrated Bengali font applied to all Bangla words for a native experience.

---

## 🚀 Live Preview
[Live Site Link]()

---

## 🛠️ Features in Detail

### 🔐 Authentication
- Functional login form with validation and alerts via SweetAlert2
- Shows main content (Navbar, Vocabulary, FAQ) only after successful login
- Logout hides main content and shows login banner again

### 📌 Navigation & Layout
- Fixed top navbar with logo and brand name
- Buttons: FAQ, Learn, Logout with smooth scrolling
- Banner shown only before login; footer always visible

### 📚 Vocabulary Section
- Dynamic lesson buttons loaded from API
- Vocabulary cards displaying word, meaning, pronunciation, and interactive buttons
- “No Word Found” message if lesson has no words

### 🔍 Word Details Modal
- Opens on details icon click with example sentences, synonyms, and pronunciation
- Close modal with “Complete Learning” button

### 🔊 Speech Pronunciation
- Pronounces words using browser’s speech synthesis API

### ❓ FAQ Section
- Covers common JavaScript questions for learners

### 🌀 Loading Spinner
- Displays while data is loading from API endpoints

### 🇧🇩 Bengali Font Support
- Local Bengali font integrated and applied to Bangla words



## 🧰 Technologies Used

- HTML, CSS, JavaScript
- DOM Manipulation
- [SweetAlert2](https://sweetalert2.github.io/#download)
- Web Speech API (`SpeechSynthesisUtterance`)
- Custom Fonts
- Smooth Scroll

---