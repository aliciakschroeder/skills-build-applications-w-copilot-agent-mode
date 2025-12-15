# OctoFit Tracker Codespace Setup - Testing Guide

## Updates Made

### 1. **settings.py** - Updated ALLOWED_HOSTS
- Added `import os` at the top of the file
- Replaced wildcard `ALLOWED_HOSTS = ['*']` with:
  ```python
  ALLOWED_HOSTS = ['localhost', '127.0.0.1']
  if os.environ.get('CODESPACE_NAME'):
      ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
  ```
- This allows the Django backend to work on both localhost and the GitHub Codespaces URL

### 2. **urls.py** - Added Codespace URL Configuration
- Added `import os` and environment variable handling:
  ```python
  codespace_name = os.environ.get('CODESPACE_NAME')
  if codespace_name:
      base_url = f"https://{codespace_name}-8000.app.github.dev"
  else:
      base_url = "http://localhost:8000"
  ```
- This ensures the REST API uses the correct base URL depending on the environment
- The `base_url` variable can be used in api_root responses for proper URL generation

### 3. **.vscode/launch.json** - Already Configured
- The launch configuration is already in place to run Django on `0.0.0.0:8000`
- To start the server: **Debug → Start Debugging** or press **F5**

## API Endpoints

Once the server is running, the following REST API endpoints are available:

### Base URL Format
- **Codespace**: `https://$CODESPACE_NAME-8000.app.github.dev/api/`
- **Localhost**: `http://localhost:8000/api/`

### Available Endpoints

| Component | List | Detail |
|-----------|------|--------|
| Users | `/api/users/` | `/api/users/{id}/` |
| Teams | `/api/teams/` | `/api/teams/{id}/` |
| Activities | `/api/activities/` | `/api/activities/{id}/` |
| Workouts | `/api/workouts/` | `/api/workouts/{id}/` |
| Leaderboard | `/api/leaderboard/` | `/api/leaderboard/{id}/` |

## How to Test the API

### Prerequisites
1. **MongoDB Running**: Ensure MongoDB is running on `localhost:27017`
2. **Virtual Environment Activated**: The launch.json automatically uses the venv

### Starting the Server

**Option 1: Using VS Code Debugger**
1. Open VS Code
2. Go to **Run → Start Debugging** (or press **F5**)
3. Select "Django Backend" from the configuration list
4. The server will start on `0.0.0.0:8000`

**Option 2: Manual Terminal Start**
```bash
source /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/venv/bin/activate
cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend
python manage.py runserver 0.0.0.0:8000
```

### Testing with curl

**1. Test API Root Endpoint**
```bash
# For localhost
curl http://localhost:8000/api/

# For Codespace (replace $CODESPACE_NAME with actual name)
curl https://$CODESPACE_NAME-8000.app.github.dev/api/
```

**2. Test Users Endpoint**
```bash
# Get all users
curl http://localhost:8000/api/users/

# Get specific user
curl http://localhost:8000/api/users/1/

# Create a new user (POST)
curl -X POST http://localhost:8000/api/users/ \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com"}'
```

**3. Test Activities Endpoint**
```bash
# Get all activities
curl http://localhost:8000/api/activities/

# Get specific activity
curl http://localhost:8000/api/activities/1/

# Create a new activity (POST)
curl -X POST http://localhost:8000/api/activities/ \
  -H "Content-Type: application/json" \
  -d '{"activity_type":"running","duration":30,"calories_burned":300}'
```

**4. Test Teams Endpoint**
```bash
# Get all teams
curl http://localhost:8000/api/teams/

# Create a new team (POST)
curl -X POST http://localhost:8000/api/teams/ \
  -H "Content-Type: application/json" \
  -d '{"team_name":"Octopus Squad","description":"A fitness team"}'
```

**5. Test Workouts Endpoint**
```bash
# Get all workouts
curl http://localhost:8000/api/workouts/

# Create a new workout (POST)
curl -X POST http://localhost:8000/api/workouts/ \
  -H "Content-Type: application/json" \
  -d '{"workout_name":"Morning Run","duration":45,"exercises":"Running"}'
```

**6. Test Leaderboard Endpoint**
```bash
# Get leaderboard (ordered by points descending)
curl http://localhost:8000/api/leaderboard/
```

## Environment Variables

### CODESPACE_NAME
- Set automatically by GitHub Codespaces
- Used in both `settings.py` and `urls.py` to configure the correct URLs
- Format: `https://{CODESPACE_NAME}-8000.app.github.dev`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `ps aux | grep mongod`
- Default connection: `mongodb://localhost:27017`
- If not running, start with: `mongod --dbpath=/path/to/db`

### ALLOWED_HOSTS Error
- If you see `Invalid HTTP_HOST header`, check that your codespace URL matches the format
- Verify `$CODESPACE_NAME` is set correctly

### HTTPS Certificate Issues
- The setup avoids certificate issues by using the official GitHub Codespaces domain

## Next Steps

1. ✅ Server configuration complete
2. ✅ URLs properly configured with environment variables
3. ⬜ Populate the database with initial data (run `python manage.py populate_db`)
4. ⬜ Test all API endpoints
5. ⬜ Set up frontend React application
