# Project Screenshot Generator

This tool captures screenshots of project websites for use in your portfolio site.

## How to Use

1. Make sure Docker is running on your machine.

2. Navigate to this directory in your terminal:
   ```
   cd /Volumes/PRO-G40/Workspace-G40/dk-portfolio-windsurf/puppeteer-screenshot
   ```

3. Run the screenshot tool:
   ```
   docker-compose up
   ```

4. Screenshots will be saved to the `images` directory.

5. After capturing, copy the images to your project's public directory:
   ```
   mkdir -p ../public/images/projects
   cp images/* ../public/images/projects/
   ```

## Customizing

To add or modify the websites to screenshot, edit the `projects` array in `screenshot.js`.
