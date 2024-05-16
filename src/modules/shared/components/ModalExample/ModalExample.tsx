import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/slices/modal/modalSlice'

type ModalExampleProps = {
  id: string
  open: boolean
  handleClose: (id: string) => void
  data: any // Adjust the type as per your requirement
}

const ModalExample: React.FC<ModalExampleProps> = ({ id, open, handleClose, data }) => {
  const handleOk = () => {
    handleClose(id)
  }

  const handleCancel = () => {
    handleClose(id)
  }

  return (
    <>
      <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default ModalExample
