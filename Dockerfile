FROM node:12.16.3

RUN apt-get update && apt-get upgrade -y

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY knexfile.js knexfile.js
COPY index.js index.js
COPY migrations/ migrations/

# Install app dependencies
RUN yarn

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && yarn run migration-production
