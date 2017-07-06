package com.example.chat.controlFlow;

import com.example.chat.customAnnotations.Logging;
import com.example.chat.domain.UserData;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Logging(status = Logging.LOGGING_STATUS.NONE)
public class UserAccountabilityImpl implements UsersAccountability{

    Map<String, UserData> loggedUsers;


    public UserAccountabilityImpl() {
        loggedUsers = new ConcurrentHashMap<>();
    }

    @Override
    public UserData getUser(String sessionId) {
        return loggedUsers.get(sessionId);
    }


    @Override
    public Collection<UserData> getLoggedUsers(){
        return loggedUsers.values();
    }


    @Override
    public void connectUser(String sessionId, UserData userData) {
        System.out.println("User connected " + sessionId);
        loggedUsers.put(sessionId, userData);
    }

    @Override
    public UserData disconnectUser(String sessionId) {
        System.out.println("User disconnected" + sessionId);
        return loggedUsers.remove(sessionId);
    }

}
