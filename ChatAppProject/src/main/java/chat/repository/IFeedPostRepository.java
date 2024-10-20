package chat.repository;

import chat.domain.FeedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    @Modifying
    @Transactional
    @Query("UPDATE FeedPost fp SET fp.likes=fp.likes+1 WHERE fp.postId=:feedPost")
    int addLike(String feedPost);

    @Modifying
    @Transactional
    @Query("UPDATE FeedPost fp SET fp.likes=fp.likes-1 WHERE fp.postId=:feedPost")
    int removeLike(String feedPost);
}
