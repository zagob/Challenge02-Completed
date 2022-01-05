import { useEffect, useState } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useFoods } from "../../hooks/useFoodsContext";

export interface foodsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export function Dashboard() {
  const { foods, setFoods } = useFoods();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<foodsProps>({} as foodsProps);

  async function handleAddFood(food: foodsProps) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods((old) => [...old, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: foodsProps) {
    try {
      const foodUpdated = await api.put(`/foods/${food.id}`, { ...food });
      console.log(foodUpdated);
      setFoods((old) =>
        old.map((item) =>
          item.id === foodUpdated.data.id
            ? { ...item, ...foodUpdated.data }
            : item
        )
      );
      setModalEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    setFoods((old) => old.filter((food) => food.id !== id));
  }

  function toggleModalClose() {
    setModalOpen(false);
  }

  function toggleEditModalClose() {
    setModalEditOpen(false);
  }

  function handleEditFood(food: foodsProps) {
    setEditingFood(food);
    setModalEditOpen(true);
  }

  async function handleToogleAvailable(food: foodsProps) {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });

    setFoods((old) =>
      old.map((item) =>
        item.id === food.id ? { ...item, available: !item.available } : item
      )
    );
  }

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModalClose}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={modalEditOpen}
        setIsOpen={toggleEditModalClose}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              handleToogleAvailable={handleToogleAvailable}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
