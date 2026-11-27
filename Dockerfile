# Use the small official Nginx image
FROM nginx:alpine

# Remove the default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy only the website files into the Nginx web folder
COPY index.html style.css script.js /usr/share/nginx/html/

# Nginx listens on port 80 inside the container
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
