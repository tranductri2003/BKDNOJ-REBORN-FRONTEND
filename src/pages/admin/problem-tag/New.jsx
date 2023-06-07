import {Button, Form, Modal} from "react-bootstrap";
import {ErrorBox, SpinLoader} from "components";
import {toast} from "react-toastify";
import problemTagApi from "api/problem-tag";
import { useState } from "react";

const AdminCreateProblemTagModal = (props) => {
    const {show, closeModal, forceRefetch} = props;
    const [errors, setErrors] = useState()
    const [tagName, setTagName] = useState("")
    const [tagDesc, setTagDesc] = useState("")
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors(null)
        setSubmitting(true)

        const resp = problemTagApi.createProblemTag({
            name: tagName, descriptions: tagDesc,
        })
        resp.then(() => {
            toast.success("Success")
            forceRefetch()
            closeModal()
        }).catch(err => {
            console.log(err.response.data)
            setErrors(err?.response?.data)
            toast.error("Cannot create Problem Tag")
        }).finally(() => {
            setSubmitting(false)
        })
    }

    return (
      <Modal show={show} onHide={() => closeModal()}>
        <Modal.Header>
          <Modal.Title>
            + Create Problem Tag
            { isSubmitting && <SpinLoader /> }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorBox errors={errors} />
            <div>Name</div>
            <Form.Control
                type="text"
                id="problem-tag-name"
                placeholder="tag-name"
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
                placeholder="Tag descriptions here"
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
            Tạo
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AdminCreateProblemTagModal;