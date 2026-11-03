# Boddu Durga Bhavani — Data & AI Portfolio

A responsive personal portfolio based on the Data Analyst and ML Data Operations resume details. The site is served as static files by Flask. Edit the page content in `static/index.html`; styling and interactions are in `static/css/style.css` and `static/js/main.js`.

The visual theme pairs blush, lavender, and berry accents with Cormorant Garamond display typography and DM Sans body text. The Seoul-night limited edition includes a short loading animation, decorative string lights, softly glowing table lamps throughout the sections, and drifting ambient lights. The lamps are decorative, not interactive. Motion is reduced automatically when the visitor prefers reduced motion.

## Run locally

Install Python 3.10+, then run:

```powershell
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000.

## Resume-based content

The portfolio uses information listed in the two supplied resumes: education, technical skills, the Heart Disease Detection System academic project, Cognizant Forage virtual experience, certifications, contact details, location, and GitHub profile.

No formal employment, project repository URL, demo URL, or certificate files/verification links were supplied. The supplied profile photo is saved as `static/images/durga-bhavani-profile.png`. The project demo is marked unavailable; the GitHub link goes to the supplied profile rather than an unverified project repository. The contact form has been removed. The contact section provides downloads for both supplied resume versions and links to the supplied LinkedIn profile. Certifications are listed from the resumes; certificate documents can be added when available. Personal details such as date of birth and language list are not displayed.

## Deploy to Netlify

The front end is static. Deploy this folder using `netlify.toml` (publish directory `static`, no build command), or deploy the `static` directory directly. Netlify does not run the Flask server.
