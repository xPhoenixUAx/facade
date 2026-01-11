# FacadePro Website – Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. **View Your Website**

```
Open any HTML file in your browser:
- index.html (to see the home page)
- Double-click or drag into browser
- All features work immediately (no server needed)
```

### 2. **Project Structure**

```
Root Directory (facade/)
├── 7 HTML Pages (index, services, materials, how-it-works, for-contractors, about, contact)
├── css/style.css (all styling)
├── js/main.js (all interactivity)
├── assets/images/ (for your photos)
└── Documentation files
```

### 3. **Key Files to Know**

- **index.html** → Main landing page
- **css/style.css** → All design and styling
- **js/main.js** → All interactive features
- **contact.html** → Lead form for homeowners

---

## 🎨 Customization Guide

### Change Colors

**File**: `css/style.css`  
**Lines**: 7-21 (CSS variables)

```css
:root {
  --color-charcoal: #1a1a1a;        ← Dark background
  --color-copper: #c17a5c;          ← Interactive elements (MAIN ACCENT)
  --color-off-white: #f5f5f3;       ← Light background
  /* ... other colors ... */
}
```

**Update one color?** Change just that variable.  
**All elements using that color will update automatically.**

### Update Company Name

Search for "FacadePro" in:

1. All HTML files (header logo, footer)
2. Meta descriptions
3. Page titles

Replace with your company name.

### Add Your Logo

In `index.html` (and all pages), look for:

```html
<a href="index.html" class="logo"> <span>◆</span> FacadePro </a>
```

Replace `◆` with your logo character or image tag:

```html
<img src="assets/images/logo.png" alt="Your Company Logo" />
```

### Add Images

1. Place images in `assets/images/`
2. Replace placeholder styling in CSS sections marked for backgrounds
3. Or replace placeholder text with `<img>` tags
4. Always add `alt` text for accessibility

### Change Phone/Email

Search for contact info in:

- `how-it-works.html` (phone link)
- `contact.html` (footer contact info)
- All page footers

Replace with your actual contact details.

---

## 🔌 Form Integration

### Current Form (contact.html)

The form validates and shows success message locally.

### To Make Form Send Emails:

**Option 1: Formspree (Easiest)**

```
1. Go to formspree.io
2. Create account and connect your email
3. Get your form endpoint URL
4. In contact.html, update form action:
   <form id="project-form" action="https://formspree.io/f/YOUR_ID" method="POST">
5. Test it!
```

**Option 2: SendGrid/Mailgun**

```
1. Modify js/main.js handleFormSubmit() function
2. Use fetch() to POST to your backend API
3. Backend receives data and sends email
```

**Option 3: Backend API**

```
1. Create endpoint: /api/submit-form
2. Modify js/main.js to fetch() your API
3. Backend saves data and sends confirmation
```

---

## 📱 Testing Responsive Design

### Test Different Screen Sizes:

1. **Desktop**: Open in browser, maximize window
2. **Tablet**: Resize window to 768px wide
3. **Mobile**: Resize window to 375px wide
4. **Or use Dev Tools**: F12 → Click device icon → Select device

### Test Features:

- ✓ Hamburger menu appears on mobile
- ✓ Text is readable at all sizes
- ✓ Buttons are clickable
- ✓ Forms work on mobile
- ✓ Images scale properly

---

## 🔍 SEO & Meta Tags

### Update Page Titles & Descriptions

**In each HTML file:**

```html
<title>Your Page Title Here – Company Name</title>
<meta name="description" content="Your page description (max 160 chars)" />
```

### Example:

```html
<title>Siding Installation Services – FacadePro</title>
<meta
  name="description"
  content="Professional siding installation services. Get connected with vetted contractors nationwide."
/>
```

---

## 🎯 Deployment Options

### Option 1: GitHub Pages (FREE)

```
1. Create GitHub account
2. Create repository named: username.github.io
3. Upload all facade folder files
4. Site automatically live at: username.github.io/facade
5. Takes ~5 minutes
```

### Option 2: Traditional Hosting

```
1. Upload to hosting via FTP/SFTP
2. Upload entire facade/ folder
3. Set web root to facade/ folder
4. Site live immediately
5. No build process needed
```

### Option 3: Netlify (FREE with custom domain)

```
1. Go to netlify.com
2. Drag & drop facade/ folder
3. Site live instantly
4. Can add custom domain
```

---

## 🧪 Browser Testing

### Test in These Browsers:

- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox
- [ ] Safari (Mac & iPhone)
- [ ] Edge

### What to Check:

- [ ] All links work
- [ ] Menu opens/closes on mobile
- [ ] Form validation works
- [ ] Animations run smoothly
- [ ] Colors display correctly
- [ ] Text is readable

---

## 🛠️ Common Modifications

### Change Service Description

Find in `services.html`, update the text:

```html
<p>Your new service description here...</p>
```

### Modify Material List

Find in `materials.html`, update the list:

```html
<ul class="feature-list">
  <li>Your material feature here</li>
</ul>
```

### Update Timeline

Find in `how-it-works.html`, modify timeline items:

```html
<div class="timeline-item">
  <h3>Step 1: Your Step Name</h3>
  <p>Your step description...</p>
</div>
```

### Add New Section

Copy an existing section, update content, keep same CSS classes.

---

## 📊 Analytics Integration

### Add Google Analytics

Add to `<head>` of every page (before `</head>` tag):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

Replace `GA_ID` with your Google Analytics ID.

---

## ⚡ Performance Optimization

### Already Optimized:

✓ Zero external dependencies (loads fast)
✓ Minimal CSS/JS files
✓ No heavy frameworks
✓ Static HTML (no database delays)

### Can Further Optimize:

- Compress images (use TinyPNG or similar)
- Enable GZIP compression on hosting
- Add caching headers
- Use CDN for images

---

## 🐛 Troubleshooting

### Links Don't Work?

- Check file paths in HTML (should be relative: `./file.html`)
- Ensure all .html files are in root directory

### Styles Look Wrong?

- Ensure `css/style.css` is linked correctly in HTML `<head>`
- Check file path: `<link rel="stylesheet" href="css/style.css">`

### JavaScript Features Don't Work?

- Ensure `js/main.js` is linked before `</body>` tag
- Check browser console for errors (F12 → Console tab)
- Verify file path: `<script src="js/main.js"></script>`

### Form Doesn't Send?

- Form validation happens locally first (shows toast message)
- To actually send: Integrate Formspree or backend API (see Form Integration above)

### Mobile Menu Doesn't Toggle?

- Check that hamburger button appears (resize browser window to <768px)
- Check console for JavaScript errors

---

## 📝 Content Guidelines

### Keep It Professional

- Use confident, clear language
- Avoid slang or overly casual tone
- Be specific with service descriptions
- Include numbers/stats when possible

### SEO Best Practices

- Use H1 once per page (for main title)
- Use H2 for section headers
- Use H3 for subsections
- Write descriptive link text (not "click here")
- Include keywords naturally

### Mobile Copy

- Keep descriptions concise
- Use bullet points
- Short sentences
- Clear CTAs

---

## 🚀 Pre-Launch Checklist

Before going live:

- [ ] Update all company information
- [ ] Replace placeholder text with real content
- [ ] Add your contact information
- [ ] Replace placeholder images/styling
- [ ] Test all links work
- [ ] Test form submission (with Formspree or backend)
- [ ] Test on mobile, tablet, desktop
- [ ] Test in multiple browsers
- [ ] Add Google Analytics
- [ ] Set up contact form forwarding
- [ ] Update meta descriptions for SEO
- [ ] Check spelling/grammar
- [ ] Verify colors represent your brand
- [ ] Test keyboard navigation (Tab through)
- [ ] Deploy to hosting/GitHub Pages

---

## 📞 Support Resources

### If You Need Help:

1. **Check README.md** – Comprehensive documentation
2. **Check FILE_STRUCTURE.md** – File organization
3. **Check PROJECT_COMPLETION.md** – Feature overview
4. **Browser Console** (F12) – See JavaScript errors
5. **VS Code** – Built-in HTML/CSS/JS linting

### Common Questions Answered:

- See `how-it-works.html` for process explanation
- See `about.html` for company information structure
- See `contact.html` for form implementation example

---

## 💡 Pro Tips

1. **Use Find & Replace** (Ctrl+H in most editors)

   - Quickly update "FacadePro" to your company name across all files

2. **Keep Backup**

   - Save original files before major changes

3. **Test Locally First**

   - Open HTML files directly in browser before deploying

4. **Use Browser DevTools**

   - F12 opens developer tools
   - Use responsive design mode to test mobile
   - Use console to debug JavaScript

5. **Consistency is Key**
   - Keep design changes minimal
   - Don't override CSS without understanding impact
   - Test changes across all pages

---

## 🎉 You're All Set!

Your premium FacadePro website is ready to customize and deploy.

**Remember:**

- All features work immediately
- No build process needed
- No dependencies to install
- Static files = fast loading
- Ready for GitHub Pages or any hosting

**Questions?** Check the documentation files included in the project.

---

**Status: ✅ READY TO DEPLOY**

Time to make it yours! 🚀
