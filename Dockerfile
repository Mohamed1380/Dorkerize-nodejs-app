FROM node as base

FROM base as development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000   
CMD [ "npm", "run", "start-dev" ]


FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 5000   
CMD [ "npm", "run", "start-dev" ]


# FROM node

# WORKDIR /app

# COPY package.json .

# ARG NODE_ENV

# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi

# COPY . .

# #ENV PORT=5000
# #EXPOSE $PORT
# EXPOSE 5000   

# # CMD ["npm", "start"]
# CMD [ "npm", "run", "start-dev" ]