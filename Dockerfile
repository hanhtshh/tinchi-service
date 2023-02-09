FROM node:14 as source

# add credentials on build
ARG SSH_PRIVATE_KEY
RUN mkdir /root/.ssh && echo "StrictHostKeyChecking no " > /root/.ssh/config
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa && ssh-keyscan bitbucket.com >> /root/.ssh/known_hosts
RUN chmod 700 /root/.ssh/id_rsa

COPY package*.json ./

RUN npm install

RUN chown -R root:root node_modules

FROM node:14-alpine

COPY --from=source /node_modules ./node_modules

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start"]
