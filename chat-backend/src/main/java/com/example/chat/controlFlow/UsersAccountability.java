package com.example.chat.controlFlow;

import com.example.chat.domain.UserData;

import java.util.Collection;

/**
 * Locally stored users
 */
public interface UsersAccountability {

    UserData getUser(String sessionId);
    Collection<UserData> getLoggedUsers();
    void connectUser(String sessionId, UserData userData);
    UserData disconnectUser(String sessionId);

}
