package chat.domain;

import javax.persistence.Id;
import java.io.Serializable;

public class UserDTO {


    private String username;
    private String email;
    private String name;
    private String profilePicture;

    private String location;

    public UserDTO() {
    }

    public UserDTO(String username, String email, String name, String profilePicture, String location) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.profilePicture = profilePicture;
        this.location = location;
    }


    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
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
}
