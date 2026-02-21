package chat.domain;

import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity
@Table(name="user_like")
@Component
public class UserLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="username")
    private User user;

    @ManyToOne
    @JoinColumn(name="postId")
    private FeedPost feedPost;


    public UserLike(User user, FeedPost feedPost) {
        this.user = user;
        this.feedPost = feedPost;
    }

    public UserLike() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public FeedPost getFeedPost() {
        return feedPost;
    }

    public void setFeedPost(FeedPost feedPost) {
        this.feedPost = feedPost;
    }
}
