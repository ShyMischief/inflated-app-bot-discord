# Set the enivronment variables for the node script
$env:DISCORD_APPLICATION_ID = 'APPLICATION_ID'
$env:DISCORD_TOKEN = 'TOKEN'

# Delete the dist folder if it exists
if (Test-Path ./dist) {
    Remove-Item ./dist -Recurse -Force
}

# Build the typescript
npx tsc

# Run the node script
node ./dist/register.js