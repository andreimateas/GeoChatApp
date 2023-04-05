package chat.service.serviceImplementation;

import chat.domain.User;
import chat.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    @Autowired
    private IUserRepository userRepository;

    public User getUser(String username, String password){

        User user=userRepository.getOne(username);
        if(user!=null && user.getPassword().equals(password))
            return user;

        return null;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }


}
