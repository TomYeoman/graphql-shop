import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import ErrorMessage from './ErrorMessage'
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $price: Int!
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      price: $price
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Much title",
    description: "Many wow",
    image: "",
    largeImage: "large-dog.jpg",
    price: 1000
  };

  handleInputChange = e => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;
    this.setState((state, props) => {
      return { [name]: val };
    });
  };

  uploadFile= (async (e) => {
    console.log('Uploading file')
    const {files} = e.target;

    const data = new FormData();
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits')

    const res = await fetch('https://api.cloudinary.com/v1_1/dnso6rdkr/image/upload', {
      method:"post",
      body: data,
    })
    
    const file = await res.json();

    console.log(file)

    debugger
    this.setState((state, props) => { return { image : file.secure_url, largeImage: file.eager[0].secure_url }})
    
  })

  render() {
    return (
      <div>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, { loading, error, called, data }) => {
            return (
              <Form
                onSubmit={async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  console.log(this.state);
                  // Call the mutation ( variables are set so automatically passed )
                  const res = await createItem();
                  console.log(res.data.createItem.id);

                  Router.push({
                    pathname :'/item',
                    query : {id : res.data.createItem.id}
                  })

                }}
              >
                <ErrorMessage error={error}/>
                <fieldset>
                  <label htmlFor="file" className="htmlFor">
                    File
                    <input
                      type="file"
                      id="file"
                      placeholder="Upload an image"
                      name="file"
                      onChange={this.uploadFile}
                    />
                  </label>
                  {this.state.image && (
                    <img width="200" src={this.state.image} alt="Upload Preview" />
                  )}
                  <label htmlFor="title" className="htmlFor">
                    Title
                    <input
                      type="text"
                      id="title"
                      placeholder="Title"
                      name="title"
                      onChange={this.handleInputChange}
                      value={this.state.title}
                    />
                  </label>
                  <label htmlFor="price" className="htmlFor">
                    price
                    <input
                      type="number"
                      id="price"
                      placeholder="Price"
                      name="price"
                      onChange={this.handleInputChange}
                      value={this.state.price}
                    />
                  </label>
                  <label htmlFor="price" className="htmlFor">
                    Description
                    <textarea
                      id="description"
                      placeholder="Enter a description"
                      name="description"
                      required
                      onChange={this.handleInputChange}
                      value={this.state.description}
                    />
                  </label>
                  {/* <label htmlFor="title" className="htmlFor">
                Title
                <input type="text" id="title" placeholder="Title" name="title" onChange={this.handleInputChange} value={this.state.title}/>
                </label>
                <label htmlFor="title" className="htmlFor">
                Title
                <input type="text" id="title" placeholder="Title" name="title" onChange={this.handleInputChange} value={this.state.title}/>
                </label> */}
                  <button type="Submit">Submit</button>
                </fieldset>
              </Form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
