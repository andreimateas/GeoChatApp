package chat.controller.controllerImplementation;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class WebSocketController {

    @MessageMapping("/update")
    @SendTo("/topic/updates")
    public String handleUpdate(@Payload String message) {

        return "Update received: " + message;
    }
}