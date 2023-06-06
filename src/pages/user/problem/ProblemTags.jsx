import COLORS from "constants/colors"
import Tag from "components/Tag/Tag"

const TAGS_DISPLAY_MAX_COUNT = 3
const TAG_MAX_NOTE_STYLE = {
    marginLeft: "4px",
    fontSize: "10px",
    fontStyle: "italic",
    color: COLORS.BACKGROUND.GRAY_DARKER,
}

const ProblemTags = (props) => {
    const tags = props.tags
    console.log(tags)
    return (
        <div className="problem-tags-container d-inline-flex align-items-end">
            {
                tags.slice(0, TAGS_DISPLAY_MAX_COUNT).map((tag, idx) => (
                    <Tag key={`prob-tag-${idx}`} isDeletable={false} {...tag}/>
                ))
            }
            {
                tags.length > TAGS_DISPLAY_MAX_COUNT && <span 
                    className="problem-tags-max-note"
                    style={TAG_MAX_NOTE_STYLE}
                >
                    {`+${tags.length - TAGS_DISPLAY_MAX_COUNT}`}
                </span>
            }
        </div>
    )
}
export default ProblemTags;