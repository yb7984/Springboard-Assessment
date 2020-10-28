// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

const categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const response = await axios.get("http://jservice.io/api/categories", {
    params: { count: 50 },
  });
  if (response.status === 200) {
    const data = response.data;
    const ids = new Set();
    while (ids.size < 6) {
      const index = Math.round(Math.random() * (data.length - 1));
      ids.add(data[index].id);
    }

    return Array.from(ids);
  } else {
    console.log(
      `Error when retrieving categories ids. Error number :${response.status}`
    );
  }

  return null;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const response = await axios.get("http://jservice.io/api/category", {
    params: { id: catId },
  });
  if (response.status === 200) {
    const data = response.data;
    const indexes = new Set();

    while (
      indexes.size < NUM_QUESTIONS_PER_CAT &&
      indexes.size < data.clues.length
    ) {
      const index = Math.round(Math.random() * (data.clues_count - 1));
      indexes.add(index);
    }
    const category = { title: data.title, clues: [] };

    indexes.forEach((index) => {
      category.clues.push({
        question: data.clues[index].question,
        answer: data.clues[index].answer,
        showing: null,
      });
    });

    return category;
  } else {
    console.log(
      `Error when retrieving category info. Error number :${response.status}`
    );
  }

  return null;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  const table = $("#jeopardy");
  const headRow = $("#jeopardy thead tr");
  const tbody = $("#jeopardy tbody");

  //clear the table
  headRow.empty();
  tbody.empty();

  //generate the categories
  for (let category of categories) {
    const headCell = $(`<th>${category.title}</th>`);
    headRow.append(headCell);
  }

  //generate the cells
  for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
    const row = $("<tr></tr>");
    for (let j = 0; j < NUM_CATEGORIES; j++) {
      const cell = $("<td></td>", {
        id: `cell_${i}_${j}`,
        "data-x": j,
        "data-y": i,
        "data-question": categories[j].clues[i].question,
        "data-answer": categories[j].clues[i].answer,
      });
      cell.text("?");
      row.append(cell);
    }
    tbody.append(row);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  const cell = $(evt.target);

  const x = parseInt(cell.attr("data-x"));
  const y = parseInt(cell.attr("data-y"));
  const clue = categories[x].clues[y];

  if (clue.showing === null) {
    cell.attr("class", "question");
    cell.html(clue.question);
    clue.showing = "question";
  } else if (clue.showing === "question") {
    cell.attr("class", "answer");
    cell.html(clue.answer);
    clue.showing = "answer";
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $("#jeopardy").css("display", "none");
  $("#loading").css("display", "block");
  $("restart").prop("disabled", true);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $("#jeopardy").css("display", "block");
  $("#loading").css("display", "none");
  $("restart").prop("disabled", false);
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    //show the loading view
    showLoadingView();

    //clear the data
    categories.length = 0;

    //get random categories
    const categoryIds = await getCategoryIds();

    //fetch the categories
    for (let catId of categoryIds) {
        const category = await getCategory(catId);
        categories.push(category);
    }

    //fill the table
    await fillTable();

    //hide the loading view
    hideLoadingView();
}

const initialHTML = `
<div id="game">
<h1 id="title">Jeopardy Game</h1>
<button id="restart" class="btn">Restart the game!</button>
<table id="jeopardy">
<thead>
      <tr></tr>
</thead>
<tbody>
</tbody>
</table>
<div id="loading">
<i class="fas fa-spinner fa-spin"></i>
</div>
</div>
`;

$("body").prepend($(initialHTML));

/** On click of start / restart button, set up game. */
$("#restart").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */
$("#jeopardy").on("click", "tbody td", handleClick); //set the question cell click event


setupAndStart();
