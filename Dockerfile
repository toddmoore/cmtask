FROM node:0.10.38

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

RUN mkdir /src

RUN npm install gulp -g

WORKDIR /src
ADD app/package.json /src/package.json
ADD app/config.js /src/config.js
ADD app/bower.json /src/bower.json
RUN npm install bower -g
RUN npm install jspm -g
RUN npm install --unsafe-perm=true
RUN bower install --allow-root

EXPOSE 49000
EXPOSE 49900

CMD ["npm", "start"]
