import React, { useState, useEffect } from "react";
import Header from "../Common/Footer";
import Sidebar from "../Common/Sidebar";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function Search() {
  const [apidata, setData] = useState([]);
  const location = useLocation();
  const query = location.search.split("=")[1];

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/search?q=${query}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data["recipes"]);
      });
  }, []);

  return (
    <div>
      <div className="uk-section uk-section-default">
        <div className="uk-container">
          <div data-uk-grid>
            {/* <Sidebar/> */}
            <div className="uk-width-expand@m">
              <div data-uk-grid></div>

              <div
                className="uk-child-width-1-2 uk-child-width-1-3@s"
                data-uk-grid
              >
                {apidata.length > 0 ? (
                  apidata.map((value) => {
                    return (
                      <div>
                        <div className="uk-card">
                          <div className="uk-card-media-top uk-inline uk-light">
                            <img
                              className="uk-border-rounded-medium"
                              src={value.image}
                              alt={value.name}
                            />
                            <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium" />
                            <div className="uk-position-xsmall uk-position-top-right">
                              <a
                                href="#"
                                className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
                                data-uk-icon="heart"
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">
                              {value.name}
                            </h3>
                            <div
                              className="uk-text-xsmall uk-text-muted"
                              data-uk-grid
                            >
                              <div className="uk-width-auto uk-flex uk-flex-middle">
                                <span
                                  className="uk-rating-filled"
                                  data-uk-icon="icon: star; ratio: 0.7"
                                />
                                <span className="uk-margin-xsmall-left">
                                  {value.rating}
                                </span>
                                <span>{value.reviewCount}</span>
                              </div>
                              <div className="uk-width-expand uk-text-center">
                                {value.mealType}
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/recipe/${value.id}`}
                            state={apidata}
                            className="uk-position-cover"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>No Recipe Found</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
