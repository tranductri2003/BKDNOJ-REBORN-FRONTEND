import {Button, Form, Modal} from "react-bootstrap";
import {ErrorBox, SpinLoader} from "components";
import {toast} from "react-toastify";
import problemTagApi from "api/problem-tag";
import { useEffect, useState } from "react";

const AdminEditProblemTagModal = (props) => {
    const {id, show, closeModal, forceRefetch} = props;
    const [errors, setErrors] = useState()
    const [tagName, setTagName] = useState("")
    const [tagDesc, setTagDesc] = useState("")
    const [isSubmitting, setSubmitting] = useState(false)

    const fetchTag = () => {
      if (!id) return;
      setSubmitting(true)
      setErrors(null)

      const resp = problemTagApi.getProblemTagDetails({id})
      resp.then(res => {
        const data = res.data
        setTagName(data.name)
        setTagDesc(data.descriptions)
      }).catch(err => {
        setErrors(err?.response?.data)
        toast.error("Could not get Tag")
      }).finally(() => {
        setSubmitting(false)
      })
    }
    useEffect(() => fetchTag(), [id])
    useEffect(() => () => {
      setTagName("")
      setTagDesc("")
    }, [show])

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors(null)
        setSubmitting(true)

        const resp = problemTagApi.editProblemTag({
          id: id,
          name: tagName, 
          descriptions: tagDesc,
        })
        resp.then(() => {
            toast.success("Success")
            forceRefetch()
            closeModal()
        }).catch(err => {
            console.log(err.response.data)
            setErrors(err?.response?.data)
            toast.error("Cannot update Problem Tag")
        }).finally(() => {
            setSubmitting(false)
        })
    }

    return (
      <Modal show={show} onHide={() => closeModal()}>
        <Modal.Header>
          <Modal.Title>
            + Updating Problem Tag
            { isSubmitting && <SpinLoader /> }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorBox errors={errors} />
            <span>ID: <code>{id}</code></span>
            <div>Name</div>
            <Form.Control
                type="text"
                id="problem-tag-name"
                placeholder="..."
                size="sm"
                disabled={isSubmitting}
                value={tagName}
                onChange={e => setTagName(e.target.value)}
            />
            <div className="mt-2"/>
            <div>Descriptions</div>
            <Form.Control
                as="textarea"
                id="problem-tag-descriptions"
                placeholder="..."
                disabled={isSubmitting}
                value={tagDesc}
                onChange={e => setTagDesc(e.target.value)}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => closeModal()}>
            Đóng
          </Button>
          <Button variant="dark" onClick={e => onSubmit(e)} disabled={isSubmitting}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AdminEditProblemTagModal;