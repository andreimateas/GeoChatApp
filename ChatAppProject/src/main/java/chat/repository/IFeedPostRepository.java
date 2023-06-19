package chat.repository;

import chat.domain.FeedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeedPostRepository extends JpaRepository<FeedPost,String> {
}
