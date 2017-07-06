package com.example.chat.domain;

import java.io.Serializable;

/**
 *Simple POJO to represent a message transfered between the users
 */
public class Message implements Serializable{

    private String messagePayload;
    private String username;

    public Message(){}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessagePayload() {
        return messagePayload;
    }

    public void setMessagePayload(String messagePayload) {
        this.messagePayload = messagePayload;
    }
}
