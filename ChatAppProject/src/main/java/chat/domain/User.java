package chat.domain;


import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


@Entity
@Table(name="user")
@Component
public class User implements Serializable {


    @Id
    private String username;

    private String password;

    private String email;
    private String name;
    private String profilePicture;

    private String location;

    private boolean loggedIn;

    public User() {
    }

    public User(String username, String password, String email, String name, String profilePicture, String location, boolean loggedIn) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.profilePicture = profilePicture;
        this.location = location;
        this.loggedIn=false;
    }


    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", location='" + location + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

}
