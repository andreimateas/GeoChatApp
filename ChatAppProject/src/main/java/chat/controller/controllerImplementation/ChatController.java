package chat.controller.controllerImplementation;

import chat.domain.FeedPost;
import chat.domain.Message;
import chat.domain.Token;
import chat.domain.User;
import chat.service.serviceImplementation.ChatService;
import chat.websocket.WebSocketConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.authority.AuthorityUtils;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {
    @Autowired
    private  ChatService chatService;


    //Users
    @PostMapping(value="/login", produces="application/json")
    public ResponseEntity<?> login(@RequestBody User user) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        System.out.println("Entered login");
        User foundUser = chatService.getUser(user.getUsername(),user.getPassword());
        if(foundUser!=null)
            return  new ResponseEntity<Token>(new Token(getJWTToken(foundUser)),HttpStatus.OK);
        else
            return new ResponseEntity<String>("wrong user credentials",HttpStatus.NOT_FOUND);
    }
    @GetMapping("/getusers")
    public List<User> getUsers(){
        return chatService.getUsers();
    }

    @PostMapping("/adduser")
    public Token addUser(@RequestBody User user) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        if(chatService.addUser(user)!=null)
            return new Token(getJWTToken(user));
        else
            return new Token("user already exists");
    }

    //FeedPosts
    @GetMapping("/getfeedposts")
    public List<FeedPost> getFeedPosts(){
        return chatService.getFeedPosts();
    }

    @PostMapping("/addfeedpost")
    public ResponseEntity<?> addFeedPost(@RequestBody FeedPost feedPost){
        if(chatService.addFeedPost(feedPost)!=null)
        {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonMessage;
            try {
                jsonMessage = objectMapper.writeValueAsString("refresh");
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            chatService.sendUpdate(jsonMessage);
            return new ResponseEntity<FeedPost>(feedPost,HttpStatus.OK);}
        else
            return new ResponseEntity<String>("cannot add post",HttpStatus.NOT_FOUND);
    }


    //Messages
    @GetMapping("/getmessages")
    public List<Message> getMessages(){
        return chatService.getMessages();
    }

    @PostMapping("/addmessage")
    public ResponseEntity<?> addMessage(@RequestBody Message message){
        if(chatService.addMessage(message)!=null)
        {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonMessage;
            try {
                jsonMessage = objectMapper.writeValueAsString("refresh");
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            chatService.sendUpdate(jsonMessage);
            return new ResponseEntity<Message>(message,HttpStatus.OK);}
        else
            return new ResponseEntity<String>("cannot add message",HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getmessagesbyusers")
    public List<Message> getMessagesByUsers(@RequestParam String user1, @RequestParam String user2){
        return chatService.getMessagesByUsers(user1,user2);
    }




    private String getJWTToken(User user) {
        String secretKey = "mySecretKey";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
        String userString= user.getUsername()+","+user.getName()+","+user.getEmail()+","+user.getLocation()+","+user.getProfilePicture();
        String token = Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(userString)
                .claim(
                        "authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList())
                )
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000000))
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
                .compact();
        return token;
    }



}
