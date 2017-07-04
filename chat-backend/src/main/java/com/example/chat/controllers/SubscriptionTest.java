package com.example.chat.controllers;

import com.example.chat.domain.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

/**
 *
 */
@Controller
public class SubscriptionTest {



    @SubscribeMapping("/test")
    public String getSomeInformation(){
    return "communication ESTABLISHED";

    }


    /**
     * General room for chat.
     * @param message
     * @param principal
     * @return
     */
    @MessageMapping("/chat.message")
    public Message filterMessage(@Payload Message message, Principal principal) {
        System.out.println("Message received "+message.getMessagePayload());
        message.setUsername(principal.getName());
        return message;
    }


}
