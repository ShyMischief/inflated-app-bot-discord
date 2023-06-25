# inflated-app-bot-discord
Inflated App Discord Service


## Scripts
Create these two scripts in the root of the directory. (I could not for the life of me get GIT to untrack the files even though they exist in .gitignore, so here is the annoying work around.)

`register.ps1` - Register the application commands/interactions with Discord
```ps1
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
```

`run.ps1` - Build and Run the bot in a docker container.
```ps1
# Set variables for the docker image
$DiscordPublicKey = 'PUBLIC_KEY'
$DiscordApplicationID = 'APPLICATION_ID'
$DiscordToken = 'TOKEN'

# Get the id of the docker container with the name 'inflated-app-bot-discord'
$ContainerID = docker ps -a -q -f name=inflated-app-bot-discord

# If the container exists, stop and remove it
if ($ContainerID) {
    docker stop $ContainerID
    docker rm $ContainerID
}

# Build the docker image
docker build -t inflated-app-bot-discord --no-cache .

# Run the docker image
docker run -d -p 80:80 -e DISCORD_PUBLIC_KEY=$DiscordPublicKey -e DISCORD_APPLICATION_ID=$DiscordApplicationID -e DISCORD_TOKEN=$DiscordToken --name inflated-app-bot-discord inflated-app-bot-discord
```