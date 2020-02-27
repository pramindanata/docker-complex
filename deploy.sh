# Setup SSH
openssl aes-256-cbc -K $encrypted_326343ebfff0_key -iv $encrypted_326343ebfff0_iv -in deploy_key.enc -out deploy_key -d
eval "$(ssh-agent -s)"
chmod 600 ./deploy_key
echo -e "Host $SERVER_IP\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
ssh-add ./deploy_key

# Send file
rsync -rav  --exclude-from='rsync-exclude.txt' --delete ./ travis@$SERVER_IP:$APP_PATH

# Install
ssh -i ./deploy_key travis@$SERVER_IP "cd $APP_PATH && bash install.sh"