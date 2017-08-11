package com.example.chat.controllers;

import com.example.chat.controlFlow.UsersAccountability;
import com.example.chat.customAnnotations.Logging;
import com.example.chat.domain.Message;
import com.example.chat.domain.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Collection;

/**
 *
 */
@Controller
public class SubscriptionController {

    @Autowired
    @Logging(status = Logging.LOGGING_STATUS.ACTIVE)
    UsersAccountability usersAccountability;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    /**
     * One way, triggered only by the app.
     * Will be received once the user is connected
     *
     * @return
     */
    @SubscribeMapping("/chat.users")
    public Collection<UserData> getUsers() {
        return usersAccountability.getLoggedUsers();
    }

    /**
     * Send by the app, get username.
     * @param principal
     * @return
     */
    @SubscribeMapping("/chat.whoAmI")
    public Principal whoAmI(Principal principal) {
        return principal;
    }

    /**
     * General room for chat.
     *
     * @param message
     * @param principal
     * @return
     */
    @MessageMapping("/chat.message")
    public Message filterMessage(@Payload Message message, Principal principal) {
        System.out.println("Message received " + message.getMessagePayload());
        message.setUsername(principal.getName());
        return message;
    }

    @MessageMapping("/chat.private.{username}")
    public void sendPrivateMessage(@Payload Message message, @DestinationVariable("username") String username,Principal principal){
        message.setUsername(principal.getName());
        this.simpMessagingTemplate.convertAndSend("/user/"+username+"/private/chat."+principal.getName(),message);
        String destination = "/user/" + principal.getName() + "/private/chat." + username;
        this.simpMessagingTemplate.convertAndSend(destination,message);

        System.out.println(" "+destination);
    }



}
