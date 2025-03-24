# Mindful Metrics

Check it out at:- [Mindful Metrics](https://mindful-metrics.netlify.app)

**Mindful Metrics** is a modern habit tracker and self-improvement application designed to empower users on their journey to a balanced and mindful lifestyle. It leverages the power of KendoReact components to deliver a seamless and visually appealing UI, along with AI-driven insights that help you optimize your daily habits.

## Project Overview

**Mindful Metrics** is a labor of passion and dedication, developed solely by me, Divya. This project aims to provide users with a comprehensive tool to cultivate mindfulness and achieve personal growth through effective habit tracking and insightful analytics. By integrating advanced technologies and thoughtful design, Mindful Metrics empowers individuals to build positive habits, reflect on their progress, and make informed decisions to enhance their well-being.

### The Power of Habit Tracking

Habit tracking serves as a foundational practice for personal development. By monitoring daily routines, individuals can:

- **Increase Self-Awareness:** Recognize patterns in behavior and identify areas for improvement.
- **Stay Accountable:** : Visual representations of progress help maintain motivation and commitment.
- **Foster Consistency:** : Regular tracking encourages the establishment of lasting habits.

Consistency is key to personal growth, and habit trackers provide the framework needed to succeed. Whether you're trying to exercise more, improve productivity, or build mindfulness, tracking your habits will help make those changes stick.

### A Holistic Approach to Well-Being

Mindful Metrics is more than just a habit tracker; it's a holistic tool designed to support overall well-being. By combining habit tracking with data analytics, users can:

- **Achieve Balance:** : Manage various aspects of life, from work to personal health, ensuring a harmonious lifestyle.
- **Set and Reach Goals:** : Define clear objectives and utilize the app's features to accomplish them systematically.
- **Reflect and Grow:** : Regular reflection prompts encourage mindfulness and continuous personal development.

Embark on your journey to mindfulness and personal growth with Mindful Metrics, and experience the transformative power of informed habit tracking. 🌟📈🧘‍♂️

## Features

- **Intuitive Habit Tracking:**  
  Log and monitor your daily habits easily with a user-friendly interface.

- **AI-Powered Feedback:**  
  Receive personalized, actionable insights powered by advanced AI that analyzes your habits across multiple areas of life.

- **Interactive Streak Analytics:**  
  Visualize your habit streaks using dynamic charts with both weekly and monthly views, powered by KendoReact.

- **Multi-View Dashboard:**  
  Switch seamlessly between different views including Tracker, Streak- Weekly & Monthly and Day's Progress (pie charts).

- **Customizable UI & Theming:**  
  Toggle between light and dark themes for an optimal viewing experience. The UI leverages CSS variables and KendoReact’s theme capabilities for a consistent look and feel.

- **Responsive & Modern Design:**  
  Enjoy a fully responsive layout built with KendoReact’s robust grid, charts, dropdowns, and many other UI components.

## KendoReact Integration

Mindful Metrics makes extensive use of KendoReact components to build its modern UI. Here are more than 10 of the KendoReact components integrated into the project:

1. **KendoReact Grid:**  
   Displays and manages habit data efficiently.
2. **KendoReact Chart:**  
   Renders interactive charts for analyzing habit streaks.
3. **ChartSeries & ChartSeriesItem:**  
   Used to plot data within the charts.
4. **ChartCategoryAxis & ChartCategoryAxisItem:**  
   Configures the x-axis for both weekly and monthly streak views.
5. **ChartValueAxis & ChartValueAxisItem:**  
   Sets up the y-axis for the charts.
6. **ChartTooltip:**  
   Provides custom tooltips that display detailed information, including date and duration.
7. **KendoReact DropDownList:**  
   Enables selection for time period and habit filtering in the dashboard.
8. **KendoReact MultiSelect:**  
   Allows users to select multiple tags when creating or editing habits.
9. **KendoReact Window (Dialogs):**  
   Used for modal dialogs in forms (e.g., HabitForm and AboutModal).
10. **KendoReact Button:**  
    Provides consistent and styled button components across the UI.

And more components.

These components contribute to a polished, professional, and cohesive design, ensuring that the application not only functions well but also provides an exceptional user experience.

## Technologies

- **React & TypeScript:** Building a robust and maintainable front-end.
- **KendoReact:** A comprehensive suite of UI components for a high-quality user experience.
- **SCSS:** For advanced styling and theme management.
- **Netlify:** For seamless deployment and continuous delivery.
- **AI Integration:** Custom API integration for AI-driven habit insights.(Groq Ai APi used)

## Installation

1. **Clone the Repository:**

   ```
   git clone https://github.com/Divya4879/habit-tracker.git
   cd habit-tracker
   ```
   
2. Install Dependencies:

Ensure you have Node.js installed. Then run:

```
npm install
```

3. Set Up Environment Variables:

Create a .env file in the project root and add the following:

```
REACT_APP_API_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
REACT_APP_API_KEY=your_api_key_here
REACT_APP_MODEL_NAME=llama3-8b-8192
```
Note: Add .env to your .gitignore to protect sensitive information.

4. Run the Development Server:

```
npm start
```

## Deployment
Mindful Metrics is deployed via Netlify. Follow these steps for manual deployment without using GitHub:

1. Build the Application:

```
npm run build
```

2. Install Netlify CLI (if needed):

```
npm install -g netlify-cli
```

3. Configure netlify.toml:

Ensure your netlify.toml file in the project root is configured as follows:

```
[build]
  command = "npm run build"
  publish = "build"
  # functions = "netlify/functions"  # Uncomment if you have serverless functions

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

4. Deploy the Site:

```
netlify deploy --prod
```

Follow the prompts to select the correct build directory (build) and deploy your site.

## Automatic Deployment
To have local code changes automatically reflected on your Netlify site without GitHub:

Option 1: Manual Redeployment:
After making changes, run npm run build and then run:

```
netlify deploy --prod
```

Option 2: Automated Watcher:
Install chokidar-cli globally and add a script in your package.json:

```
"scripts": {
  "build": "react-scripts build",
  "deploy": "netlify deploy --prod",
  "watch-deploy": "chokidar 'src/**/*' -c 'npm run build && netlify deploy --prod'"
}
```

Then run:

```
npm run watch-deploy
```

This will watch for changes in your src folder, rebuild, and redeploy your site automatically.

## Usage
After deployment, users can:

- Log and track their daily habits.

- Receive personalized AI feedback for habit improvement.

- Analyze their streaks and progress with interactive charts.

- Enjoy a responsive, theme-adaptive UI built with KendoReact components.

## Contributing
Contributions are welcome!

1. Fork the repository.

2. Create a feature branch.
   
```
(git checkout -b feature/YourFeature)
```

3. Commit your changes.

```
(git commit -m 'Add some feature')
```

4. Push to the branch
```
git push origin feature/YourFeature
```

5. Open a pull request.
