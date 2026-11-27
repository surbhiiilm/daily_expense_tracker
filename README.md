# Daily Expense Tracker

A simple web app to record daily expenses. Built for a Cloud Computing subject using plain HTML, CSS and JavaScript, and served with Nginx in Docker.

## Features

- Add an expense (name, amount, category)
- Delete any expense
- Categories: Food, Shopping, Travel, Education, Other
- Total spent is calculated automatically (shown in green)
- All expenses shown in a table
- Data is saved in the browser's LocalStorage, so it stays after refreshing

## Technologies

- HTML, CSS, Vanilla JavaScript
- Browser LocalStorage
- Docker + Nginx

## Project Structure

```
daily-expense-tracker/
├── index.html     # Page structure
├── style.css      # Styling
├── script.js      # App logic + LocalStorage
├── Dockerfile     # Builds the Nginx image
├── .dockerignore  # Files Docker should skip
└── README.md      # This file
```

## Run Locally (without Docker)

1. Download or copy the project folder.
2. Double-click `index.html` to open it in your browser.

That's it. No installation needed.

(Optional) To use a local server instead, run this inside the project folder and open http://localhost:8000:

```
python -m http.server 8000
```

## Run with Docker Desktop

Make sure Docker Desktop is running, then open a terminal in the project folder.

**1. Build the image**

```
docker build -t daily-expense-tracker .
```

**2. Run the container**

```
docker run -d -p 8080:80 --name expense-tracker daily-expense-tracker
```

**3. Open the app**

Go to http://localhost:8080

**Useful commands**

```
docker ps                      # see running containers
docker stop expense-tracker    # stop the container
docker start expense-tracker   # start it again
docker rm expense-tracker      # remove the container (stop it first)
docker rmi daily-expense-tracker   # remove the image
```

## Deploy on Render (Docker)

1. Push this project to a GitHub repository (all files in the root of the repo).
2. Go to https://render.com and sign in.
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository.
5. Set **Language / Runtime** to **Docker**. Render finds the `Dockerfile` automatically.
6. Choose the **Free** instance type and click **Create Web Service**.
7. Wait for the build to finish. Render gives you a public URL like `https://daily-expense-tracker.onrender.com`.

Notes:
- Nginx listens on port 80, and Render detects it automatically.
- LocalStorage is saved per browser, so expenses added on one device will not appear on another.
- Free Render services may sleep when idle, so the first load can take a short while.

## How It Works

1. `script.js` reads saved expenses from LocalStorage when the page loads.
2. When you submit the form, a new expense is added to a list and saved.
3. Clicking **Delete** removes that expense from the list and saves again.
4. After every change, the table and total are redrawn.

## Changing the Currency

The app uses the ₹ symbol. To change it, replace `₹` in `index.html` and `script.js` with your symbol (for example `$`).
