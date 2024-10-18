package chat;


import chat.service.serviceImplementation.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class Main {
    public static void main(String[] args) {

        SpringApplication.run(Main.class,args);

    }
}

//logout all users before closing the server
@Component
class AppShutdown {

    @Autowired
    private ChatService chatService;
    @PreDestroy
    public void onShutdown() {

        chatService.logoutAllUsers();
    }
}