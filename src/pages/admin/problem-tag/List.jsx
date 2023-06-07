/* eslint-disable */
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

import {
  AiOutlineForm,
  AiOutlineArrowRight,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import {SpinLoader, ErrorBox} from "components";
import problemTagApi from "api/problem-tag";
import {setTitle} from "helpers/setTitle";
import {qmClarify} from "helpers/components";
import AdminCreateProblemTagModal from "./New"
import AdminEditProblemTagModal from "./Edit"

import "./List.scss";
import "styles/ClassicPagination.scss";

const ProblemTagListItem = (props) => {
  const {id, name} = props;
  const {setEditingTagId, selectedIds, setSelectedIds} = props;

  return (
    <tr>
      <td className="text-truncate" style={{maxWidth: "40px"}}>{id}</td>
      <td className="text-truncate" style={{maxWidth: "100px"}}>{name}</td>
      <td>
        <Link to="#" onClick={() => setEditingTagId(id)}>edit</Link>
      </td>
      <td>
        <input
          type="checkbox"
          checked={selectedIds?.includes(id)}
          onChange={() => {
            if (selectedIds?.includes(id)) setSelectedIds(selectedIds.filter(selId => selId !== id))
            else setSelectedIds([...selectedIds, id]) 
          }}
        />
      </td>
    </tr>
  );
}

const AdminProblemTagList = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState()
  const [showModal, setShowModal] = useState(false)
  const [isEditingTagId, setEditingTagId] = useState(null)
  const [tags, setTags] = useState([])

  const [selectedIds, setSelectedIds] = useState([])

  async function fetch() {
    try {
      const response = await problemTagApi.getProblemTags()
      setTags(response.data.results);
    } catch (error) {
      toast.error("Couldn't retrieve problem tags", {toastId: "problem-filter-sidebar-tags"})
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTitle("Admin | Problem Tags");
    fetch();
  }, [])

  const onDeleteClick = () => {
    async function massDelete() {
      if (selectedIds.length === 0) {
        window.alert("No tags are currently selected.")
        return
      }
      const ok = window.confirm("Delete the selected tags?")
      if (!ok) return;
      setIsLoading(false)

      const requests = selectedIds.map(id => problemTagApi.deleteProblemTag({id}))
      Promise.all(requests).
        then(() => toast.success("Delete successful")).
        catch(err => {
          setErrors(err)
          toast.error("Some tags cannot be deleted.")
        }).
        finally(() => {
          setSelectedIds([])
          fetch()
        })
    }
    massDelete()
  }

  return (
    <div className="admin admin-judges">
      {/* Options for Admins: Create New,.... */}
      <div className="admin-options wrapper-vanilla">
        <div className="border d-inline-flex p-1">
          <Button
            size="sm"
            variant="dark"
            className="btn-svg"
            disabled={isLoading}
            onClick={() => setShowModal(true)}
          >
            <AiOutlinePlusCircle />
            <span className="d-none d-md-inline-flex">Add (Form)</span>
            <span className="d-inline-flex d-md-none">
              <AiOutlineArrowRight />
              <AiOutlineForm />
            </span>
          </Button>
        </div>
      </div>

      {/* Place for displaying information about admin actions  */}
      <div className="admin-note text-center mb-1">
      </div>

      <div className="admin-table problem-tag-table wrapper-vanilla">
        <h4>Problem Tags</h4>
        <ErrorBox errors={errors} />

        <div className="border m-1 d-flex align-items-center justify-content-start">
          <strong className="mr-2 text-left" style={{flexGrow: 2}}>Action{qmClarify(
            "Thực hiện action lên các đối tượng được chọn bằng checkbox."
          )}</strong>
          <span className="ml-1 mr-1">
            <Button size="sm" variant="danger"
              onClick={() => onDeleteClick()}
            >Delete</Button>
          </span>
        </div>

        <Table responsive hover striped bordered size="sm" className="rounded">
          <thead>
            <tr>
              <th style={{width: "8%"}}>#</th>
              <th>Name</th>
              <th style={{width: "8%"}}>
              </th>
              <th style={{width: "8%"}}>
                <input
                  type="checkbox"
                  checked={selectedIds?.length === tags.length}
                  onChange={() => {
                    if (selectedIds?.length !== tags.length) setSelectedIds(tags.map(tag => tag.id))
                    else setSelectedIds([]) 
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="99">
                  <SpinLoader margin="10px" />
                </td>
              </tr>
            )}
            {!isLoading && tags.length > 0 && (
              tags.map((tag, idx) => <ProblemTagListItem 
                key={`problem-tag-${idx}`} {...tag} 
                selectedIds={selectedIds} setSelectedIds={setSelectedIds}
                setEditingTagId={(v) => setEditingTagId(v)}
              />)
            )}
            {!isLoading && tags.length === 0 && (
              <tr>
                <td colSpan={99}>
                  <em>No problem tags at the moment.</em>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <AdminCreateProblemTagModal 
        show={showModal}
        closeModal={() => setShowModal(false)}
        forceRefetch={() => fetch()}
      />
      <AdminEditProblemTagModal 
        show={!!isEditingTagId}
        closeModal={() => setEditingTagId(null)}
        forceRefetch={() => fetch()}
        id={isEditingTagId}
      />
    </div>
  )
}

export default AdminProblemTagList;
