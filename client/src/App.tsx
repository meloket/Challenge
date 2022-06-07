import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as axiosService from "./service";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [list, setList] = useState([
    {
      id: 0,
      title: " ",
      content: " ",
    },
  ]);
  const getData = async () => {
    const data = await axiosService.getAll();
    setList(data.bookList);
  };
  useEffect(() => {
    getData();
  }, []);

  const onCreate = async () => {
    const data = {
      title,
      content,
    };
    await axiosService.add(data);
    getData();
  };

  const onRemove = async (id:number) => {
    await axiosService.remove(id);
    getData();
  }
  return (
    <Container>
      {list.map((each, index) => {
        return (
          <Item
            id={each.id}
            title={each.title}
            content={each.content}
            handleItem={onRemove}
          />
        );
      })}
      <Input
        type={"text"}
        placeholder={"Book title"}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Input
        type={"text"}
        placeholder={"Author"}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button onClick={() => onCreate()}>Create</Button>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
`;

const Input = styled.input`
  min-width: 350px;
  padding: 10px 20px;
`;

const Button = styled.button`
  background: orangered;
  padding: 16px 50px;
  border: none;
  border-radius: 100px;
  color: white;
  cursor: pointer;
`;

const Item: React.FC<{ handleItem: any; title?: string; content?: string; id?: number }> = ({ handleItem = () => {}, title = "none", content = "none", id = 0 }) => {
  return (
    <ItemContainer>
      <div>
        <div>{title}</div>
        <div onClick={() => {console.log(id); handleItem(id)}}>&times;</div>
      </div>
      <div>{content}</div>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  background: #ffdfdf;
  min-width: 350px;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:last-child {
      cursor: pointer;
    }
  }
  & > div:last-child {
    color: orangered;
  }
`;

export default App;
