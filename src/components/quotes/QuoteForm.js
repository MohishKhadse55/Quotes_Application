import { Fragment, useRef, useState } from "react";

// import Card from '../ui/Card';
// import LoadingSpinner from '../ui/
import classes from "./QuoteForm.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Prompt } from "react-router-dom";

const QuoteForm = (props) => {
  const [isEntered, setEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    setEntering(true);
  };

  const finishEnteringHandler = () => {
    setEntering(false);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntered}
        message={(location) =>
          "Are you sure! All your entered data will be lost "
        }
      />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner></LoadingSpinner>
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
