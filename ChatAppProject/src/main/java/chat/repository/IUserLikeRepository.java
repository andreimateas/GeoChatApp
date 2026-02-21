package chat.repository;

import chat.domain.FeedPost;
import chat.domain.User;
import chat.domain.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IUserLikeRepository extends JpaRepository<UserLike, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM UserLike ul WHERE ul.user = :user AND ul.feedPost = :feedPost")
    void deleteUserLike(User user, FeedPost feedPost);


    @Query("SELECT ul FROM UserLike ul WHERE ul.user.username = :username")
    List<UserLike> getUserLikeByUsername(String username);
}
