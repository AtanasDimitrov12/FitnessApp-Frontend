# Step 1: Build the Vite project
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project excluding files/folders in .dockerignore
COPY . .

# Build the project for production
RUN npm run build

# Step 2: Serve the production build with Nginx
FROM nginx:stable-alpine

# Copy the build output from the previous stage to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
