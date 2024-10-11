import React, { useEffect } from "react";
import { useState } from "react";
import "./card.css";

function Card({ category, query }) {
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async (category, query) => {
      const base_url = "https://newsapi.org/v2/";
      const apiKey = "c6284127c00c434a8a4f483ccfd6b836";
      const endpoint = query ? "everything" : "top-headlines";

      const categoryparam =
        category !== "general" && query === "" ? `&category=${category}` : "";
      const categoryparam2 =
        category === "general" && query === "" ? "&category=general" : "";
      const queryparam = query !== "" ? `&q=${query}` : ``;

      const url = `${base_url}${endpoint}?${categoryparam}${categoryparam2}${queryparam}&sortBy=publishedAt&page=${page}&pageSize=9&apiKey=${apiKey}`;
      console.log(url);

      try {
        const response = await fetch(url);
        const datajson = await response.json();
        const filteredData = datajson.articles.filter(
          (item) => item.item !== "[Removed]"
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching Data", error);
      }
    };

    fetchData(category, query);
  }, [category, query, page]);

  return (
    <div>
      <div className="cardcontainer">
        {data &&
          data.map((item, index) => {
            return (
              <div className="card" key={index}>
                <img
                  src={
                    item.urlToImage
                      ? item.urlToImage
                      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                  }
                  alt="Img Cannot be fetched"
                  className="card-image"
                />
                <div className="cardcontent">
                  <h2 className="cardtitle">{item.title}</h2>
                  <p className="cardauthor">Published by: {item.source.name}</p>
                  <p className="description">{item.description}</p>
                  <a href={item.url} className="cradlink">
                    Read More
                  </a>
                </div>
              </div>
            );
          })}
        <div className="paginitation">
          <button
            className="previous"
            onClick={() => setPage(page > 1 ? page - 1 : page)}
          >
            Previous
          </button>
          <button className="previous" onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
