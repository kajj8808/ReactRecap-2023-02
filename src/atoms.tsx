import { atom, AtomEffect, RecoilState, selector } from "recoil";

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

//type 이 나왓으면..
const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const items = localStorage.getItem(key);
    if (items != null) {
      setSelf(JSON.parse(items));
    }
    // reset.. 할껀지.. 안할껀지..
    onSet((newItem, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newItem));
    });
  };

//effects 에서 localstrage 를 사용할때 State 의 key 와 동일한 key 값을 줘야함.
export const toDoSate = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect<IToDo[]>("toDo")],
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
