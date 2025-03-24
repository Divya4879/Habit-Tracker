# Mindful Metrics

Check it out at:- [Mindful Metrics](https://mindful-metrics.netlify.app)

**Mindful Metrics** is a modern habit tracker and self-improvement application designed to empower users on their journey to a balanced and mindful lifestyle. It leverages the power of KendoReact components to deliver a seamless and visually appealing UI, along with AI-driven insights that help you optimize your daily habits.

![screencapture-mindful-metrics-netlify-app-2025-03-24-06_11_45](https://github.com/user-attachments/assets/50c43515-7903-4fa3-b5eb-7d93d543ca10)


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

1. **@progress/kendo-react-dialogs**
   - **Window**: Provides a floating panel or modal dialog for advanced functionalities, such as displaying forms (e.g., HabitForm, AboutModal) or informational panels.
   - **Dialog**: Used to prompt users for input or display important messages in a modal dialog.
   - **DialogActionsBar**: Supplies a styled container for action buttons within dialogs, ensuring consistency and clear call-to-action placements.

2. **@progress/kendo-react-buttons**
   - **Button**: Offers consistently styled and themed buttons throughout the UI for actions like submitting forms, filtering data, or triggering dialogs.

3. **@progress/kendo-react-dropdowns**
   - **DropDownList**: Enables users to select items (such as time periods or habit filters) from a dropdown menu, simplifying navigation and data selection.
   - **MultiSelect**: Allows for the selection of multiple tags (e.g., when creating or editing habits), enhancing filtering and categorization capabilities.

4. **@progress/kendo-react-grid**
   - **Grid**: Displays and manages habit data efficiently in a tabular format, supporting features like sorting, filtering, and paging.
   - **GridColumn (aliased as Column)**: Defines individual columns within the grid to map different fields of habit data, ensuring clarity and structure.

5. **@progress/kendo-react-layout**
   - **TabStrip**: Organizes content into a tabbed interface, enabling users to switch between different views (such as weekly vs. monthly metrics).
   - **TabStripTab**: Represents each tab within the TabStrip, encapsulating specific sets of data or functionalities.

6. **@progress/kendo-react-charts**
   - **Chart**: Renders interactive and visually appealing charts for analyzing habit streaks and performance.
   - **ChartSeries & ChartSeriesItem**: Plot data points within the charts to display trends over time, such as habit progress or duration changes.
   - **ChartLegend**: Provides a legend that explains the chart's series and color coding, improving data comprehension.
   - **ChartCategoryAxis & ChartCategoryAxisItem**: Configures the x-axis of the charts for clear labeling of time periods (e.g., weekly or monthly views).
   - **ChartValueAxis & ChartValueAxisItem**: Sets up the y-axis to represent numerical values such as habit duration or frequency.

7. **@progress/kendo-react-inputs**
   - **Input**: A basic text input field used in forms to capture user input (e.g., habit names or search queries).
   - **NumericTextBox**: Allows for numeric input with increment/decrement buttons, ideal for setting durations or other numerical values.
   - **TextArea**: Enables multi-line text input for more detailed user entries, such as habit descriptions or notes.

8. **@progress/kendo-react-labels**
   - **Label**: Offers styled label components that display textual hints or form field labels consistently across the UI.

9. **@progress/kendo-react-progressbars**
   - **ProgressBar**: Visualizes progress indicators (e.g., tracking habit streaks or processing states) with customizable styling to match the application’s theme.

10. **@progress/kendo-react-popup**
    - **Popup**: Renders an anchored popup container that displays additional contextual information or actions, enhancing user interaction without disrupting the main layout.

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
