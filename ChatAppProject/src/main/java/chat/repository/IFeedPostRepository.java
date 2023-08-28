package chat.repository;

import chat.domain.FeedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeedPostRepository extends JpaRepository<FeedPost,String> {

    /**
     * Gets all FeedPost entities ordered by date in descending order.
     *
     * @return A List of FeedPost objects ordered by date.
     */
    @Query("SELECT fp FROM FeedPost fp ORDER BY fp.date DESC")
    List<FeedPost> findAllOrderByDate();
}
