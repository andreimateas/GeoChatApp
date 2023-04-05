package chat.controller.controllerImplementation;

import chat.domain.User;
import chat.service.serviceImplementation.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("chat")
public class ChatController {
    @Autowired
    private  ChatService chatService;

    @GetMapping("/user")
    public String findUser(){
        //return chatService.getUser(username,password);
        return "dada";
    }
    @GetMapping("/users")
    public List<User> getUsers(){
        return chatService.getUsers();
    }

}
