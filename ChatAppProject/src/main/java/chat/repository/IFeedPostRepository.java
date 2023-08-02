package chat.repository;

import chat.domain.FeedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeedPostRepository extends JpaRepository<FeedPost,String> {

    @Query("SELECT fp FROM FeedPost fp ORDER BY fp.date DESC")
    List<FeedPost> findAllOrderByDate();
}
