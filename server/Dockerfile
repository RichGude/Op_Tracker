#  Back-End (Server) Build ("alpine" v18 at time of OG compile)
FROM node:alpine

WORKDIR /app

# Copy JS module list and install
#   No need to download module libraries - these will be connected via a volume during compile
COPY package.json ./
COPY package-lock.json ./
RUN npm i

# Copy remaining files and start instance
COPY ./ ./
CMD ["npm", "run", "start"]