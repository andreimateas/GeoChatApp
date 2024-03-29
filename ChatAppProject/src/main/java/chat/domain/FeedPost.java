package chat.domain;


import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@Table(name="feed_post")
@Component
public class FeedPost implements Serializable {


    @Id
    private String postId;

    private String username;

    private String contentText;
    private String contentImage;
    private LocalDateTime date;

    private int likes;

    private String location;

    public FeedPost() {
    }

    public FeedPost(String postId, String username, String contentText, String contentImage, LocalDateTime date, int likes, String location) {
        this.postId = postId;
        this.username = username;
        this.contentText = contentText;
        this.contentImage = contentImage;
        this.date = date;
        this.likes = likes;
        this.location = location;
    }


    @Override
    public String toString() {
        return "FeedPost{" +
                "postId=" + postId +
                ", username='" + username + '\'' +
                ", contentText='" + contentText + '\'' +
                ", contentImage='" + contentImage + '\'' +
                ", date=" + date +
                ", likes=" + likes +
                ", location=" + location +
                '}';
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getContentImage() {
        return contentImage;
    }

    public void setContentImage(String contentImage) {
        this.contentImage = contentImage;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
