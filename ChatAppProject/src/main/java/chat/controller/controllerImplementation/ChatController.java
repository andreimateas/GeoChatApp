package chat.controller.controllerImplementation;

import chat.domain.Token;
import chat.domain.User;
import chat.service.serviceImplementation.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.authority.AuthorityUtils;
import java.io.Console;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@RestController
@CrossOrigin(origins = "*")
public class ChatController {
    @Autowired
    private  ChatService chatService;

    @PostMapping(value="/login", produces="application/json")
    public ResponseEntity<?> login(@RequestBody User user){
        System.out.println("Entered login");
        Optional<User> foundUser = chatService.getUser(user.getUsername(),user.getPassword());
        if(foundUser!=null)
            return  new ResponseEntity<Token>(new Token(getJWTToken(foundUser.get())),HttpStatus.OK);
        else
            return new ResponseEntity<String>("user not found",HttpStatus.NOT_FOUND);
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
