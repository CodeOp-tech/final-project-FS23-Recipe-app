import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SearchBar from "../views/Home/SearchBar";
import "./ResultView.css";
import { Api } from "../helpers/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbArrowsLeftRight } from "react-icons/tb";
import { GiNoodles, GiChickenLeg } from "react-icons/gi";
import { AiFillLike } from "react-icons/ai";
import sadNuggie from "../img/sadNuggie.gif";

export default function ResultView(props) {
  const {
    allRecipes,
    setAllRecipes,
    showRecipe,
    ingredients,
    setIngredients,
    allfav,
    addOrDelete,
    // recipe,
  } = props;
  const [recipeToCompare, setRecipeCompare] = useState({});
  const [show, setShow] = useState(false);
  console.log(allRecipes);
  //ALERT function: we need recipe name, healthScore to show on the alert
  const getRecipeInfoToCompare = async (id) => {
    const recipeInfo = await Api.getRecipeInfo(id);
    // first time when user clicks on the button, checks if it's empty.
    if (recipeToCompare.recipeA === undefined) {
      //save in object format
      setRecipeCompare({
        recipeA: {
          title: recipeInfo.title,
          healthScore: recipeInfo.healthScore,
        },
      });
    } else {
      //we get the second click, get the value straight from the object
      const recipeB = {
        title: recipeInfo.title,
        healthScore: recipeInfo.healthScore,
      };

      const winningMessage = (winner, loser) =>
        `🌶 ${winner.title} has a better health score than ${loser.title}! (${winner.healthScore} VS ${loser.healthScore}) 🌶`;

      if (recipeToCompare.recipeA.healthScore > recipeB.healthScore) {
        showNutriAlert(winningMessage(recipeToCompare.recipeA, recipeB));
      } else if (recipeToCompare.recipeA.healthScore < recipeB.healthScore) {
        showNutriAlert(winningMessage(recipeB, recipeToCompare.recipeA));
      } else {
        showNutriAlert(
          `🌶 ${recipeToCompare.recipeA.title} and ${recipeB.title} has same health score: ${recipeB.healthScore}! 🌶`
        );
      }
      //get the info from both

      setRecipeCompare({}); //reset state
    }
  };

  const showNutriAlert = (message) => {
    setShow(true);
    toast(message, {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  /* (line 90)Recipe onClick card and (line 114)compare button onClick will both be clicked on, 
  so we need to give a if statement by checking the unic perperty from event.target to find which one we clicked on, 
  then we disable onClick to render the recipe page  */

  return (
    <div>
      <div>
        {show ? (
          <div>
            <ToastContainer />
          </div>
        ) : null}

        <SearchBar
          setAllRecipes={setAllRecipes}
          setIngredients={setIngredients}
          ingredients={ingredients}
        />
      </div>

      <Container
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        {allRecipes.length > 0 ? (
          <Row xs={1} md={2} className="g-4">
            <Col>
              {allRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="card-recipe"
                  style={{ width: "18rem" }}
                  onClick={(event) => {
                    if (
                      event.target.localName !== "svg" &&
                      event.target.localName !== "path"
                    ) {
                      showRecipe(recipe.id);
                    }
                  }}
                >
                  <div className="container">
                    <Card.Img variant="top" src={recipe.image} />
                    {recipe && (
                      <div>
                        <button
                          id="buttononrecipe"
                          type="button"
                          onClick={(event) => {
                            //tried: event.preventDefault(); &event.stopPropagation();
                            // event.preventDefault();
                            // event.stopPropagation();
                            addOrDelete(recipe, event);
                          }}
                          className="btn btn-danger"
                        >
                          {allfav.some((e) => recipe.id === e.recipe_id) ? (
                            <i className="bi bi-heart-fill"> </i>
                          ) : (
                            <i className="bi bi-heart"></i>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Subtitle style={{ color: "orange" }}>
                      <AiFillLike size="1.8rem" />
                      {recipe.likes}
                    </Card.Subtitle>
                    {recipeToCompare.recipeA?.title !== recipe.title && (
                      <Button
                        style={{
                          color: "orange",
                        }}
                        type="button"
                        title="Compare health score!"
                        onClick={() => {
                          getRecipeInfoToCompare(recipe.id);
                        }}
                        variant="outline-light"
                      >
                        <GiNoodles size="1.5rem" />
                        <TbArrowsLeftRight size="1.1rem" />
                        <GiChickenLeg size="1.5rem" />
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        ) : (
          <div>
            <p style={{ fontSize: "11px", marginTop: "10px" }}>
              Oups, we couldn't find any recipe that matches your ingredients.
              <br />
              Try searching for another ingredient.
            </p>
            <img
              src={sadNuggie}
              style={{ width: 150, height: 150 }}
              alt="no-results-nuggie"
            />
          </div>
        )}
      </Container>
    </div>
  );
}
