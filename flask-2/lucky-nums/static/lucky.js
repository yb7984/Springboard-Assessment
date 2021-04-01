/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault();

    $form = $("#lucky-form");

    $inputs = $form.find('input');

    data = {};

    for (let i = 0 ; i < $inputs.length ; i ++){
        data[$($inputs[i]).attr("id")] = $($inputs[i]).val();
    }

    res = await axios.post('/api/get-lucky-num' , data);

    handleResponse(res);
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    if (res.status == 200){
        data = res.data;

        $errContainer = $form.find('b');
        $errContainer.html('');

        if (data["errors"]){
            for (const [key , value] of Object.entries(data["errors"])){
                if (value.length > 0){
                    value.forEach(item => {
                        $(`#${key}-err`).append(item);
                    });
                }
            }
        } else {
            $("#lucky-results").html(`
            Your lucky number is ${data["num"]["num"]} ([${data["num"]["fact"]}]). <br />
            Your birth year (${data["year"]["year"]}) fact is ${data["year"]["fact"]}.
            `);
        }
    }
}


$("#lucky-form").on("submit", processForm);
