import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../../redux/slides/productSlide";

const TypeComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    navigate(props.url);
   
  };
  return (
    <div className="cursor-pointer hover:text-red-500" onClick={onClick}>
      {props.title}
    </div>
  );
};

export default TypeComponent;
