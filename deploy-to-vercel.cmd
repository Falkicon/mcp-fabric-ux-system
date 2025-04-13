@echo off
echo Deploying to Vercel with clean cache...

REM Ensure Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Vercel CLI not found. Installing...
  npm install -g vercel
)

REM Deploy with force flag to bypass build cache
echo Running deployment with force flag...
vercel --prod --force

echo.
echo If the deployment was successful, your MCP server should now be updated.
echo To check the diagnostics, visit:
echo https://your-vercel-app.vercel.app/_diagnostics
echo.
echo Remember to replace 'your-vercel-app' with your actual Vercel app name.
pause