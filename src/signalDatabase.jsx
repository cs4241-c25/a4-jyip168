// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()


    const
        clientNameInput = document.querySelector( "#clientname" ),
        commTypeInput = document.querySelector( "#commtype" ),
        styleTypeInput = document.querySelector( "#styletype" ),
        dateIssuedInput = document.querySelector( "#dateissued" ),
        commDescInput = document.querySelector( "#commdesc" );

    const json = {clientname: clientNameInput.value,
            commtype: commTypeInput.value, styletype: styleTypeInput.value,
            dateissued: dateIssuedInput.value, commdesc: commDescInput.value},
        body = JSON.stringify( json )

    const response = await fetch( "/submit", {
        method:'POST',
        body
    })

    const text = await response.text()
    //console.log( "text:", JSON.parse(text) )

    const form = document.querySelector("#comm-form");
    form.reset();

    const editSection = document.querySelector("#editForm");
    editSection.reset();
    //editSection.style.display = "none";
    editSection.classList.add("d-none");
    window.location.reload();

}

const update = async function( event ) {
    event.preventDefault()

    const
        id = document.querySelector("#editid"),
        updateName = document.querySelector( "#edit-clientname" ),
        updateCommType = document.querySelector( "#edit-commtype" ),
        updateStyleType = document.querySelector( "#edit-styletype" ),
        updateDateIssued = document.querySelector( "#edit-dateissued" ),
        updateDesc = document.querySelector( "#edit-commdesc" ),
        updateProgress = document.querySelector( "#edit-progress" );

    const json = {_id: id.value, clientname: updateName.value,
            commtype: updateCommType.value, styletype: updateStyleType.value,
            dateissued: updateDateIssued.value, commdesc: updateDesc.value, progress: updateProgress.value},
        body = JSON.stringify( json )

    const response = await fetch( "/update", {
        method:'POST',
        body
    })

    const text = await response.text()
    //console.log( "updated text:", JSON.parse(text) )



    const editSection = document.querySelector("#editForm");
    editSection.reset();
    //editSection.style.display = "none";
    editSection.classList.add("d-none");
    window.location.reload();

}

window.onload = function() {
    const form = document.querySelector("#comm-form");
    form.addEventListener('submit', submit);

    const edit = document.querySelector("#editForm");
    edit.addEventListener('submit', update);

    alert("Hello! I am an alert box!!");
}

async function handleDelete(id) {
    const formid = JSON.stringify({id})
    const response = await fetch("/delete", {
        method: 'DELETE',
        body: formid
    })

    const text = await response.text()
    //console.log( "remaining data:", JSON.parse(text) )

    const editSection = document.querySelector("#editForm");
    editSection.reset();
    //editSection.style.display = "none";
    editSection.classList.add("d-none");
    window.location.reload();
}

function handleEdit(id, clientname, commtype, styletype, dateissued, commdesc, progress) {
    const clientnameField = document.querySelector("#edit-clientname");
    clientnameField.value = clientname;
    const commtypeField = document.querySelector("#edit-commtype");
    commtypeField.value = commtype;
    const styletypeField = document.querySelector("#edit-styletype");
    styletypeField.value = styletype;
    const dateissuedField = document.querySelector("#edit-dateissued");
    let tempdate = new Date(dateissued);
    //console.log("tempdate: ", tempdate);
    let year = tempdate.getUTCFullYear();
    let month = tempdate.getUTCMonth() + 1;
    let day = tempdate.getUTCDate();
    dateissuedField.value = year.toString().padStart(4, "0") + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
    //console.log("input date: ", year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0"));
    const commdescField = document.querySelector("#edit-commdesc");
    commdescField.value = commdesc;
    const progressField = document.querySelector("#edit-progress");
    progressField.value = progress;
    const editidField = document.querySelector("#editid");
    editidField.value = id;


    const editSection = document.querySelector("#editForm");
    //editSection.style.display = "block";
    editSection.classList.remove("d-none");

}
