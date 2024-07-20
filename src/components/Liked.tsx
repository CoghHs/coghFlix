import styled from "styled-components";

const Button = styled.button<{ liked: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.liked ? "red" : "gray")};
  color: white;
  cursor: pointer;
`;

interface LikedButtonProps {
  liked: boolean;
  onClick: () => void;
}

const LikedButton: React.FC<LikedButtonProps> = ({ liked, onClick }) => {
  return (
    <Button liked={liked} onClick={onClick}>
      {liked ? "Delete" : "Like"}
    </Button>
  );
};

export default LikedButton;
