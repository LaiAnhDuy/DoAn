import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: #fff;
    background: #d70018;
    span {
      color: #fff;
    }
  }
  width: 100%;
  color: #9255fd;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointers")};
`;

