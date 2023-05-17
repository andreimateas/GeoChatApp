package chat.domain;


import java.io.Serializable;


public class Token implements Serializable {
    String string;

    public Token(String string) {
        this.string = string;
    }

    public String getString(){
        return this.string;
    }

    public void setString(String string){
        this.string=string;
    }
}
