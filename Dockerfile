# 1. Use Node base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 4. Copy the rest of your code
COPY . .

# 5. Build the UI (if applicable)
RUN npm run build 

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Start the app
CMD ["npm", "start"]