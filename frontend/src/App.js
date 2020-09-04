import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import MainNav from "./components/Navbar";

// Defined proxy to axios config to accept client requests
axios.defaults.baseURL = 'https://powerful-coast-97236.herokuapp.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };
  //Task status check
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  //This will display complete and incomplete tasks
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  //Rendered tasks
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center border-top"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2 btn-block"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger btn-block"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  //This handles the submit function
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then(res => this.refreshList());
  };
  //Delete a task
  handleDelete = item => {
    axios
      .delete(`/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  //Create a task
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  //Edit a task
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="container-fluid">
        {/* imported navbar */}
        <MainNav />

        {/* Main jumbotron section */}
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <div class="row">
              {/* Content on the left */}
              <div class="col-sm-4">
                <h2 class="reg-color text-heavy">A simple and responsive to-do hybrid app. Built using the power of Django and React.</h2>
              </div>
              <div class="col-sm-8">
                  <div class="card ">
                    <div class="card-body">
                      <h5 class="card-title">
                        <button onClick={this.createItem} className="btn btn-primary btn-lg btn-block">
                          Add task
                        </button>
                      </h5>
                      {this.renderTabList()}
                      <ul className="list-group list-group-flush">
                        {this.renderItems()}
                      </ul>
                      {/* Modal */}
                      {this.state.modal ? (
                        <Modal
                          activeItem={this.state.activeItem}
                          toggle={this.toggle}
                          onSave={this.handleSubmit}
                        />
                      ) : null}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default App;
