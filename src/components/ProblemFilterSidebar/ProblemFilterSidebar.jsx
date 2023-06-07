/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Select from 'react-select';

// Redux
import {connect} from "react-redux";
import {
  clearProblemTags,
  updateProblemTags,
} from "redux/ProblemFilter/actions";

import {Button, Row, Col} from "react-bootstrap";
import problemTagAPI from "api/problem-tag";

// Assets
import {FaTimes, FaFilter} from "react-icons/fa";
import "./ProblemFilterSidebar.scss";
import { toast } from "react-toastify";

const ProblemFilterSidebar = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const tag2Option = (tag) => {
    return {value: tag.id, label: tag.name}
  }

  useEffect(() => {
    async function fetch() {
      try {
        const response = await problemTagAPI.getProblemTags()
        setTags(response.data.results);
        setLoading(false);
      } catch (error) {
        toast.error("Couldn't retrieve problem tags", {toastId: "problem-filter-sidebar-tags"})
        setLoading(false);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) props.clearProblemTags();
  }, [selectedTags])

  return (
    <div className="wrapper-vanilla" id="sub-filter">
      <h4>Problem Filter</h4>
      {(
        <>
          <div className="flex-center-col text-left filter-panel p-2">
            <Row>
              Problem Tags:
            </Row>
            <Row>
              <div className="unset-css-select-menu">
                <Select isMulti isLoading={isLoading} 
                  closeMenuOnSelect={false} options={tags.map((tag) => tag2Option(tag))} 
                  placeholder="Select.." 
                  onChange={sel => setSelectedTags(sel)}
                />
              </div>
            </Row>
          </div>

          <div className="p-1 text-right d-flex flex-row-reverse" style={{ columnGap: "5px", }}>
            <Button size="sm" variant="secondary" className="btn-svg"
              onClick={() => {
                props.updateProblemTags(selectedTags.map(sel => sel.value))
              }}
            >
              <FaFilter /> Filter
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    problemTags: state.problemFilter.problemTags,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateProblemTags: (tagArray) => dispatch(updateProblemTags({problemTags: tagArray})),
    clearProblemTags: () => dispatch(clearProblemTags()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemFilterSidebar);
