# Eve – Patient Portal

A patient portal for fertility clinics, powered by the [ElevenLabs Conversational AI](https://elevenlabs.io) widget. Patients can talk to Eve (the AI assistant) to schedule appointments, ask questions, and leave messages for staff.

## Features

- **Patient portal** (`eve-agent.html`) – Welcome screen, dashboard, and Eve voice assistant
- **Clinic dashboard** (`clinic-dashboard.html`) – Call history, transcripts, and appointment tracking
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

This generates `config.js` from `.env` and serves the app at `http://localhost:3000`.

### Manual build

To generate `config.js` without serving:

```bash
node inject-config.js
```

## Project structure

```
Eve/
├── eve-agent.html      # Patient portal (main view)
├── clinic-dashboard.html  # Staff call history dashboard
├── inject-config.js    # Build script: .env → config.js
├── config.js           # Generated; loaded by HTML (do not commit)
├── .env.example        # Template for .env
├── .env                # Your secrets (do not commit)
└── package.json
```

## Notes

- `config.js` is generated from `.env` and contains your agent ID. It is gitignored.
- The clinic dashboard uses `localStorage` and `BroadcastChannel` to stay in sync with the patient portal when both are open.
- Replace the logo and sidebar images with your clinic’s branding.
