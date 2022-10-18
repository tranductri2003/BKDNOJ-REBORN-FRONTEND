import {memo} from "react";
import {parseTime, parseMem} from "helpers/textFormatter";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Row, Col, Table} from "react-bootstrap";
import submissionApi from "api/submission";
import { SpinLoader } from "components";

const SubmissionTestCase = memo(
  ({data, maxTime, isAllToggle, problemId}) => {
    const [toggle, setToggle] = useState(false);
    const [testcaseDetail, setTestcaseDetail] = useState(null);
    const [testcaseErr, setTestcaseErr] = useState(null);

    const onToggle = () => {
      setToggle(val => !val);
      fetch();
    };

    useEffect(() => {
      setToggle(isAllToggle);
    }, [isAllToggle]);

    const fetch = () => {
        if (testcaseErr || testcaseDetail) return;
        submissionApi
        .getSubmissionResultCase({case_num: data.case, id: problemId})
        .then(res => {
            setTestcaseDetail(res.data);
        })
        .catch(_err => {
            setTestcaseErr("Not allowed")
        });
    }

    useEffect(() => {}, []);

    return (
      <>
        <tr className="test-case-result border">
          <td className="pl-1 pr-1">
            <span className="d-flex align-self-center">
                <Link to="#" onClick={() => onToggle()}>
                    <strong>Case#{data.case}</strong>
                </Link>
            </span>
          </td>
          <td className="pl-1 pr-1">
            <span className={`verdict ${data.status.toLowerCase()}`}>
              <span className={`verdict-wrapper ${data.status.toLowerCase()}`}>
                <span className="text">{data.status}</span>
              </span>
            </span>
          </td>
          <td className="pl-1 pr-1">
            <span className="time">
              {data.status === "tle"
                ? `>${parseTime(maxTime)}`
                : parseTime(data.time)}
            </span>
          </td>
          <td className="pl-1 pr-1">
            <span className="time">{parseMem(data.memory)}</span>
          </td>
        </tr>
        {
            toggle && <tr><td colSpan="99">
                <div className="d-block">
                {
                    !testcaseDetail && !testcaseErr && <div className="d-flex m-3">
                        <SpinLoader size={18} margin="auto"/>
                    </div>
                }
                {
                    !!testcaseErr && <>
                        <pre><code>Not allowed.</code></pre>
                    </>
                }
                {
                    !testcaseErr && !!testcaseDetail && <>
                        <p className="p-0 m-0 font-weight-bold border-bottom">Input</p>
                        <pre className="bg-light">
                            {testcaseDetail.input_partial}
                        </pre>
                        <p className="p-0 m-0 font-weight-bold border-bottom">Answer</p>
                        <pre className="bg-light">
                            {testcaseDetail.answer_partial}
                        </pre>
                        <p className="p-0 m-0 font-weight-bold border-bottom">Participants Output</p>
                        <pre className="bg-light">
                            {testcaseDetail.output}
                        </pre>
                    </>
                }
                </div>
            </td></tr>
        }
      </>
    );
  }
);

const SubmissionTestCaseTable = ({submissionData}) => {
  const [testcase, setTestcase] = useState();

  useEffect(() => {
    submissionApi.getSubmissionResult({id: submissionData.id}).then(res => {
      setTestcase(res.data);
    });
  }, []);

  return (
    <div className="test-result info-subsection p-0">
      <div className="d-flex justify-content-between">
        <h5>Test Result</h5>
      </div>
      {testcase ? (
        <Row>
          <Col>
            <Table responsive striped size="xs">
              <tbody>
                {testcase.test_cases.map(test_case => (
                  <SubmissionTestCase
                    isAllToggle={allToggle}
                    key={test_case.id}
                    data={test_case}
                    canViewTest={testcase.can_view_test_data}
                    problemId={submissionData.id}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default SubmissionTestCaseTable;