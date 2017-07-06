package com.example.chat.springConfig.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;

import javax.annotation.PostConstruct;

/**
 * Configuration file
 * Enable session management using Redis.
 * The filter created "springSessionRepositoryFilter" will be registered on the servlet container by AbstractHttpSessionApplicationInitializer init.
 *
 */
@Configuration
@EnableRedisHttpSession //(maxInactiveIntervalInSeconds = 30)
public class RedisSessionConfiguration extends AbstractHttpSessionApplicationInitializer{

    @Value("${server.session.timeout}")
    private Integer maxInactiveIntervalInMinutes;

    @Autowired
    private RedisOperationsSessionRepository sessionRepository;

    /**
     * HttpSession integration to use HTTP headers to convey the current session information instead of cookies.
     * @return
     */
    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        return new HeaderHttpSessionStrategy();
    }

    /**
     * The session expiration did not work by using maxInactiveIntervalInSeconds.
     */
    @PostConstruct
    private void afterPropertiesSet() {
        sessionRepository.setDefaultMaxInactiveInterval(maxInactiveIntervalInMinutes * 60);
    }

}
