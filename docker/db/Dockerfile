FROM alpine:3.13

# Installing sqlite
RUN apk add --no-cache sqlite

# Create a directory to store the database
RUN mkdir -p /data

WORKDIR /data

# Create a database file (you can create it from the app)
RUN sqlite3 /data/database.db "VACUUM;"

# Start the container and keep it running
CMD ["tail", "-f", "/dev/null"]