# Mindful Metrics

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://mindful-metrics.netlify.app)

**Mindful Metrics** is a modern habit tracker and self-improvement application designed to empower users on their journey to a balanced and mindful lifestyle. It leverages the power of KendoReact components to deliver a seamless and visually appealing UI, along with AI-driven insights that help you optimize your daily routines.

## Table of Contents

- [Features](#features)
- [KendoReact Integration](#kendoreact-integration)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Intuitive Habit Tracking:**  
  Log and monitor your daily habits easily with a user-friendly interface.

- **AI-Powered Feedback:**  
  Receive personalized, actionable insights powered by advanced AI that analyzes your habits across multiple dimensions.

- **Interactive Streak Analytics:**  
  Visualize your habit streaks using dynamic charts with both weekly and monthly views, powered by KendoReact.

- **Multi-View Dashboard:**  
  Switch seamlessly between different views including Tracker, Streak, Focus (pie charts), and Task Completion.

- **Customizable UI & Theming:**  
  Toggle between light and dark themes for an optimal viewing experience. The UI leverages CSS variables and KendoReact’s theme capabilities for a consistent look and feel.

- **Responsive & Modern Design:**  
  Enjoy a fully responsive layout built with KendoReact’s robust grid, charts, dropdowns, and other UI components.

## KendoReact Integration

Mindful Metrics uses a comprehensive suite of [KendoReact components](https://www.telerik.com/kendo-react-ui/components/) to build a polished and interactive UI, including:

- **KendoReact Grid:** Efficiently display and manage your habits.
- **KendoReact Charts:** Interactive column charts for visualizing habit streaks and trends.
- **KendoReact Dropdowns:** Elegant dropdown lists and multi-selects for easy habit categorization.
- **KendoReact Dialogs:** Modal windows for adding and editing habits.
- **KendoReact Buttons & Notifications:** Consistent and attractive UI elements that enhance user interaction.

These components are highly customizable, enabling you to tailor the design to your brand and user preferences.

## Technologies

- **React & TypeScript:** Building a robust and maintainable front-end.
- **KendoReact:** A comprehensive suite of UI components for a high-quality user experience.
- **SCSS:** For advanced styling and theme management.
- **Netlify:** For seamless deployment and continuous delivery.
- **AI Integration:** Custom API integration for AI-driven habit insights.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/habit-tracker.git
   cd habit-tracker
Install Dependencies:

Ensure you have Node.js installed. Then run:

bash
Copy
Edit
npm install
Set Up Environment Variables:

Create a .env file in the project root and add the following:

env
Copy
Edit
REACT_APP_API_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
REACT_APP_API_KEY=your_api_key_here
REACT_APP_MODEL_NAME=llama3-8b-8192
Note: Add .env to your .gitignore to protect sensitive information.

Run the Development Server:

bash
Copy
Edit
npm start
Deployment
Mindful Metrics is deployed via Netlify. Follow these steps for manual deployment without using GitHub:

Build the Application:

bash
Copy
Edit
npm run build
Install Netlify CLI (if needed):

bash
Copy
Edit
npm install -g netlify-cli
Configure netlify.toml:

Ensure your netlify.toml file in the project root is configured as follows:

toml
Copy
Edit
[build]
  command = "npm run build"
  publish = "build"
  # functions = "netlify/functions"  # Uncomment if you have serverless functions

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
Deploy the Site:

bash
Copy
Edit
netlify deploy --prod
Follow the prompts to select the correct build directory (build) and deploy your site.

Automatic Deployment
To have local code changes automatically reflected on your Netlify site without GitHub:

Option 1: Manual Redeployment:
After making changes, run npm run build and then netlify deploy --prod.

Option 2: Automated Watcher:
Install chokidar-cli globally and add a script in your package.json:

json
Copy
Edit
"scripts": {
  "build": "react-scripts build",
  "deploy": "netlify deploy --prod",
  "watch-deploy": "chokidar 'src/**/*' -c 'npm run build && netlify deploy --prod'"
}
Then run:

bash
Copy
Edit
npm run watch-deploy
This will watch for changes in your src folder, rebuild, and redeploy your site automatically.

Usage
After deployment, users can:

Log and track their daily habits.

Receive personalized AI feedback for habit improvement.

Analyze their streaks and progress with interactive charts.

Enjoy a responsive, theme-adaptive UI built with KendoReact components.

Contributing
Contributions are welcome!

Fork the repository.

Create a feature branch (git checkout -b feature/YourFeature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeature).

Open a pull request.

License
This project is licensed under the MIT License.