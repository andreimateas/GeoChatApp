package chat.service;

import chat.domain.User;
import org.springframework.stereotype.Service;

@Service
public interface IChatService {

    User getUser(String username, String password);
}
