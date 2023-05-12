package chat.controller.controllerImplementation;

import chat.domain.User;
import chat.service.serviceImplementation.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;
import java.util.Optional;

@RestController

public class ChatController {
    @Autowired
    private  ChatService chatService;

    @PostMapping("/login")
    public String findUser(@RequestBody User user){
        System.out.println("Entered login");
        Optional<User> foundUser = chatService.getUser(user.getUsername(),user.getPassword());
        if(foundUser!=null)
            return "user found";
        else
            return "user not found";
    }
    @GetMapping("/getusers")
    public List<User> getUsers(){
        return chatService.getUsers();
    }

    @PostMapping("/adduser")
    public String addUser(@RequestBody User user){
        if(chatService.addUser(user)!=null)
            return "User added";
        else
            return "Cannot add user";
    }


}
