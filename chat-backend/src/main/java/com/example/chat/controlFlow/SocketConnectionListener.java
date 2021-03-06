package com.example.chat.controlFlow;

import com.example.chat.configurationProps.UserAccountabilitySubscriptionProperties;
import com.example.chat.customAnnotations.Logging;
import com.example.chat.domain.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Date;
import java.util.Map;

/**
 *
 */
@Component
public class SocketConnectionListener {


    @Autowired
    @Logging(status = Logging.LOGGING_STATUS.ACTIVE)
    UsersAccountability usersAccountability;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    UserAccountabilitySubscriptionProperties userAccountabilitySubscriptionProperties;

    /**
     * Listen for any newly connected session(user) and broadcast to the login channgel that a user connected, along with the new user information
     * @param connectEvent
     */
    @EventListener
    public void handleUserConnected(SessionConnectEvent connectEvent) {
        //utility for accessing Message<?> header information from the event.
        //Provides uniform access to specific values common across protocols such as a destination, message type (e.g. publish, subscribe, etc), session id, and others.
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.wrap(connectEvent.getMessage());
        String username = headerAccessor.getUser().getName();

        UserData data = new UserData();
        data.setUsername(username);
        data.setTimestamp(new Date());

        simpMessagingTemplate.convertAndSend(userAccountabilitySubscriptionProperties.getUserLogin(),data);

        Map<String,Object> sessionAttributes = headerAccessor.getSessionAttributes();

        System.out.println("Session Attributes "+sessionAttributes);

        usersAccountability.connectUser(headerAccessor.getSessionId(),data);
    }


    @EventListener
    public void handleUserDisconnected(SessionDisconnectEvent sessionDisconnectEvent){
        //utility for accessing Message<?> header information from the event.
        //Provides uniform access to specific values common across protocols such as a destination, message type (e.g. publish, subscribe, etc), session id, and others.
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.wrap(sessionDisconnectEvent.getMessage());
        String username = headerAccessor.getUser().getName();
        UserData data =  usersAccountability.disconnectUser(headerAccessor.getSessionId());
        if(data!=null){
            simpMessagingTemplate.convertAndSend(userAccountabilitySubscriptionProperties.getUserLogout(), data);
        }

    }

}
