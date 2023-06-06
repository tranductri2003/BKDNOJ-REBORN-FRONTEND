import COLORS from "constants/colors"

// export interface TagProps {
//   isDeletable?: boolean;
//   id: number;
//   name: string;
// }

const STYLE = {
  border: `solid 1px ${COLORS.BACKGROUND.GRAY_DARKER}`,
  borderRadius: "6px",
  padding: "0px 6px",

  display: "flex",
  justifyItems: "center",
  alignItems: "center",

  margin: "0 1px",

  fontSize: "12px",
  color: `${COLORS.BACKGROUND.GRAY_DARKER}`
}

const Tag = (props) => {
  return (
    <span className="problem-tag" style={STYLE}>{props.name}</span>
  )
}
export default Tag;