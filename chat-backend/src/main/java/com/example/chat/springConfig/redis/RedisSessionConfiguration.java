package com.example.chat.springConfig.redis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;

/**
 * Configuration file
 * Enable session management using Redis.
 * The filter created "springSessionRepositoryFilter" will be registered on the servlet container by AbstractHttpSessionApplicationInitializer init.
 *
 */
@Configuration
@EnableRedisHttpSession
public class RedisSessionConfiguration extends AbstractHttpSessionApplicationInitializer{

    /**
     * HttpSession integration to use HTTP headers to convey the current session information instead of cookies.
     * @return
     */
    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        return new HeaderHttpSessionStrategy();
    }
}
