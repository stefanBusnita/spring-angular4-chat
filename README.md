# Spring-Angular4-Chat
Chat functionality done by using Spring-backend, Angular4-frontend.


## Deployment  
### Prerequisites:  
 1.**Node.js** installed [download](https://nodejs.org/en/download/)  
 2.As the frontend project was created using **angular-cli**, run the following command `npm install -g angular-cli`  
 3.As the backend project leverages **Maven**, install maven for packaging. Maybe follow [thses steps](https://www.mkyong.com/maven/how-to-install-maven-in-windows/).  
 4.As the backend project uses Redis, provide a **Redis** store at default `localhost:6379`. The address can be changed from `application.properties` in resources.   
 [Download msi](https://www.google.ro/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwizsNGm7vXUAhWEtBQKHfDJATIQFggmMAA&url=https%3A%2F%2Fgithub.com%2FMSOpenTech%2Fredis%2Freleases%2Fdownload%2Fwin-3.2.100%2FRedis-x64-3.2.100.msi&usg=AFQjCNHq-i0IrCAvdkG6rsAgEZLxZkiRTw)  
 [Install options and guide](https://github.com/ServiceStack/redis-windows)
 
### Frotend:  
 1.Navingate to chat-frontend  
 2.Install dependencies using `npm install`  
 3.Run development server using `ng start`. By default it will start at `localhost:4200`.  
 4.Navigate to `localhost:4200`.  
 
### Backend:  
 1.Open project in your favorite IDE. Enable auto-import(if available), or run `mvn clean install`.  
 2.Deploy on any instance of Tomcat, or use embedded tomcat(if available)  
 3.Alternatively some Tomcat [guidance](http://www.baeldung.com/tomcat-deploy-war)  
 
##  Notice ! 
1. Check frotned **environment.ts** currently set to connect to `localhost:8080`. If backend is deployed elsewhere, please change settings.  
2. **Basic Authentication** is used, for using 2 instances on same machine, open a window in incognito mode and login with:  
a. user:stef password:password  
b. user:admin password:password
 
