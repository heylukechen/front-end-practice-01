import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");
import { useEffect, useState } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [article, setArticle] = useState([]);
  const [tableOfContent, setTableOfContent] = useState("");
  const [articleBodyContent, setArticleBodyContent] = useState("");

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await pb.collection("Blog").getFullList({
          sort: "",
        });
        setArticle(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getArticle();
  }, []);

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-4 mr-0 md:mr-40">
        <h1 className="mb-12">Introduction</h1>
        <p className="mb-4">
          This book is a guide to how we do product development at Basecamp.
          It’s also a toolbox full of techniques that you can apply in your own
          way to your own process. Whether you’re a founder, CTO, product
          manager, designer, or developer, you’re probably here because of some
          common challenges that all software companies have to face.
        </p>
        <hr className="bg-yellow-300 h-12 border-none mb-6" />
        {article.map((post) => (
          <div className="mb-4" key={post.id} id={createSlug(post.title)}>
            <h3 className="mb-6">{post.title}</h3>
            <div
              className="flex flex-col pr-36"
              id="bodyContent"
              dangerouslySetInnerHTML={{ __html: post.bodyContent }}
            />
          </div>
        ))}
      </div>
      <div className="hidden md:block sticky top-24 self-start ">
        <h3 className="mb-16">Introduction</h3>
        <hr className="bg-slate-500 h-0.5 border-none" />

        <ul>
          {article.map((post) => (
            <li key={post.id} className="tableOfContent mt-5">
              <a
                href={`#${createSlug(post.title)}`}
                className="text-slate-800 hover:text-slate-400"
              >   {post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
