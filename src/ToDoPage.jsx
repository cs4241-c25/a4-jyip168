import React from 'react'

function ToDoPage() {

    return (
        <div className="d-flex flex-column align-items-center gap-5">
            <a href="/logout" className="btn btn-warning btn-lg logout-button z-3 position-fixed"
               role="button">Logout</a>
            <h1 className="h1 text-decoration-underline">Art Commission To-Do List</h1>
            <section className="container-lg">
                <div>
                    <h2 className="h2">Add New Commission</h2>
                    <hr className="border border-primary border-2 opacity-75"/>
                </div>
                <form id="comm-form" className="row g-3">
                    <div className="mb-1 col-12">
                        <label htmlFor="clientname" className="form-label fs-5">Commissioner Name: </label>
                        <input type="text" id="clientname" className="form-control form-control-sm" required/>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="commtype" className="form-label fs-5">Commission Type: </label>
                        <select name="commtype" id="commtype" className="form-select form-select-sm" required>
                            <option value="">--Please choose an option--</option>
                            <option value="Icon">Icon</option>
                            <option value="Half Body">Half Body</option>
                            <option value="Full Body">Full Body</option>
                            <option value="Scene">Scene</option>
                        </select>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="styletype" className="form-label fs-5">Style Type: </label>
                        <select name="styletype" id="styletype" className="form-select form-select-sm" required>
                            <option value="">--Please choose an option--</option>
                            <option value="Sketch">Sketch</option>
                            <option value="Flat">Flat Color</option>
                            <option value="Shaded">Shaded</option>
                        </select>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="dateissued" className="form-label fs-5">Date Issued: </label>
                        <input type="date" id="dateissued" name="dateissued"
                               className="form-control form-control-sm" required/>
                    </div>
                    <div className="mb-1 col-12">
                        <label htmlFor="commdesc" className="form-label fs-5">Commission Description: </label>
                        <textarea id="commdesc" name="commdesc" className="form-control"
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
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="container-lg">
                <div>
                    <h2 className="h2">Update Commission</h2>
                    <hr className="border border-primary border-2 opacity-75"/>
                </div>
                <form id="editForm" className="row g-3 d-none">
                    <div className="mb-1 col-12">
                        <label htmlFor="edit-clientname" className="form-label fs-5">Commissioner Name: </label>
                        <input type="text" id="edit-clientname" className="form-control form-control-sm" required/>
                    </div>
                    <div className="mb-1 col-md-4">
                        <label htmlFor="edit-commtype" className="form-label fs-5">Commission Type: </label>
                        <select name="edit-commtype" id="edit-commtype" className="form-select form-select-sm"
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
                               className="form-control form-control-sm" required/>
                    </div>
                    <div className="mb-1 col-12">
                        <label htmlFor="edit-commdesc" className="form-label fs-5">Commission Description: </label>
                        <textarea id="edit-commdesc" name="edit-commdesc" className="form-control"
                                  required></textarea>
                    </div>
                    <div className="mb-1 col-12">
                        <label htmlFor="edit-progress" className="form-label fs-5">Progress: </label>
                        <select name="edit-progress" id="edit-progress" className="form-select form-select-sm"
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
                    <input type="hidden" id="editid" name="editid" value=""/>
                    <div className="align-buttons col-12">
                        <input type="submit" className="btn btn-primary me-2"/>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default ToDoPage