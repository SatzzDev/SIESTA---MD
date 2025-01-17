FROM node:18

# Install ImageMagick
RUN apt-get install -y imagemagick 

# Copy your project files
WORKDIR /app
COPY . /app

# Install project dependencies
RUN npm install --force

# Run the application
CMD ["npm", "run", "start"]
