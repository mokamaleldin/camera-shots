# Camera Shots - Interactive Depth of Field & Optics Simulator

An interactive, high-precision web application designed for photographers and cinematographers to simulate, visualize, and calculate depth of field (DoF), hyperfocal distances, and camera exposure in real time.

Developed by **Mohamed Kamaleldin** ([@mokamaleldin](https://github.com/mokamaleldin)).

---

## 📸 Key Features

- **Interactive Scene Diagram:** Real-time visual representation of the camera's field of view (FoV), focus cone, and sharp depth-of-field zone with a draggable subject.
- **Multilingual Support (13 Languages):** Full support for English, Arabic (with native right-to-left RTL layout), German, Spanish, French, Turkish, Russian, Japanese, Chinese, Korean, and more.
- **Accurate Optical Calculations:**
  - Near focus limit, far focus limit, and total depth of field.
  - Hyperfocal distance calculation with a one-click **Set Hyperfocal** button to maximize sharpness.
  - Diffraction warning flag when stopping down past the sensor's diffraction limit.
  - 35mm-equivalent focal length calculation for cropped sensors.
- **Comprehensive Sensor Profiles:**
  - Presets ranging from smartphone sensors and webcams to Micro Four Thirds, APS-C, 35mm Full Frame, and Medium Format (6×6 and 6×7).
  - **Custom Sensor** option allowing exact width and height specification with automated crop factor and Circle of Confusion (CoC) derivation.
- **Gear Catalog & Presets:**
  - Real-world camera and lens combinations (Sony, Canon, Nikon, Fujifilm, Leica, etc.).
  - Quick presets for common setups (Macro, Portrait, Street, Event, Landscape).
- **Lighting & Exposure Engine:**
  - Realistic EV light levels across scenarios (Midday sun, Golden hour, Blue hour, Overcast, Night, Event halls).
  - Exposure controls for shutter speed, aperture, and Auto ISO limits.
  - Video shooting mode with the 180° shutter rule and mains frequency flicker detection (50 Hz / 60 Hz).
  - Lens filters simulation including Variable ND (VND), Circular Polarizer (CPL), and UV filters.
  - Picture profiles: Standard Rec.709 and Log curves with ETTR guidance.
- **Refined, Modern Aesthetic:** Clean, subtle color palette with full light mode and dark mode support.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or newer
- npm, yarn, or pnpm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mokamaleldin/camera-shots.git
cd camera-shots
npm install
```

### Running Locally

Start the Vite development server with hot-module replacement:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

Type-check and create an optimized production build:

```bash
npm run build
```

To preview the generated build:

```bash
npm run preview
```

### Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server |
| `npm run build` | Compiles TypeScript and builds production assets to `dist/` |
| `npm run preview` | Locally serves the production build |
| `npm run lint` | Runs ESLint to verify code quality |
| `npm test` | Executes unit tests via `tsx --test` |

---

## 📐 How the Optics are Calculated

All calculations follow thin-lens optical formulas based on four key inputs: **focal length** ($f$ in mm), **aperture** ($N$, f-number), **subject distance** ($s$ in mm), and the **Circle of Confusion** ($CoC$ in mm) derived from the camera sensor.

### 1. Circle of Confusion (CoC) & Crop Factor

The Circle of Confusion defines the largest blur spot perceived as acceptably sharp. For preset sensors, standard industry constants are utilized (e.g., 0.029 mm for 35mm full frame, 0.019 mm for APS-C).

For a **Custom Sensor**, the CoC is estimated from the sensor diagonal using the standard $\frac{\text{diagonal}}{1500}$ rule of thumb:

$$\text{CoC} = \frac{\sqrt{\text{width}^2 + \text{height}^2}}{1500}$$

The crop factor is calculated relative to a standard 35mm full-frame diagonal ($\approx 43.27\text{ mm}$):

$$\text{Crop Factor} = \frac{43.27}{\sqrt{\text{width}^2 + \text{height}^2}}$$

### 2. Hyperfocal Distance ($H$)

The hyperfocal distance is the focus point that yields acceptable sharpness from half that distance all the way to infinity:

$$H = f + \frac{f^2}{N \times \text{CoC}}$$

### 3. Depth of Field Limits

Given subject distance $s$, focal length $f$, and hyperfocal distance $H$:

$$\text{Near Limit} = \frac{H \times s}{H + (s - f)}$$

$$\text{Far Limit} = \frac{H \times s}{H - (s - f)}$$

- **Total Depth of Field:** $\text{Total DoF} = \text{Far Limit} - \text{Near Limit}$.
- If the subject distance equals or exceeds the hyperfocal distance ($s \ge H$), the far limit extends to **infinity ($\infty$)**.

### 4. Diffraction Limit

Stopping down too far causes optical diffraction as the Airy disk diameter ($0.001342 \times N\text{ mm}$) surpasses the circle of confusion. The threshold aperture is calculated as:

$$N_{\text{diffraction}} = \frac{\text{CoC}}{0.001342}$$

When the selected f-number exceeds this value, a warning is displayed.

---

## 📁 Project Structure

```text
camera-shots/
├── public/                 # Static assets
├── src/
│   ├── App.tsx             # Main application component, state, and optical calculations
│   ├── PhotographyGraphic.tsx # Interactive SVG camera cone & DoF scene visualizer
│   ├── MonitorView.tsx     # Simulated camera monitor preview
│   ├── gear.ts             # Camera mounts, bodies, lenses, and optical specifications
│   ├── lighting.ts         # Photometric calculations, EV scenes, and exposure math
│   ├── i18n.ts             # Internationalization dictionaries (including Arabic & RTL)
│   ├── selectStyles.ts     # Dark/light styling for native select dropdowns
│   ├── main.tsx            # Application entrypoint and Chakra UI theme config
│   └── utils/
│       └── units.ts        # Metric and Imperial distance conversion utilities
├── index.html              # HTML template with dynamic language/direction initialization
├── package.json            # Project dependencies and metadata
└── tsconfig.json           # TypeScript configuration
```

---

## 👨‍💻 Author

Created and customized by **Mohamed Kamaleldin** ([@mokamaleldin](https://github.com/mokamaleldin)).

- GitHub Repository: [https://github.com/mokamaleldin/camera-shots](https://github.com/mokamaleldin/camera-shots)

---

## 📄 License

This project is open-source and released under the [MIT License](./LICENSE.txt).
