package com.example.chat.springConfig.websocketConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.session.ExpiringSession;
import org.springframework.session.web.socket.config.annotation.AbstractSessionWebSocketMessageBrokerConfigurer;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;

/**
 * Enable web socket messaging backed by a message broker
 * This configuration ensures that:
 * - the Session is kept alive on incoming web socket messages
 * - the Web Socket Sessions are destroyed when a Session is terminated
 *
 * Hook in the Spring Session, by using AbstractSessionWebSocketMessageBrokerConfigurer
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractSessionWebSocketMessageBrokerConfigurer<ExpiringSession>{

    /**
     * Register the /ws endpoint and enable alternate transports, so that if WebSocket is not available, the client will attempt to connect to this endpoint
     * and use the best transport available
     * @param stompEndpointRegistry
     */
    @Override
    protected void configureStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
    }

    /**
     * Enable simple broker in memory, to carry message back to the client, destinations prefixed with /topic
     * The app prefix is designated for all @MessageMapping methods.
     * @param config
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic","/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setPathMatcher(new AntPathMatcher("/"));
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }



    /**
     * TODO, check.
     * @param registration
     */
    @Override
    public void configureWebSocketTransport(final WebSocketTransportRegistration registration) {
        registration.addDecoratorFactory(new WebSocketHandlerDecoratorFactory() {
            @Override
            public WebSocketHandler decorate(final WebSocketHandler handler) {
                return new WebSocketHandlerDecorator(handler) {
                    @Override
                    public void afterConnectionClosed(final WebSocketSession session,CloseStatus closeStatus) throws Exception {
                        System.out.println("WE TRIGGERED THE CLOSING OF THE SESSION");
                        session.close();
                        super.afterConnectionClosed(session, CloseStatus.NOT_ACCEPTABLE);
                    }
                };
            }
        });
        super.configureWebSocketTransport(registration);
    }

}
