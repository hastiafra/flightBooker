import React, {useState, useEffect} from "react";
import styled from "styled-components";




const DropDown = ({setFlight}) => {

  const [flightNum, setFlightNum] = useState([]);

  const getFlightNum = () => {
    
    fetch("/api/flightNum")
    .then((res) => {
      return res.json();
    })

    .then((data) => {
        console.log(data)
        
        
        setFlightNum(data.data);
        
      });
  };

  useEffect(() => {
    getFlightNum();
  }, []);

const selectFlight = (ev)=>{

  setFlight(ev.target.value);

}


  return (
    <Wrapper>
      <Title>Select a Flight:</Title>
      <Form>
        <label>
          <Select onChange={selectFlight}>
            <option>Flight Number</option>
            {flightNum?.map((num)=>{
               return(
                 <option value={num} key={num}> {num} </option>
               )
            })}
          </Select>
        </label>
      </Form>
    </Wrapper>
  );
};

export default DropDown;

const Select = styled.select`
  height: 50px;
  font-size: 20px;
  width:300px;
  border-radius: 10px;
  vertical-align: middle;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
  display: inline-block;
  margin-left: 50px;
`;

const Title = styled.h1`
  padding: 20px 50px;
  text-align: left;
  display: inline-block;
  font-size: 40px;
`;

const Wrapper = styled.div`
  background-color: black;
  height: 85px;
`;
