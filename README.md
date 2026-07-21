# BlowkeyG - Privacy-Focused Web Browser

A modern, privacy-first web browser built with HTML, CSS, and JavaScript. Features DuckDuckGo search integration, built-in ad blocker, tracker protection, and a beautiful homescreen.

## Features

✨ **Privacy-First Design**
- DuckDuckGo integration as default search engine
- Built-in ad blocker
- Tracker protection
- No tracking or telemetry

🎨 **Modern UI**
- Beautiful dark theme
- Responsive design (desktop & mobile)
- Quick access shortcuts
- Intuitive navigation

🔒 **Security Features**
- Ad blocking with pattern matching
- Tracker blocking (analytics, beacons, pixels)
- HTTPS support
- Security indicators

⚙️ **Customizable Settings**
- Toggle ad blocker on/off
- Toggle tracking protection
- Dark mode (enabled by default)
- Quick link customization

## Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/blowkeygyt-sudo/BlowkeyG-Web.git
cd BlowkeyG-Web
```

### 2. Open in Browser
- Double-click `index.html` or
- Open with your preferred browser
- Serve locally with a simple HTTP server:
  ```bash
  python3 -m http.server 8000
  # Then visit http://localhost:8000
  ```

### 3. Open in VS Code
- Open the project folder in VS Code
- Right-click `index.html` → "Open with Live Server" (if extension installed)
- Or use the command palette: `Live Server: Open with Live Server`

## File Structure

```
BlowkeyG-Web/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── app.js              # Main application logic
├── ad-blocker.js       # Ad blocking & tracker protection
└── README.md           # Documentation
```

## How It Works

### Homescreen
- Central search box powered by DuckDuckGo
- Quick access shortcuts to popular sites
- Clean, distraction-free interface

### Browser
- Address bar for entering URLs or search queries
- Integrated content viewer
- Real-time ad/tracker blocking statistics
- Displays blocked ads and trackers count

### Settings
- **Ad Blocker**: Block banner ads and sponsored content
- **Tracking Protection**: Block analytics and tracking pixels
- **Dark Mode**: Eye-friendly dark theme
- **Search Engine**: Set to DuckDuckGo by default

### Ad Blocker
- Blocks requests to known ad networks
- Removes ad elements from DOM
- Blocks tracking pixels and beacons
- Pattern-based detection of common ad URLs

Supported block list includes:
- Google Ads (AdSense, AdX)
- Facebook Tracking
- Double Click
- Amazon Ads
- Criteo, Taboola, Outbrain
- And many more...

## Privacy Features

- **No Data Collection**: All browsing happens locally
- **DuckDuckGo Integration**: Privacy-respecting search
- **Tracker Blocking**: Stops analytics and marketing trackers
- **Ad Blocking**: Removes invasive advertisements
- **No Cookies**: Optional cookie management

## Customization

### Add Quick Links
Edit the quick links in `app.js`:

```javascript
<div class="quick-link" data-url="https://example.com">
    <div class="quick-link-title">📌 Site Name</div>
    <small>Description</small>
</div>
```

### Customize Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --accent-color: #0f3460;
    --text-color: #eaeaea;
}
```

## Browser Compatibility

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Known Limitations

- Some websites may not load in the embedded view (CORS policy)
- Ad blocking may not work on all ad networks
- This is a web-based browser, not a system-level browser

## Future Enhancements

- [ ] History management
- [ ] Bookmarks system
- [ ] Password manager integration
- [ ] VPN integration
- [ ] Extension support
- [ ] Sync across devices
- [ ] Advanced privacy settings
- [ ] Custom block lists

## Contributing

Feel free to fork, modify, and improve this project!

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues, features requests, or contributions, please open an issue on GitHub.

---

**Privacy First, Always** 🔒
