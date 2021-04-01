describe("Jeopardy category test", function () {
  beforeEach(function () {
    // initialization logic
  });

  it("test for getCategoryIds()", async function () {
    const ids = await getCategoryIds();
    //length should be NUM_CATEGORIES
    expect(ids.length).toEqual(NUM_CATEGORIES);

    //ids should be numbers
    ids.forEach((item) => {
      expect(Number.isInteger(item)).toEqual(true);
    });

    //ids should be identical
    expect(ids.length).toEqual(new Set(ids).size);
  });

  it("test for getCategory()", async function () {
    const category = await getCategory(1452);

    //check the title
    expect(category.title).toEqual("heads of state");
    expect(category.clues.length).toEqual(NUM_QUESTIONS_PER_CAT);

    //check the clues keys
    const keys = Object.keys(category.clues[0]);
    expect(keys).toContain("question");
    expect(keys).toContain("answer");
    expect(keys).toContain("showing");
  });

  it("test for setupAndStart()", async function () {
    await setupAndStart();

    //only one row for the header
    expect($("#jeopardy thead tr").length).toEqual(1);
    //table head should have same number of columns as the categories
    expect($("#jeopardy thead th").length).toEqual(NUM_CATEGORIES); 
    //should have same number of rows as how many questions per category
    expect($("#jeopardy tbody tr").length).toEqual(NUM_QUESTIONS_PER_CAT);
    //totally there are NUM_CATEGORIES * NUM_QUESTIONS_PER_CAT of cells in the table body
    expect($("#jeopardy tbody td").length).toEqual(NUM_CATEGORIES * NUM_QUESTIONS_PER_CAT);
  });

  
  it("test for handleClick()", async function () {
    const cell   = $("#cell_0_0");
    //get the cell click
    cell.click();

    //css class change to "question"
    expect(cell.hasClass("question")).toEqual(true);

    //one more click
    cell.click();

    //css class change to "answer"
    expect(cell.hasClass("answer")).toEqual(true);

    //initial the table again
    await setupAndStart();
  });


  afterEach(function () {
    // teardown logic
  });
});
