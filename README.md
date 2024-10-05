# ⛅ AeroCLI

<img src="./public/banner.png" alt="AeroCLI Banner" style="width: 100%">

Your personal breeze of weather insights. Stay informed with real-time updates and forecasts at your terminal.

---

### 🌟 Features

- **Real-time Weather Updates**: Get real-time weather updates for your location.
- **Weather Forecast**: Get a 7-day weather forecast for your location.

---

### 🚀 Installation

Clone the repository
```bash
git clone https://github.com/Jay-Karia/aero-cli
```

Change the directory
```bash
cd aero-cli
```

Install the dependencies
```bash
pnpm install
```

Link the package
```bash
npm link --local
```

Compile the TypeScript files
```bash
pnpm dev
```

Run the CLI
```bash
aero
```

---

### 📝 Usage

**Current Weather**

```bash
aero current --location <location>
```

**Daily Weather Forecast**

```bash
aero forecast --location <location> --daily
```

**Hourly Weather Forecast**

```bash
aero forecast --location <location> --hourly
```

**Filter by number of days**

```bash
aero forecast --location <location> --daily --days <number>
```

**Help**

```bash
aero
```

or

```bash
aero --help
```

---

**Support me by giving a ⭐ !**