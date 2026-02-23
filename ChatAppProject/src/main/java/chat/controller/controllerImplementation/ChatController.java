package chat.controller.controllerImplementation;

import chat.domain.*;
import chat.service.serviceImplementation.ChatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    /**
     * Handles user login and generates a JWT token if login was successful.
     *
     * @param user The User object containing the login credentials (username and password).
     * @return ResponseEntity with a JWT token if login is successful, or an error message if the credentials are invalid.
     */
    @PostMapping(value="/login", produces="application/json")
    public ResponseEntity<?> login(@RequestBody User user) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        System.out.print("Entered login: ");
        User foundUser = chatService.getUser(user.getUsername(),user.getPassword());
        if(foundUser!=null){
            int logged= chatService.login(user);
            System.out.println(logged);
            if(logged!=1) return new ResponseEntity<String>("already logged in",HttpStatus.NOT_FOUND);
            return  new ResponseEntity<Token>(new Token(getJWTToken(foundUser)),HttpStatus.OK);}
        else
            return new ResponseEntity<String>("wrong user credentials",HttpStatus.NOT_FOUND);
    }

    @PostMapping(value="/logout")
    public ResponseEntity<?> logout(@RequestParam String username){
        System.out.println("Entered logout");
        if(chatService.logout(username)!=1)
            return new ResponseEntity<String>("cannot log out",HttpStatus.NOT_FOUND);
        else return new ResponseEntity<UserDTO>(new UserDTO(),HttpStatus.OK);
    }

    /**
     * Gets a list of UserDTO objects that represent users in the database.
     *
     * @return A List of UserDTO objects containing user information.
     */
    @GetMapping("/getusers")
    public List<UserDTO> getUsers(){
        return chatService.getUsers();
    }

    /**
     * Adds a new user to the database and generates a JWT token if the registration was successful.
     *
     * @param user The User object that is going to be added to the database.
     * @return A Token containing the JWT token if registration is successful, or an error token if the user already exists.
     */
    @PostMapping("/adduser")
    public Token addUser(@RequestBody User user) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        if(chatService.addUser(user)!=null)
            return new Token(getJWTToken(user));
        else
            return new Token("user already exists");
    }

    /**
     * Gets user information based on the provided username.
     *
     * @param username The username of the user to get information for.
     * @return A UserDTO object containing user information, or null if the user is not found.
     */
    @GetMapping("/getuser")
    public UserDTO getUser(@RequestParam String username){

        return chatService.getUser(username);
    }

    //FeedPosts

    /**
     * Gets a list of feed posts from the database.
     *
     * @return A List of FeedPost objects representing the feed posts.
     */
    @GetMapping("/getfeedposts")
    public List<FeedPost> getFeedPosts(){
        return chatService.getFeedPosts();
    }

    //function used for sending any updates to the client
    private void sendUpdateToClients(){
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonMessage;
        try {
            jsonMessage = objectMapper.writeValueAsString("refresh");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        chatService.sendUpdate(jsonMessage);
    }

    /**
     * Adds a feed post to the database and triggers a refresh update for the client if successful.
     *
     * @param feedPost The FeedPost object that is going to be added.
     * @return ResponseEntity with the added FeedPost and a success status code if added successfully,
     *         or an error message with a not found status code if it fails.
     */
    @PostMapping("/addfeedpost")
    public ResponseEntity<?> addFeedPost(@RequestBody FeedPost feedPost){
        if(chatService.addFeedPost(feedPost)!=null)
        {
            sendUpdateToClients();
            return new ResponseEntity<FeedPost>(feedPost,HttpStatus.OK);}
        else
            return new ResponseEntity<String>("cannot add post",HttpStatus.NOT_FOUND);
    }


    //Messages

    /**
     * Gets a list of messages from the database.
     *
     * @return A List of Message objects representing the messages between users.
     */
    @GetMapping("/getmessages")
    public List<Message> getMessages(){
        return chatService.getMessages();
    }

    /**
     * Adds a new message to the database and triggers a refresh update for the client if successful.
     *
     * @param message The Message object that is going to be added.
     * @return ResponseEntity with the added Message and a success status code if added successfully,
     *         or an error message with a not found status code if it fails.
     */
    @PostMapping("/addmessage")
    public ResponseEntity<?> addMessage(@RequestBody Message message){
        if(chatService.addMessage(message)!=null)
        {
           sendUpdateToClients();
            return new ResponseEntity<Message>(message,HttpStatus.OK);}
        else
            return new ResponseEntity<String>("cannot add message",HttpStatus.NOT_FOUND);
    }

    /**
     * Gets a list of messages between two specified users.
     *
     * @param user1 The username of the first user.
     * @param user2 The username of the second user.
     * @return A List of Message objects representing the messages sent between the two users.
     */
    @GetMapping("/getmessagesbyusers")
    public List<Message> getMessagesByUsers(@RequestParam String user1, @RequestParam String user2){
        return chatService.getMessagesByUsers(user1,user2);
    }


    @PostMapping("/addUserLike")
    public ResponseEntity<?> addUserLike(@RequestBody UserLike userLike){
        if(chatService.addUserLike(userLike)!=null && chatService.addLike(userLike.getFeedPost())==1)
        {
            sendUpdateToClients();
            return new ResponseEntity<UserLike>(userLike,HttpStatus.OK);}
        else
            return new ResponseEntity<String>("cannot add user like",HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/removeUserLike")
    public ResponseEntity<?> removeUserLike(@RequestBody UserLike userLike){
        try{
            chatService.removeUserLike(userLike);
            chatService.removeLike(userLike.getFeedPost());
            sendUpdateToClients();
            return new ResponseEntity<UserLike>(userLike,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("cannot remove user like",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUserLikeByUsername")
    public List<UserLike> getUserLikeByUsername(@RequestParam String username){
        return chatService.getUserLikeByUsername(username);
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
