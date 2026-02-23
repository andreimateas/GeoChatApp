
export default class FeedPost{
    constructor(postId,username,contentText,contentImage,date,likes,location){
        this.postId=postId;
        this.username=username;
        this.contentText=contentText;
        this.contentImage=contentImage;
        this.date=date;
        this.likes=likes;
        this.location=location;
        this.isLiked=false;
    }
}