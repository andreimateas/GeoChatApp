package chat.controller.controllerImplementation;

import chat.domain.User;
import chat.service.serviceImplementation.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.List;

@RestController

public class ChatController {
    @Autowired
    private  ChatService chatService;

    @PostMapping("/login")
    public ResponseEntity<?> findUser(@RequestBody User user){
        System.out.println("Entered login");
        User foundUser = chatService.getUser(user.getUsername(),user.getPassword());
        if(foundUser!=null)
            return new ResponseEntity<String>("User found",HttpStatus.OK);
        else
            return new ResponseEntity<String>("User not found",HttpStatus.NOT_FOUND);
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
