import { atom, selector } from "recoil";

//enum 은 계속해서 써야하는 값을 저장할 수 있는 도구.
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSate = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  // get function 은 인자를 객체로 받는데 그 객체에는 get function 이 있음.
  get: ({ get }) => {
    const toDos = get(toDoSate);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
