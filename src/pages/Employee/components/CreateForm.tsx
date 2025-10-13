import { Modal } from 'antd';
import React from 'react';

export type CreateFormProps = {
  onCancel: () => void;
  modalVisible: boolean;
  children?: React.ReactNode;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建员工"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
