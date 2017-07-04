package com.example.chat.domain;

import java.util.Date;

/**
 * Simple POJO for representing a user
 *
 */
public class UserData {

    private String username;
    private Date timestamp;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
