import React from "react";
import {VscInfo} from "react-icons/vsc";
import {Badge, Button} from "react-bootstrap";
import {toast} from "react-toastify";

import {RichTextEditor} from "components";
import contestAPI from "api/contest";
import {setTitle} from "helpers/setTitle";

// Contexts
import ContestContext from "context/ContestContext";

// Styles
import "pages/user/problem/__List.scss";
import "./ContestAbout.scss";

class ContestAbout extends React.Component {
  constructor(props) {
    super(props);
    setTitle("About");
  }

  componentDidMount() {
    const contest = this.context.contest;
    setTitle(`${contest.name} | About`);
  }

  render() {
    const contest = this.context.contest;
    const description = contest?.description;
    return (
      <div className="wrapper-vanilla m-0.5 contest-about">
        <ContestInfo />
        <hr className="my-2 mx-2" />
        <ContestAuthors />
        {description ? (
          <RichTextEditor value={description} enableEdit={false} />
        ) : (
          <div className="flex-center-col" style={{height: "200px"}}>
            <VscInfo size={30} color="red" />
            <h4>No information given</h4>
          </div>
        )}
      </div>
    );
  }
}

ContestAbout.contextType = ContestContext;

const ContestInfo = () => {
  const {contest} = React.useContext(ContestContext);

  const startTime = new Date(contest.start_time);
  const endTime = new Date(contest.end_time);
  const contestLength = (endTime - startTime) / 1000;
  let contestLengthString = "";
  if (contestLength > 0) {
    const hours = Math.floor(contestLength / 3600);
    const minutes = Math.floor((contestLength - hours * 3600) / 60);
    const seconds = contestLength - hours * 3600 - minutes * 60;
    contestLengthString = `${hours}h:${minutes}m:${seconds}s`;
  }

  return (
    <div className="row px-2 pt-2">
      <div className="contest-info col-8">
        <Badge
          bg="warning"
          title="Number of participants"
          data-toogle="tooltip"
        >
          {`${contest?.user_count} participants`}
        </Badge>
        <Badge bg="danger">{contest.is_rated ? "rated" : "unrated"}</Badge>
        <Badge bg="success" title="Contest's duration" data-toogle="tooltip">
          {`Duration: ${contestLengthString}`}
        </Badge>
        <Badge bg="info" title="Contest's type" data-toogle="tooltip">
          {contest.format_name}
        </Badge>
      </div>
      <div className="col-auto d-flex align-items-center ml-auto">
        <JoinContestBtn />
      </div>
    </div>
  );
};

const JoinContestBtn = () => {
  const {contest} = React.useContext(ContestContext);
  const contestKey = contest.key;

  let isAllowToRegister = true;
  let tooltipText;
  let displayText;
  if (contest.is_registered) {
    displayText = "Registered";
    tooltipText = "Registered";
  } else {
    if (contest.register_allow === "LIVE") {
      displayText = "Participate";
      tooltipText = "Join as a Participant";
    } else if (contest.register_allow === "SPECTATE") {
      tooltipText = "Join as a Spectator";
      displayText = "Spectate";
    } else {
      isAllowToRegister = false;
      displayText = "Register";
      tooltipText = "Register is not allowed";
    }
  }

  const isDisable = !isAllowToRegister || contest.is_registered;
  // should we hide the button when not allowed to register?

  const registerContest = (ckey, ooc) => {
    let conf;
    if (ooc) {
      conf = window.confirm(
        `Đăng ký cuộc thi "${ckey}" ở tư cách spectator? Bạn sẽ có thể nộp bài, nhưng sẽ không xuất hiện trên bảng xếp hạng.`
      );
    } else {
      conf = window.confirm(
        `Đăng ký cuộc thi "${ckey}"? Sau khi đăng ký, bạn có thể nộp bài và xuất hiện trên bảng xếp hạng.`
      );
    }
    if (!conf) return false;

    contestAPI
      .joinContest({key: ckey})
      .then(() => {
        toast.success(`Đăng ký contest ${ckey} thành công.`, {
          toastId: "contest-registered",
        });
      })
      .catch(err => {
        const msg =
          (err.response && err.response.data && err.response.data.detail) ||
          `Đăng ký contest "${ckey}" thất bại.`;
        toast.error(msg, {toastId: "contest-register-failed"});
      })
      .finally(() => {
        // TODO: reload page
        // console.log("done");
      });
  };

  const onRegister = () => {
    if (!isDisable)
      return registerContest(contestKey, contest.register_allow === "SPECTATE");
  };

  return (
    <Button
      disabled={isDisable}
      variant={isDisable ? "secondary" : "primary"}
      onClick={onRegister}
      size="sm"
      title={tooltipText}
      data-toogle="tooltip"
    >
      {isAllowToRegister ? displayText : <s>{displayText}</s>}
    </Button>
  );
};

const ContestAuthors = () => {
  const {contest} = React.useContext(ContestContext);

  const isHidden = contest.authors?.length === 0;
  const authorList = () => {
    return contest.authors?.map((author, idx) => (
      <a
        href="#"
        className="contest-author"
        key={`contest-author-${author.username}`}
      >
        {author.username}
        {idx !== contest.authors.length - 1 ? ", " : ""}
      </a>
    ));
  };

  return (
    <div className="d-flex flex-wrap px-2 mb-2">
      <span className="mr-1 text-info">Contest Authors:</span>
      {isHidden ? <i className="text-secondary">hidden</i> : authorList()}
    </div>
  );
};

export default ContestAbout;
