# Eve – Patient Portal

A patient portal for fertility clinics, powered by the [ElevenLabs Conversational AI](https://elevenlabs.io) widget. Patients can talk to Eve (the AI assistant) to schedule appointments, ask questions, and leave messages for staff.

## Features

- **Patient portal** (`public/index.html`) – Welcome screen, dashboard, and Eve voice assistant
- **Clinic dashboard** (`public/dashboard.html`) – Call history, transcripts, and appointment tracking
- **Scheduling integrations** – Calendly links for ultrasounds, lab work, prenatal checkups, and doctor consultations
- **Call tracking** – Transcripts, scheduled appointments, and staff messages stored in localStorage and synced to the dashboard

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Eve.git
cd Eve
```

### 2. Configure environment

Copy the example env file and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` and set your values. If you have an existing `.env`, add the `CLINIC_*` variables so they're included when `config.js` is generated:


| Variable | Required | Description |
|----------|----------|-------------|
| `ELEVENLABS_AGENT_ID` | Yes | Your ElevenLabs Conversational AI agent ID |
| `ZAPIER_INTAKE_EMAIL_HOOK_URL` | No | Zapier webhook URL for intake emails |
| `CLINIC_NAME` | No | Clinic name (default: "Clinic") |
| `CLINIC_ADDRESS` | No | Street address for map and directions |
| `CLINIC_PHONE` | No | Phone number |

### 3. Install dependencies and run

```bash
npm install
npm run serve
```

This generates `public/config.js` from `.env` and serves the app at `http://localhost:3000`.

- **Patient portal:** http://localhost:3000/ (or /index.html)
- **Clinic dashboard:** http://localhost:3000/dashboard.html

### Manual build

To generate `config.js` without serving:

```bash
npm run build
```

## Project structure

```
Eve/
├── public/                 # Static assets (served root)
│   ├── index.html          # Patient portal (main view)
│   ├── dashboard.html      # Clinic staff dashboard
│   ├── config.js           # Generated from .env (do not commit)
│   └── assets/
│       └── images/         # Logo, sidebar, etc.
│           ├── logo.png
│           └── sidebar.png
├── scripts/
│   └── inject-config.js    # Build: .env → public/config.js
├── .env.example            # Template for .env
├── .env                    # Your secrets (do not commit)
├── package.json
└── README.md
```

## Notes

- `config.js` is generated from `.env` and contains your agent ID. It is gitignored.
- The clinic dashboard uses `localStorage` and `BroadcastChannel` to stay in sync with the patient portal when both are open.
- Replace `public/assets/images/logo.png` and `public/assets/images/sidebar.png` with your clinic’s branding.
