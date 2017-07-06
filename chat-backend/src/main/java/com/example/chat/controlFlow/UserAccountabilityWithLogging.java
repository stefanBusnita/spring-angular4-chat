package com.example.chat.controlFlow;


import com.example.chat.customAnnotations.Logging;
import com.example.chat.domain.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@Logging(status = Logging.LOGGING_STATUS.ACTIVE)
public class UserAccountabilityWithLogging implements UsersAccountability {


    @Autowired
    @Logging(status = Logging.LOGGING_STATUS.NONE)
    UsersAccountability usersAccountability;


    @Override
    public UserData getUser(String sessionId) {
        System.out.println("Retrieving user by sessionId "+sessionId);
        return usersAccountability.getUser(sessionId);
    }

    @Override
    public Collection<UserData> getLoggedUsers() {
        return usersAccountability.getLoggedUsers();
    }

    @Override
    public void connectUser(String sessionId, UserData userData) {
        System.out.println("A user was stored "+userData.getUsername());
        usersAccountability.connectUser(sessionId, userData);
    }

    @Override
    public UserData disconnectUser(String sessionId) {
        System.out.println("A user was removed "+sessionId);
        return usersAccountability.disconnectUser(sessionId);
    }
}
