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