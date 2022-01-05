import { Component, createRef, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { foodsProps } from "../../pages/Dashboard";

interface ModalEditProp {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: foodsProps;
  handleUpdateFood: (editFood: foodsProps) => void;
}

function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditProp) {
  const formRef = useRef<any>();

  function handleSubmit(data: foodsProps) {
    const newData = {
      ...editingFood,
      ...data
    }
    handleUpdateFood(newData);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;
