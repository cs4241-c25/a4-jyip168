import React, {useEffect, useState} from 'react'
import axios from "axios"

function ToDoPage() {

    const [reload, setReload] = useState(0);
    const [commissions, setCommissions] = useState([]);
    const [submission, setSubmission] = useState([{
        clientname: "",
        commtype: "",
        styletype: "",
        dateissued: "",
        commdesc: "",
    }]);

    const [update, setUpdate] = useState([{
        _id: "",
        clientname: "",
        commtype: "",
        styletype: "",
        dateissued: "",
        commdesc: "",
        progress: "",
    }]);

    useEffect(() => {
        axios.get("backend/getCommissions")
            .then(res => {
                const data = res.data;
                setCommissions(data);
            })
            .catch(err => console.log(err));

    }, [reload]);

    useEffect(() => {
        console.log("commissions: ", commissions);
    }, [commissions]);

    function handleSubmit(event) {
        event.preventDefault()

        axios.post("backend/submit", (submission))
            .then(res => {
                const form = document.querySelector("#comm-form");
                form.reset();

                const editSection = document.querySelector("#editForm");
                editSection.reset();
                editSection.classList.add("d-none");

                setReload(reload + 1);
            })
            .catch(err => console.log(err));
    }

    function handleDelete(id) {
        axios.delete("backend/delete",
            {data: {id}})
            .then(res => {
                const editSection = document.querySelector("#editForm");
                editSection.reset();
                editSection.classList.add("d-none");

                setReload(reload + 1);
        })
            .catch(err => console.log(err));
    }

    function handleUpdate(event) {
        event.preventDefault()

        axios.post("backend/update", (update))
            .then(res => {
                const editSection = document.querySelector("#editForm");
                editSection.reset();

                editSection.classList.add("d-none");
                setReload(reload + 1);
            })
            .catch(err => console.log(err));
    }

    function loadEdit(id, clientname, commtype, styletype, dateissued, commdesc, progress) {
        const clientnameField = document.querySelector("#edit-clientname");
        clientnameField.value = clientname;
        const commtypeField = document.querySelector("#edit-commtype");
        commtypeField.value = commtype;
        const styletypeField = document.querySelector("#edit-styletype");
        styletypeField.value = styletype;
        const dateissuedField = document.querySelector("#edit-dateissued");
        let tempdate = new Date(dateissued);

        let year = tempdate.getUTCFullYear();
        let month = tempdate.getUTCMonth() + 1;
        let day = tempdate.getUTCDate();
        const convertedDate = year.toString().padStart(4, "0") + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
        dateissuedField.value = convertedDate;

        const commdescField = document.querySelector("#edit-commdesc");
        commdescField.value = commdesc;
        const progressField = document.querySelector("#edit-progress");
        progressField.value = progress;
        const editidField = document.querySelector("#editid");
        editidField.value = id;

        setUpdate({
            _id: id,
            clientname: clientname,
            commtype: commtype,
            styletype: styletype,
            dateissued: convertedDate,
            commdesc: commdesc,
            progress: progress,
        })


        const editSection = document.querySelector("#editForm");
        editSection.classList.remove("d-none");

    }


    return (
        <div className="d-flex flex-column align-items-center gap-5">
            <a href="backend/logout" className="btn btn-warning btn-lg logout-button z-3 position-fixed"
               role="button">Logout</a>
            <h1 className="h1 text-decoration-underline">Art Commission To-Do List</h1>
            <section className="container-lg">
                <div>
                    <h2 className="h2">Add New Commission</h2>
                    <hr className="border border-primary border-2 opacity-75"/>
                </div>
                <form id="comm-form" className="row g-3" onSubmit={handleSubmit}>
                    <div className="mb-1 col-12">
                        <label htmlFor="clientname" className="form-label fs-5">Commissioner Name: </label>
                        <input type="text" id="clientname" className="form-control form-control-sm"
                               onChange={e => setSubmission(prevState => ({...prevState, clientname: e.target.value}))}
                               required/>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="commtype" className="form-label fs-5">Commission Type: </label>
                        <select name="commtype" id="commtype" className="form-select form-select-sm"
                                onChange={e => setSubmission(prevState => ({...prevState, commtype: e.target.value}))}
                                required>
                            <option value="">--Please choose an option--</option>
                            <option value="Icon">Icon</option>
                            <option value="Half Body">Half Body</option>
                            <option value="Full Body">Full Body</option>
                            <option value="Scene">Scene</option>
                        </select>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="styletype" className="form-label fs-5">Style Type: </label>
                        <select name="styletype" id="styletype" className="form-select form-select-sm"
                                onChange={e => setSubmission(prevState => ({...prevState, styletype: e.target.value}))}
                                required>
                            <option value="">--Please choose an option--</option>
                            <option value="Sketch">Sketch</option>
                            <option value="Flat">Flat Color</option>
                            <option value="Shaded">Shaded</option>
                        </select>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="dateissued" className="form-label fs-5">Date Issued: </label>
                        <input type="date" id="dateissued" name="dateissued" className="form-control form-control-sm"
                               onChange={e => setSubmission(prevState => ({...prevState, dateissued: e.target.value}))}
                               required/>
                    </div>
                    <div className="mb-1 col-12">
                        <label htmlFor="commdesc" className="form-label fs-5">Commission Description: </label>
                        <textarea id="commdesc" name="commdesc" className="form-control"
                                  onChange={e => setSubmission(prevState => ({...prevState, commdesc: e.target.value}))}
                                  required></textarea>
                    </div>
                    <div className="col-12">
                        <input type="submit" className="btn btn-primary me-2"/>
                        <input type="reset" className="btn btn-secondary me-2"/>
                    </div>
                </form>
            </section>
            <section className="container-lg">
                <div>
                    <h2 className="h2">Results</h2>
                    <hr className="border border-primary border-2 opacity-75"/>
                </div>
                <div id="results-scroll" className="table-responsive overflow-y-auto">
                    <table id="results-table"
                           className="table table-striped table-hover table-secondary table-bordered align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th scope="col" className="d-none">ID</th>
                            <th scope="col" className="p-4 text-nowrap text-center">Commissioner Name</th>
                            <th scope="col" className="p-4 text-nowrap text-center">Commission Type</th>
                            <th scope="col" className="p-4 text-nowrap text-center">Style Type</th>
                            <th scope="col" className="p-4 text-nowrap text-center">Date Issued</th>
                            <th scope="col" className="p-4 px-5 text-nowrap text-center">Commission Description</th>
                            <th scope="col" className="p-4 text-center">Progress</th>
                            <th scope="col" className="p-4 text-center">Deadline</th>
                            <th scope="col" className="p-4 text-center">Buttons</th>
                        </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {commissions.map(item => (
                            <tr key={item._id}>
                                <td className="d-none">{item._id}</td>
                                <td className="text-center text-break">{item.clientname}</td>
                                <td className="text-center text-break text-nowrap">{item.commtype}</td>
                                <td className="text-center text-break text-nowrap">{item.styletype}</td>
                                <td className="text-center text-break text-nowrap">{item.dateissued}</td>
                                <td className="text-center text-break">{item.commdesc}</td>
                                <td className="text-center text-break text-nowrap">{item.progress}</td>
                                <td className="text-center text-break text-nowrap">{item.deadline}</td>
                                <td>
                                    <div className="row">
                                        <button className="btn btn-primary text-nowrap col m-2"
                                                onClick={() => loadEdit(item._id, item.clientname, item.commtype, item.styletype, item.dateissued, item.commdesc, item.progress)}>Edit
                                        </button>
                                        <button className="btn btn-danger text-nowrap col m-2"
                                                onClick={() => handleDelete(item._id)}>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="container-lg">
                <div>
                    <h2 className="h2">Update Commission</h2>
                    <hr className="border border-primary border-2 opacity-75"/>
                </div>
                <form id="editForm" className="row g-3 d-none" onSubmit={handleUpdate}>
                    <div className="mb-1 col-12">
                        <label htmlFor="edit-clientname" className="form-label fs-5">Commissioner Name: </label>
                        <input type="text" id="edit-clientname" className="form-control form-control-sm"
                               onChange={e => setUpdate(prevState => ({...prevState, clientname: e.target.value}))}
                               required/>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="edit-commtype" className="form-label fs-5">Commission Type: </label>
                        <select name="edit-commtype" id="edit-commtype" className="form-select form-select-sm"
                                onChange={e => setUpdate(prevState => ({...prevState, commtype: e.target.value}))}
                                required>
                            <option value="">--Please choose an option--</option>
                            <option value="Icon">Icon</option>
                            <option value="Half Body">Half Body</option>
                            <option value="Full Body">Full Body</option>
                            <option value="Scene">Scene</option>
                        </select>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="edit-styletype" className="form-label fs-5">Style Type: </label>
                        <select name="edit-styletype" id="edit-styletype" className="form-select form-select-sm"
                                onChange={e => setUpdate(prevState => ({...prevState, styletype: e.target.value}))}
                                required>
                            <option value="">--Please choose an option--</option>
                            <option value="Sketch">Sketch</option>
                            <option value="Flat">Flat Color</option>
                            <option value="Shaded">Shaded</option>
                        </select>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="edit-dateissued" className="form-label fs-5">Date Issued: </label>
                        <input type="date" id="edit-dateissued" name="edit-dateissued"
                               onChange={e => setUpdate(prevState => ({...prevState, dateissued: e.target.value}))}
                               className="form-control form-control-sm" required/>
                    </div>
                    <div className="mb-1 col-12">
                        <label htmlFor="edit-commdesc" className="form-label fs-5">Commission Description: </label>
                        <textarea id="edit-commdesc" name="edit-commdesc" className="form-control"
                                  onChange={e => setUpdate(prevState => ({...prevState, commdesc: e.target.value}))}
                                  required></textarea>
                    </div>
                    <div className="mb-1 col-12">
                        <label htmlFor="edit-progress" className="form-label fs-5">Progress: </label>
                        <select name="edit-progress" id="edit-progress" className="form-select form-select-sm"
                                onChange={e => setUpdate(prevState => ({...prevState, progress: e.target.value}))}
                                required>
                            <option value="">--Please choose an option--</option>
                            <option value="Not Started">Not Started</option>
                            <option value="Linework">Linework</option>
                            <option value="Coloring">Coloring</option>
                            <option value="Shading">Shading</option>
                            <option value="Almost Done">Almost Done</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <input type="hidden" id="editid" name="editid" value=""
                           onChange={e => setUpdate(prevState => ({...prevState, _id: e.target.value}))}/>
                    <div className="align-buttons col-12">
                        <input type="submit" className="btn btn-primary me-2"/>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default ToDoPage


