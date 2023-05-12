package chat.service.serviceImplementation;

import chat.domain.User;
import chat.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired
    private IUserRepository userRepository;

    public Optional<User> getUser(String username, String password){
        Optional<User> user= Optional.of(new User());

        user = userRepository.findById(username);

        if(user.isPresent())
            if (user.get().getPassword().equals(password))
                return user;

        return null;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user){
        try{
            return userRepository.save(user);
            }
        catch(IllegalArgumentException e){
            return null;
        }
    }

}
