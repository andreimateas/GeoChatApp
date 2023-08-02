package chat.service.serviceImplementation;

import chat.domain.FeedPost;
import chat.domain.User;
import chat.repository.IFeedPostRepository;
import chat.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IFeedPostRepository feedPostRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/updates", message);
    }

    public User getUser(String username, String password) {
        try {
            User user = userRepository.getOne(username);
            if (password.equals(user.getPassword()))
                return user;
        } catch (EntityNotFoundException exception) {
            return null;
        }
        return null;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user) {
        try {

            if (userRepository.existsById(user.getUsername())) {
                return null;
            }
            return userRepository.save(user);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public List<FeedPost> getFeedPosts(){
        return feedPostRepository.findAllOrderByDate();
    }

    public FeedPost addFeedPost(FeedPost feedPost){
        try{
            return feedPostRepository.save(feedPost);

        }
        catch(IllegalArgumentException e){
            return null;
        }
    }



}
