import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: FoodProps[];
  setFoods: Dispatch<React.SetStateAction<FoodProps[]>>;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }
    getData();
  }, []);

  return (
    <FoodsContext.Provider value={{ foods, setFoods }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}
