import React from "react";
import SearchBar from "./SearchBar";
import aboutus from "../../img/about.jpg";
import "./HomePage.css";

const HomePage = (props) => {
  const { setAllRecipes, allRecipes } = props;

  return (
    <div>
      <SearchBar setAllRecipes={setAllRecipes} allRecipes={allRecipes} />
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2">
          <div className="col" id="textabout">
            <h3>About us</h3>
            <p>
              A food app that helps users search for recipes based on the
              ingredients they already have in their fridge is very practical
              and useful. It's a great way to avoid food waste and save time by
              making the most of what you have at home. This type of app is
              especially helpful for people who don't have a lot of experience
              in the kitchen or are not sure how to combine ingredients to make
              a meal. It can also be a great tool for those who want to try new
              recipes or experiment with different ingredients.
            </p>
          </div>

          <div className="col">
            <img
              src={aboutus}
              className="aboutusimage"
              alt="this is a picture of a fridge"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
