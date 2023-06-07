import problemTagAPI from "api/problem-tag";
import Select from 'react-select';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProblemTagMultiSelect = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [tags, setTags] = useState([])

  const tag2Option = (tag) => {
    return {value: tag.id, label: tag.name}
  }
  const option2Tag = (option) => {
    return {id: option.value, name: option.label}
  }
  const [selectedTags, setSelectedTags] = useState(props?.tags.map(tag => tag2Option(tag)) || [])

  useEffect(() => {
    async function fetch() {
      try {
        const response = await problemTagAPI.getProblemTags()
        setTags(response.data.results);
      } catch (error) {
        toast.error("Couldn't retrieve problem tags", {toastId: "problem-filter-sidebar-tags"})
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return (
    <>
      <Select
        isMulti
        cacheOptions
        isLoading={isLoading}
        placeholder="Select tags.."
        noOptionsMessage={() => "No tags at the moment"}
        value={selectedTags}
        closeMenuOnSelect={false}
        options={tags.map((tag) => tag2Option(tag))} 
        onChange={sel => {
          setSelectedTags(sel)
          props.onChange(sel.map(sel => option2Tag(sel)))
        }}

        styles={{
          container: () => ({
            width: "100%",
          }),
        }}
      />
    </>
  );
}
export default ProblemTagMultiSelect;