import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import problemAPI from 'api/problem';

const ProblemSelectLabel = (props) => {
  const {shortname, title} = props;
  return (
    shortname ?
      <div className="problem-choice text-left d-flex flex-column" style={{
        fontSize: "14px", maxWidth: "300px",
        focus: {
          opacity: "50%",
        }
      }}>
        <span>
          <span className="rounded bg-dark text-light pl-1 pr-1 mr-1">prob</span>
          {title}
        </span>
        <span style={{fontSize: "10px"}}>{shortname}</span>
      </div>
    : <></>
  );
}

export default class ProblemSingleSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  async loadOptions(val) {
    return problemAPI.getProblems({params: {search: val, ordering: "-modified"}})
    .then((res) => {
      let data = res.data.results.map((prob) => ({
        value: prob.shortname,
        label: ProblemSelectLabel(prob),
        prob: prob,
      }));
      return data;
    })
  }

  render() {
    const {prob} = this.props;
    return(
      <>
        <AsyncSelect
          cacheOptions
          defaultOptions={!prob.shortname}

          placeholder="Search problem code/title"
          noOptionsMessage={()=>("Không tìm thấy. Hãy thử đổi nội dung tìm kiếm.")}

          loadOptions={(val)=>this.loadOptions(val)}
          onChange={(sel)=>this.props.onChange(sel.prob)}

          value = {{
            value: prob.shortname,
            label: ProblemSelectLabel({shortname: prob.shortname, title: prob.title}),
          }}

          styles={{
            menu: () => ({
              zIndex: 50,
              position: "fixed",
              backgroundColor: "#fff",
            }),
            valueContainer: () => ({
              display: "flex",
            })
          }}
        />
      </>
    )
  }
}

ProblemSingleSelect.propTypes = {
  prob: PropTypes.object,
  onChange: PropTypes.func,
};
