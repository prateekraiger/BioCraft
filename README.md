# Bio Generator - AI-Powered Social Media Bio Creator

![Bio Generator](https://res.cloudinary.com/dk3pg4zly/image/upload/v1749285059/Screenshot_2025-06-07_140034_kzdfuk.png)

Bio Generator is a modern web application that helps users create engaging, professional bios for various social media platforms using AI technology. Built with React, TypeScript, and Vite, this application offers a seamless user experience with a beautiful UI powered by shadcn/ui components.

## Features

- **Multi-Platform Support**: Generate bios for Instagram, Twitter, LinkedIn, Facebook, WhatsApp, and more
- **AI-Powered Generation**: Uses GPT-3.5 to create personalized, engaging bios
- **Customization Options**: Adjust tone, include emojis, hashtags, and calls-to-action
- **Character Limit Awareness**: Automatically trims bios to match platform-specific limits
- **Multiple Options**: Generate several bio variations to choose from
- **Fallback Generation**: Local generation when API is unavailable
- **Copy to Clipboard**: Easily copy your favorite bio with one click
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:

```shell
pnpm i
```

3. Create a `.env` file in the root directory with your API key:

```
VITE_API_KEY=your_api_key_here
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

### Development

Start the development server:

```shell
pnpm run dev
```

### Building for Production

Create a production build:

```shell
pnpm run build
```

Preview the production build:

```shell
pnpm run preview
```

## Usage

1. Select your target social media platform
2. Enter keywords that describe you or your brand
3. Choose the purpose of your bio (personal, business, etc.)
4. Add optional achievements and interests
5. Select your preferred tone
6. Toggle options for emojis, hashtags, and calls-to-action
7. Click "Generate Bio" to create multiple bio options
8. Copy your favorite bio to use on your profile

## License

This project is licensed under the MIT License - see the [Apache License](LICENSE) file for details.
