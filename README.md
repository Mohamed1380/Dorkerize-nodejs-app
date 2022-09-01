# Dockarize Simple Node Js Application Using Docker File and Docker Compose
#### Create Docker Compose file contains this services:
- node-app
- mongo db
- mongo express
- postgres db
- redis
- nginx 

### How to Cofigure nginx as proxy?
- Create default.conf file and intergrate it with nginx service using the volume.
```
server { 
   listen 80;

    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_pass http://node-app:5000;
    }
}
```

###### Run the app 
- Development 
``` 
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build 
```
- Production 
``` 
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build 
```
- Using nginx as a LoadBalancer
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=3
```
- localhost:8090
###### Stop the app 
- Development 
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```
- Production 
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
```

