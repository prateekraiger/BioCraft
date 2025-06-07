# BioCraft: AI-Powered Social Media Bio Generator

![BioCraft Screenshot](https://res.cloudinary.com/dk3pg4zly/image/upload/v1749285059/Screenshot_2025-06-07_140034_kzdfuk.png)

BioCraft helps you craft engaging, professional, and platform-optimized bios for Instagram, Twitter, LinkedIn, Facebook, WhatsApp, and more—instantly, with AI.

##  Features

- **AI-Powered Generation:** Personalized bios using GPT-3.5
- **Multi-Platform Support:** Instagram, Twitter, LinkedIn, Facebook, WhatsApp, and more
- **Customization:** Choose tone, add emojis, hashtags, and calls-to-action
- **Character Limit Awareness:** Bios fit each platform's requirements
- **Multiple Options:** Get several creative bios to choose from
- **Fallback Mode:** Local generation if AI API is unavailable
- **Copy to Clipboard:** One-click copy for any generated bio
- **Responsive UI:** Seamless experience on desktop and mobile

## Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router

## Getting Started

### Prerequisites

- Node.js (v14+)
- pnpm

### Installation

1. Clone the repo
2. Install dependencies:
   ```shell
   pnpm i
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_api_key_here
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

### Development

Start the dev server:

```shell
pnpm run dev
```

### Production

Build for production:

```shell
pnpm run build
```

Preview the build:

```shell
pnpm run preview
```

##  Usage

1. Select your social platform
2. Enter keywords, achievements, and interests
3. Choose your bio's purpose and tone
4. Toggle emojis, hashtags, and calls-to-action
5. Click "Generate Bio" to get multiple options
6. Copy your favorite bio and use it anywhere


## License

This project is licensed under the MIT License - see the [Apache License](LICENSE) file for details.
