import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");
import { useEffect, useState } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [articleTitle, setArticleTitle] = useState("");
  const [tableOfContent, setTableOfContent] = useState("");
  const [articleBodyContent, setArticleBodyContent] = useState("");

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await pb.collection("Blog").getOne("j2evpe9e6lpuyz0", {
          expand: "",
        });
        setArticleTitle(response.title);
        setArticleBodyContent(response.bodyContent);
        setTableOfContent(response.tableOfContent);
        console.log(response);
        console.log(response.bodyContent);
      } catch (error) {
        console.log(error);
      }
    };

    getArticle();
  }, []);

  return (
    <div className="majorBody">
      <div className="mainBody">
        <h1>{articleTitle}</h1>
        <hr className="lineYellow" />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: articleBodyContent }}
        />{" "}
      </div>
      <div className="card">
        <h3>Introduction</h3>
        <hr className="line" />
        <div
          className="tableOfContent"
          dangerouslySetInnerHTML={{ __html: tableOfContent }}
        />{" "}
      </div>
    </div>
  );
}

export default App;
