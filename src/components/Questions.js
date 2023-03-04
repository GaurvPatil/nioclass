import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { API } from "../API";
import Loader from "./Loader";

const totalQuestionsArr = [
  {
    name: "Area Under The Curve",
    id: "AreaUnderTheCurve_901",
  },
  {
    name: "Binomial Theorem",
    id: "BinomialTheorem_901",
  },
  {
    name: "Differential Calculus 2",
    id: "DifferentialCalculus2_901",
  },
];

const Questions = () => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [ID, setID] = useState(totalQuestionsArr[0].id);

  // fetch Question
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const question = await axios.get(`${API}${ID}`);
        setCurrentQuestion(question.data[0].Question);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, [ID]);

  return (
    <main className=" alignment alignmentCol ">
      {/* Question section  */}

      {loading ? (
        <Loader />
      ) : (
        <section className="Qsection">
          <MathJaxContext>
            <MathJax className="lineHeight">{currentQuestion}</MathJax>
          </MathJaxContext>
        </section>
      )}

      {/* Button section  */}
      <section className="alignment alignmentRow">
        {totalQuestionsArr.map((btn) => {
          return (
            <button
              className={ID === btn.id ? "selectedBtn button" : "btn button"}
              key={btn.id}
              onClick={() => setID(btn.id)}
            >
              {btn.name}
            </button>
          );
        })}
      </section>
    </main>
  );
};

export default Questions;
