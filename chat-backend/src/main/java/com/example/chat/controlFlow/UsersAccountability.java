package com.example.chat.controlFlow;

import com.example.chat.domain.UserData;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 */
@Component
public class UsersAccountability {

    Map<String, UserData> loggedUsers;


    public UsersAccountability() {
        loggedUsers = new ConcurrentHashMap<>();
    }

    public UserData getUser(String sessionId) {
        return loggedUsers.get(sessionId);
    }

    //TODO MAYBE ADD THEM TO A DATABASE

    //TODO
    public void connectUser(String sessionId, UserData userData) {
        System.out.println("User connected " + sessionId);
        loggedUsers.put(sessionId, userData);
    }

    //TODO Create a WRAPPER WITH LOGGING FUNCTIONALITY
    public UserData disconnectUser(String sessionId) {
        System.out.println("User disconnected" + sessionId);
        return loggedUsers.remove(sessionId);
    }

}
