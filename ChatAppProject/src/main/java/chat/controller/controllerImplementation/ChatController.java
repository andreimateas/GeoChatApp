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

    @GetMapping("/login")
    public String findUser(@RequestBody String username, @RequestBody String password){
        User user=  chatService.getUser(username,password);
        if(user!=null)
            return user.getUsername();
        else
            return "User not found";
    }
    @GetMapping("/users")
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
