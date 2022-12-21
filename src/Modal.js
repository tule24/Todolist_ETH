import React from 'react'
import { formatDate } from './utils/convertTimestamp';

export default function Modal(props) {
    const { task, handleEdit, handleChange} = props;
    return (
        <div className="modal fade" id='editModal'>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">EDIT TASK</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={(e) => handleEdit(e)}>
                            <div className="mb-3">
                                <label htmlFor="id" className="form-label fw-semibold">ID</label>
                                <input className="form-control" id="id" name='id' value={task[0].toString()} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label fw-semibold">Date</label>
                                <input className="form-control" id="date" name='date' value={formatDate(task[1].toString())} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label fw-semibold">Content</label>
                                <input className="form-control" id="content" name='2' value={task[2]} onChange={(e) => handleChange(e)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label fw-semibold">Author</label>
                                <input className="form-control" id="author" name='3' value={task[3]} onChange={(e) => handleChange(e)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Done" className="form-label fw-semibold me-1">Done</label>
                                <input className="form-check-input" type="checkbox" name='4' checked={task[4]} onChange={(e) => handleChange(e)}/>
                            </div>
                            <div className='float-end'>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary ms-3" data-bs-dismiss="modal">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
