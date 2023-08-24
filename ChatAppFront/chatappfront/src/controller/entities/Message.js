
export default class Message{
    constructor(messageId,sender,receiver,content,date){
        this.messageId=messageId;
        this.sender=sender;
        this.receiver=receiver;
        this.content=content;
        this.date=date;
    }
}