package chat.domain;

import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@Table(name="message")
@Component
public class Message implements Serializable {

    @Id
    private int messageId;
    private String sender;
    private String receiver;
    private String content;

    private LocalDateTime date;


    public Message() {
    }



    public Message(String sender, String receiver, String content, LocalDateTime date) {

        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.date = date;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + messageId +
                ", from='" + sender + '\'' +
                ", to='" + receiver + '\'' +
                ", content='" + content + '\'' +
                ", date=" + date +
                '}';
    }
}
