import "./imageModal.css";
import Picker from "emoji-picker-react";

const ImageModal = (props) => {
  const onEmojiClick = (event, emojiObject) => {
    props.send(event, emojiObject.emoji);
  };
  return (
    <div className="imageModal">
      <Picker
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};

export default ImageModal;
