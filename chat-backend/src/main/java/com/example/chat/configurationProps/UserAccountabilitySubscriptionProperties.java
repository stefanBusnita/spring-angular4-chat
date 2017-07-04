package com.example.chat.configurationProps;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration properties for subscription for app based endpoints.
 */
@Configuration
@ConfigurationProperties(prefix = "subscription")
public class UserAccountabilitySubscriptionProperties {

    private String userLogin;
    private String userLogout;


    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getUserLogout() {
        return userLogout;
    }

    public void setUserLogout(String userLogout) {
        this.userLogout = userLogout;
    }
}
