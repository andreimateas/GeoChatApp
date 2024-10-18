package chat.repository;

import chat.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMessageRepository extends JpaRepository<Message, Integer> {

    /**
     * Gets messages between two given users, ordered by date in ascending order.
     *
     * @param user1 The username of the first user.
     * @param user2 The username of the second user.
     * @return A List of Message objects representing the ordered messages.
     */
    @Query("SELECT msg FROM Message msg WHERE (msg.sender= :user1 AND msg.receiver= :user2) OR (msg.sender= :user2 AND msg.receiver= :user1) ORDER BY msg.date ASC")
    List<Message> getMessagesByUsers(@Param("user1") String user1, @Param("user2") String user2);
}
