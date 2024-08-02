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
    <div className="flex">
      <div className="flex flex-col gap-4 mr-40">
        <h1 className="mb-12">{articleTitle}</h1>
        <hr className="bg-yellow-300 h-12 border-none mb-12" />
        <div
          className="flex flex-col pr-36" id="bodyContent"
          dangerouslySetInnerHTML={{ __html: articleBodyContent }}
        />{" "}
      </div>
      <div className="sticky top-24 self-start">
        <h3 className="mb-16">Introduction</h3>
        <hr className="bg-slate-500 h-0.5 border-none" />
        <div
          className="tableOfContent mt-5"
          dangerouslySetInnerHTML={{ __html: tableOfContent }}
        />{" "}
      </div>
    </div>
  );
}

export default App;
