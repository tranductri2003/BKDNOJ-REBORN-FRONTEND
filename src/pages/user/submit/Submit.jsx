import React from 'react';
import { Form } from 'react-bootstrap';

import './Submit.scss';


export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }

  render() {
    return (
      <div className="submit-window">
        <h4 className="title"> 
          Making Submission
        </h4>
        <hr/>

        <Form>
          <Form.Group className="" >
            <Form.Label>Language</Form.Label>
            <Form.Select disabled>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Code Editor</Form.Label>
          </Form.Group>
        </Form>
      </div>
    )
  }
}